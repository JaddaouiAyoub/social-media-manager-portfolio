import { profile } from "@/data/profile";
import { siteConfig } from "@/data/site";
import { activeSocialLinks, contact } from "@/data/socials";

/** Structured data describing the site owner (schema.org Person). */
export function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    description: profile.intro,
    url: siteConfig.url,
    ...(contact.email ? { email: `mailto:${contact.email}` } : {}),
    ...(activeSocialLinks.length > 0 ? { sameAs: activeSocialLinks.map((link) => link.href) } : {}),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\u003c") }}
    />
  );
}
