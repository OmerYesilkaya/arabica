// Register the service worker and, on first control, reload once so the
// navigation response carries the cross-origin-isolation headers the SW adds.
// Without that reload the first document load is not isolated and the optimizer
// cannot use SharedArrayBuffer.

function reloadOnce(): void {
  if (sessionStorage.getItem('coi-reloaded')) return
  sessionStorage.setItem('coi-reloaded', '1')
  window.location.reload()
}

export function registerSw(): void {
  if (!('serviceWorker' in navigator)) return
  const swUrl = `${import.meta.env.BASE_URL}sw.js`

  // Register straight away. Gating on the window "load" event is unsafe here:
  // main.tsx awaits before calling this, and "load" may already have fired.
  navigator.serviceWorker.register(swUrl).then(
    () => {
      if (navigator.serviceWorker.controller && !crossOriginIsolated) reloadOnce()
    },
    () => {
      // Offline or unsupported: the app still works, only the optimizer is off.
    },
  )
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!crossOriginIsolated) reloadOnce()
  })
}
