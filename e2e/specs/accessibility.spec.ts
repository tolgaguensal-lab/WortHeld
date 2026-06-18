import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const BASE = "http://192.168.178.91:3035";

const PAGES = [
  { name: "Landing", path: "/" },
  { name: "Login", path: "/login" },
  { name: "Register", path: "/register" },
  { name: "Onboarding", path: "/onboarding" },
  { name: "Placement Test", path: "/placement-test" },
  { name: "Pricing", path: "/pricing" },
];

test.describe("Accessibility + WCAG AA", () => {
  for (const p of PAGES) {
    test(`[A11Y] ${p.name} page passes WCAG AA checks`, async ({ page }) => {
      await page.goto(`${BASE}${p.path}`);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
      expect(results.violations).toHaveLength(0);
    });
  }

  test.describe("Authenticated pages", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(`${BASE}/login`);
      await page.fill("#email", "test@user.de");
      await page.fill("#password", "test123456");
      await page.click("button[type=submit]");
      await page.waitForURL(/dashboard/, { timeout: 10000 });
    });

    for (const p of [
      { name: "Dashboard", path: "/dashboard" },
      { name: "Learn", path: "/learn" },
      { name: "Vocabulary", path: "/vocabulary" },
      { name: "Grammar", path: "/grammar" },
      { name: "Review", path: "/review" },
    ]) {
      test(`[A11Y] ${p.name} page passes WCAG AA`, async ({ page }) => {
        await page.goto(`${BASE}${p.path}`);
        const results = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
          .analyze();
        expect(results.violations).toHaveLength(0);
      });
    }
  });

  test("[A11Y] All buttons have accessible names", async ({ page }) => {
    await page.goto(BASE);
    const buttons = page.locator("button:not([aria-label]):not(:has-text(''))");
    const count = await buttons.count();
    for (let i = 0; i < count; i++) {
      const text = await buttons.nth(i).textContent();
      const ariaLabel = await buttons.nth(i).getAttribute("aria-label");
      const title = await buttons.nth(i).getAttribute("title");
      expect(text || ariaLabel || title).toBeTruthy();
    }
  });

  test("[A11Y] Focus ring visible on interactive elements", async ({ page }) => {
    await page.goto(`${BASE}/login`);
    await page.keyboard.press("Tab");
    const focused = page.locator(":focus");
    await expect(focused).toBeVisible();
  });
});
