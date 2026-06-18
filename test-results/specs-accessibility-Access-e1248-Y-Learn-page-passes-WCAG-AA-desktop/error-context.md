# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: specs/accessibility.spec.ts >> Accessibility + WCAG AA >> Authenticated pages >> [A11Y] Learn page passes WCAG AA
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
      - generic [ref=e77]:
        - generic [ref=e78]:
          - heading "Lernpfad" [level=1] [ref=e79]
          - paragraph [ref=e80]: Wahle einen Kurs und starte deine Deutschreise – von A1 bis C1.
        - generic [ref=e81]:
          - img [ref=e83]
          - generic [ref=e85]:
            - paragraph [ref=e86]: Noch kein Einstufungstest gemacht
            - paragraph [ref=e87]: Finde in 5 Minuten dein perfektes Startniveau.
          - link "Test starten" [ref=e88] [cursor=pointer]:
            - /url: /placement-test
            - button "Test starten" [ref=e89]:
              - text: Test starten
              - img
        - generic [ref=e90]:
          - generic [ref=e91]:
            - generic [ref=e94]:
              - generic [ref=e95]:
                - img [ref=e97]
                - generic [ref=e100]:
                  - generic [ref=e102]: A1
                  - heading "Deutsch im Alltag" [level=2] [ref=e103]
                  - paragraph [ref=e104]: Grundlagen des Deutschen für Anfänger – Begrüßungen, Zahlen, Familie, Einkaufen und mehr.
              - link "Starten" [ref=e105] [cursor=pointer]:
                - /url: /learn/course-a1
                - button "Starten" [ref=e106]:
                  - text: Starten
                  - img
            - generic [ref=e108]:
              - generic [ref=e109]:
                - img [ref=e110]
                - generic [ref=e112]: 13 Einheiten
              - generic [ref=e114]:
                - img [ref=e115]
                - generic [ref=e117]: 57 Lektionen
              - generic [ref=e119]:
                - img [ref=e120]
                - generic [ref=e123]: ~5 Std.
          - generic [ref=e124]:
            - generic [ref=e127]:
              - generic [ref=e128]:
                - img [ref=e130]
                - generic [ref=e133]:
                  - generic [ref=e134]:
                    - generic [ref=e135]: A2
                    - generic [ref=e136]: In-App-Kauf
                  - heading "Deutsch im Beruf" [level=2] [ref=e137]
                  - paragraph [ref=e138]: Berufliche Kommunikation – Bewerbung, Büro, Alltag im Job und Kollegen.
              - button "Freischalten" [ref=e139] [cursor=pointer]:
                - img
                - text: Freischalten
            - generic [ref=e141]:
              - generic [ref=e142]:
                - img [ref=e143]
                - generic [ref=e145]: 10 Einheiten
              - generic [ref=e147]:
                - img [ref=e148]
                - generic [ref=e150]: 50 Lektionen
              - generic [ref=e152]:
                - img [ref=e153]
                - generic [ref=e156]: ~5 Std.
          - generic [ref=e157]:
            - generic [ref=e160]:
              - generic [ref=e161]:
                - img [ref=e163]
                - generic [ref=e166]:
                  - generic [ref=e167]:
                    - generic [ref=e168]: B1
                    - generic [ref=e169]: In-App-Kauf
                  - heading "Deutsch in der Gesellschaft" [level=2] [ref=e170]
                  - paragraph [ref=e171]: Gesellschaftliche Teilhabe – Politik, Kultur, Gesundheit und Medien.
              - button "Freischalten" [ref=e172] [cursor=pointer]:
                - img
                - text: Freischalten
            - generic [ref=e174]:
              - generic [ref=e175]:
                - img [ref=e176]
                - generic [ref=e178]: 10 Einheiten
              - generic [ref=e180]:
                - img [ref=e181]
                - generic [ref=e183]: 50 Lektionen
              - generic [ref=e185]:
                - img [ref=e186]
                - generic [ref=e189]: ~5 Std.
          - generic [ref=e190]:
            - generic [ref=e193]:
              - generic [ref=e194]:
                - img [ref=e196]
                - generic [ref=e199]:
                  - generic [ref=e200]:
                    - generic [ref=e201]: B2
                    - generic [ref=e202]: In-App-Kauf
                  - heading "Deutsch für Academic" [level=2] [ref=e203]
                  - paragraph [ref=e204]: Akademisches Deutsch – Wissenschaft, Forschung, Philosophie und Recht.
              - button "Freischalten" [ref=e205] [cursor=pointer]:
                - img
                - text: Freischalten
            - generic [ref=e207]:
              - generic [ref=e208]:
                - img [ref=e209]
                - generic [ref=e211]: 10 Einheiten
              - generic [ref=e213]:
                - img [ref=e214]
                - generic [ref=e216]: 50 Lektionen
              - generic [ref=e218]:
                - img [ref=e219]
                - generic [ref=e222]: ~5 Std.
          - generic [ref=e223]:
            - generic [ref=e226]:
              - generic [ref=e227]:
                - img [ref=e229]
                - generic [ref=e232]:
                  - generic [ref=e233]:
                    - generic [ref=e234]: C1
                    - generic [ref=e235]: In-App-Kauf
                  - heading "Deutsch für Experten" [level=2] [ref=e236]
                  - paragraph [ref=e237]: Fortgeschrittenes Deutsch – Diplomatie, Kultur, Ethik und komplexe Grammatik.
              - button "Freischalten" [ref=e238] [cursor=pointer]:
                - img
                - text: Freischalten
            - generic [ref=e240]:
              - generic [ref=e241]:
                - img [ref=e242]
                - generic [ref=e244]: 10 Einheiten
              - generic [ref=e246]:
                - img [ref=e247]
                - generic [ref=e249]: 50 Lektionen
              - generic [ref=e251]:
                - img [ref=e252]
                - generic [ref=e255]: ~5 Std.
  - alert [ref=e256]
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