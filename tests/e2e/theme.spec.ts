import { expect, test } from "@playwright/test";

const themeColor = {
  light: "#f7f6f2",
  dark: "#171613",
} as const;

test("uses system dark mode when no theme preference is saved", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");

  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.locator("meta[name='theme-color']")).toHaveAttribute("content", themeColor.dark);
});

test("theme toggle switches, persists, and updates theme color", async ({ page }) => {
  await page.goto("/");

  const root = page.locator("html");
  const toggle = page.getByRole("button", { name: /switch to (dark|light) theme/i });
  await expect(root).toHaveAttribute("data-theme", /^(dark|light)$/);
  await expect(toggle).toBeVisible();

  const initialTheme = (await root.getAttribute("data-theme")) === "dark" ? "dark" : "light";
  const nextTheme = initialTheme === "dark" ? "light" : "dark";

  await toggle.click();

  await expect(root).toHaveAttribute("data-theme", nextTheme);
  await expect(toggle).toHaveAttribute("aria-pressed", nextTheme === "dark" ? "true" : "false");
  await expect(page.locator("meta[name='theme-color']")).toHaveAttribute("content", themeColor[nextTheme]);

  await page.reload();

  await expect(root).toHaveAttribute("data-theme", nextTheme);
  await expect(page.locator("meta[name='theme-color']")).toHaveAttribute("content", themeColor[nextTheme]);
});
