import { Stack, Typography, Link } from "@mui/joy";
import { getCurrentUser } from "@/app/_api/data/users";
import { calculateEligibility } from "@/app/_api/functions/calculate-eligibility";
import { EligibilityChecker } from "@/app/_components/eligibility-checker";
import { HowToPlay } from "@/app/_components/how-to-play";
import { PlaceholderUserNotConnected } from "@/app/_components/placeholder-user-not-connected";
import { HeroSection } from "@/shared/components/hero-section";

export default async function EligibilityPage() {
  const user = await getCurrentUser();
  if (!user) return <PlaceholderUserNotConnected />;

  return (
    <Stack component="main" sx={{ color: "common.white" }}>
      <HeroSection mt={0}>
        <Typography level="h2">Check for eligibility</Typography>
        <Stack
          sx={{
            flexDirection: "column",
          }}
        >
          <Typography level="title-lg" sx={{ pb: 8 }}>
            To participate in the airdrop, there are certain criteria you must
            follow.<br></br>You can check your eligibility below.<br></br>
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
