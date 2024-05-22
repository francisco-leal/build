"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Typography } from "@mui/joy";
import { formatLargeNumber } from "@/shared/utils/format-number";
import type { TypographyProps } from "@mui/joy";
import type { FunctionComponent, ReactNode } from "react";

async function wait(time: number) {
  await new Promise<void>((r) => setTimeout(r, time));
}

async function* incrementNumber(
  start: number,
  end: number,
  step: number = 1,
  interval: number = 100,
): AsyncGenerator<number> {
  let current = start;
  while (current <= end) {
    yield current;
    current += step;
    await wait(interval);
  }
}

export type IncrementingNumberProps = {
  start: number;
  end: number;
  step?: number;
  interval?: number;
  icon?: ReactNode;
} & Omit<TypographyProps, "children">;

export const IncrementingNumber: FunctionComponent<IncrementingNumberProps> = ({
  start,
  end,
  step = 1,
  interval = 100,
  icon,
  ...props
}) => {
  const [text, setText] = useState(formatLargeNumber(start));
  const generator = useMemo(
    () => incrementNumber(start, end, step, interval),
    [start, end, step, interval],
  );

  useEffect(() => {
    let isMounted = true;

    (async () => {
      for await (const value of generator) {
        if (isMounted) {
          setText(formatLargeNumber(value));
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [generator]);

  return (
    <Typography
      textColor="neutral.900"
      sx={{
        fontWeight: 700,
        lineHeight: "133%",
        fontSize: "36px",
        display: "flex",
        gap: 1,
        alignItems: "center",
      }}
      {...props}
    >
      {icon}
      {text}
    </Typography>
  );
};
