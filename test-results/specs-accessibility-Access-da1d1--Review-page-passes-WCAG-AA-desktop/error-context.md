# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: specs/accessibility.spec.ts >> Accessibility + WCAG AA >> Authenticated pages >> [A11Y] Review page passes WCAG AA
- Location: e2e/specs/accessibility.spec.ts:41:11

# Error details

```
Error: expect(received).toHaveLength(expected)

Expected length: 0
Received length: 2
Received array:  [{"description": "Ensure links have discernible text", "help": "Links must have discernible text", "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/link-name?application=playwright", "id": "link-name", "impact": "serious", "nodes": [{"all": [], "any": [{"data": null, "id": "has-visible-text", "impact": "serious", "message": "Element does not have text that is visible to screen readers", "relatedNodes": []}, {"data": null, "id": "aria-label", "impact": "serious", "message": "aria-label attribute does not exist or is empty", "relatedNodes": []}, {"data": null, "id": "aria-labelledby", "impact": "serious", "message": "aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty", "relatedNodes": []}, {"data": {"messageKey": "noAttr"}, "id": "non-empty-title", "impact": "serious", "message": "Element has no title attribute", "relatedNodes": []}], "failureSummary": "Fix all of the following:
  Element is in tab order and does not have accessible text·
Fix any of the following:
  Element does not have text that is visible to screen readers
  aria-label attribute does not exist or is empty
  aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty
  Element has no title attribute", "html": "<a href=\"/settings\">", "impact": "serious", "none": [{"data": null, "id": "focusable-no-name", "impact": "serious", "message": "Element is in tab order and does not have accessible text", "relatedNodes": []}], "target": ["a[href$=\"settings\"]"]}], "tags": ["cat.name-role-value", "wcag2a", "wcag244", "wcag412", "section508", "section508.22.a", "TTv5", "TT6.a", "EN-301-549", "EN-9.2.4.4", …]}, {"description": "Ensure <meta name=\"viewport\"> does not disable text scaling and zooming", "help": "Zooming and scaling must not be disabled", "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/meta-viewport?application=playwright", "id": "meta-viewport", "impact": "moderate", "nodes": [{"all": [], "any": [{"data": "user-scalable=no", "id": "meta-viewport", "impact": "moderate", "message": "user-scalable=no on <meta> tag disables zooming on mobile devices", "relatedNodes": []}], "failureSummary": "Fix any of the following:
  user-scalable=no on <meta> tag disables zooming on mobile devices", "html": "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no\">", "impact": "moderate", "none": [], "target": ["meta[name=\"viewport\"]"]}], "tags": ["cat.sensory-and-visual-cues", "wcag2aa", "wcag144", "EN-301-549", "EN-9.1.4.4", "ACT", "RGAAv4", "RGAA-10.4.2"]}]
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - complementary [ref=e3]:
      - generic [ref=e5]:
        - generic [ref=e7]: W
        - generic [ref=e8]:
          - heading "WortHeld" [level=1] [ref=e9]
          - paragraph [ref=e10]: Deutsch lernen
      - navigation [ref=e11]:
        - link "Dashboard" [ref=e12] [cursor=pointer]:
          - /url: /dashboard
          - img [ref=e13]
          - generic [ref=e18]: Dashboard
          - img [ref=e19]
        - link "Lernen" [ref=e21] [cursor=pointer]:
          - /url: /learn
          - img [ref=e22]
          - generic [ref=e24]: Lernen
          - img [ref=e25]
        - link "Vokabeln" [ref=e27] [cursor=pointer]:
          - /url: /vocabulary
          - img [ref=e28]
          - generic [ref=e31]: Vokabeln
          - img [ref=e32]
        - link "Grammatik" [ref=e34] [cursor=pointer]:
          - /url: /grammar
          - img [ref=e35]
          - generic [ref=e37]: Grammatik
          - img [ref=e38]
        - link "DTZ-Test" [ref=e40] [cursor=pointer]:
          - /url: /dtz
          - img [ref=e41]
          - generic [ref=e44]: DTZ-Test
          - img [ref=e45]
        - link "Üben" [ref=e47] [cursor=pointer]:
          - /url: /review
          - img [ref=e48]
          - generic [ref=e53]: Üben
          - img [ref=e54]
        - link "Rangliste" [ref=e56] [cursor=pointer]:
          - /url: /leaderboard
          - img [ref=e57]
          - generic [ref=e63]: Rangliste
          - img [ref=e64]
      - generic [ref=e67] [cursor=pointer]:
        - generic [ref=e68]: T
        - generic [ref=e69]:
          - paragraph [ref=e70]: Test User
          - paragraph [ref=e71]: test@user.de
        - link [ref=e72]:
          - /url: /settings
          - img [ref=e73]
    - main [ref=e76]:
      - generic [ref=e78]:
        - img [ref=e80]
        - heading "Alles geschafft!" [level=1] [ref=e83]
        - paragraph [ref=e84]: Keine Wiederholungen fällig. Gut gemacht – du bist auf dem neuesten Stand.
        - generic [ref=e85]:
          - link "Neue Lektionen lernen" [ref=e86] [cursor=pointer]:
            - /url: /learn
            - button "Neue Lektionen lernen" [ref=e87]:
              - text: Neue Lektionen lernen
              - img
          - link "Zum Dashboard" [ref=e88] [cursor=pointer]:
            - /url: /dashboard
            - button "Zum Dashboard" [ref=e89]
  - alert [ref=e90]
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | import AxeBuilder from "@axe-core/playwright";
  3  | const BASE = "http://192.168.178.91:3035";
  4  | 
  5  | const PAGES = [
  6  |   { name: "Landing", path: "/" },
  7  |   { name: "Login", path: "/login" },
  8  |   { name: "Register", path: "/register" },
  9  |   { name: "Onboarding", path: "/onboarding" },
  10 |   { name: "Placement Test", path: "/placement-test" },
  11 |   { name: "Pricing", path: "/pricing" },
  12 | ];
  13 | 
  14 | test.describe("Accessibility + WCAG AA", () => {
  15 |   for (const p of PAGES) {
  16 |     test(`[A11Y] ${p.name} page passes WCAG AA checks`, async ({ page }) => {
  17 |       await page.goto(`${BASE}${p.path}`);
  18 |       const results = await new AxeBuilder({ page })
  19 |         .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
  20 |         .analyze();
  21 |       expect(results.violations).toHaveLength(0);
  22 |     });
  23 |   }
  24 | 
  25 |   test.describe("Authenticated pages", () => {
  26 |     test.beforeEach(async ({ page }) => {
  27 |       await page.goto(`${BASE}/login`);
  28 |       await page.fill("#email", "test@user.de");
  29 |       await page.fill("#password", "test123456");
  30 |       await page.click("button[type=submit]");
  31 |       await page.waitForURL(/dashboard/, { timeout: 10000 });
  32 |     });
  33 | 
  34 |     for (const p of [
  35 |       { name: "Dashboard", path: "/dashboard" },
  36 |       { name: "Learn", path: "/learn" },
  37 |       { name: "Vocabulary", path: "/vocabulary" },
  38 |       { name: "Grammar", path: "/grammar" },
  39 |       { name: "Review", path: "/review" },
  40 |     ]) {
  41 |       test(`[A11Y] ${p.name} page passes WCAG AA`, async ({ page }) => {
  42 |         await page.goto(`${BASE}${p.path}`);
  43 |         const results = await new AxeBuilder({ page })
  44 |           .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
  45 |           .analyze();
> 46 |         expect(results.violations).toHaveLength(0);
     |                                    ^ Error: expect(received).toHaveLength(expected)
  47 |       });
  48 |     }
  49 |   });
  50 | 
  51 |   test("[A11Y] All buttons have accessible names", async ({ page }) => {
  52 |     await page.goto(BASE);
  53 |     const buttons = page.locator("button:not([aria-label]):not(:has-text(''))");
  54 |     const count = await buttons.count();
  55 |     for (let i = 0; i < count; i++) {
  56 |       const text = await buttons.nth(i).textContent();
  57 |       const ariaLabel = await buttons.nth(i).getAttribute("aria-label");
  58 |       const title = await buttons.nth(i).getAttribute("title");
  59 |       expect(text || ariaLabel || title).toBeTruthy();
  60 |     }
  61 |   });
  62 | 
  63 |   test("[A11Y] Focus ring visible on interactive elements", async ({ page }) => {
  64 |     await page.goto(`${BASE}/login`);
  65 |     await page.keyboard.press("Tab");
  66 |     const focused = page.locator(":focus");
  67 |     await expect(focused).toBeVisible();
  68 |   });
  69 | });
  70 | 
```