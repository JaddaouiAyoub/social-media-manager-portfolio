/**
 * Contact details and social profiles.
 *
 * Fill in the real values provided by the owner. Any entry with an empty
 * `href` is hidden everywhere on the site (header rail, contact, footer).
 * Never put a placeholder address here: empty means "not shown".
 */

export type SocialPlatform =
  | "linkedin"
  | "instagram"
  | "tiktok"
  | "youtube"
  | "facebook"
  | "x"
  | "behance"
  | "email";

export type SocialLink = {
  platform: SocialPlatform;
  label: string;
  href: string;
  /** Text shown in the contact section, e.g. "@handle". Optional. */
  handle?: string;
};

export const contact = {
  /** Professional email, e.g. "hello@your-domain.com". */
  email: "",
  /** Optional phone number in international format, e.g. "+212 6 00 00 00 00". */
  phone: "",
};

export const socialLinks: SocialLink[] = [
  { platform: "linkedin", label: "LinkedIn", href: "" },
  { platform: "instagram", label: "Instagram", href: "" },
  { platform: "tiktok", label: "TikTok", href: "" },
  { platform: "youtube", label: "YouTube", href: "" },
  { platform: "facebook", label: "Facebook", href: "" },
  { platform: "x", label: "X (Twitter)", href: "" },
  { platform: "behance", label: "Behance", href: "" },
];

/** Social links that actually have a URL. */
export const activeSocialLinks = socialLinks.filter((link) => link.href.trim() !== "");

/** All direct contact channels (email + phone + socials) that are configured. */
export function getDirectContactLinks(): SocialLink[] {
  const links: SocialLink[] = [];
  if (contact.email) {
    links.push({
      platform: "email",
      label: "Email",
      href: `mailto:${contact.email}`,
      handle: contact.email,
    });
  }
  return [...links, ...activeSocialLinks];
}
