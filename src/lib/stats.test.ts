import { describe, expect, it } from "vitest"
import { average, total } from "./stats"

describe("stats", () => {
  it("totals values", () => expect(total([1, 2, 3])).toBe(6))
  it("averages values", () => expect(average([2, 4])).toBe(3))
  it("returns 0 for an empty list", () => expect(average([])).toBe(0))
})
