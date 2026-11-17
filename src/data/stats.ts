import type { IconName } from "@/components/icons/icon-map";

/**
 * Hero statistics.
 *
 * Only add numbers that are real and verifiable. Each stat is displayed
 * only when `verified` is `true`. While no verified stat exists, the hero
 * shows the qualitative `highlights` below instead.
 */
export type Stat = {
  /** Numeric value used by the animated counter, e.g. 120. */
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  icon: IconName;
  verified: boolean;
};

export const stats: Stat[] = [
  // Example (do not enable until the figure is verified):
  // { value: 25, suffix: "+", label: "Brands supported", icon: "users", verified: false },
];

export const verifiedStats = stats.filter((stat) => stat.verified);

export type Highlight = { title: string; description: string; icon: IconName };

export const highlights: Highlight[] = [
  { title: "Strategy", description: "Goal-driven plans", icon: "target" },
  { title: "Content", description: "Platform-native", icon: "sparkles" },
  { title: "Analytics", description: "Measured & refined", icon: "chart" },
];
