import { Stack, StackProps } from "@mui/joy";
import { FunctionComponent } from "react";

export type HeroSectionProps = StackProps;

export const HeroSection: FunctionComponent<HeroSectionProps> = ({
  component = "section",
  sx,
  ...props
}) => (
  <Stack
    {...props}
    component={component}
    sx={{
      mx: "auto",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      maxWidth: { xs: "md", md: "lg" },
      px: { xs: 2, md: 4, lg: 8 },
      my: { xs: 2, md: 5 },
      ...sx,
    }}
  />
);
