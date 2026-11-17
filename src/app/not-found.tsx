import { ArrowLeft } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main id="main" className="relative grid min-h-[80dvh] place-items-center overflow-x-clip px-4 pt-28 pb-16 text-center">
      <div className="pointer-events-none absolute top-1/4 left-1/2 -z-10 size-96 -translate-x-1/2 rounded-full bg-primary/25 blur-[120px]" aria-hidden="true" />
      <div className="flex flex-col items-center">
        <p className="font-display text-8xl font-extrabold text-gradient sm:text-9xl">404</p>
        <h1 className="mt-4 font-display text-2xl font-semibold sm:text-3xl">This page could not be found</h1>
        <p className="mt-3 max-w-md text-muted">The link may be broken or the page may have been moved.</p>
        <ButtonLink href="/" size="lg" className="mt-8">
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to home
        </ButtonLink>
      </div>
    </main>
  );
}
