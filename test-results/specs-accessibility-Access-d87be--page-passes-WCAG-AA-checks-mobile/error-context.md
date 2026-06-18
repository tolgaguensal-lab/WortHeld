# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: specs/accessibility.spec.ts >> Accessibility + WCAG AA >> [A11Y] Login page passes WCAG AA checks
- Location: e2e/specs/accessibility.spec.ts:16:9

# Error details

```
Error: expect(received).toHaveLength(expected)

Expected length: 0
Received length: 2
Received array:  [{"description": "Ensure buttons have discernible text", "help": "Buttons must have discernible text", "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/button-name?application=playwright", "id": "button-name", "impact": "critical", "nodes": [{"all": [], "any": [{"data": null, "id": "button-has-visible-text", "impact": "critical", "message": "Element does not have inner text that is visible to screen readers", "relatedNodes": []}, {"data": null, "id": "aria-label", "impact": "critical", "message": "aria-label attribute does not exist or is empty", "relatedNodes": []}, {"data": null, "id": "aria-labelledby", "impact": "critical", "message": "aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty", "relatedNodes": []}, {"data": {"messageKey": "noAttr"}, "id": "non-empty-title", "impact": "critical", "message": "Element has no title attribute", "relatedNodes": []}, {"data": null, "id": "implicit-label", "impact": "critical", "message": "Element does not have an implicit (wrapped) <label>", "relatedNodes": []}, {"data": null, "id": "explicit-label", "impact": "critical", "message": "Element does not have an explicit <label>", "relatedNodes": []}, {"data": null, "id": "presentational-role", "impact": "critical", "message": "Element's default semantics were not overridden with role=\"none\" or role=\"presentation\"", "relatedNodes": []}], "failureSummary": "Fix any of the following:
  Element does not have inner text that is visible to screen readers
  aria-label attribute does not exist or is empty
  aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty
  Element has no title attribute
  Element does not have an implicit (wrapped) <label>
  Element does not have an explicit <label>
  Element's default semantics were not overridden with role=\"none\" or role=\"presentation\"", "html": "<button type=\"button\" class=\"absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-foreground transition-colors\">", "impact": "critical", "none": [], "target": [".right-3"]}], "tags": ["cat.name-role-value", "wcag2a", "wcag412", "section508", "section508.22.a", "TTv5", "TT6.a", "EN-301-549", "EN-9.4.1.2", "ACT", …]}, {"description": "Ensure <meta name=\"viewport\"> does not disable text scaling and zooming", "help": "Zooming and scaling must not be disabled", "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/meta-viewport?application=playwright", "id": "meta-viewport", "impact": "moderate", "nodes": [{"all": [], "any": [{"data": "user-scalable=no", "id": "meta-viewport", "impact": "moderate", "message": "user-scalable=no on <meta> tag disables zooming on mobile devices", "relatedNodes": []}], "failureSummary": "Fix any of the following:
  user-scalable=no on <meta> tag disables zooming on mobile devices", "html": "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no\">", "impact": "moderate", "none": [], "target": ["meta[name=\"viewport\"]"]}], "tags": ["cat.sensory-and-visual-cues", "wcag2aa", "wcag144", "EN-301-549", "EN-9.1.4.4", "ACT", "RGAAv4", "RGAA-10.4.2"]}]
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e3]:
    - generic [ref=e4]:
      - heading "DeutschQuest" [level=1] [ref=e5]
      - paragraph [ref=e6]: Deutsch spielerisch lernen
    - generic [ref=e8]:
      - link "W WortHeld" [ref=e10] [cursor=pointer]:
        - /url: /
        - generic [ref=e12]: W
        - generic [ref=e13]: WortHeld
      - generic [ref=e14]:
        - generic [ref=e15]:
          - heading "Willkommen zuruck" [level=3] [ref=e16]
          - paragraph [ref=e17]: Melde dich an, um weiterzulernen
        - generic [ref=e18]:
          - button "Mit Google anmelden" [ref=e19] [cursor=pointer]:
            - img
            - text: Mit Google anmelden
          - generic [ref=e24]: oder
          - generic [ref=e25]:
            - generic [ref=e26]:
              - text: E-Mail
              - generic [ref=e27]:
                - img [ref=e28]
                - textbox "E-Mail" [ref=e31]:
                  - /placeholder: name@beispiel.de
            - generic [ref=e32]:
              - text: Passwort
              - generic [ref=e33]:
                - img [ref=e34]
                - textbox "Passwort" [ref=e37]:
                  - /placeholder: Dein Passwort
                - button [ref=e38] [cursor=pointer]:
                  - img [ref=e39]
            - button "Anmelden" [ref=e42] [cursor=pointer]
        - paragraph [ref=e44]:
          - text: Noch kein Konto?
          - link "Registrieren" [ref=e45] [cursor=pointer]:
            - /url: /register
  - alert [ref=e46]
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
> 21 |       expect(results.violations).toHaveLength(0);
     |                                  ^ Error: expect(received).toHaveLength(expected)
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
  46 |         expect(results.violations).toHaveLength(0);
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