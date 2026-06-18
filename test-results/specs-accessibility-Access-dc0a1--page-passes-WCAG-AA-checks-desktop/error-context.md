# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: specs/accessibility.spec.ts >> Accessibility + WCAG AA >> [A11Y] Landing page passes WCAG AA checks
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
  - generic [ref=e2]:
    - generic [ref=e3]:
      - generic [ref=e4]:
        - generic [ref=e6]: W
        - generic [ref=e7]: WortHeld
        - generic [ref=e8]: Deutsch lernen
      - generic [ref=e9]:
        - link "Anmelden" [ref=e10] [cursor=pointer]:
          - /url: /login
          - button "Anmelden" [ref=e11]
        - link "Kostenlos starten" [ref=e12] [cursor=pointer]:
          - /url: /register
          - button "Kostenlos starten" [ref=e13]
    - generic [ref=e15]:
      - generic [ref=e17]:
        - img [ref=e18]
        - text: BAMF-konforme Integrationskurse – A1 bis C1
      - heading "Deutsch fur Alltag, Beruf & Integration" [level=1] [ref=e21]:
        - text: Deutsch fur
        - text: Alltag, Beruf & Integration
      - paragraph [ref=e23]: Systematischer Lernpfad nach dem Gemeinsamen Europaischen Referenzrahmen. Entwickelt fur Integrationskurse, Berufsvorbereitung und die DTZ-Prufung.
      - generic [ref=e25]:
        - link "Kostenlos starten" [ref=e26] [cursor=pointer]:
          - /url: /register
          - button "Kostenlos starten" [ref=e27]:
            - text: Kostenlos starten
            - img
        - link "Einstufungstest machen" [ref=e28] [cursor=pointer]:
          - /url: /placement-test
          - button "Einstufungstest machen" [ref=e29]
      - generic [ref=e30]:
        - generic [ref=e31]:
          - generic [ref=e32]: 500+
          - generic [ref=e33]: Vokabeln pro Niveau
        - generic [ref=e34]:
          - generic [ref=e35]: 65+
          - generic [ref=e36]: Grammatikthemen
        - generic [ref=e37]:
          - generic [ref=e38]: "5"
          - generic [ref=e39]: Sprachniveaus (A1-C1)
        - generic [ref=e40]:
          - generic [ref=e41]: 10+
          - generic [ref=e42]: Erklarungssprachen
    - generic [ref=e43]:
      - generic [ref=e44]:
        - heading "Warum WortHeld?" [level=2] [ref=e45]
        - paragraph [ref=e46]: Ein durchdachtes Lernsystem, das dich von null auf sicher begleitet.
      - generic [ref=e47]:
        - generic [ref=e48]:
          - heading "CEFR-Strukturiert" [level=3] [ref=e51]
          - paragraph [ref=e52]: A1 bis C1 – ausgerichtet am Gemeinsamen Europaischen Referenzrahmen fur transparente Lernziele.
        - generic [ref=e53]:
          - heading "Alltagsorientiert" [level=3] [ref=e56]
          - paragraph [ref=e57]: "Lebensnahe Themen: Arbeit, Wohnungssuche, Arztbesuche, Behordengange – was wirklich relevant ist."
        - generic [ref=e58]:
          - heading "Horen & Verstehen" [level=3] [ref=e61]
          - paragraph [ref=e62]: Authentisches Horverstehen mit Dialogen, Ansagen und Nachrichten auf jedem Niveau.
        - generic [ref=e63]:
          - heading "Sprechen trainieren" [level=3] [ref=e66]
          - paragraph [ref=e67]: Interaktive Sprechubungen mit Spracherkennung fur Aussprache und fließende Kommunikation.
        - generic [ref=e68]:
          - heading "Fortschritt sichtbar" [level=3] [ref=e71]
          - paragraph [ref=e72]: Detaillierte Statistiken, Lernserien und personalisierte Wiederholungen fur nachhaltigen Erfolg.
        - generic [ref=e73]:
          - heading "Mehrsprachig" [level=3] [ref=e76]
          - paragraph [ref=e77]: Erklarungen auf Turkisch, Russisch, Arabisch, Englisch und weiteren Sprachen – barrierefrei.
    - generic [ref=e78]:
      - generic [ref=e79]:
        - heading "Deine Niveaustufen" [level=2] [ref=e80]
        - paragraph [ref=e81]: Vom Anfanger bis zur beruflichen Sprachkompetenz.
      - generic [ref=e82]:
        - generic [ref=e83]:
          - generic [ref=e84]: A1
          - generic [ref=e85]: Anfanger
          - generic [ref=e86]: Erste Satze, sich vorstellen
        - generic [ref=e87]:
          - generic [ref=e88]: A2
          - generic [ref=e89]: Grundkenntnisse
          - generic [ref=e90]: Alltagssituationen bewaltigen
        - generic [ref=e91]:
          - generic [ref=e92]: B1
          - generic [ref=e93]: Selbstandig
          - generic [ref=e94]: DTZ-Prufung, Arbeitsplatz
        - generic [ref=e95]:
          - generic [ref=e96]: B2
          - generic [ref=e97]: Fortgeschritten
          - generic [ref=e98]: Komplexe Gesprache fuhren
        - generic [ref=e99]:
          - generic [ref=e100]: C1
          - generic [ref=e101]: Kompetent
          - generic [ref=e102]: Akademisches Niveau
    - generic [ref=e103]:
      - heading "Haufige Fragen" [level=2] [ref=e105]
      - generic [ref=e106]:
        - generic [ref=e107]:
          - heading "Ist der Einstufungstest kostenlos?" [level=3] [ref=e108]
          - paragraph [ref=e109]: Ja, der Einstufungstest ist komplett kostenlos und dauert nur etwa 10 Minuten.
        - generic [ref=e110]:
          - heading "Welches Niveau kann ich erreichen?" [level=3] [ref=e111]
          - paragraph [ref=e112]: Unser Kurs deckt die Niveaus A1 bis C1 nach dem GER/CEFR ab.
        - generic [ref=e113]:
          - heading "Gibt es eine mobile App?" [level=3] [ref=e114]
          - paragraph [ref=e115]: Die Web-App ist vollstandig responsive und funktioniert auf allen Geraten.
        - generic [ref=e116]:
          - heading "Wie viel kostet ein Sprachniveau?" [level=3] [ref=e117]
          - paragraph [ref=e118]: Basislektionen sind kostenlos. Fur die vollstandigen Niveaus gibt es flexible Kauf- und Abo-Optionen.
    - generic [ref=e120]:
      - heading "Bereit, Deutsch zu lernen?" [level=2] [ref=e121]
      - paragraph [ref=e122]: Starte kostenlos mit dem Einstufungstest und erhalte einen personalisierten Lernplan.
      - generic [ref=e123]:
        - link "Kostenlos starten" [ref=e124] [cursor=pointer]:
          - /url: /register
          - button "Kostenlos starten" [ref=e125]:
            - text: Kostenlos starten
            - img
        - link "Einstufungstest machen" [ref=e126] [cursor=pointer]:
          - /url: /placement-test
          - button "Einstufungstest machen" [ref=e127]
    - generic [ref=e129]:
      - generic [ref=e130]:
        - generic [ref=e132]: W
        - generic [ref=e133]: WortHeld © 2026
      - generic [ref=e134]:
        - link "Datenschutz" [ref=e135] [cursor=pointer]:
          - /url: /datenschutz
        - link "Impressum" [ref=e136] [cursor=pointer]:
          - /url: /impressum
        - link "AGB" [ref=e137] [cursor=pointer]:
          - /url: /agb
  - alert [ref=e138]
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