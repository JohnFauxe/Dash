import { describe, expect, it } from "vitest"
import { resolve, suggest } from "./search"

const titles = ["Malware", "Ransomware", "Cryptography", "Ware"]

describe("suggest", () => {
  it("matches substrings case-insensitively", () =>
    expect(suggest("WARE", titles)).toEqual(["Malware", "Ransomware", "Ware"]))
  it("returns nothing for a blank query", () =>
    expect(suggest("   ", titles)).toEqual([]))
  it("returns nothing when no title matches", () =>
    expect(suggest("phish", titles)).toEqual([]))
})

describe("resolve", () => {
  it("prefers an exact match over an earlier partial match", () =>
    expect(resolve("ware", titles)).toBe("Ware"))
  it("falls back to the first partial match", () =>
    expect(resolve("crypt", titles)).toBe("Cryptography"))
  it("returns undefined when nothing matches", () =>
    expect(resolve("phish", titles)).toBeUndefined())
  it("returns undefined for a blank query", () =>
    expect(resolve("", titles)).toBeUndefined())
})
