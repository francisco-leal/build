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
          The Airdrop 1 token claiming period is opening soon.{" "}
          <Link
            href="https://buildcommunity.notion.site/BUILD-FAQ-51bd011214534fa596f15632ef788b10?pvs=4"
            target="_blank"
            textColor={"common.white"}
            underline="always"
            sx={{ textDecoration: "underline" }}
          >
            Eligible users
          </Link>
          can start claiming on June 12th until June 30th. Read more about the
          future of BUILD{" "}
          <Link
            href="https://paragraph.xyz/@macedo/build-announcement-4"
            target="_blank"
            textColor={"common.white"}
            underline="always"
            sx={{ textDecoration: "underline" }}
          >
            here
          </Link>
          .
        </Typography>
        <ClaimSection details={airdropDetails} user={user} />
      </HeroSection>
      <HeroSection>
        <HowToPlay />
      </HeroSection>
    </Stack>
  );
}
