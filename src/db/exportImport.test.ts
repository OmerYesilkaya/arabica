import { beforeEach, describe, expect, it } from 'vitest'
import { Rating } from 'ts-fsrs'
import { ArabicaDB } from './db'
import { buildBackup, importBackup, parseBackup } from './exportImport'
import { hurufAlKhafd } from '../content/decks/hurufAlKhafd'
import { cardsOfDeck } from '../content/decks'
import { answerCard } from '../srs/engine'

let counter = 0

function freshDb() {
  return new ArabicaDB(`export-test-${++counter}`)
}

describe('backup roundtrip', () => {
  let db: ArabicaDB

  beforeEach(async () => {
    db = freshDb()
    const now = new Date()
    const cards = cardsOfDeck(hurufAlKhafd)
    await answerCard(db, cards[0], undefined, Rating.Good, now)
    await answerCard(db, cards[2], undefined, Rating.Again, now)
    await db.meta.put({ key: 'lastExportAt', value: 123 })
  })

  it('restores all tables into an empty database', async () => {
    const backup = await buildBackup(db, new Date())
    const restored = parseBackup(JSON.stringify(backup))

    const target = freshDb()
    await importBackup(target, restored)

    expect(await target.cardState.count()).toBe(await db.cardState.count())
    expect(await target.reviewLog.count()).toBe(await db.reviewLog.count())

    const original = await db.cardState.toArray()
    const copied = await target.cardState.toArray()
    expect(copied).toEqual(original)
  })

  it('replaces existing progress on import', async () => {
    const backup = parseBackup(JSON.stringify(await buildBackup(db, new Date())))

    const target = freshDb()
    const cards = cardsOfDeck(hurufAlKhafd)
    await answerCard(db, cards[4], undefined, Rating.Easy, new Date())
    await answerCard(target, cards[4], undefined, Rating.Easy, new Date())

    await importBackup(target, backup)
    expect(await target.reviewLog.count()).toBe(backup.reviewLog.length)
  })

  it('rejects files that are not arabica backups', () => {
    expect(() => parseBackup('{"app":"other"}')).toThrow()
    expect(() => parseBackup('{"app":"arabica","schemaVersion":1}')).toThrow()
  })
})
