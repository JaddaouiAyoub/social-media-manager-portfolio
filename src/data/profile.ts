/**
 * Personal information displayed across the site.
 *
 * Everything here is meant to be edited by the owner. Fields that are empty
 * strings / `null` / `false` are simply not rendered, so the site never
 * shows invented information.
 */

export type Availability = {
  /** Set to `true` only once availability has been confirmed by the owner. */
  confirmed: boolean;
  /** Label shown in the green status badge when `confirmed` is true. */
  label: string;
};

export type Profile = {
  name: string;
  firstName: string;
  initial: string;
  role: string;
  /** Short neutral descriptor shown in the hero when availability is not confirmed. */
  focus: string;
  location: string;
  /** Rendered as: "<lead>" on the first line, then "<middle> <accent>" with the accent in script. */
  headline: { lead: string; middle: string; accent: string };
  intro: string;
  about: {
    eyebrow: string;
    title: { lead: string; accent: string; tail: string };
    paragraphs: string[];
    values: { title: string; description: string }[];
  };
  availability: Availability;
  /** Optional URL of a real intro video (YouTube embed URL or an .mp4 file). */
  introVideoUrl: string;
  /**
   * Optional real portrait placed in `public/images/` (e.g. "/images/portrait.jpg").
   * Leave empty to use the abstract illustrated composition.
   */
  portrait: { src: string; alt: string };
};

export const profile: Profile = {
  name: "Ayoub Jaddaoui",
  firstName: "Ayoub",
  initial: "A",
  role: "Social Media Manager",
  focus: "Strategy · Content · Community",
  location: "",
  headline: { lead: "Grow Your", middle: "Brand", accent: "Digitally" },
  intro:
    "I help brands build a strong online presence through creative content, smart strategy and data-driven decisions.",
  about: {
    eyebrow: "About Me",
    title: { lead: "Passionate about", accent: "Digital Marketing", tail: "& Content" },
    paragraphs: [
      "As a Social Media Manager, I turn ideas into engaging content and strategies into measurable actions. I enjoy the full cycle: understanding a brand, imagining what will resonate with its audience, publishing with consistency and learning from every number.",
      "My approach blends creativity and analysis. Every post, visual and campaign should serve a clear goal, speak in the brand's own voice and help build a community that genuinely cares.",
    ],
    values: [
      {
        title: "Strategy first",
        description: "Clear goals and a plan before the first post.",
      },
      {
        title: "Creative by nature",
        description: "Content designed to stop the scroll and stay on-brand.",
      },
      {
        title: "Driven by data",
        description: "Decisions guided by analytics, not guesswork.",
      },
    ],
  },
  availability: {
    confirmed: false,
    label: "Available for new projects",
  },
  introVideoUrl: "",
  portrait: { src: "", alt: "Portrait of Ayoub Jaddaoui" },
};
