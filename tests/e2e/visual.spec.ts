import { expect, test } from "@playwright/test";

const pages = [
  { name: "home", path: "/" },
  { name: "projects", path: "/projects/" },
  { name: "writing", path: "/writing/" },
  { name: "log", path: "/log/" },
];

for (const pageSpec of pages) {
  test(`${pageSpec.name} visual snapshot`, async ({ page }) => {
    await page.goto(pageSpec.path);
    await page.waitForLoadState("networkidle");

    await expect(page).toHaveScreenshot(`${pageSpec.name}.png`, {
      fullPage: true,
    });
  });
}
