import { describe, expect, it } from "vitest"
import { pathToTitle, titleToPath } from "./routes"

describe("titleToPath", () => {
  it("replaces spaces with underscores", () =>
    expect(titleToPath("Cyber security")).toBe("/wiki/Cyber_security"))
  it("encodes characters that are unsafe in a path", () =>
    expect(titleToPath("Firewall (computing)?")).toBe(
      "/wiki/Firewall_(computing)%3F",
    ))
})

describe("pathToTitle", () => {
  it("round-trips with titleToPath", () => {
    const title = "Australian cyber security standards"
    expect(pathToTitle(titleToPath(title))).toBe(title)
  })
  it("ignores a trailing slash", () =>
    expect(pathToTitle("/wiki/Malware/")).toBe("Malware"))
  it("returns undefined outside /wiki/", () => {
    expect(pathToTitle("/")).toBeUndefined()
    expect(pathToTitle("/wiki/")).toBeUndefined()
    expect(pathToTitle("/about")).toBeUndefined()
  })
  it("returns undefined for malformed encoding", () =>
    expect(pathToTitle("/wiki/%E0%A4%A")).toBeUndefined())
})
