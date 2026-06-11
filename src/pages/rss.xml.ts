import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { publishedFeedItems, site } from "@/data/site";

export function GET(context: APIContext) {
  return rss({
    title: `${site.author} - writing and build log`,
    description: "Published essays and build-log notes from Arjun Pherwani.",
    site: context.site ?? site.url,
    items: publishedFeedItems.map((item) => ({
      title: item.title,
      description: item.description,
      link: item.link,
      pubDate: item.pubDate,
      categories: item.categories,
    })),
    customData: "<language>en-us</language>",
  });
}
