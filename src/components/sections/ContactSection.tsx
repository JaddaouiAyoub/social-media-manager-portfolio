import { ArrowUpRight } from "lucide-react";
import { getDirectContactLinks } from "@/data/socials";
import { isContactConfigured } from "@/lib/contact-config";
import { BrandIcon } from "@/components/icons/BrandIcon";
import { ContactForm } from "@/components/ui/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";

export function ContactSection() {
  const links = getDirectContactLinks();
  const configured = isContactConfigured();

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-1/3 -z-10 mx-auto h-[28rem] max-w-4xl rounded-full bg-primary/15 blur-[140px]" aria-hidden="true" />
      <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="flex flex-col items-start">
          <Reveal>
            <Eyebrow>Contact</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 id="contact-title" className="mt-5 font-display text-4xl leading-[1.05] font-bold tracking-tight text-balance sm:text-5xl">
              Let&apos;s grow your brand <span className="font-script font-normal text-gradient">together</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">
              Have a project, a launch or simply a question about your social media? Tell me a little about it and
              let&apos;s see how I can help.
            </p>
          </Reveal>

          <Reveal delay={0.18} className="mt-10 w-full">
            <h3 className="text-sm font-semibold tracking-[0.14em] text-subtle uppercase">Reach me directly</h3>
            {links.length > 0 ? (
              <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {links.map((link) => {
                  const external = link.platform !== "email";
                  return (
                    <li key={link.platform}>
                      <a
                        href={link.href}
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="glass group flex min-h-16 items-center gap-3 rounded-2xl px-4 py-3 transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-primary/40"
                      >
                        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                          <BrandIcon platform={link.platform} className="size-[1.1rem]" />
                        </span>
                        <span className="min-w-0 flex-1 leading-tight">
                          <span className="block font-medium">{link.label}</span>
                          {link.handle && <span className="block truncate text-sm text-muted">{link.handle}</span>}
                        </span>
                        <ArrowUpRight className="size-4 text-subtle transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" aria-hidden="true" />
                        {external && <span className="sr-only">(opens in a new tab)</span>}
                      </a>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="glass mt-4 rounded-2xl p-5 text-sm leading-relaxed text-muted">
                Direct contact details (email and social profiles) will be published here very soon.
              </p>
            )}
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="glass relative rounded-[2rem] p-6 card-shadow sm:p-9">
            <ContactForm configured={configured} showSetupHint={process.env.NODE_ENV === "development"} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
