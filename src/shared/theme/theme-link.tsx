import { ComponentProps, forwardRef } from "react";
import { default as NextLink } from "next/link";

/**
 * Replaces the Joy UI Link with a Next.js Link, enabling all black magic
 * Next Does when you hover a link.
 */
export const ThemeLink = forwardRef<
  HTMLAnchorElement,
  ComponentProps<typeof NextLink>
>(function Link(props, ref) {
  return <NextLink ref={ref} {...props} />;
});
