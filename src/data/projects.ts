import type { SocialPlatform } from "./socials";

/**
 * Portfolio projects.
 *
 * The entries below are CONCEPT projects (self-initiated demonstrations of
 * the services). They are clearly labelled as such on the site and contain
 * no client names or invented results.
 *
 * To publish real work, add an entry with `kind: "client"` (only with the
 * client's permission) and, optionally, real visuals in /public/images/projects/.
 */

export const projectCategories = [
  "Strategy",
  "Content",
  "Design",
  "Community",
  "Analytics",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

/** Illustrated cover rendered in code when no real image is provided. */
export type CoverVariant = "feed" | "chart" | "calendar" | "brand" | "chat" | "reel";
export type CoverTone = "violet" | "magenta" | "blue" | "sunset";

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  /** "concept" = personal / demonstration project, "client" = real client work. */
  kind: "concept" | "client";
  summary: string;
  description: string;
  platforms: Exclude<SocialPlatform, "email">[];
  deliverables: string[];
  approach: string[];
  cover: {
    variant: CoverVariant;
    tone: CoverTone;
    /** Optional real image, e.g. "/images/projects/my-project.jpg". */
    image?: string;
    imageAlt?: string;
  };
  /** Optional external link (case study, live campaign…). */
  link?: { label: string; href: string };
};

export const projects: Project[] = [
  {
    slug: "cafe-launch-strategy",
    title: "Neighbourhood Café Launch",
    category: "Strategy",
    kind: "concept",
    summary: "A 90-day social media launch plan for a fictional independent café.",
    description:
      "A concept strategy imagining how a new local café could build awareness before opening day and turn first visitors into regulars. It covers positioning, platform choice, content pillars and a launch calendar.",
    platforms: ["instagram", "tiktok"],
    deliverables: ["Audience personas", "Content pillars", "90-day calendar", "KPI framework"],
    approach: [
      "Define the café's personality and tone of voice.",
      "Plan a teaser phase, an opening week and a loyalty phase.",
      "Set measurable goals for each phase.",
    ],
    cover: { variant: "calendar", tone: "violet" },
  },
  {
    slug: "fitness-reels-series",
    title: "Fitness Coach Reels Series",
    category: "Content",
    kind: "concept",
    summary: "A short-form video format designed for a fictional fitness coach.",
    description:
      "A concept series of educational reels with a recognisable hook, a consistent visual frame and a clear call to action. The goal is to show how a repeatable format can make content production easier and the account more memorable.",
    platforms: ["instagram", "tiktok", "youtube"],
    deliverables: ["Series concept", "Script templates", "Cover templates", "Posting rhythm"],
    approach: [
      "Identify recurring audience questions.",
      "Design a 3-part script structure: hook, value, action.",
      "Create reusable cover and caption templates.",
    ],
    cover: { variant: "reel", tone: "magenta" },
  },
  {
    slug: "skincare-feed-identity",
    title: "Skincare Brand Feed Identity",
    category: "Design",
    kind: "concept",
    summary: "A cohesive Instagram visual identity for a fictional skincare brand.",
    description:
      "A concept visual system including a colour palette, typography, post templates and a grid layout logic, designed so the feed stays consistent even when several people create content.",
    platforms: ["instagram"],
    deliverables: ["Colour & type system", "12 post templates", "Story highlights covers", "Grid guidelines"],
    approach: [
      "Translate the brand values into visual principles.",
      "Design flexible templates for each content pillar.",
      "Document the rules in a simple style guide.",
    ],
    cover: { variant: "brand", tone: "sunset" },
  },
  {
    slug: "community-playbook",
    title: "Community Management Playbook",
    category: "Community",
    kind: "concept",
    summary: "Guidelines to answer, moderate and engage a growing online community.",
    description:
      "A concept playbook that defines the brand voice in conversations, response templates, an escalation process for sensitive messages and engagement rituals to keep the community active.",
    platforms: ["instagram", "facebook", "linkedin"],
    deliverables: ["Voice & tone guide", "Reply templates", "Moderation rules", "Engagement rituals"],
    approach: [
      "Map the most frequent types of messages and comments.",
      "Write on-brand reply templates that still feel human.",
      "Define what to escalate and how fast to respond.",
    ],
    cover: { variant: "chat", tone: "blue" },
  },
  {
    slug: "monthly-report-template",
    title: "Monthly Performance Report",
    category: "Analytics",
    kind: "concept",
    summary: "A clear, visual reporting template that turns metrics into decisions.",
    description:
      "A concept report structure focused on the metrics that matter: reach, engagement, growth of the community and conversions. Each section ends with insights and next actions rather than raw numbers.",
    platforms: ["instagram", "linkedin", "tiktok"],
    deliverables: ["Report template", "KPI definitions", "Insights framework", "Action plan section"],
    approach: [
      "Select a short list of KPIs aligned with the goals.",
      "Visualise trends instead of isolated figures.",
      "Close every report with concrete recommendations.",
    ],
    cover: { variant: "chart", tone: "violet" },
  },
  {
    slug: "linkedin-personal-branding",
    title: "LinkedIn Personal Branding",
    category: "Content",
    kind: "concept",
    summary: "A content plan to help a professional share expertise on LinkedIn.",
    description:
      "A concept editorial line for a consultant who wants to be more visible on LinkedIn: themes, post formats, a weekly rhythm and tips to write in a personal yet professional voice.",
    platforms: ["linkedin"],
    deliverables: ["Editorial line", "Post formats", "Weekly rhythm", "Writing guidelines"],
    approach: [
      "Clarify the expertise and the target audience.",
      "Alternate educational, personal and opinion posts.",
      "Build a sustainable weekly routine.",
    ],
    cover: { variant: "feed", tone: "blue" },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
