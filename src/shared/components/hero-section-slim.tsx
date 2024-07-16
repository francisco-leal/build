import { FunctionComponent } from "react";
import { Box, Stack, StackProps } from "@mui/joy";

export type HeroSectionProps = StackProps & {
  backgroundImage?: string;
};

export const HeroSectionSlim: FunctionComponent<HeroSectionProps> = ({
  backgroundImage,
  component = "section",
  children,
  ...props
}) => (
  <Stack
    {...props}
    component={component}
    sx={{
      pt: { xs: 4, lg: 8 },
      mb: { xs: 2, md: 5 },
      pb: 2,
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      ...props.sx,
    }}
  >
    <Stack
      sx={{
        maxWidth: "sm",
        width: "100%",
        position: "relative",
        px: { xs: 2, sm: 0 },
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "common.white",
      }}
    >
      {children}
    </Stack>
  </Stack>
);
