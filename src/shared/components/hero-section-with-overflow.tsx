import { Stack, StackProps } from "@mui/joy";
import { FunctionComponent } from "react";
import { HeroSection } from "./hero-section";

export type HeroSectionWithOverflowProps = StackProps;

export const HeroSectionWithOverflow: FunctionComponent<
  HeroSectionWithOverflowProps
> = ({ component = "section", sx, ...props }) => (
  <HeroSection
    {...props}
    component={component}
    sx={{
      pl: { xs: 2, md: 3.5 },
      pr: { xs: 0, md: 0 },
      position: "relative",
      overflowX: "hidden",

      "& .no-overflow": {
        pr: { xs: 2, md: 3.5 },
      },

      "& .overflow": {
        width: "100%",
        overflowX: { xs: "scroll", md: "hidden" },
        pr: { xs: 0, md: 3.6 },

        "& > *": {
          width: { xs: 980, md: "100%" },
          mr: { xs: 2, md: 0 },
          my: 4,
        },
      },

      ...sx,
    }}
  />
);
