import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { routeExpectations } from "../../src/data/site";

test.describe.configure({ mode: "parallel" });

for (const route of routeExpectations) {
  test(`has no critical accessibility violations on ${route.path}`, async ({ page }) => {
    await page.goto(route.path);

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    const seriousViolations = results.violations.filter((violation) =>
      ["critical", "serious"].includes(violation.impact ?? ""),
    );

    expect(seriousViolations).toEqual([]);
  });
}
