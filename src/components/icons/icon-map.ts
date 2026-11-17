import {
  BarChart3,
  Map,
  Megaphone,
  Palette,
  PenTool,
  Search,
  Sparkles,
  Target,
  Users,
  type LucideIcon,
} from "lucide-react";

/** Icons referenced by name from the data files. */
export const iconMap = {
  target: Target,
  pen: PenTool,
  users: Users,
  chart: BarChart3,
  palette: Palette,
  megaphone: Megaphone,
  search: Search,
  map: Map,
  sparkles: Sparkles,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof iconMap;
