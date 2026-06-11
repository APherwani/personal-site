import { describe, expect, it } from "vitest";
import { logEntries, projects, publishedFeedItems, routeExpectations, site, writing } from "../../src/data/site";

describe("site content data", () => {
  it("keeps route expectations unique and absolute", () => {
    const paths = routeExpectations.map((route) => route.path);

    expect(new Set(paths).size).toBe(paths.length);
    expect(paths.every((path) => path.startsWith("/"))).toBe(true);
  });

  it("only links published writing and log entries", () => {
    const unpublishedWritingWithLinks = writing.filter((item) => !item.published && item.href);
    const unpublishedLogsWithLinks = logEntries.filter((item) => !item.published && item.href);

    expect(unpublishedWritingWithLinks).toEqual([]);
    expect(unpublishedLogsWithLinks).toEqual([]);
  });

  it("only links projects to known public routes", () => {
    const knownPaths = new Set(routeExpectations.map((route) => route.path));

    expect(projects).toHaveLength(3);
    expect(projects.map((project) => project.title)).toEqual([
      "Olive",
      "SelfControl launchd automation",
      "Home lab",
    ]);
    expect(projects.every((project) => !project.href || knownPaths.has(project.href))).toBe(true);
    expect(projects.filter((project) => project.status.label === "Work in progress")).toHaveLength(1);
  });

  it("orders feed items newest first", () => {
    const times = publishedFeedItems.map((item) => item.pubDate.getTime());
    const sorted = [...times].sort((left, right) => right - left);

    expect(times).toEqual(sorted);
    expect(publishedFeedItems).toEqual([]);
  });

  it("has launch-critical identity metadata", () => {
    expect(site.author).toBe("Arjun Pherwani");
    expect(site.url).toMatch(/^https:\/\/.+/);
    expect(site.description).toContain("systems and platform engineer");
  });
});
