/**
 * Global site configuration: navigation, SEO defaults and theme behaviour.
 */

export type NavItem = { id: string; label: string };

export const navItems: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "portfolio", label: "Portfolio" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
];

export type ThemePreference = "dark" | "light" | "system";

export const siteConfig = {
  /** Public URL used for canonical links, Open Graph and the sitemap. */
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, ""),
  title: "Ayoub Jaddaoui — Social Media Manager",
  shortTitle: "Ayoub Jaddaoui",
  description:
    "Portfolio of Ayoub Jaddaoui, Social Media Manager. Social media strategy, content creation, community management and analytics to help brands grow online.",
  keywords: [
    "Ayoub Jaddaoui",
    "Social Media Manager",
    "Social Media Strategy",
    "Content Creation",
    "Community Management",
    "Digital Marketing",
  ],
  locale: "en_US",
  /**
   * Theme used on a visitor's first visit. "dark" matches the brand identity;
   * set to "system" to follow the visitor's OS preference instead.
   * The visitor's own choice is always persisted afterwards.
   */
  defaultTheme: "dark" as ThemePreference,
  themeStorageKey: "aj-theme",
};
