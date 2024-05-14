import { FunctionComponent } from "react";
import { Stack, Typography } from "@mui/joy";
import { default as backgroundImage } from "@/app/_images/icons-background.png";
import { ConnectWalletButton } from "@/shared/components/connect-wallet-button";
import { HeroSection } from "@/shared/components/hero-section";
import { HeroSectionSlim } from "@/shared/components/hero-section-slim";
import { HowToPlay } from "./how-to-play";

export const PlaceholderUserNotConnected: FunctionComponent = () => (
  <Stack component="main">
    <HeroSectionSlim backgroundImage={backgroundImage.src}>
      <Typography level="h1">Enter the BUILD game</Typography>
      <Typography level="title-lg" sx={{ maxWidth: "sm" }}>
        Connect your wallet to start nominating builders and earn BUILD.
      </Typography>
      <ConnectWalletButton sx={{ my: 2 }} />
    </HeroSectionSlim>
    <HeroSection>
      <HowToPlay />
    </HeroSection>
  </Stack>
);
