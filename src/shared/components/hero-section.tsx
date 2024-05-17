import { FunctionComponent } from "react";
import { Stack, StackProps } from "@mui/joy";

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
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      width: "100%",
      maxWidth: { xs: "md", md: "lg" },
      mx: "auto",
      px: { xs: 2, md: 3.5 },
      mb: { xs: 4, md: 8 },
      mt: { xs: 0, md: 0 },
      ...sx,
    }}
  />
);
