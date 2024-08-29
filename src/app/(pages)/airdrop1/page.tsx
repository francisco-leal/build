import { Stack, Typography, Link } from "@mui/joy";
import { getCurrentUser } from "@/app/_api/data/users";
import { PlaceholderUserNotConnected } from "@/app/_components/placeholder-user-not-connected";
import { HeroSection } from "@/shared/components/hero-section";
import { Helicopter } from "@/shared/icons/helicopter";

export const maxDuration = 60;

export default async function Airdrop1Page() {
  const user = await getCurrentUser();
  if (!user) return <PlaceholderUserNotConnected />;

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
          The claiming period for{" "}
          <Link
            href="https://paragraph.xyz/@macedo/build-log-9"
            target="_blank"
            textColor={"common.white"}
            underline="always"
            sx={{ textDecoration: "underline" }}
          >
            Round 2 will open soon.
          </Link>{" "}
          <br />
          Read more about the{" "}
          <Link
            href={"https://paragraph.xyz/@macedo/build-log-9"}
            target="_blank"
            textColor={"common.white"}
            underline="always"
            sx={{ textDecoration: "underline" }}
          >
            claim process
          </Link>
          .
        </Typography>
      </HeroSection>
    </Stack>
  );
}
