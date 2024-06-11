import { Stack, Typography, Link, Button } from "@mui/joy";
import {
  getAirdropInfoForCurrentUser,
  getCurrentUser,
} from "@/app/_api/data/users";
import { ClaimSection } from "@/app/_components/claim-section";
import { HowToPlay } from "@/app/_components/how-to-play";
import { PlaceholderUserNotConnected } from "@/app/_components/placeholder-user-not-connected";
import { HeroSection } from "@/shared/components/hero-section";
import { Helicopter } from "@/shared/icons/helicopter";

export default async function Airdrop1Page() {
  const user = await getCurrentUser();
  if (!user) return <PlaceholderUserNotConnected />;

  const airdropDetails = await getAirdropInfoForCurrentUser();

  return (
    <Stack component="main" sx={{ color: "common.white" }}>
      <HeroSection mt={0}>
        <Typography
          level="h2"
          sx={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            gap: 1,
          }}
        >
          Claim <Helicopter /> Airdrop
        </Typography>
        <Typography level="title-lg" sx={{ maxWidth: "sm" }}>
          Reward your favorite builders with $BUILD tokens, and earn 10% of
          every nomination. Search for their name or share your custom link.
        </Typography>
        <ClaimSection details={airdropDetails} />
      </HeroSection>
      <HeroSection>
        <HowToPlay />
      </HeroSection>
    </Stack>
  );
}
