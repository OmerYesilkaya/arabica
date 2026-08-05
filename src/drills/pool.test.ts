import { describe, expect, it } from 'vitest'
import { buildDrillPool } from './pool'
import { arabicAnswersMatch } from '../text/arabic'

describe('buildDrillPool', () => {
  const pool = buildDrillPool()
  const byId = (id: string) => pool.find((i) => i.id === `huruf-al-khafd:${id}`)

  it('excludes the oath particles (no meaning-to-ar direction)', () => {
    expect(byId('waw-qasam')).toBeUndefined()
    expect(byId('ba-qasam')).toBeUndefined()
    expect(byId('ta-qasam')).toBeUndefined()
  })

  it('asks for the bare particle, not the label, when drillAnswer is set', () => {
    expect(byId('ba')?.arabic).toBe('بِ')
    expect(byId('kaf')?.arabic).toBe('كَ')
    expect(byId('lam')?.arabic).toBe('لِ')
  })

  it('accepts the bare typed particle for a label-form note', () => {
    // A learner types the plain letter; it must match the particle answer.
    expect(arabicAnswersMatch('ب', byId('ba')!.arabic)).toBe(true)
  })

  it('uses the word itself for plain notes', () => {
    expect(byId('min')?.arabic).toBe('مِنْ')
    expect(byId('ila')?.arabic).toBe('إِلَى')
  })
})
