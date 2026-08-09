import { describe, expect, it } from 'vitest'
import { loadSurah } from '../content/corpus'
import type { CorpusToken } from '../content/corpus/types'
import {
  describeSegment,
  irabOf,
  pronounGloss,
  referenceFor,
  referenceLink,
} from './morphology'

/** Every token of a surah, the basmala included, in reading order. */
async function tokensOf(surah: number): Promise<CorpusToken[]> {
  const text = await loadSurah(surah)
  const lines = text.basmala ? [text.basmala, ...text.ayat] : text.ayat
  return lines.flatMap((line) => line.tokens)
}

/**
 * The token whose head form is `form`, so a case can be named by what it
 * reads rather than by its position.
 *
 * Matched after NFC because the corpus writes a shadda before the vowel it
 * doubles and Unicode's canonical order puts it after: a form typed into a
 * test looks identical to its corpus form and is byte-different.
 */
async function token(surah: number, form: string): Promise<CorpusToken> {
  const wanted = form.normalize('NFC')
  const found = (await tokensOf(surah)).find(
    (t) => t.segments[t.head].form.normalize('NFC') === wanted,
  )
  if (!found) throw new Error(`no token "${form}" in surah ${surah}`)
  return found
}

describe('irabOf: the sign is read off the letters', () => {
  it('names the kasra of a singular noun after a preposition', async () => {
    // al-Fil 105:1, "bi-ashabi l-fil": both are makhfud, both by the kasra.
    expect((await irabOf(await token(105, 'أَصْحَٰبِ'))).label).toBe('makhfūḍ bi-l-kasra')
  })

  it('names the damma of a plain subject', async () => {
    // an-Nasr 110:1, "nasru llahi".
    expect((await irabOf(await token(110, 'نَصْرُ'))).label).toBe('marfūʿ bi-ḍ-ḍamma')
  })

  it('names the fatha of an object, tanwin included', async () => {
    // al-Fil 105:3, "tayran ababila".
    expect((await irabOf(await token(105, 'طَيْرًا'))).label).toBe('manṣūb bi-l-fatḥa')
  })

  it('names the waw of a sound masculine plural', async () => {
    // al-Kafirun 109:1, "al-kafiruna".
    expect((await irabOf(await token(109, 'كَٰفِرُونَ'))).label).toBe('marfūʿ bi-l-wāw')
  })

  it('names the ya of a sound masculine plural after a preposition', async () => {
    // al-Maun 107:4, "li-l-musallina".
    expect((await irabOf(await token(107, 'مُصَلِّينَ'))).label).toBe('makhfūḍ bi-l-yāʾ')
  })

  it('names the alif of a dual', async () => {
    // al-Masad 111:1, "yada abi lahabin".
    expect((await irabOf(await token(111, 'يَدَآ'))).label).toBe('marfūʿ bi-l-alif')
  })

  it('names the ya of one of the five nouns', async () => {
    // al-Masad 111:1, "abi lahabin": the five nouns take letters, not harakat.
    expect((await irabOf(await token(111, 'أَبِى'))).label).toBe('makhfūḍ bi-l-yāʾ')
  })

  it('names the sukun of a sound jussive verb', async () => {
    // al-Ikhlas 112:3, "lam yalid".
    expect((await irabOf(await token(112, 'يَلِدْ'))).label).toBe('majzūm bi-s-sukūn')
  })

  it('names the dropped weak letter of a jussive', async () => {
    // al-Fil 105:1, "a-lam tara": the ya of ra'a is gone, and that is the sign.
    expect((await irabOf(await token(105, 'تَرَ'))).label).toBe('majzūm bi-ḥadhf ḥarf al-ʿilla')
  })

  it('names the nun that stays on a verb of the five', async () => {
    // al-Kafirun 109:2, "ta'buduna": the corpus writes the wow and nun as a
    // segment of their own, so the sign is not on the verb's own letters.
    expect((await irabOf(await token(109, 'تَعْبُدُ'))).label).toBe('marfūʿ bi-thubūt an-nūn')
  })

  it('names the nun that drops in jazm', async () => {
    // Quraysh 106:3, "fal-ya'budu": jussive, and the nun is gone.
    expect((await irabOf(await token(106, 'يَعْبُدُ'))).label).toBe('majzūm bi-ḥadhf an-nūn')
  })

  it('calls a weak-ending verb implied rather than inventing a sign', async () => {
    // al-Fil 105:4, "tarmihim": the damma cannot be written on the ya.
    expect((await irabOf(await token(105, 'تَرْمِي'))).label).toBe('marfūʿ bi-ḍamma muqaddara')
  })

  it('calls a particle mabni, not by the case it governs', async () => {
    // al-Kawthar 108:1, "inna": the corpus tags it ACC because it puts its ism
    // in nasb. Inna itself is built on the fatha and has no case of its own.
    const inna = await token(108, 'إِنَّ')
    expect(irabOf(inna)).toEqual({ state: 'mabni', label: 'mabnī' })
  })

  it('calls a demonstrative and a pronoun mabni', async () => {
    // Quraysh 106:3, "hadha l-bayt", and al-Ikhlas 112:1, "huwa".
    expect((await irabOf(await token(106, 'ذَا'))).state).toBe('mabni')
    expect((await irabOf(await token(112, 'هُوَ'))).state).toBe('mabni')
  })

  it('reports the state alone when the letters contradict the tag', async () => {
    // al-Kafirun 109:1, "ya ayyuha": the corpus tags ayyu as ACC and it is
    // written with a damma. Naming a sign here would teach a mistake.
    const irab = await irabOf(await token(109, 'أَيُّ'))
    expect(irab.state).toBe('nasb')
    expect(irab.sign).toBeUndefined()
    expect(irab.label).toBe('manṣūb')
  })
})

