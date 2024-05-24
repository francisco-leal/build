import { Button, Grid, Link, Stack, Typography } from "@mui/joy";
import { getNominationsFromUserToday } from "@/app/_api/data/nominations";
import { getCurrentUser } from "@/app/_api/data/users";
import { getTableNominationsReceivedValues } from "@/app/_api/functions/get-table-nominations-received-values";
import { getTableNominationsSentValues } from "@/app/_api/functions/get-table-nominations-sent-values";
import { recalculateBuilderBudget } from "@/app/_api/functions/recalculate-budget";
import { recalculateBuilderScore } from "@/app/_api/functions/recalculate-builder-score";
import { CardBossPoints } from "@/app/_components/card-boss-points";
import { CardBossTokens } from "@/app/_components/card-boss-tokens";
import { CardBuilderScore } from "@/app/_components/card-builder-score";
import { CardDailyBudget } from "@/app/_components/card-daily-budget";
import { CardDailyStreak } from "@/app/_components/card-daily-streak";
import { HowToPlay } from "@/app/_components/how-to-play";
import { PlaceholderUserNotConnected } from "@/app/_components/placeholder-user-not-connected";
import { TableNominationsReceived } from "@/app/_components/table-nominations-received";
import { TableNominationsSent } from "@/app/_components/table-nominations-sent";
import { HeroSection } from "@/shared/components/hero-section";
import { HeroSectionWithOverflow } from "@/shared/components/hero-section-with-overflow";
import { getWarpcastSharableLink } from "@/shared/utils/sharable-warpcast-link";

export default async function AirdropPage() {
  const user = await getCurrentUser();
  if (!user) return <PlaceholderUserNotConnected />;

  const nominationsSent = await getTableNominationsSentValues();
  // disable temporarily so stats doesnt crash
  // const nominationsReceived = await getTableNominationsReceivedValues();
  const todayNominations = await getNominationsFromUserToday(user);
  const sharableWarpcastLink = getWarpcastSharableLink(
    todayNominations,
    user.wallet,
  );

  return (
    <Stack component="main" sx={{ color: "common.white" }}>
      <HeroSection mt={0}>
        <Typography level="h2">My Stats</Typography>
        <Stack
          sx={{
            width: "100%",
            flexDirection: { xs: "column", md: "row" },
            "& > *": { minHeight: 240, width: "100%" },
            gap: 3,
          }}
        >
          <CardBossPoints points={user.boss_score} />
          <CardBossTokens />
          <CardBuilderScore
            score={user.passport_builder_score}
            recalculate={recalculateBuilderScore}
          />
        </Stack>
        <Stack
          sx={{
            mt: 3,
            width: "100%",
            flexDirection: { xs: "column", md: "row" },
            "& > *": { minHeight: 240, width: "100%" },
            gap: 3,
          }}
        >
          <CardDailyBudget
            budget={user.boss_budget}
            recalculate={recalculateBuilderBudget}
          />
          <CardDailyStreak streak={user.boss_nomination_streak} />
        </Stack>
      </HeroSection>
      <HeroSectionWithOverflow id="nominations">
        <Grid
          container
          spacing={1}
          sx={{
            width: "100%",
            paddingRight: "32px",
          }}
        >
          <Grid xs={12} sm></Grid>
          <Grid xs={10} sm={6} alignContent="center">
            <Typography
              level="h2"
              className="no-overflow"
              sx={{
                width: "100%",
                margin: 0,
              }}
            >
              Nominations Made
            </Typography>
          </Grid>
          <Grid xs={2} sm alignContent="center" padding={0}>
            {todayNominations?.length > 0 && (
              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "end",
                  padding: 0,
                }}
              >
                <Button
                  href={sharableWarpcastLink}
                  target="_blank"
                  component={Link}
                  variant="solid"
                  color="neutral"
                >
                  Share
                </Button>
              </Stack>
            )}
          </Grid>
        </Grid>
        <Stack className="overflow">
          <TableNominationsSent values={nominationsSent} />
        </Stack>
      </HeroSectionWithOverflow>
      {/* <HeroSectionWithOverflow>
        <Typography level="h2" className="no-overflow">
          Nominations Received
        </Typography>
        <Stack className="overflow">
          <TableNominationsReceived values={nominationsReceived} />
        </Stack>
      </HeroSectionWithOverflow> */}
      <HeroSection>
        <HowToPlay />
      </HeroSection>
    </Stack>
  );
}
