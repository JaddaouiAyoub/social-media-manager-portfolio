import { ArrowRight, Layers } from "lucide-react";
import Link from "next/link";
import { profile } from "@/data/profile";
import { highlights, verifiedStats } from "@/data/stats";
import { iconMap } from "@/components/icons/icon-map";
import { ButtonIcon, ButtonLink } from "@/components/ui/Button";
import { Counter } from "@/components/ui/Counter";
import { FadeIn } from "@/components/ui/FadeIn";
import { IntroVideoButton } from "@/components/ui/IntroVideoButton";
import { HeroVisual } from "@/components/visuals/HeroVisual";

export function HeroSection() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pt-28 pb-16 sm:pt-32 lg:min-h-[100svh] lg:pt-36 lg:pb-24"
    >
      <HeroBackground />

      <div className="container-page grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
        <div className="relative z-10 flex flex-col items-start">
          <FadeIn delay={0.1} className="flex flex-wrap items-center gap-2">
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium">
              <span className="size-2 rounded-full bg-primary shadow-[0_0_10px_var(--primary)]" aria-hidden="true" />
              {profile.role}
            </span>
            {profile.availability.confirmed ? (
              <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium text-success">
                <span className="relative flex size-2" aria-hidden="true">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-success" />
                </span>
                {profile.availability.label}
              </span>
            ) : (
              <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium text-muted">
                {profile.focus}
              </span>
            )}
          </FadeIn>

          <h1
            id="hero-title"
            className="mt-7 font-display text-[clamp(2.5rem,8.6vw,5rem)] leading-[0.98] font-extrabold tracking-[-0.035em] text-fg"
          >
            <FadeIn delay={0.2} as="span" className="block">
              {profile.headline.lead}
            </FadeIn>
            <FadeIn delay={0.28} as="span" className="inline">
              {profile.headline.middle}{" "}
            </FadeIn>
            <FadeIn delay={0.35} as="span" className="relative inline-block">
              <span className="relative inline-block pr-[0.15em] pb-[0.15em] font-script text-[1.12em] leading-[0.9] font-normal tracking-normal text-gradient">
                {profile.headline.accent}
                <svg
                  viewBox="0 0 300 20"
                  className="absolute -bottom-[0.05em] left-[8%] h-[0.22em] w-[88%] text-magenta"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path d="M2 14C80 4 180 2 298 10" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                </svg>
              </span>
            </FadeIn>
          </h1>

          <FadeIn delay={0.5}>
            <p className="mt-7 max-w-md text-base leading-relaxed text-pretty text-muted sm:text-lg">{profile.intro}</p>
          </FadeIn>

          <FadeIn delay={0.62} className="mt-9 flex flex-wrap items-center gap-4">
            <ButtonLink href="/#portfolio" size="lg">
              Explore My Work
              <ButtonIcon>
                <ArrowRight className="size-4" />
              </ButtonIcon>
            </ButtonLink>
            {profile.introVideoUrl ? (
              <IntroVideoButton url={profile.introVideoUrl} />
            ) : (
              <ButtonLink href="/#services" size="lg" variant="secondary">
                <Layers className="size-4 text-primary" aria-hidden="true" />
                View Services
              </ButtonLink>
            )}
          </FadeIn>

          <FadeIn delay={0.75} className="mt-11 w-full">
            {verifiedStats.length > 0 ? (
              <ul className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-3" aria-label="Key figures">
                {verifiedStats.map((stat) => {
                  const Icon = iconMap[stat.icon];
                  return (
                    <li key={stat.label} className="glass flex items-center gap-3 rounded-2xl p-4">
                      <Icon className="size-6 shrink-0 text-primary" aria-hidden="true" />
                      <div className="leading-tight">
                        <p className="font-display text-xl font-bold">
                          <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                        </p>
                        <p className="text-xs text-muted">{stat.label}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <ul className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-3" aria-label="What I focus on">
                {highlights.map((item) => {
                  const Icon = iconMap[item.icon];
                  return (
                    <li
                      key={item.title}
                      className="glass group flex items-center gap-3 rounded-2xl p-3.5 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-primary/40 lg:max-xl:flex-col lg:max-xl:items-start"
                    >
                      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary transition-transform duration-300 group-hover:scale-110">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <div className="leading-tight">
                        <p className="font-display text-[0.95rem] font-semibold">{item.title}</p>
                        <p className="text-xs text-muted">{item.description}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </FadeIn>
        </div>

        <div className="relative px-6 sm:px-10 lg:px-0">
          <HeroVisual />
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}

function HeroBackground() {
  return (
    <div className="noise pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
      <div className="absolute -top-40 -left-40 size-[34rem] rounded-full bg-primary/25 blur-[120px]" />
      <div className="absolute top-1/3 -right-40 size-[30rem] rounded-full bg-magenta/20 blur-[120px]" />
      <div className="absolute bottom-0 left-1/3 size-[22rem] rounded-full bg-blue/15 blur-[110px]" />
      <p className="absolute top-24 right-0 hidden font-display text-[11vw] leading-none font-extrabold tracking-tighter whitespace-nowrap text-transparent opacity-[0.07] [-webkit-text-stroke:1.5px_var(--fg)] xl:block">
        Digital Marketing
      </p>
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
    </div>
  );
}

function ScrollIndicator() {
  return (
    <Link
      href="/#about"
      className="group absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs font-medium text-muted transition-colors hover:text-fg lg:flex"
    >
      <span className="flex h-9 w-6 justify-center rounded-full border-2 border-current pt-1.5">
        <span className="h-2 w-1 animate-bounce rounded-full bg-primary" />
      </span>
      Scroll Down
    </Link>
  );
}
