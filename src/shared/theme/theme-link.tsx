import { default as NextLink, LinkProps } from "next/link";
import { forwardRef } from "react";

/**
 * Replaces the Joy UI Link with a Next.js Link, enabling all black magic
 * Next Does when you hover a link.
 */
export const ThemeLink = forwardRef<HTMLAnchorElement, LinkProps>(function Link(props, ref) {
    return <NextLink ref={ref} {...props} />;
});