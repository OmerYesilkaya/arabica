// Service worker: offline precache plus cross-origin-isolation headers.
//
// Two jobs:
//  1. Precache the built assets (including the FSRS wasm) so the app, and the
//     optimizer, work fully offline.
//  2. Inject COOP/COEP/CORP headers on every response so the page becomes
//     cross-origin isolated. fsrs-browser needs SharedArrayBuffer, which needs
//     isolation, and GitHub Pages cannot set these headers server-side.
//
// Typed with minimal local shims so it builds under the app's DOM lib without a
// separate worker tsconfig.

interface ExtendableEvent {
  waitUntil(p: Promise<unknown>): void
}
interface FetchEvent {
  request: Request
  respondWith(r: Response | Promise<Response>): void
}
interface SwScope {
  location: { href: string }
  skipWaiting(): Promise<void>
  clients: { claim(): Promise<void> }
  addEventListener(type: 'install', listener: (event: ExtendableEvent) => void): void
  addEventListener(type: 'activate', listener: (event: ExtendableEvent) => void): void
  addEventListener(type: 'fetch', listener: (event: FetchEvent) => void): void
}

const sw = self as unknown as SwScope

// The literal `self.__WB_MANIFEST` token must survive bundling untouched; the
// PWA plugin replaces it with the precache manifest at build time.
const manifest = (self as unknown as {
  __WB_MANIFEST: Array<{ url: string; revision: string | null }>
}).__WB_MANIFEST

const CACHE = 'arabica-precache-v2'
const OFFLINE_URL = new URL('index.html', sw.location.href).href

// Absolute URLs of every precached asset, plus the navigation fallback.
const PRECACHE_URLS = Array.from(
  new Set([
    OFFLINE_URL,
    ...manifest.map((entry) => new URL(entry.url, sw.location.href).href),
  ]),
)

/** Re-serve a same-origin response with the headers that enable isolation. */
function withCoi(response: Response): Response {
  const headers = new Headers(response.headers)
  headers.set('Cross-Origin-Opener-Policy', 'same-origin')
  headers.set('Cross-Origin-Embedder-Policy', 'require-corp')
  headers.set('Cross-Origin-Resource-Policy', 'same-origin')
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  })
}

sw.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => sw.skipWaiting()),
  )
})

sw.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => sw.clients.claim()),
  )
})

sw.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return
  if (new URL(request.url).origin !== new URL(sw.location.href).origin) return

  if (request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          return withCoi(await fetch(request))
        } catch {
          const cache = await caches.open(CACHE)
          const cached = (await cache.match(OFFLINE_URL)) ?? (await cache.match(request))
          return cached ? withCoi(cached) : Response.error()
        }
      })(),
    )
    return
  }

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE)
      const cached = await cache.match(request, { ignoreSearch: true })
      if (cached) return withCoi(cached)
      const response = await fetch(request)
      if (response.ok && response.type === 'basic') {
        cache.put(request, response.clone())
      }
      return withCoi(response)
    })(),
  )
})
