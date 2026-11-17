import { services } from "@/data/services";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";

export function ServicesSection() {
  return (
    <section id="services" aria-labelledby="services-title" className="relative py-20 sm:py-28">
      <div
        className="pointer-events-none absolute top-0 right-0 -z-10 size-[30rem] rounded-full bg-magenta/10 blur-[130px]"
        aria-hidden="true"
      />
      <div className="container-page">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            id="services-title"
            eyebrow="Services"
            title={
              <>
                How I can help your <span className="text-gradient">brand grow</span>
              </>
            }
            description="From the first strategy session to the monthly report, these are the services I offer to build a consistent and engaging presence on social media."
          />
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal as="li" key={service.id} delay={(index % 3) * 0.08} className="h-full">
              <ServiceCard service={service} index={index} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
