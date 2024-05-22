import { Link, Stack, Typography } from "@mui/joy";
import { getCurrentUser } from "@/app/_api/data/users";
import { getTableNominationsReceivedValues } from "@/app/_api/functions/get-table-nominations-received-values";
import { getTableNominationsSentValues } from "@/app/_api/functions/get-table-nominations-sent-values";
import { recalculateBuilderBudget } from "@/app/_api/functions/recalculate-budget";
import { CardBossPoints } from "@/app/_components/card-boss-points";
import { CardBossTokens } from "@/app/_components/card-boss-tokens";
import { CardBuilderScore } from "@/app/_components/card-builder-score";
import { CardDailyBudget } from "@/app/_components/card-daily-budget";
import { CardDailyStreak } from "@/app/_components/card-daily-streak";
import { HowToPlay } from "@/app/_components/how-to-play";
import { PlaceholderUserNotConnected } from "@/app/_components/placeholder-user-not-connected";
import { SearchBuilder } from "@/app/_components/search-builder";
import { TableNominationsReceived } from "@/app/_components/table-nominations-received";
import { TableNominationsSent } from "@/app/_components/table-nominations-sent";
import { default as backgroundImage } from "@/app/_images/icons-background.png";
import { HeroSection } from "@/shared/components/hero-section";
import { HeroSectionSlim } from "@/shared/components/hero-section-slim";
import { HeroSectionWithOverflow } from "@/shared/components/hero-section-with-overflow";

export default async function AirdropPage() {
  const user = await getCurrentUser();
  if (!user) return <PlaceholderUserNotConnected />;

  const nominationsSent = await getTableNominationsSentValues();
  const nominationsReceived = await getTableNominationsReceivedValues();

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
          <CardBuilderScore score={user.passport_builder_score} />
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
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography
            level="h2"
            className="no-overflow"
            sx={{ marginTop: 0, marginBottom: 0 }}
          >
            Nominations Made
          </Typography>
          <Link
            href={`https://warpcast.com/~/compose?text=Just%nominated%20this%20builder%20for%20today%20/build%20nominations&embeds%5B%5D=https://build.top/nominations/${user.wallet}`}
            target="_blank"
            sx={{
              color: "common.white",
              textDecoration: "underline",
              marginBottom: 0,
            }}
          >
            Share on Warpcast
          </Link>
        </Stack>
        <Stack className="overflow">
          <TableNominationsSent values={nominationsSent} />
        </Stack>
      </HeroSectionWithOverflow>
      <HeroSectionWithOverflow>
        <Typography level="h2" className="no-overflow">
          Nominations Received
        </Typography>
        <Stack className="overflow">
          <TableNominationsReceived values={nominationsReceived} />
        </Stack>
      </HeroSectionWithOverflow>
      <HeroSection>
        <HowToPlay />
      </HeroSection>
    </Stack>
  );
}
