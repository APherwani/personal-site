export type StatusTone = "active" | "building" | "research" | "planned";

export interface Status {
  label: string;
  tone: StatusTone;
}

export interface Taggable {
  tags: string[];
}

export interface LinkItem {
  label: string;
  href: string;
}

export interface Project extends Taggable {
  title: string;
  href?: string;
  date: string;
  summary: string;
  status: Status;
}

export interface WritingItem extends Taggable {
  title: string;
  href?: string;
  date: string;
  summary: string;
  published: boolean;
  readingTime?: string;
}

export interface LogItem extends Taggable {
  title: string;
  href?: string;
  number: string;
  date: string;
  summary: string;
  published: boolean;
}

export interface RouteExpectation {
  path: string;
  titleIncludes: string;
  descriptionIncludes: string;
}

export const site = {
  author: "Arjun Pherwani",
  name: "Arjun Pherwani",
  title: "Arjun Pherwani - systems & platform engineering",
  description:
    "Arjun Pherwani is a systems and platform engineer working on production infrastructure, reliability, and physical-world computing.",
  url: "https://arjunpherwani.dev",
  email: "hello@arjunpherwani.dev",
  github: "https://github.com/APherwani",
  linkedin: "https://linkedin.com/in/arjun-pherwani",
  lastUpdated: "2026-06-11",
} as const;

export const navItems: LinkItem[] = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects/" },
  { label: "Writing", href: "/writing/" },
  { label: "Build log", href: "/log/" },
  { label: "About", href: "/about/" },
];

export const projects: Project[] = [
  {
    title: "Olive",
    href: "/projects/olive/",
    date: "active",
    status: { label: "Dogfood", tone: "active" },
    tags: ["equity", "tax-modeling", "decision-support"],
    summary:
      "A private portfolio cockpit for employer-stock concentration, future vests, tax-lot tradeoffs, and bounded AI synthesis.",
  },
  {
    title: "SelfControl launchd automation",
    href: "/projects/selfcontrol-launchd/",
    date: "2026.06",
    status: { label: "Writeup", tone: "research" },
    tags: ["macos", "launchd", "security-boundaries"],
    summary:
      "A small public shell automation that installed a weekday SelfControl schedule, then ran into macOS's intentional authorization boundary.",
  },
  {
    title: "Home lab",
    date: "upcoming",
    status: { label: "Work in progress", tone: "building" },
    tags: ["hardware", "sensors", "reliability"],
    summary:
      "A small physical-computing workspace for sensors, home automation, and reliability experiments. Public notes are still pending.",
  },
];

export const writing: WritingItem[] = [];

export const logEntries: LogItem[] = [];

export const routeExpectations: RouteExpectation[] = [
  {
    path: "/",
    titleIncludes: "systems & platform engineering",
    descriptionIncludes: "systems and platform engineer",
  },
  {
    path: "/projects/",
    titleIncludes: "Projects",
    descriptionIncludes: "Project notes",
  },
  {
    path: "/projects/olive/",
    titleIncludes: "Olive",
    descriptionIncludes: "equity concentration",
  },
  {
    path: "/projects/selfcontrol-launchd/",
    titleIncludes: "SelfControl",
    descriptionIncludes: "authorization boundary",
  },
  {
    path: "/writing/",
    titleIncludes: "Writing",
    descriptionIncludes: "Writing will live here",
  },
  {
    path: "/log/",
    titleIncludes: "Build log",
    descriptionIncludes: "Build-log notes will live here",
  },
  {
    path: "/about/",
    titleIncludes: "About",
    descriptionIncludes: "Current focus",
  },
];

export const publishedFeedItems = [
  ...writing
    .filter((item) => item.published && item.href)
    .map((item) => ({
      title: item.title,
      description: item.summary,
      link: item.href as string,
      pubDate: new Date(`${item.date}T12:00:00.000Z`),
      categories: item.tags,
    })),
  ...logEntries
    .filter((item) => item.published && item.href)
    .map((item) => ({
      title: `Log ${item.number}: ${item.title}`,
      description: item.summary,
      link: item.href as string,
      pubDate: new Date(`${item.date}T12:00:00.000Z`),
      categories: item.tags,
    })),
].sort((left, right) => right.pubDate.getTime() - left.pubDate.getTime());

export function formatDate(date: string): string {
  return date.replaceAll("-", ".");
}

export function tagsLabel(tags: string[]): string {
  return tags.join(" / ");
}
