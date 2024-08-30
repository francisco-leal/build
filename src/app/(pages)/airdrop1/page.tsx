import { Stack, Typography, Link } from "@mui/joy";
import { getCurrentUser } from "@/app/_api/data/users";
import { getAirdropInfoForCurrentUser } from "@/app/_api/data/users";
import { ClaimSection } from "@/app/_components/claim-section";
import { PlaceholderUserNotConnected } from "@/app/_components/placeholder-user-not-connected";
import { HeroSection } from "@/shared/components/hero-section";
import { Helicopter } from "@/shared/icons/helicopter";

export const maxDuration = 60;

export default async function AirdropPage() {
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
          Claim <Helicopter /> Round 2
        </Typography>
        <Typography level="title-lg" sx={{ maxWidth: "sm" }}>
          Claiming Round 2 tokens is available until September 30th. You need a
          Talent Passport with a{" "}
          <Link
            href="https://docs.talentprotocol.com/docs/protocol-overview/talent-passport/human-checkmark"
            target="_blank"
            textColor={"common.white"}
            underline="always"
            sx={{ textDecoration: "underline" }}
          >
            Human Checkmark
          </Link>{" "}
          to claim.<br></br>Check the latest BUILD announcements{" "}
          <Link
            href={"https://paragraph.xyz/@macedo/build-log-9"}
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
    </Stack>
  );
}
