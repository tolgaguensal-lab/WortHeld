# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: specs/accessibility.spec.ts >> Accessibility + WCAG AA >> [A11Y] Pricing page passes WCAG AA checks
- Location: e2e/specs/accessibility.spec.ts:16:9

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
  - generic [ref=e3]:
    - generic [ref=e4]:
      - generic [ref=e5]:
        - img [ref=e6]
        - text: GER/CEFR Niveaus
      - heading "Wahle dein Sprachniveau" [level=1] [ref=e8]
      - paragraph [ref=e9]: Jedes Niveau orientiert sich am Gemeinsamen Europaischen Referenzrahmen (GER/CEFR). Einmal kaufen, dauerhaft lernen.
    - generic [ref=e12]:
      - generic [ref=e13]:
        - img [ref=e15]
        - generic [ref=e18]:
          - generic [ref=e19]:
            - generic [ref=e20]: Empfohlen
            - generic [ref=e21]: Besonders gunstig
          - heading "Komplettpaket A1 – C1" [level=2] [ref=e22]
          - paragraph [ref=e23]: Alle 5 Niveaus in einem Paket – sparst 25,00 €
      - generic [ref=e24]:
        - generic [ref=e25]: 79,99 €
        - generic [ref=e26]: 104.99 €
        - button "Alle freischalten" [ref=e27] [cursor=pointer]:
          - text: Alle freischalten
          - img
    - generic [ref=e28]:
      - generic [ref=e29]:
        - generic [ref=e30]:
          - generic [ref=e31]: A1
          - generic [ref=e32]: Anfanger
          - generic [ref=e33]: Grundlagen fur absolute Anfanger
        - generic [ref=e35]: Kostenlos
        - list [ref=e36]:
          - listitem [ref=e37]:
            - img [ref=e38]
            - text: Sich vorstellen
          - listitem [ref=e41]:
            - img [ref=e42]
            - text: Zahlen & Uhrzeit
          - listitem [ref=e45]:
            - img [ref=e46]
            - text: Familie & Herkunft
          - listitem [ref=e49]:
            - img [ref=e50]
            - text: Einfache Satze
          - listitem [ref=e53]:
            - img [ref=e54]
            - text: Alltagssituationen
          - listitem [ref=e57]:
            - img [ref=e58]
            - text: 500+ Vokabeln
          - listitem [ref=e61]:
            - img [ref=e62]
            - text: 15 Grammatikthemen
        - button "Kostenlos starten" [ref=e65] [cursor=pointer]
      - generic [ref=e66]:
        - generic [ref=e67]:
          - generic [ref=e68]: A2
          - generic [ref=e69]: Grundkenntnisse
          - generic [ref=e70]: Alltagssituationen sicher bewaltigen
        - generic [ref=e71]:
          - generic [ref=e72]: 14,99 €
          - generic [ref=e73]: einmalig
        - list [ref=e74]:
          - listitem [ref=e75]:
            - img [ref=e76]
            - text: Einkaufen & Restaurant
          - listitem [ref=e79]:
            - img [ref=e80]
            - text: Arzt & Gesundheit
          - listitem [ref=e83]:
            - img [ref=e84]
            - text: Wohnen & Vermieter
          - listitem [ref=e87]:
            - img [ref=e88]
            - text: Amt & Behorden
          - listitem [ref=e91]:
            - img [ref=e92]
            - text: Kurze Texte verstehen
          - listitem [ref=e95]:
            - img [ref=e96]
            - text: 1000+ Vokabeln
          - listitem [ref=e99]:
            - img [ref=e100]
            - text: 30 Grammatikthemen
        - button "Freischalten" [ref=e103] [cursor=pointer]:
          - text: Freischalten
          - img
      - generic [ref=e104]:
        - generic [ref=e106]: Beliebt
        - generic [ref=e107]:
          - generic [ref=e108]: B1
          - generic [ref=e109]: Fortgeschritten
          - generic [ref=e110]: Selbstandig im Alltag und Beruf
        - generic [ref=e111]:
          - generic [ref=e112]: 24,99 €
          - generic [ref=e113]: einmalig
        - list [ref=e114]:
          - listitem [ref=e115]:
            - img [ref=e116]
            - text: Arbeit & Bewerbung
          - listitem [ref=e119]:
            - img [ref=e120]
            - text: Meinung außern
          - listitem [ref=e123]:
            - img [ref=e124]
            - text: Briefe & E-Mails
          - listitem [ref=e127]:
            - img [ref=e128]
            - text: Prufungsvorbereitung
          - listitem [ref=e131]:
            - img [ref=e132]
            - text: Diskussionen fuhren
          - listitem [ref=e135]:
            - img [ref=e136]
            - text: 2000+ Vokabeln
          - listitem [ref=e139]:
            - img [ref=e140]
            - text: 45 Grammatikthemen
        - button "Freischalten" [ref=e143] [cursor=pointer]:
          - text: Freischalten
          - img
      - generic [ref=e144]:
        - generic [ref=e145]:
          - generic [ref=e146]: B2
          - generic [ref=e147]: Selbstandig
          - generic [ref=e148]: Komplexe Kommunikation in Beruf & Gesellschaft
        - generic [ref=e149]:
          - generic [ref=e150]: 29,99 €
          - generic [ref=e151]: einmalig
        - list [ref=e152]:
          - listitem [ref=e153]:
            - img [ref=e154]
            - text: Berufssprache
          - listitem [ref=e157]:
            - img [ref=e158]
            - text: Prasentationen
          - listitem [ref=e161]:
            - img [ref=e162]
            - text: Komplexe Texte
          - listitem [ref=e165]:
            - img [ref=e166]
            - text: Diskussionen & Argumentation
          - listitem [ref=e169]:
            - img [ref=e170]
            - text: Fachtexte verstehen
          - listitem [ref=e173]:
            - img [ref=e174]
            - text: 4000+ Vokabeln
          - listitem [ref=e177]:
            - img [ref=e178]
            - text: 60 Grammatikthemen
        - button "Freischalten" [ref=e181] [cursor=pointer]:
          - text: Freischalten
          - img
      - generic [ref=e182]:
        - generic [ref=e183]:
          - generic [ref=e184]: C1
          - generic [ref=e185]: Kompetent
          - generic [ref=e186]: Akademisches und berufliches Expertenniveau
        - generic [ref=e187]:
          - generic [ref=e188]: 34,99 €
          - generic [ref=e189]: einmalig
        - list [ref=e190]:
          - listitem [ref=e191]:
            - img [ref=e192]
            - text: Akademische Sprache
          - listitem [ref=e195]:
            - img [ref=e196]
            - text: Formelle Kommunikation
          - listitem [ref=e199]:
            - img [ref=e200]
            - text: Prasentationen
          - listitem [ref=e203]:
            - img [ref=e204]
            - text: Komplexe Grammatik
          - listitem [ref=e207]:
            - img [ref=e208]
            - text: Fachsprache
          - listitem [ref=e211]:
            - img [ref=e212]
            - text: 8000+ Vokabeln
          - listitem [ref=e215]:
            - img [ref=e216]
            - text: 70+ Grammatikthemen
        - button "Freischalten" [ref=e219] [cursor=pointer]:
          - text: Freischalten
          - img
    - generic [ref=e220]:
      - heading "Haufige Fragen" [level=2] [ref=e221]
      - generic [ref=e222]:
        - group [ref=e223]:
          - generic "Muss ich jedes Niveau einzeln kaufen?" [ref=e224] [cursor=pointer]
        - group [ref=e225]:
          - generic "Wie lange habe ich Zugriff?" [ref=e226] [cursor=pointer]
        - group [ref=e227]:
          - generic "Kann ich spater upgraden?" [ref=e228] [cursor=pointer]
        - group [ref=e229]:
          - generic "Ist A1 wirklich kostenlos?" [ref=e230] [cursor=pointer]
  - alert [ref=e231]
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