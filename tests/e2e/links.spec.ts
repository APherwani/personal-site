import { expect, test } from "@playwright/test";
import { routeExpectations } from "../../src/data/site";

const checked = new Set<string>();

test.describe.configure({ mode: "parallel" });

for (const route of routeExpectations) {
  test(`internal links resolve on ${route.path}`, async ({ page, request, baseURL }) => {
    await page.goto(route.path);
    const hrefs = await page.locator("a[href]").evaluateAll((links) =>
      links
        .map((link) => link.getAttribute("href"))
        .filter((href): href is string => Boolean(href)),
    );

    for (const href of hrefs) {
      if (href.startsWith("mailto:") || href.startsWith("#")) {
        continue;
      }

      const url = new URL(href, baseURL);
      if (url.origin !== baseURL || checked.has(url.pathname)) {
        continue;
      }

      checked.add(url.pathname);
      const response = await request.get(url.pathname);
      expect(response.status(), `${route.path} -> ${url.pathname}`).toBeLessThan(400);
    }
  });

  test(`external links are explicit on ${route.path}`, async ({ page }) => {
    await page.goto(route.path);
    const externalLinks = page.locator("a[href^='http']");
    const count = await externalLinks.count();

    for (let index = 0; index < count; index += 1) {
      await expect(externalLinks.nth(index)).toHaveAttribute("target", "_blank");
      await expect(externalLinks.nth(index)).toHaveAttribute("rel", /noopener/);
    }
  });
}
