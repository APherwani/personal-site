import { expect, test } from "@playwright/test";
import { routeExpectations, site } from "../../src/data/site";

test("home exposes canonical, Open Graph, RSS, and JSON-LD metadata", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("link[rel='canonical']")).toHaveAttribute("href", `${site.url}/`);
  await expect(page.locator("meta[property='og:title']")).toHaveAttribute("content", /Arjun Pherwani/i);
  await expect(page.locator("meta[property='og:image']")).toHaveAttribute("content", /^https:\/\/.+/);
  await expect(page.locator("link[type='application/rss+xml']")).toHaveAttribute("href", "/rss.xml");

  const jsonLd = await page.locator("script[type='application/ld+json']").textContent();
  expect(jsonLd).toContain("WebSite");
  expect(jsonLd).toContain(site.author);
});

test("robots, rss, and sitemap endpoints are reachable", async ({ request }) => {
  const robots = await request.get("/robots.txt");
  const rss = await request.get("/rss.xml");
  const sitemapIndex = await request.get("/sitemap-index.xml");

  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain("Sitemap:");
  expect(rss.status()).toBe(200);
  expect(await rss.text()).toContain("<rss");
  expect(sitemapIndex.status()).toBe(200);
  expect(await sitemapIndex.text()).toContain("<sitemapindex");
});

test("expected pages appear in sitemap output", async ({ request }) => {
  const sitemapIndex = await request.get("/sitemap-index.xml");
  const sitemapUrl = (await sitemapIndex.text()).match(/<loc>(.*?)<\/loc>/)?.[1];

  expect(sitemapUrl).toBeTruthy();
  const sitemap = await request.get(new URL(sitemapUrl as string).pathname);
  const xml = await sitemap.text();

  for (const route of routeExpectations) {
    expect(xml).toContain(`${site.url}${route.path}`);
  }
});
