# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: specs/interaction-contracts.spec.ts >> Interaction Contracts >> IC-AUTH >> IC-REGISTER-001: Registrierung möglich
- Location: e2e/specs/interaction-contracts.spec.ts:59:9

# Error details

```
Error: expect(locator).toBeDisabled() failed

Locator:  locator('button[type=submit]')
Expected: disabled
Received: enabled
Timeout:  5000ms

Call log:
  - Expect "toBeDisabled" with timeout 5000ms
  - waiting for locator('button[type=submit]')
    14 × locator resolved to <button tabindex="0" type="submit" data-slot="button" class="group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-inva…>…</button>
       - unexpected value "enabled"

```

```yaml
- button "Kostenlos starten":
  - text: Kostenlos starten
  - img
```

# Test source

```ts
  1   | import { test, expect } from "@playwright/test";
  2   | const BASE = "http://192.168.178.91:3035";
  3   | 
  4   | /**
  5   |  * Interaction Contracts E2E Tests
  6   |  * Jeder Button muss einen definierten Trigger, Route, Modal oder State Change haben.
  7   |  */
  8   | 
  9   | test.describe("Interaction Contracts", () => {
  10  | 
  11  |   test.describe("IC-LANDING", () => {
  12  |     test("IC-LANDING-CTA-001: Einstufungstest starten → /placement-test", async ({ page }) => {
  13  |       await page.goto(BASE);
  14  |       const btn = page.locator("text=Einstufungstest machen").first();
  15  |       await expect(btn).toBeVisible();
  16  |       await expect(btn).toBeEnabled();
  17  |       await btn.click();
  18  |       await expect(page).toHaveURL(/placement-test/);
  19  |     });
  20  | 
  21  |     test("IC-LANDING-CTA-002: Kostenlos starten → /register", async ({ page }) => {
  22  |       await page.goto(BASE);
  23  |       const btn = page.locator("text=Kostenlos starten").first();
  24  |       await expect(btn).toBeVisible();
  25  |       await btn.click();
  26  |       await expect(page).toHaveURL(/register/);
  27  |     });
  28  | 
  29  |     test("IC-LANDING-NAV-001: Anmelden → /login", async ({ page }) => {
  30  |       await page.goto(BASE);
  31  |       await page.click("text=Anmelden");
  32  |       await expect(page).toHaveURL(/login/);
  33  |     });
  34  | 
  35  |     test("IC-LANDING-FOOTER-001: Impressum erreichbar", async ({ page }) => {
  36  |       await page.goto(BASE);
  37  |       const link = page.locator("text=Impressum").first();
  38  |       await expect(link).toBeVisible();
  39  |       await link.click();
  40  |       await expect(page).not.toHaveURL(/login/);
  41  |     });
  42  |   });
  43  | 
  44  |   test.describe("IC-AUTH", () => {
  45  |     test("IC-LOGIN-001: Login mit gültigen Daten → Dashboard", async ({ page }) => {
  46  |       await page.goto(`${BASE}/login`);
  47  |       const email = page.locator("#email");
  48  |       const password = page.locator("#password");
  49  |       const submit = page.locator("button[type=submit]");
  50  |       await expect(email).toBeVisible();
  51  |       await expect(password).toBeVisible();
  52  |       await expect(submit).toBeVisible();
  53  |       await email.fill("test@user.de");
  54  |       await password.fill("test123456");
  55  |       await submit.click();
  56  |       await page.waitForURL(/dashboard/, { timeout: 10000 });
  57  |     });
  58  | 
  59  |     test("IC-REGISTER-001: Registrierung möglich", async ({ page }) => {
  60  |       await page.goto(`${BASE}/register`);
  61  |       const name = page.locator("#name");
  62  |       const email = page.locator("#email");
  63  |       const password = page.locator("#password");
  64  |       const confirm = page.locator("#confirmPassword");
  65  |       const submit = page.locator("button[type=submit]");
  66  |       await expect(name).toBeVisible();
  67  |       await expect(submit).toBeVisible();
  68  |       // Verify disabled state with empty form
  69  |       await name.fill("");
  70  |       await email.fill("");
> 71  |       await expect(submit).toBeDisabled();
      |                            ^ Error: expect(locator).toBeDisabled() failed
  72  |     });
  73  | 
  74  |     test("IC-LOGIN-002: Login Link auf Register → /register", async ({ page }) => {
  75  |       await page.goto(`${BASE}/login`);
  76  |       const link = page.locator("text=Registrieren").first();
  77  |       await expect(link).toBeVisible();
  78  |       await link.click();
  79  |       await expect(page).toHaveURL(/register/);
  80  |     });
  81  |   });
  82  | 
  83  |   test.describe("IC-ONBOARDING", () => {
  84  |     test("IC-ONBOARD-001: Sprache wählen → Ziel wählen", async ({ page }) => {
  85  |       await page.goto(`${BASE}/onboarding`);
  86  |       const langBtn = page.locator("text=Türkçe").first();
  87  |       if (await langBtn.isVisible()) {
  88  |         await langBtn.click();
  89  |         await expect(page.locator("text=Was ist dein Ziel")).toBeVisible();
  90  |       }
  91  |     });
  92  | 
  93  |     test("IC-ONBOARD-002: Onboarding → Einstufungstest starten", async ({ page }) => {
  94  |       await page.goto(`${BASE}/onboarding`);
  95  |       // Skip to placement step
  96  |       const skipBtn = page.locator("text=Deutsch als Muttersprache").first();
  97  |       if (await skipBtn.isVisible()) {
  98  |         await skipBtn.click();
  99  |         await page.waitForTimeout(500);
  100 |       }
  101 |       const goalBtn = page.locator("text=Alltag").first();
  102 |       if (await goalBtn.isVisible()) {
  103 |         await goalBtn.click();
  104 |         await page.waitForTimeout(500);
  105 |       }
  106 |       const timeBtn = page.locator("text=5 Min").first();
  107 |       if (await timeBtn.isVisible()) {
  108 |         await timeBtn.click();
  109 |       }
  110 |       const placementBtn = page.locator("text=Einstufungstest starten").first();
  111 |       if (await placementBtn.isVisible()) {
  112 |         await placementBtn.click();
  113 |         await expect(page).toHaveURL(/placement-test/);
  114 |       }
  115 |     });
  116 |   });
  117 | 
  118 |   test.describe("IC-DASHBOARD", () => {
  119 |     test.beforeEach(async ({ page }) => {
  120 |       await page.goto(`${BASE}/login`);
  121 |       await page.fill("#email", "test@user.de");
  122 |       await page.fill("#password", "test123456");
  123 |       await page.click("button[type=submit]");
  124 |       await page.waitForURL(/dashboard/, { timeout: 10000 });
  125 |     });
  126 | 
  127 |     test("IC-DASH-001: Dashboard zeigt Stats, Tagesziel, CTA", async ({ page }) => {
  128 |       await expect(page.locator("text=Willkommen")).toBeVisible();
  129 |       await expect(page.locator("text=Tagesziel")).toBeVisible();
  130 |       const eraseBtn = page.locator("text=Erste Lektion starten").first();
  131 |       await expect(eraseBtn).toBeVisible();
  132 |       await eraseBtn.click();
  133 |       await expect(page).toHaveURL(/learn/);
  134 |     });
  135 |   });
  136 | 
  137 |   test.describe("IC-LEARN", () => {
  138 |     test.beforeEach(async ({ page }) => {
  139 |       await page.goto(`${BASE}/login`);
  140 |       await page.fill("#email", "test@user.de");
  141 |       await page.fill("#password", "test123456");
  142 |       await page.click("button[type=submit]");
  143 |       await page.waitForURL(/dashboard/, { timeout: 10000 });
  144 |       await page.goto(`${BASE}/learn`);
  145 |     });
  146 | 
  147 |     test("IC-LEARN-001: Kurse werden geladen", async ({ page }) => {
  148 |       await expect(page.locator("text=Lernpfad")).toBeVisible();
  149 |       const courses = page.locator(".card-premium");
  150 |       await expect(courses.first()).toBeVisible();
  151 |     });
  152 | 
  153 |     test("IC-LEARN-002: A1 zeigt 'Starten', A2+ zeigen 'Freischalten'", async ({ page }) => {
  154 |       const freeBtn = page.locator("text=Starten").first();
  155 |       await expect(freeBtn).toBeVisible();
  156 |     });
  157 |   });
  158 | 
  159 |   test.describe("IC-PRICING", () => {
  160 |     test("IC-PRICING-001: Pricing-Seite zeigt alle 5 Levels + Bundle", async ({ page }) => {
  161 |       await page.goto(`${BASE}/pricing`);
  162 |       await expect(page.locator("text=Komplettpaket A1")).toBeVisible();
  163 |       const a1Free = page.locator("text=Kostenlos starten").first();
  164 |       await expect(a1Free).toBeVisible();
  165 |     });
  166 |   });
  167 | 
  168 |   test.describe("IC-MOBILE", () => {
  169 |     test("IC-MOBILE-001: Mobile Nav sichtbar, Desktop Sidebar sichtbar", async ({ page }) => {
  170 |       await page.setViewportSize({ width: 375, height: 812 });
  171 |       await page.goto(`${BASE}/login`);
```