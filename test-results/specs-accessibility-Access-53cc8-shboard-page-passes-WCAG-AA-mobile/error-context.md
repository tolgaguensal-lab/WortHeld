# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: specs/accessibility.spec.ts >> Accessibility + WCAG AA >> Authenticated pages >> [A11Y] Dashboard page passes WCAG AA
- Location: e2e/specs/accessibility.spec.ts:41:11

# Error details

```
Error: expect(received).toHaveLength(expected)

Expected length: 0
Received length: 2
Received array:  [{"description": "Ensure every ARIA progressbar node has an accessible name", "help": "ARIA progressbar nodes must have an accessible name", "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/aria-progressbar-name?application=playwright", "id": "aria-progressbar-name", "impact": "serious", "nodes": [{"all": [], "any": [{"data": null, "id": "aria-label", "impact": "serious", "message": "aria-label attribute does not exist or is empty", "relatedNodes": []}, {"data": null, "id": "aria-labelledby", "impact": "serious", "message": "aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty", "relatedNodes": []}, {"data": {"messageKey": "noAttr"}, "id": "non-empty-title", "impact": "serious", "message": "Element has no title attribute", "relatedNodes": []}], "failureSummary": "Fix any of the following:
  aria-label attribute does not exist or is empty
  aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty
  Element has no title attribute", "html": "<div aria-valuemax=\"100\" aria-valuemin=\"0\" role=\"progressbar\" data-state=\"indeterminate\" data-max=\"100\" class=\"relative w-full overflow-hidden rounded-full h-full bg-white/80\">", "impact": "serious", "none": [], "target": [".bg-white\\/80"]}], "tags": ["cat.aria", "wcag2a", "wcag111", "EN-301-549", "EN-9.1.1.1", "RGAAv4", "RGAA-11.1.1"]}, {"description": "Ensure <meta name=\"viewport\"> does not disable text scaling and zooming", "help": "Zooming and scaling must not be disabled", "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/meta-viewport?application=playwright", "id": "meta-viewport", "impact": "moderate", "nodes": [{"all": [], "any": [{"data": "user-scalable=no", "id": "meta-viewport", "impact": "moderate", "message": "user-scalable=no on <meta> tag disables zooming on mobile devices", "relatedNodes": []}], "failureSummary": "Fix any of the following:
  user-scalable=no on <meta> tag disables zooming on mobile devices", "html": "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no\">", "impact": "moderate", "none": [], "target": ["meta[name=\"viewport\"]"]}], "tags": ["cat.sensory-and-visual-cues", "wcag2aa", "wcag144", "EN-301-549", "EN-9.1.4.4", "ACT", "RGAAv4", "RGAA-10.4.2"]}]
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - main [ref=e3]:
      - generic [ref=e4]:
        - generic [ref=e5]:
          - generic [ref=e6]:
            - heading "Willkommen zurück!" [level=1] [ref=e7]
            - paragraph [ref=e8]: Weiter so mit deinem Lernpfad.
          - generic [ref=e10]: Level A1
        - generic [ref=e11]:
          - generic [ref=e14]:
            - generic [ref=e15]:
              - paragraph [ref=e16]: A1
              - paragraph [ref=e17]: Level
            - img [ref=e19]
          - generic [ref=e25]:
            - generic [ref=e26]:
              - paragraph [ref=e27]: "0"
              - paragraph [ref=e28]: XP heute
            - img [ref=e30]
          - generic [ref=e34]:
            - generic [ref=e35]:
              - paragraph [ref=e36]: "0"
              - paragraph [ref=e37]: Serie
            - img [ref=e39]
          - generic [ref=e43]:
            - generic [ref=e44]:
              - paragraph [ref=e45]: "5"
              - paragraph [ref=e46]: Herzen
            - img [ref=e48]
        - generic [ref=e53]:
          - generic [ref=e54]:
            - generic [ref=e55]:
              - heading "Tagesziel" [level=2] [ref=e56]:
                - img [ref=e57]
                - text: Tagesziel
              - paragraph [ref=e61]: Erreiche 50 XP, um deine Serie zu behalten
            - generic [ref=e62]: 0%
          - generic [ref=e63]:
            - progressbar [ref=e65]
            - paragraph [ref=e67]: 0 / 50 XP heute
        - generic [ref=e68]:
          - generic [ref=e69]:
            - heading "Nächste Lektion" [level=3] [ref=e71]:
              - img [ref=e72]
              - text: Nächste Lektion
            - generic [ref=e74]:
              - generic [ref=e75]:
                - paragraph [ref=e76]: Hallo! Begrüßungen
                - paragraph [ref=e77]: Lerne die Grundlagen der Begrüßung
              - generic [ref=e78]:
                - generic [ref=e79]: Einheit 1
                - generic [ref=e80]: ~5 Min
                - generic [ref=e81]: +15 XP
              - link "Weiterlernen" [ref=e82] [cursor=pointer]:
                - /url: /learn
                - button "Weiterlernen" [ref=e83]:
                  - text: Weiterlernen
                  - img
          - generic [ref=e84]:
            - heading "Wiederholungen" [level=3] [ref=e86]:
              - img [ref=e87]
              - text: Wiederholungen
            - generic [ref=e92]:
              - generic [ref=e93]:
                - paragraph [ref=e94]: Keine Wiederholungen fällig
                - paragraph [ref=e95]: Du bist auf dem neuesten Stand!
              - generic [ref=e97]: "Nächste: Heute 18:00 Uhr"
              - link "Jetzt wiederholen" [ref=e98] [cursor=pointer]:
                - /url: /review
                - button "Jetzt wiederholen" [ref=e99]:
                  - text: Jetzt wiederholen
                  - img
        - generic [ref=e100]:
          - heading "Letzte Aktivitäten" [level=3] [ref=e102]
          - generic [ref=e104]:
            - img [ref=e106]
            - paragraph [ref=e112]: Bereit zu starten?
            - paragraph [ref=e113]: Starte deine erste Lektion und beginne deine Deutsch-Lern-Reise!
            - link "Erste Lektion starten" [ref=e114] [cursor=pointer]:
              - /url: /learn
              - button "Erste Lektion starten" [ref=e115]:
                - text: Erste Lektion starten
                - img
    - navigation [ref=e116]:
      - link "Dashboard" [ref=e117] [cursor=pointer]:
        - /url: /dashboard
        - img [ref=e118]
        - generic [ref=e123]: Dashboard
      - link "Lernen" [ref=e124] [cursor=pointer]:
        - /url: /learn
        - img [ref=e125]
        - generic [ref=e127]: Lernen
      - link "Vokabeln" [ref=e128] [cursor=pointer]:
        - /url: /vocabulary
        - img [ref=e129]
        - generic [ref=e132]: Vokabeln
      - link "Grammatik" [ref=e133] [cursor=pointer]:
        - /url: /grammar
        - img [ref=e134]
        - generic [ref=e136]: Grammatik
      - link "DTZ-Test" [ref=e137] [cursor=pointer]:
        - /url: /dtz
        - img [ref=e138]
        - generic [ref=e141]: DTZ-Test
  - alert [ref=e142]
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