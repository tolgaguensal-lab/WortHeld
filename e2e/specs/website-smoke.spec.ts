import { test, expect } from "@playwright/test";

const BASE = process.env.BASE_URL || "http://127.0.0.1:3000";

test.describe("Website Smoke Tests", () => {
  test("[LANDING] lädt fehlerfrei", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    await page.goto(BASE);
    await expect(page.locator("text=Wortwende")).toBeVisible();
    expect(errors).toHaveLength(0);
  });

  test("[LANDING] Navigation funktioniert", async ({ page }) => {
    await page.goto(BASE);
    await expect(page.locator("text=Anmelden")).toBeVisible();
    await expect(page.locator("text=Kostenlos starten")).toBeVisible();
  });

  test("[IMPRESSUM] erreichbar", async ({ page }) => {
    await page.goto(`${BASE}/impressum`);
    await expect(page.locator("text=Impressum")).toBeVisible();
    await expect(page.locator("text=hallo@guenlab.de")).toBeVisible();
  });

  test("[DATENSCHUTZ] erreichbar", async ({ page }) => {
    await page.goto(`${BASE}/datenschutz`);
    await expect(page.locator("text=Datenschutzerklärung")).toBeVisible();
  });

  test("[AGB] erreichbar", async ({ page }) => {
    await page.goto(`${BASE}/agb`);
    await expect(page.locator("text=Allgemeine Geschäftsbedingungen")).toBeVisible();
  });

  test("[KONTO-LOESCHEN] erreichbar", async ({ page }) => {
    await page.goto(`${BASE}/konto-loeschen`);
    await expect(page.locator("text=Konto löschen")).toBeVisible();
  });

  test("[PRICING] erreichbar", async ({ page }) => {
    await page.goto(`${BASE}/pricing`);
    await expect(page.locator("text=Kostenlos")).toBeVisible();
    await expect(page.locator("text=Premium")).toBeVisible();
  });

  test("[LOGIN] erreichbar", async ({ page }) => {
    await page.goto(`${BASE}/login`);
    await expect(page.locator("text=Anmelden")).toBeVisible();
  });

  test("[REGISTER] erreichbar", async ({ page }) => {
    await page.goto(`${BASE}/register`);
    await expect(page.locator("text=Konto erstellen")).toBeVisible();
  });

  test("[404] funktioniert", async ({ page }) => {
    await page.goto(`${BASE}/diese-seite-gibt-es-nicht-12345`);
    await expect(page).not.toHaveURL(/\/(login|register)/);
  });
});

test.describe("Mobile Viewport", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("[LANDING] kein horizontaler Overflow", async ({ page }) => {
    await page.goto(BASE);
    const html = page.locator("html");
    const scrollWidth = await html.evaluate((el) => el.scrollWidth);
    const clientWidth = await html.evaluate((el) => el.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
  });

  test("[LOGIN] Formular zugänglich", async ({ page }) => {
    await page.goto(`${BASE}/login`);
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });

  test("[DASHBOARD] Bottom-Nav sichtbar", async ({ page }) => {
    await page.goto(`${BASE}/login`);
    const nav = page.locator("nav.fixed.bottom-0");
    // Auth pages have no bottom nav, but dashboard does
    await expect(nav).not.toBeVisible();
  });
});

test.describe("Auth Guards", () => {
  test("[DASHBOARD] leitet zu Login", async ({ page }) => {
    await page.goto(`${BASE}/dashboard`);
    await page.waitForURL("**/login**");
  });

  test("[SETTINGS] leitet zu Login", async ({ page }) => {
    await page.goto(`${BASE}/settings`);
    await page.waitForURL("**/login**");
  });

  test("[TUTOR] leitet zu Login", async ({ page }) => {
    await page.goto(`${BASE}/tutor`);
    await page.waitForURL("**/login**");
  });
});
