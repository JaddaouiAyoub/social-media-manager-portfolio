import type { IconName } from "@/components/icons/icon-map";

/** Skills shown as tags. No arbitrary percentage levels by design. */
export type Skill = { name: string; icon: IconName };

export const skills: Skill[] = [
  { name: "Social Media Strategy", icon: "target" },
  { name: "Content Creation", icon: "pen" },
  { name: "Community Management", icon: "users" },
  { name: "Analytics & Reporting", icon: "chart" },
  { name: "Graphic Design", icon: "palette" },
  { name: "Digital Marketing", icon: "megaphone" },
];

/** Tools the owner works with. Edit freely; an empty array hides the block. */
export const tools: string[] = [];
