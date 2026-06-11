import { expect, test } from "@playwright/test";
import { routeExpectations } from "../../src/data/site";

test.describe.configure({ mode: "parallel" });

for (const route of routeExpectations) {
  test(`renders ${route.path}`, async ({ page }) => {
    const response = await page.goto(route.path);

    expect(response?.ok()).toBe(true);
    await expect(page).toHaveTitle(new RegExp(route.titleIncludes, "i"));
    await expect(page.locator("meta[name='description']")).toHaveAttribute(
      "content",
      new RegExp(route.descriptionIncludes, "i"),
    );
    await expect(page.locator("h1").first()).toBeVisible();
  });

  test(`keeps mobile layout stable on ${route.path}`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const response = await page.goto(route.path);
    const layout = await page.evaluate(() => {
      const doc = document.documentElement;
      const navXs = [...document.querySelectorAll(".nav a")].map((link) =>
        Math.round(link.getBoundingClientRect().x),
      );
      const h1 = document.querySelector("h1")?.getBoundingClientRect();

      return {
        overflowX: doc.scrollWidth > doc.clientWidth + 1,
        minNavX: Math.min(...navXs),
        h1Width: Math.round(h1?.width ?? 0),
        clientWidth: doc.clientWidth,
      };
    });

    expect(response?.ok()).toBe(true);
    expect(layout.overflowX).toBe(false);
    expect(layout.minNavX).toBeGreaterThanOrEqual(16);
    expect(layout.h1Width).toBeLessThanOrEqual(layout.clientWidth - 32);
  });
}
