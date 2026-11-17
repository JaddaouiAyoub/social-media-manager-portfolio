import Image from "next/image";
import { ArrowRight, MessageSquareQuote, Quote } from "lucide-react";
import { publishedTestimonials } from "@/data/testimonials";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function TestimonialsSection() {
  const hasTestimonials = publishedTestimonials.length > 0;

  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          id="testimonials-title"
          align="center"
          eyebrow="Testimonials"
          title={
            <>
              Kind <span className="text-gradient">words</span>
            </>
          }
          description={
            hasTestimonials
              ? "Feedback shared by people I have worked with, published with their permission."
              : undefined
          }
        />

        {hasTestimonials ? (
          <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {publishedTestimonials.map((testimonial, index) => (
              <Reveal as="li" key={`${testimonial.author}-${index}`} delay={(index % 3) * 0.08}>
                <figure className="glass flex h-full flex-col rounded-[var(--radius-card)] p-7">
                  <Quote className="size-8 text-primary" aria-hidden="true" />
                  <blockquote className="mt-4 flex-1 text-[0.98rem] leading-relaxed text-fg">“{testimonial.quote}”</blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    {testimonial.avatar ? (
                      <Image src={testimonial.avatar} alt="" width={44} height={44} className="size-11 rounded-full object-cover" />
                    ) : (
                      <span className="grid size-11 place-items-center rounded-full bg-brand-gradient font-semibold text-on-primary" aria-hidden="true">
                        {testimonial.author.charAt(0)}
                      </span>
                    )}
                    <span className="leading-tight">
                      <span className="block font-semibold">{testimonial.author}</span>
                      <span className="text-sm text-muted">
                        {testimonial.role}
                        {testimonial.company ? `, ${testimonial.company}` : ""}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>
        ) : (
          <Reveal className="mx-auto mt-12 max-w-2xl">
            <div className="glass relative overflow-hidden rounded-[2rem] p-8 text-center sm:p-12">
              <div className="pointer-events-none absolute -top-20 left-1/2 size-60 -translate-x-1/2 rounded-full bg-primary/25 blur-3xl" aria-hidden="true" />
              <span className="relative mx-auto grid size-16 place-items-center rounded-2xl bg-brand-gradient text-on-primary shadow-[0_12px_30px_-10px_var(--glow-strong)]">
                <MessageSquareQuote className="size-7" aria-hidden="true" />
              </span>
              <h3 className="relative mt-6 font-display text-xl font-semibold sm:text-2xl">Testimonials are on their way</h3>
              <p className="relative mx-auto mt-3 max-w-md leading-relaxed text-muted">
                Client feedback will be shared here, only with the explicit permission of the people involved. In the
                meantime, explore the projects to see how I work.
              </p>
              <div className="relative mt-8 flex flex-wrap justify-center gap-3">
                <ButtonLink href="/#portfolio">
                  Explore the portfolio
                  <ArrowRight className="size-4" aria-hidden="true" />
                </ButtonLink>
                <ButtonLink href="/#contact" variant="secondary">
                  Start a conversation
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
