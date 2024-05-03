import { HeroSectionWithOverflow } from "@/shared/components/hero-section-with-overflow";
import { TableRankings } from "@/shared/components/table-rankings";
import { Skeleton, Stack, Typography } from "@mui/joy";

export default function Section3Loading() {
  return (
    <HeroSectionWithOverflow>
      <Typography level="h2" className="no-overflow" textColor={"common.white"}>
        Leaderboard
      </Typography>

      <Stack className="overflow">
        <TableRankings loading />
      </Stack>

      <Typography
        className="no-overflow"
        level="body-sm"
        sx={{ color: "common.white" }}
      >
        <Skeleton variant="text" width={200} />
      </Typography>
    </HeroSectionWithOverflow>
  );
}
