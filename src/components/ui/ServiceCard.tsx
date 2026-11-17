import { Check } from "lucide-react";
import type { Service } from "@/data/services";
import { iconMap } from "@/components/icons/icon-map";
import { SpotlightCard } from "./SpotlightCard";

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = iconMap[service.icon];
  return (
    <SpotlightCard as="article" className="flex h-full flex-col p-6 sm:p-7">
      <div className="relative flex items-start justify-between">
        <span className="grid size-14 place-items-center rounded-2xl bg-brand-gradient text-on-primary shadow-[0_12px_30px_-10px_var(--glow-strong)] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
          <Icon className="size-6" aria-hidden="true" />
        </span>
        <span className="font-display text-sm font-semibold text-subtle tabular-nums" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <h3 className="relative mt-6 font-display text-xl font-semibold tracking-tight">{service.title}</h3>
      <p className="relative mt-3 text-[0.95rem] leading-relaxed text-muted">{service.description}</p>
      <ul className="relative mt-6 flex flex-wrap gap-2 pt-5 [border-top:1px_solid_var(--border)]">
        {service.points.map((point) => (
          <li key={point} className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-fg">
            <Check className="size-3 text-primary" aria-hidden="true" />
            {point}
          </li>
        ))}
      </ul>
    </SpotlightCard>
  );
}
