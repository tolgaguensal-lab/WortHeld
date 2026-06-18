# Deepwork: DESIGN.md v3.0 Implementation

**Goal:** Migrate entire WortHeld codebase from Dark Indigo design to Warm Cream + Forest Green design system defined in `docs/DESIGN.md` v3.0.

**Status:** Complete ✅ — all phases done, build passing

## Agent Timeout Lessons Learned

### Root Cause
Agents timeout when a single delegation is too large. The 30-min inactivity window means an agent that runs out of context or gets stuck on a large file will fail silently.

### What Failed
| Task | Size | Result |
|------|------|--------|
| Landing page rewrite (bg_e10fa001) | ~200 LOC, full page | **Timeout 30m** |
| Landing page retry (bg_1cf9db75) | Same | Cancelled, wrote manually |

### What Succeeded
| Task | Size | Result |
|------|------|--------|
| Button rewrite (bg_2d4a576b) | ~100 LOC, single component | **14m** ✅ |
| 6 shared components (bg_ff4be3f6) | 6 files, ~50 LOC each | **36m** ✅ |
| UX trend research (bg_80da5d85) | Research only | **1.5m** ✅ |

### Rule: Effective Agent Delegation

1. **One file per agent max** for implementation tasks. If it's 2+ files, split into separate agents.
2. **<150 LOC target** per agent task. Above that, the risk of timeout increases sharply.
3. **Research agents (explore/librarian) are fast** — they can handle broad scope because they only read, never write.
4. **Implementation agents need narrow scope** — give them ONE component, ONE file, ONE clear goal.
5. **Write page-level rewrites yourself** — you have full context and can do them in minutes vs agent timeout risk.
6. **Batch independent small tasks** — 6 independent components in one agent = OK. One large page = NOT OK.
7. **Prompt discipline:** 6-section prompts with explicit "MUST DO / MUST NOT DO" prevent agent drift.

## Background Tasks
- `bg_2d4a576b` (ses_124682529ffe4lErhoN0N6U4Xn): button.tsx rewrite
- `bg_ff4be3f6` (ses_12467f220ffeB7lHQpmb5vg46q): 6 new shared components
- `bg_e10fa001` (ses_12467b3d6ffe8yDDbssRSfMeq8): landing page rewrite

## Key Design Decisions (from DESIGN.md v3.0)

- **Background:** Warm cream `#FBF9F5` (was: dark indigo `hsl(235,45%,8%)`)
- **Primary accent:** Forest green `#2D6A4F` — single accent, CTAs only (was: white/indigo gradient)
- **Display font:** Libre Baskerville (was: Source Serif 4)
- **Body font:** Inter (unchanged)
- **Mono font:** JetBrains Mono (new)
- **Buttons:** Pills (9999px radius) (was: rounded-lg)
- **Cards:** Paper-like, 16-30px radii, minimal shadows
- **Dark mode:** Only for Quiz/Admin panels, via separate token set

## Reference Files

- Design spec: `docs/DESIGN.md`
- Current CSS: `src/app/globals.css`
- Current Tailwind: `tailwind.config.ts`
- Current Layout: `src/app/layout.tsx`
- Current Landing: `src/app/page.tsx`
- UI components: `src/components/ui/*.tsx`
- Shared components: `src/components/shared/*.tsx`

## Implementation Phases

### Phase 1: Foundation ✅ (by orchestrator)
- [ ] globals.css — complete rewrite with new color, spacing, radius, shadow, animation tokens
- [ ] tailwind.config.ts — new palette, fonts, radii, spacing
- [ ] lib/design-tokens.ts — new file, TypeScript constants
- [ ] types/design.ts — new file, TypeScript types
- [ ] layout.tsx — update themeColor, ensure font loading

### Phase 2: UI Primitives (delegate to visual-engineering)
- [ ] button.tsx — new variants (primary/secondary/outline/ghost/destructive/gold), pill shape, 5 sizes
- [ ] card.tsx — new card types (default/elevated/outline/paper/dark/glass)
- [ ] badge.tsx — updated styles
- [ ] progress.tsx — updated to match ProgressBar spec
- [ ] input.tsx — updated form styles

### Phase 3: Shared Components (delegate to visual-engineering)
- [ ] Animated.tsx — update for new motion presets
- [ ] XpRing.tsx — new component
- [ ] StreakBadge.tsx — new component
- [ ] ProgressBar.tsx — new component
- [ ] FeedbackCard.tsx — new component
- [ ] EmptyState.tsx — new component
- [ ] PageHeader.tsx — new component

### Phase 4: Pages & Layout (delegate to visual-engineering)
- [ ] page.tsx — complete landing page rewrite (light theme, new hero, new sections)
- [ ] TopNav.tsx — update if exists
- [ ] Footer.tsx — update if exists

### Phase 5: Verification
- [ ] lsp_diagnostics on all changed files
- [ ] npm run build
- [ ] npm run lint
- [ ] Visual QA

## Oracle Reviews
- Plan review: pending
- Phase 1 review: pending
- Final review: pending
