import type { IconName } from "@/components/icons/icon-map";

/**
 * Services offered. These describe what is proposed, not work already
 * delivered for specific clients.
 */
export type Service = {
  id: string;
  title: string;
  description: string;
  icon: IconName;
  points: string[];
};

export const services: Service[] = [
  {
    id: "strategy",
    title: "Social Media Strategy",
    description:
      "A clear roadmap built around your goals, audience and positioning, with the right platforms and a realistic publishing rhythm.",
    icon: "target",
    points: ["Audit & benchmark", "Goals & KPIs", "Editorial calendar"],
  },
  {
    id: "content",
    title: "Content Creation",
    description:
      "Posts, carousels, reels and stories crafted to fit each platform and to tell your brand's story with consistency.",
    icon: "pen",
    points: ["Copywriting", "Short-form video", "Content pillars"],
  },
  {
    id: "community",
    title: "Community Management",
    description:
      "Daily presence, thoughtful replies and moderation to turn followers into an engaged and loyal community.",
    icon: "users",
    points: ["Engagement", "Moderation", "Brand voice"],
  },
  {
    id: "analytics",
    title: "Analytics & Reporting",
    description:
      "Tracking the metrics that matter and turning them into clear reports and concrete recommendations.",
    icon: "chart",
    points: ["Performance tracking", "Monthly reports", "Optimisation"],
  },
  {
    id: "design",
    title: "Graphic Design",
    description:
      "Visual identities for your feeds: templates, covers and graphics that make your brand instantly recognisable.",
    icon: "palette",
    points: ["Feed templates", "Visual guidelines", "Campaign assets"],
  },
  {
    id: "marketing",
    title: "Digital Marketing",
    description:
      "Campaigns that connect organic content with paid reach, collaborations and the wider digital ecosystem.",
    icon: "megaphone",
    points: ["Campaign planning", "Paid social basics", "Collaborations"],
  },
];
