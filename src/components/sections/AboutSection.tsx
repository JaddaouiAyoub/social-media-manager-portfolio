import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { profile } from "@/data/profile";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { NeonSign } from "@/components/visuals/NeonSign";

export function AboutSection() {
  const { about } = profile;

  return (
    <section id="about" aria-labelledby="about-title" className="relative scroll-mt-24 py-20 sm:py-28">
      <div
        className="pointer-events-none absolute top-1/4 -left-40 -z-10 size-[28rem] rounded-full bg-primary/15 blur-[120px]"
        aria-hidden="true"
      />
      <div className="container-page grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal className="relative">
          <div className="absolute -inset-3 -z-10 rounded-[2.4rem] bg-brand-gradient opacity-30 blur-2xl" aria-hidden="true" />
          {profile.portrait.src ? (
            <div className="relative aspect-[4/3.4] overflow-hidden rounded-[2rem] border border-line card-shadow">
              <Image
                src={profile.portrait.src}
                alt={profile.portrait.alt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          ) : (
            <NeonSign />
          )}
        </Reveal>

        <div className="flex flex-col items-start">
          <Reveal>
            <Eyebrow>{about.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="about-title"
              className="mt-5 font-display text-3xl leading-[1.12] font-bold tracking-tight text-balance sm:text-4xl lg:text-[2.8rem]"
            >
              {about.title.lead} <span className="text-gradient">{about.title.accent}</span> {about.title.tail}
            </h2>
          </Reveal>
          {about.paragraphs.map((paragraph, index) => (
            <Reveal key={index} delay={0.14 + index * 0.06}>
              <p className="mt-5 text-base leading-relaxed text-pretty text-muted sm:text-lg">{paragraph}</p>
            </Reveal>
          ))}

          <Reveal delay={0.26} className="w-full">
            <ul className="mt-8 grid gap-3 sm:grid-cols-3">
              {about.values.map((value) => (
                <li key={value.title} className="glass rounded-2xl p-4">
                  <p className="flex items-center gap-2 font-display text-sm font-semibold">
                    <CheckCircle2 className="size-4 text-primary" aria-hidden="true" />
                    {value.title}
                  </p>
                  <p className="mt-1.5 text-sm leading-snug text-muted">{value.description}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.34} className="mt-8 self-end">
            <p className="-rotate-3 font-script text-4xl text-gradient sm:text-5xl" aria-label={`Signature: ${profile.name}`}>
              {profile.name}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
