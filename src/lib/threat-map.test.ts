import { describe, expect, it } from "vitest"
import {
  CITIES,
  LIFETIME_TICKS,
  advance,
  arcPath,
  initialFeed,
  randomShot,
  type FeedState,
  type Shot,
} from "./threat-map"

const shot: Shot = { type: "DDoS", from: CITIES[0], to: CITIES[1] }

function run(ticks: number): FeedState {
  let state = initialFeed
  for (let i = 0; i < ticks; i++) state = advance(state, shot)
  return state
}

describe("randomShot", () => {
  it("never targets the source city", () => {
    for (const r of [0, 0.25, 0.5, 0.999]) {
      const { from, to } = randomShot(() => r)
      expect(from).not.toBe(to)
    }
  })
})

describe("advance", () => {
  it("counts each attack under its type", () => {
    expect(run(3).counts).toEqual({
      DDoS: 3,
      Malware: 0,
      Phishing: 0,
      Intrusion: 0,
    })
  })
  it("gives every attack a unique id", () => {
    const ids = run(LIFETIME_TICKS).active.map((a) => a.id)
    expect(new Set(ids).size).toBe(LIFETIME_TICKS)
  })
  it("retires attacks once their lifetime is over", () => {
    const { active, tick } = run(LIFETIME_TICKS * 3)
    expect(active).toHaveLength(LIFETIME_TICKS)
    expect(active.every((a) => tick - a.born < LIFETIME_TICKS)).toBe(true)
  })
  it("keeps the newest attack first in a capped feed", () => {
    const { recent, tick } = run(20)
    expect(recent[0].id).toBe(tick)
    expect(recent).toHaveLength(4)
  })
})

describe("arcPath", () => {
  it("bows upward between its endpoints", () =>
    expect(arcPath([0, 100], [100, 100])).toBe("M0 100Q50 70 100 100"))
})
