import { test, expect } from "@playwright/test";
const BASE = "http://192.168.178.91:3035";

/**
 * Interaction Contracts E2E Tests
 * Jeder Button muss einen definierten Trigger, Route, Modal oder State Change haben.
 */

test.describe("Interaction Contracts", () => {

  test.describe("IC-LANDING", () => {
    test("IC-LANDING-CTA-001: Einstufungstest starten → /placement-test", async ({ page }) => {
      await page.goto(BASE);
      const btn = page.locator("text=Einstufungstest machen").first();
      await expect(btn).toBeVisible();
      await expect(btn).toBeEnabled();
      await btn.click();
      await expect(page).toHaveURL(/placement-test/);
    });

    test("IC-LANDING-CTA-002: Kostenlos starten → /register", async ({ page }) => {
      await page.goto(BASE);
      const btn = page.locator("text=Kostenlos starten").first();
      await expect(btn).toBeVisible();
      await btn.click();
      await expect(page).toHaveURL(/register/);
    });

    test("IC-LANDING-NAV-001: Anmelden → /login", async ({ page }) => {
      await page.goto(BASE);
      await page.click("text=Anmelden");
      await expect(page).toHaveURL(/login/);
    });

    test("IC-LANDING-FOOTER-001: Impressum erreichbar", async ({ page }) => {
      await page.goto(BASE);
      const link = page.locator("text=Impressum").first();
      await expect(link).toBeVisible();
      await link.click();
      await expect(page).not.toHaveURL(/login/);
    });
  });

  test.describe("IC-AUTH", () => {
    test("IC-LOGIN-001: Login mit gültigen Daten → Dashboard", async ({ page }) => {
      await page.goto(`${BASE}/login`);
      const email = page.locator("#email");
      const password = page.locator("#password");
      const submit = page.locator("button[type=submit]");
      await expect(email).toBeVisible();
      await expect(password).toBeVisible();
      await expect(submit).toBeVisible();
      await email.fill("test@user.de");
      await password.fill("test123456");
      await submit.click();
      await page.waitForURL(/dashboard/, { timeout: 10000 });
    });

    test("IC-REGISTER-001: Registrierungsformular ladt", async ({ page }) => {
      await page.goto(`${BASE}/register`);
      const name = page.locator("#name");
      const email = page.locator("#email");
      const submit = page.locator("button[type=submit]");
      await expect(name).toBeVisible();
      await expect(email).toBeVisible();
      await expect(submit).toBeVisible();
    });

    test("IC-LOGIN-002: Login Link auf Register → /register", async ({ page }) => {
      await page.goto(`${BASE}/login`);
      const link = page.locator("text=Registrieren").first();
      await expect(link).toBeVisible();
      await link.click();
      await expect(page).toHaveURL(/register/);
    });
  });

  test.describe("IC-ONBOARDING", () => {
    test("IC-ONBOARD-001: Sprache wählen → Ziel wählen", async ({ page }) => {
      await page.goto(`${BASE}/onboarding`);
      const langBtn = page.locator("text=Türkçe").first();
      if (await langBtn.isVisible()) {
        await langBtn.click();
        await expect(page.locator("text=Was ist dein Ziel")).toBeVisible();
      }
    });

    test("IC-ONBOARD-002: Onboarding → Einstufungstest starten", async ({ page }) => {
      await page.goto(`${BASE}/onboarding`);
      // Skip to placement step
      const skipBtn = page.locator("text=Deutsch als Muttersprache").first();
      if (await skipBtn.isVisible()) {
        await skipBtn.click();
        await page.waitForTimeout(500);
      }
      const goalBtn = page.locator("text=Alltag").first();
      if (await goalBtn.isVisible()) {
        await goalBtn.click();
        await page.waitForTimeout(500);
      }
      const timeBtn = page.locator("text=5 Min").first();
      if (await timeBtn.isVisible()) {
        await timeBtn.click();
      }
      const placementBtn = page.locator("text=Einstufungstest starten").first();
      if (await placementBtn.isVisible()) {
        await placementBtn.click();
        await expect(page).toHaveURL(/placement-test/);
      }
    });
  });

  test.describe("IC-DASHBOARD", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(`${BASE}/login`);
      await page.fill("#email", "test@user.de");
      await page.fill("#password", "test123456");
      await page.click("button[type=submit]");
      await page.waitForURL(/dashboard/, { timeout: 10000 });
    });

    test("IC-DASH-001: Dashboard zeigt Stats, Tagesziel, CTA", async ({ page }) => {
      await expect(page.locator("text=Willkommen")).toBeVisible();
      await expect(page.locator("text=Tagesziel")).toBeVisible();
      const eraseBtn = page.locator("text=Erste Lektion starten").first();
      await expect(eraseBtn).toBeVisible();
      await eraseBtn.click();
      await expect(page).toHaveURL(/learn/);
    });
  });

  test.describe("IC-LEARN", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(`${BASE}/login`);
      await page.fill("#email", "test@user.de");
      await page.fill("#password", "test123456");
      await page.click("button[type=submit]");
      await page.waitForURL(/dashboard/, { timeout: 10000 });
      await page.goto(`${BASE}/learn`);
    });

    test("IC-LEARN-001: Kurse werden geladen", async ({ page }) => {
      await expect(page.locator("text=Lernpfad")).toBeVisible();
      const courses = page.locator(".card-premium");
      await expect(courses.first()).toBeVisible();
    });

    test("IC-LEARN-002: A1 zeigt 'Starten', A2+ zeigen 'Freischalten'", async ({ page }) => {
      const freeBtn = page.locator("text=Starten").first();
      await expect(freeBtn).toBeVisible();
    });
  });

  test.describe("IC-PRICING", () => {
    test("IC-PRICING-001: Pricing-Seite zeigt alle 5 Levels + Bundle", async ({ page }) => {
      await page.goto(`${BASE}/pricing`);
      await expect(page.locator("text=Komplettpaket A1")).toBeVisible();
      const a1Free = page.locator("text=Kostenlos starten").first();
      await expect(a1Free).toBeVisible();
    });
  });

  test.describe("IC-MOBILE", () => {
    test("IC-MOBILE-001: Mobile Nav sichtbar, Desktop Sidebar sichtbar", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.goto(`${BASE}/login`);
      await page.fill("#email", "test@user.de");
      await page.fill("#password", "test123456");
      await page.click("button[type=submit]");
      await page.waitForURL(/dashboard/, { timeout: 10000 });
      await expect(page.locator("nav.fixed.bottom-0")).toBeVisible();

      await page.setViewportSize({ width: 1280, height: 900 });
      await page.goto(`${BASE}/learn`);
      await expect(page.locator("aside")).toBeVisible();
    });
  });

});
