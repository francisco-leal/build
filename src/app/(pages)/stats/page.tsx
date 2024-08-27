import { Stack, Typography } from "@mui/joy";
import { getCurrentUser } from "@/app/_api/data/users";
import { CardBossPoints } from "@/app/_components/card-boss-points";
import { CardBossTokens } from "@/app/_components/card-boss-tokens";
import { CardBuildCommitted } from "@/app/_components/card-build-committed";
import { CardBuilderScore } from "@/app/_components/card-builder-score";
import { CardDailyBudget } from "@/app/_components/card-daily-budget";
import { PlaceholderUserNotConnected } from "@/app/_components/placeholder-user-not-connected";
import { HeroSection } from "@/shared/components/hero-section";

export default async function AirdropPage() {
  const user = await getCurrentUser();
  if (!user) return <PlaceholderUserNotConnected />;

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
          <CardBuildCommitted buildCommitted={user.build_commit_amount} />
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
          <CardDailyBudget />
          <CardBossPoints points={user.boss_score} />
        </Stack>
      </HeroSection>
    </Stack>
  );
}
