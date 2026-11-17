import type { IconName } from "@/components/icons/icon-map";

export type ProcessStep = {
  title: string;
  description: string;
  icon: IconName;
};

export const processSteps: ProcessStep[] = [
  {
    title: "Discovery & Brief",
    description:
      "We talk about your brand, your audience and your goals. I review your current presence to understand where you stand.",
    icon: "search",
  },
  {
    title: "Strategy & Planning",
    description:
      "I define the platforms, content pillars, tone of voice and KPIs, then build an editorial calendar we validate together.",
    icon: "map",
  },
  {
    title: "Creation & Publishing",
    description:
      "Content is produced, reviewed and scheduled. I stay present with your community to keep conversations alive.",
    icon: "sparkles",
  },
  {
    title: "Analysis & Optimization",
    description:
      "Results are measured against the KPIs. What works is amplified, what doesn't is adjusted for the next cycle.",
    icon: "chart",
  },
];
