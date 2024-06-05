import { Stack, Typography, Link } from "@mui/joy";
import { getCurrentUser } from "@/app/_api/data/users";
import { calculateEligibility } from "@/app/_api/functions/calculate-eligibility";
import { EligibilityChecker } from "@/app/_components/eligibility-checker";
import { HowToPlay } from "@/app/_components/how-to-play";
import { PlaceholderUserNotConnected } from "@/app/_components/placeholder-user-not-connected";
import { HeroSection } from "@/shared/components/hero-section";

export default async function Airdrop1Page() {
  const user = await getCurrentUser();
  if (!user) return <PlaceholderUserNotConnected />;

  return (
    <Stack component="main" sx={{ color: "common.white" }}>
      <HeroSection mt={0}>
        <Typography level="h2">Eligibility Checker</Typography>
        <Stack
          sx={{
            flexDirection: "column",
          }}
        >
          <Typography level="title-lg" sx={{ pb: 8, maxWidth: "800px" }}>
            Airdrop 1 nominations period ends on June 4th, at 9pm UTC, with a
            data snapshot. To be eligible for claiming $BUILD Tokens, you need
            to comply with at least 1 of these 3 conditions below. The Airdrop 1
            token claiming period starts on June 11th.<br></br>
            <Link
              href="https://paragraph.xyz/@macedo/build-announcement-2"
              target="_blank"
              textColor="common.white"
              sx={{ textDecoration: "underline" }}
            >
              Read more
            </Link>
            .
          </Typography>
          <EligibilityChecker calculateEligibility={calculateEligibility} />
        </Stack>
      </HeroSection>
      <HeroSection>
        <HowToPlay />
      </HeroSection>
    </Stack>
  );
}
