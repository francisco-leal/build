import { Box } from "@mui/joy";
import { default as backgroundImage } from "@/app/_images/icons-background.png";

export const BackgroundImage = () => (
  <Box
    sx={{
      position: "absolute",
      transform: "translateX(-50%)",
      top: 0,
      left: "50%",
      width: "100%",
      maxWidth: { xs: "md", md: "lg" },
      height: 520,
      backgroundImage: { lg: `url(${backgroundImage.src})` },
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      zIndex: -1,
    }}
  />
);
