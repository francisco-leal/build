import { Stack, Typography } from "@mui/joy";
import { getCurrentUser } from "@/app/_api/data/users";
import { getTableNominationsReceivedValues } from "@/app/_api/functions/get-table-nominations-recieved-values";
import { getTableNominationsSentValues } from "@/app/_api/functions/get-table-nominations-sent-values";
import { recalculateBuilderBudget } from "@/app/_api/functions/recalculate-budget";
import { CardDailyBudget } from "@/app/_components/card-daily-budget";
import { CardDailyStreak } from "@/app/_components/card-daily-streak";
import { HowToPlay } from "@/app/_components/how-to-play";
import { PlaceholderUserNotConnected } from "@/app/_components/placeholder-user-not-connected";
import { SearchBuilder } from "@/app/_components/search-builder";
import { TableNominationsReceived } from "@/app/_components/table-nominations-recieved";
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
    <Stack component="main">
      <HeroSectionSlim backgroundImage={backgroundImage.src} sx={{ mb: 0 }}>
        <Typography level="h1">Nominate the best builders you know</Typography>

        <Typography level="title-lg">
          Reward your favorite builders with $BUILD tokens, and earn 10% of
          every nomination. Search for their name or share your custom link.
        </Typography>

        <SearchBuilder sx={{ mt: 1 }} />
      </HeroSectionSlim>
      <HeroSectionWithOverflow sx={{ mt: 0 }}>
        <Typography
          level="h2"
          className="no-overflow"
          textColor={"common.white"}
        >
          Nominations Made
        </Typography>
        <Stack className="overflow">
          <TableNominationsSent values={nominationsSent} />
        </Stack>
        <Typography
          level="h2"
          className="no-overflow"
          textColor={"common.white"}
        >
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
