import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { ProjectBadge } from "@/components/ui/ProjectBadge";
import { ProjectDetails } from "@/components/ui/ProjectDetails";
import { ProjectCover } from "@/components/visuals/ProjectCover";
import { getProjectBySlug, projects } from "@/data/projects";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((project) => ({ slug: project.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: { title: project.title, description: project.summary, url: `/projects/${project.slug}` },
  };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <main id="main" className="relative overflow-x-clip pt-28 pb-24 sm:pt-36">
        <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 size-[40rem] -translate-x-1/2 rounded-full bg-primary/20 blur-[140px]" aria-hidden="true" />
        <article className="container-page max-w-4xl">
          <FadeIn>
            <Link href="/#portfolio" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-fg">
              <ArrowLeft className="size-4" aria-hidden="true" />
              Back to portfolio
            </Link>
            <p className="mt-6 text-xs font-semibold tracking-[0.14em] text-primary uppercase">{project.category}</p>
            <h1 className="mt-3 font-display text-4xl leading-tight font-bold tracking-tight text-balance sm:text-5xl">{project.title}</h1>
            <p className="mt-4 text-lg text-muted">{project.summary}</p>
          </FadeIn>

          <FadeIn delay={0.15} className="relative mt-10 overflow-hidden rounded-[2rem] border border-line card-shadow">
            <ProjectCover project={project} className="aspect-[16/8]" priority />
            <div className="absolute top-4 left-4">
              <ProjectBadge kind={project.kind} />
            </div>
          </FadeIn>

          <FadeIn delay={0.25} className="mt-12">
            <ProjectDetails project={project} headingLevel="h2" />
          </FadeIn>

          <div className="mt-16 flex flex-col gap-4 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/#contact" className={buttonClasses({ size: "lg" })}>
              Discuss a similar project
            </Link>
            {next && next.slug !== project.slug && (
              <Link href={`/projects/${next.slug}`} className="group inline-flex min-h-11 items-center gap-2 font-semibold text-fg hover:text-primary">
                Next: {next.title}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            )}
          </div>
        </article>
      </main>
    </>
  );
}
