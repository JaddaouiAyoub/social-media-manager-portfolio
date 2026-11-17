"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const buildYear = new Date().getFullYear();

/**
 * Copyright year. The build-time year is rendered on the server and
 * replaced by the visitor's current year after hydration, so a static
 * build never shows an outdated year.
 */
export function CurrentYear() {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => buildYear,
  );
  return <span suppressHydrationWarning>{year}</span>;
}
