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
Received length: 1
Received array:  [{"description": "Ensure <meta name=\"viewport\"> does not disable text scaling and zooming", "help": "Zooming and scaling must not be disabled", "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/meta-viewport?application=playwright", "id": "meta-viewport", "impact": "moderate", "nodes": [{"all": [], "any": [{"data": "user-scalable=no", "id": "meta-viewport", "impact": "moderate", "message": "user-scalable=no on <meta> tag disables zooming on mobile devices", "relatedNodes": []}], "failureSummary": "Fix any of the following:
  user-scalable=no on <meta> tag disables zooming on mobile devices", "html": "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no\">", "impact": "moderate", "none": [], "target": ["meta[name=\"viewport\"]"]}], "tags": ["cat.sensory-and-visual-cues", "wcag2aa", "wcag144", "EN-301-549", "EN-9.1.4.4", "ACT", "RGAAv4", "RGAA-10.4.2"]}]
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - main [ref=e3]:
      - generic [ref=e4]:
        - generic [ref=e5]:
          - heading "Lernpfad" [level=1] [ref=e6]
          - paragraph [ref=e7]: Wahle einen Kurs und starte deine Deutschreise – von A1 bis C1.
        - generic [ref=e8]:
          - img [ref=e10]
          - generic [ref=e12]:
            - paragraph [ref=e13]: Noch kein Einstufungstest gemacht
            - paragraph [ref=e14]: Finde in 5 Minuten dein perfektes Startniveau.
          - link "Test starten" [ref=e15] [cursor=pointer]:
            - /url: /placement-test
            - button "Test starten" [ref=e16]:
              - text: Test starten
              - img
        - generic [ref=e17]:
          - generic [ref=e18]:
            - generic [ref=e21]:
              - generic [ref=e22]:
                - img [ref=e24]
                - generic [ref=e27]:
                  - generic [ref=e29]: A1
                  - heading "Deutsch im Alltag" [level=2] [ref=e30]
                  - paragraph [ref=e31]: Grundlagen des Deutschen für Anfänger – Begrüßungen, Zahlen, Familie, Einkaufen und mehr.
              - link "Starten" [ref=e32] [cursor=pointer]:
                - /url: /learn/course-a1
                - button "Starten" [ref=e33]:
                  - text: Starten
                  - img
            - generic [ref=e35]:
              - generic [ref=e36]:
                - img [ref=e37]
                - generic [ref=e39]: 13 Einheiten
              - generic [ref=e41]:
                - img [ref=e42]
                - generic [ref=e44]: 57 Lektionen
              - generic [ref=e46]:
                - img [ref=e47]
                - generic [ref=e50]: ~5 Std.
          - generic [ref=e51]:
            - generic [ref=e54]:
              - generic [ref=e55]:
                - img [ref=e57]
                - generic [ref=e60]:
                  - generic [ref=e61]:
                    - generic [ref=e62]: A2
                    - generic [ref=e63]: In-App-Kauf
                  - heading "Deutsch im Beruf" [level=2] [ref=e64]
                  - paragraph [ref=e65]: Berufliche Kommunikation – Bewerbung, Büro, Alltag im Job und Kollegen.
              - button "Freischalten" [ref=e66] [cursor=pointer]:
                - img
                - text: Freischalten
            - generic [ref=e68]:
              - generic [ref=e69]:
                - img [ref=e70]
                - generic [ref=e72]: 10 Einheiten
              - generic [ref=e74]:
                - img [ref=e75]
                - generic [ref=e77]: 50 Lektionen
              - generic [ref=e79]:
                - img [ref=e80]
                - generic [ref=e83]: ~5 Std.
          - generic [ref=e84]:
            - generic [ref=e87]:
              - generic [ref=e88]:
                - img [ref=e90]
                - generic [ref=e93]:
                  - generic [ref=e94]:
                    - generic [ref=e95]: B1
                    - generic [ref=e96]: In-App-Kauf
                  - heading "Deutsch in der Gesellschaft" [level=2] [ref=e97]
                  - paragraph [ref=e98]: Gesellschaftliche Teilhabe – Politik, Kultur, Gesundheit und Medien.
              - button "Freischalten" [ref=e99] [cursor=pointer]:
                - img
                - text: Freischalten
            - generic [ref=e101]:
              - generic [ref=e102]:
                - img [ref=e103]
                - generic [ref=e105]: 10 Einheiten
              - generic [ref=e107]:
                - img [ref=e108]
                - generic [ref=e110]: 50 Lektionen
              - generic [ref=e112]:
                - img [ref=e113]
                - generic [ref=e116]: ~5 Std.
          - generic [ref=e117]:
            - generic [ref=e120]:
              - generic [ref=e121]:
                - img [ref=e123]
                - generic [ref=e126]:
                  - generic [ref=e127]:
                    - generic [ref=e128]: B2
                    - generic [ref=e129]: In-App-Kauf
                  - heading "Deutsch für Academic" [level=2] [ref=e130]
                  - paragraph [ref=e131]: Akademisches Deutsch – Wissenschaft, Forschung, Philosophie und Recht.
              - button "Freischalten" [ref=e132] [cursor=pointer]:
                - img
                - text: Freischalten
            - generic [ref=e134]:
              - generic [ref=e135]:
                - img [ref=e136]
                - generic [ref=e138]: 10 Einheiten
              - generic [ref=e140]:
                - img [ref=e141]
                - generic [ref=e143]: 50 Lektionen
              - generic [ref=e145]:
                - img [ref=e146]
                - generic [ref=e149]: ~5 Std.
          - generic [ref=e150]:
            - generic [ref=e153]:
              - generic [ref=e154]:
                - img [ref=e156]
                - generic [ref=e159]:
                  - generic [ref=e160]:
                    - generic [ref=e161]: C1
                    - generic [ref=e162]: In-App-Kauf
                  - heading "Deutsch für Experten" [level=2] [ref=e163]
                  - paragraph [ref=e164]: Fortgeschrittenes Deutsch – Diplomatie, Kultur, Ethik und komplexe Grammatik.
              - button "Freischalten" [ref=e165] [cursor=pointer]:
                - img
                - text: Freischalten
            - generic [ref=e167]:
              - generic [ref=e168]:
                - img [ref=e169]
                - generic [ref=e171]: 10 Einheiten
              - generic [ref=e173]:
                - img [ref=e174]
                - generic [ref=e176]: 50 Lektionen
              - generic [ref=e178]:
                - img [ref=e179]
                - generic [ref=e182]: ~5 Std.
    - navigation [ref=e183]:
      - link "Dashboard" [ref=e184] [cursor=pointer]:
        - /url: /dashboard
        - img [ref=e185]
        - generic [ref=e190]: Dashboard
      - link "Lernen" [ref=e191] [cursor=pointer]:
        - /url: /learn
        - img [ref=e192]
        - generic [ref=e194]: Lernen
      - link "Vokabeln" [ref=e195] [cursor=pointer]:
        - /url: /vocabulary
        - img [ref=e196]
        - generic [ref=e199]: Vokabeln
      - link "Grammatik" [ref=e200] [cursor=pointer]:
        - /url: /grammar
        - img [ref=e201]
        - generic [ref=e203]: Grammatik
      - link "DTZ-Test" [ref=e204] [cursor=pointer]:
        - /url: /dtz
        - img [ref=e205]
        - generic [ref=e208]: DTZ-Test
  - alert [ref=e209]
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