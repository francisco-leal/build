import { Stack, Typography, Link } from "@mui/joy";
import {
  getAirdropInfoForCurrentUser,
  getCurrentUser,
} from "@/app/_api/data/users";
import {
  getTreeProof,
  getTreeMultiplierProof,
} from "@/app/_api/functions/calculate-merkle-proof";
import { ClaimSection } from "@/app/_components/claim-section";
import { PlaceholderUserNotConnected } from "@/app/_components/placeholder-user-not-connected";
import { HeroSection } from "@/shared/components/hero-section";
import { Helicopter } from "@/shared/icons/helicopter";

export const maxDuration = 60;

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
          The claiming period for {" "}
          <Link
            href="https://buildcommunity.notion.site/BUILD-FAQ-51bd011214534fa596f15632ef788b10?pvs=4"
            target="_blank"
            textColor={"common.white"}
            underline="always"
            sx={{ textDecoration: "underline" }}
          >
            Round 1 of Airdrop 1 is over.
          </Link>{" "}
          <br />
          Read more about the {" "}
          <Link
            href={"https://paragraph.xyz/@macedo"}
            target="_blank"
            textColor={"common.white"}
            underline="always"
            sx={{ textDecoration: "underline" }}
          >
            future of BUILD
          </Link>
          .
        </Typography>
        <ClaimSection
          details={airdropDetails}
          getTreeProof={getTreeProof}
          getMultiplierProof={getTreeMultiplierProof}
        />
      </HeroSection>
    </Stack>
  );
}