describe('irabOf: over the whole reader', () => {
  it('never claims a sign a state cannot take', async () => {
    const impossible: string[] = []
    for (const ref of [105, 106, 107, 108, 109, 110, 111, 112, 113, 114]) {
      for (const t of await tokensOf(ref)) {
        const { state, sign } = irabOf(t)
        if (state === 'raf' && sign === 'kasra') impossible.push(t.segments[t.head].form)
        if (state === 'khafd' && sign === 'damma') impossible.push(t.segments[t.head].form)
        if (state === 'mabni' && sign) impossible.push(t.segments[t.head].form)
      }
    }
    expect(impossible).toEqual([])
  })

  it('names a state for every token', async () => {
    for (const ref of [105, 114]) {
      for (const t of await tokensOf(ref)) expect(irabOf(t).label.length).toBeGreaterThan(0)
    }
  })
})

describe('describeSegment', () => {
  it('reads a prefixed particle as a prefix', async () => {
    const t = await token(105, 'أَصْحَٰبِ')
    expect(describeSegment(t.segments[0])).toEqual({
      role: 'prefix',
      partOfSpeech: 'harf',
      traits: ['preposition'],
    })
  })

  it('reads the same tag as plural on a noun and preposition on a particle', async () => {
    // an-Nasr 110:2, "afwajan": `P` here is the plural, not the preposition.
    const t = await token(110, 'أَفْوَاجًا')
    expect(describeSegment(t.segments[t.head]).traits).toContain('plural')
  })

  it('names tense, form and person on a verb', async () => {
    const t = await token(105, 'فَعَلَ')
    expect(describeSegment(t.segments[t.head]).traits).toEqual(['māḍī', 'Form I', 'he'])
  })
})

describe('pronounGloss', () => {
  it('reads a detached pronoun off its person, which the corpus does not lemmatize', async () => {
    // al-Ikhlas 112:1, "huwa": the corpus gives no pronoun a lemma, so without
    // this the most famous word in the surah would have nothing to show.
    const t = await token(112, 'هُوَ')
    expect(t.segments[t.head].lemma).toBeUndefined()
    expect(pronounGloss(t.segments[t.head])?.english).toContain('he')
  })

  it('reads an attached pronoun the same way', async () => {
    // al-Fil 105:2, "kaydahum".
    const t = await token(105, 'كَيْدَ')
    expect(pronounGloss(t.segments[1])?.english).toContain('they')
  })

  it('says nothing about a word that is not a pronoun', async () => {
    const t = await token(110, 'نَصْرُ')
    expect(pronounGloss(t.segments[t.head])).toBeUndefined()
  })
})

describe('referenceFor', () => {
  it('sends a jussive to the jazm particles', async () => {
    expect(referenceFor(await token(112, 'يَلِدْ'))).toBe('jawazim-al-fil')
  })

  it('sends a declined noun to the signs of irab', async () => {
    expect(referenceFor(await token(110, 'نَصْرُ'))).toBe('irab-signs')
  })

  it('prefers the link the deck authored for a harf', async () => {
    // al-Fil 105:1, the bi- of "bi-ashabi": the Hurūf al-Khafd deck names the
    // exact particle, which beats sending the reader to the word classes.
    const t = await token(105, 'أَصْحَٰبِ')
    expect(referenceFor({ ...t, head: 0 }, 'huruf-al-khafd#ba')).toBe('huruf-al-khafd#ba')
    expect(referenceFor({ ...t, head: 0 })).toBe('parts-of-speech')
  })

  it('sends kana to its sisters', async () => {
    expect(referenceFor(await token(112, 'يَكُن'))).toBe('kana-wa-akhawatuha')
  })

  it('sends inna to its sisters', async () => {
    expect(referenceFor(await token(108, 'إِنَّ'))).toBe('inna-wa-akhawatuha')
  })

  it('sends a detached pronoun to the pronoun tables', async () => {
    expect(referenceFor(await token(112, 'هُوَ'))).toBe('damair#munfasil')
  })
})

describe('referenceLink', () => {
  it('passes an anchor as the query the reference page reads', () => {
    expect(referenceLink('huruf-al-khafd#min')).toBe('/reference/huruf-al-khafd?h=min')
    expect(referenceLink('irab-signs')).toBe('/reference/irab-signs')
  })
})
