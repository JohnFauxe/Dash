# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

React 19 + TypeScript 7 study encyclopedia (Secpedia) scaffolded from Vite 8, built with shadcn/ui and Tailwind CSS v4. Lives at `github.com/JohnFauxe/Dash`.

## Commands

```sh
npm run dev        # Vite dev server on :5173
npm run build      # tsc -b && vite build
npm test           # vitest run (all tests)
npx vitest run src/lib/routes.test.ts  # single test file
npx vitest run -t "replaces spaces"    # single test by name match
npm run typecheck  # tsc -b
npm run lint       # oxlint (NOT eslint — see Linting)
npm run format     # prettier --write . — run before every commit (see Formatting)
npm run format:check  # the CI formatting gate
```

CI (`.github/workflows/ci.yml`) runs `npm ci`, `lint`, `typecheck`, `format:check`, `test`, `build` on every push to `main` and every PR.

## Formatting — commit discipline

Prettier (no semicolons, double quotes) sorts Tailwind classes via `prettier-plugin-tailwindcss`. CI's `format:check` runs `prettier --check .` over the **entire tree**, not just changed files — any file created or edited after the last `npm run format` fails CI. Run `npm run format` as the final step before every commit. (This broke the first CI run: files written after the format pass failed.)

## Linting — oxlint, not ESLint

`npm run lint` runs oxlint (rules in `.oxlintrc.json`); warnings inside `src/components/ui/*` files are expected and non-blocking. The scaffold also ships `eslint.config.js`, but it is **dormant**: `typescript-eslint` fails on load with `typescript-eslint does not support TS 7.0` (same gate in `@typescript-eslint/parser`; upstream: typescript-eslint#10940), so the ESLint packages are uninstalled. Do not reinstall them until typescript-eslint ships TS7 support. `npm run typecheck` (`tsc -b`) covers type-level checking.

## Path alias

`@/*` → `./src/*`, configured in `tsconfig.json` + `tsconfig.app.json` `compilerOptions.paths` **and** mirrored in `vite.config.ts` `resolve.alias` — keep all three in sync. There is no `baseUrl`: TypeScript 7 removed the option, and `paths` resolve relative to the tsconfig file.

## Architecture

- **Entry**: `index.html` → `src/main.tsx` (StrictMode, createRoot) → `src/App.tsx` (default export, the home page: **Secpedia**, a Wikipedia-style study encyclopedia built from `src/components/secpedia/`). Each article has a `/wiki/<Title>` URL, routed client-side by `usePathname`/`navigate` (`src/hooks/use-pathname.ts`) with path helpers in `src/lib/routes.ts`; production hosting must serve `index.html` for `/wiki/*`. Written articles are registered in `src/data/secpedia.ts` (metadata) and `App.tsx` (`bodies` map). Internal links are `<WikiLink page=…>`: they navigate to written articles and show a "not written yet" toast for anything else.
- **Design tokens**: all theme state is CSS variables in `src/index.css` — oklch palette, `--chart-1..5`, sidebar group, radius scale. The `@theme inline` block maps them to Tailwind utilities (`bg-background`, etc.). Dark mode is a class variant (`@custom-variant dark`), not a media query; an inline script in `index.html` toggles `.dark` from the OS colour scheme. Secpedia adds `--link`/`--link-visited` tokens, a `font-serif` (Source Serif 4) and a `.wiki-prose` component layer for article text.
- **shadcn/ui**: configured in `components.json` (Radix base, nova preset). Components are owned source files generated into `src/components/ui/` by `npx shadcn@latest add <name>` — edit them freely. Adding a component also adds its runtime deps to `package.json` (radix-ui, etc.). `cn` helper lives in `src/lib/utils.ts`.
- **Live cable data**: the undersea cable map polls Submarine Cable Status and GeoCables from the browser (`src/hooks/use-cable-status.ts`, parsed in `src/lib/cable-status.ts`). Both are keyless and CC BY 4.0; keep the on-page credits, and the TeleGeography credit (CC BY-NC-SA 3.0) for directory fields.
- **Testable logic**: pure data helpers in `src/lib/` are the primary test target (vitest, colocated `*.test.ts`). Component tests are not set up yet.

## Git flow

One feature branch + PR per change so CI checks it before human review. Pushing requires the user's credentials (no `gh` CLI installed in sandbox sessions) — prepare the commit locally and hand off the push command.
