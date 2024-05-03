import { Box, Stack, StackProps } from "@mui/joy";
import { FunctionComponent } from "react";

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
      pt: { xs: 8, lg: 14 },
      pb: 2,
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      ...props.sx,
    }}
  >
    {backgroundImage && (
      <Box
        sx={{
          position: "absolute",
          top: 0,
          width: "100%",
          height: "100%",
          backgroundImage: { lg: `url(${backgroundImage})` },
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          zIndex: -1,
        }}
      />
    )}
    <Stack
      sx={{
        maxWidth: "sm",
        width: "100%",
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
