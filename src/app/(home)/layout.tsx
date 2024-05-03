import { Header } from "@/shared/components/header";
import { Footer } from "@/shared/components/footer";
import { Button, Link, Stack, Typography } from "@mui/joy";
import { HeroSectionSlim } from "@/shared/components/hero-section-slim";
import {
  Eye,
  Interface,
  MusicHeadeset,
  Terminal,
  UserManLove,
  UserShield,
} from "@/shared/icons";
import { SearchNomination } from "@/shared/components/search-nominations";
import { HeroSection } from "@/shared/components/hero-section";
import { BlockyCard } from "@/shared/components/blocky-card";
import { HeroSectionWithOverflow } from "@/shared/components/hero-section-with-overflow";
import { DateTime } from "luxon";

export default function HomePageLayout({
  leaderboardTable,
}: {
  leaderboardTable: React.ReactNode;
}) {
  const now = DateTime.utc().startOf("hour");
  const format = "LLL dd, hh:mm a 'UTC'";
  const lastUpdate = now.toFormat(format);
  const nextUpdate = now.plus({ hour: 1 }).toFormat(format);

  return (
    <Stack component="main">
      <HeroSectionSlim>
        <Typography level="h1">
          Nominate <Interface /> the best
          <br />
          builders <MusicHeadeset /> you know.
        </Typography>

        <Typography level="title-lg" sx={{ maxWidth: "sm" }}>
          Read the{" "}
          <Link
            href="/memo"
            sx={{ color: "common.white", textDecoration: "underline" }}
          >
            memo
          </Link>
          : there&apos;s no room for builders in the corporate world! Stand for
          builders, play the nomination game, and earn $BOSS. Nominations start
          on May 8th.
        </Typography>

        <SearchNomination
          sx={{
            mt: 1,
            alignItems: "center",
            width: "100%",
            height: 280,
          }}
        />
      </HeroSectionSlim>
      <HeroSection sx={{ flexDirection: { xs: "column", md: "row" }, gap: 3 }}>
        <BlockyCard sx={{ minHeight: 250 }}>
          <Eye />
          <Typography level="h3" textColor="common.black">
            What is BOSS?
          </Typography>
          <Typography textColor="neutral.500">
            BOSS is a meme, a token of appreciation and a social game designed
            to reward builders via onchain nominations.
          </Typography>
        </BlockyCard>
        <BlockyCard sx={{ minHeight: 250 }}>
          <Terminal />
          <Typography level="h3" textColor="common.black">
            How BOSS works?
          </Typography>
          <Typography textColor="neutral.500">
            Players have a daily budget of BOSS points to donate to 3 builders a
            day. Points will convert to $BOSS tokens in June.
          </Typography>
        </BlockyCard>
      </HeroSection>
      <HeroSectionWithOverflow>
        <Typography
          level="h2"
          className="no-overflow"
          textColor={"common.white"}
        >
          Leaderboard
        </Typography>
        <Stack className="overflow">{leaderboardTable}</Stack>

        <Typography
          className="no-overflow"
          level="body-sm"
          sx={{ color: "common.white" }}
        >
          Last update on {lastUpdate}. Next update on {nextUpdate}
        </Typography>
      </HeroSectionWithOverflow>
      <HeroSection sx={{ color: "common.white" }}>
        <Typography level="h2">Become a BOSS</Typography>
        <Stack
          sx={{
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: 3,
          }}
        >
          <Stack
            sx={{
              height: "100%",
              flex: 1,
              alignItems: "center",
              minHeight: 320,
              py: 5,
            }}
          >
            <UserShield sx={{ width: 48, height: 48, color: "common.white" }} />

            <Typography level="h3">Step 1</Typography>

            <Typography>
              Claim your Talent Passport, and increase your Builder Score before
              the first snapshot, on May 7th at 17:59 UTC.
            </Typography>

            <Button
              variant="solid"
              color="neutral"
              component={Link}
              href="https://passport.talentprotocol.com"
              underline="none"
              sx={{ mt: "auto" }}
            >
              Claim Talent Passport
            </Button>
          </Stack>

          <Stack
            sx={{
              height: "100%",
              flex: 1,
              alignItems: "center",
              minHeight: 320,
              py: 5,
            }}
          >
            <UserManLove
              sx={{ width: 48, height: 48, color: "common.white" }}
            />

            <Typography level="h3">Step 2</Typography>

            <Typography>
              Nominate the best builders you know by searching for their web3
              username or by sending them your personal link.
            </Typography>

            <Button
              variant="solid"
              color="neutral"
              component={Link}
              href="/"
              underline="none"
              sx={{ mt: "auto" }}
            >
              Share Link
            </Button>
          </Stack>
        </Stack>
      </HeroSection>
    </Stack>
  );
}
