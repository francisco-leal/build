import { Metadata } from "next";
import { Stack, Typography, Link } from "@mui/joy";
import { fetchMetadata } from "frames.js/next";
import {
  getAirdropInfoForCurrentUser,
  getCurrentUser,
} from "@/app/_api/data/users";
import {
  getTreeProof,
  getTreeMultiplierProof,
} from "@/app/_api/functions/calculate-merkle-proof";
import { ClaimSection } from "@/app/_components/claim-section";
import { HowToPlay } from "@/app/_components/how-to-play";
import { PlaceholderUserNotConnected } from "@/app/_components/placeholder-user-not-connected";
import { HeroSection } from "@/shared/components/hero-section";
import { FRAMES_BASE_PATH, appURL } from "@/shared/frames/utils";
import { Helicopter } from "@/shared/icons/helicopter";

export const maxDuration = 60;

export async function generateMetadata(): Promise<Metadata> {
  return {
    other: {
      ...(await fetchMetadata(
        new URL(FRAMES_BASE_PATH + `/airdrop1`, appURL()),
      )),
    },
  };
}

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
          Claim <Helicopter /> Round 1
        </Typography>
        <Typography level="title-lg" sx={{ maxWidth: "sm" }}>
          The claiming period for Airdrop 1: Round 1 is closed.{" "}
          <Link
            href="https://buildcommunity.notion.site/BUILD-FAQ-51bd011214534fa596f15632ef788b10?pvs=4"
            target="_blank"
            textColor={"common.white"}
            underline="always"
            sx={{ textDecoration: "underline" }}
          >
            Eligible users
          </Link>{" "}
          were able to claim or commit tokens between June 30th and July 4th.
          Read more about the future of BUILD{" "}
          <Link
            href={"https://paragraph.xyz/@macedo"}
            target="_blank"
            textColor={"common.white"}
            underline="always"
            sx={{ textDecoration: "underline" }}
          >
            here
          </Link>
          .
        </Typography>
        <ClaimSection
          details={airdropDetails}
          user={user}
          getTreeProof={getTreeProof}
          getMultiplierProof={getTreeMultiplierProof}
        />
      </HeroSection>
    </Stack>
  );
}
