import { Stack, Typography, Link } from "@mui/joy";
import { getDiscoveryLeaderboard } from "@/app/_api/external/openrank";
import { TableDiscovery } from "@/app/_components/table-discovery";
import { HeroSectionWithOverflow } from "@/shared/components/hero-section-with-overflow";

export default async function DiscoverPage() {
  const topLeaderboardValues = await getDiscoveryLeaderboard();

  return (
    <Stack component="main">
      <HeroSectionWithOverflow sx={{ mt: 0 }}>
        <Typography
          level="h2"
          className="no-overflow"
          textColor={"common.white"}
        >
          Top 50 /yellow followers
        </Typography>
        <Typography
          level="body-md"
          className="no-overflow"
          textColor={"common.white"}
          sx={{ mb: 2 }}
        >
          Nominate your favorite builders this week.<br></br>
          Check the top profiles in the{" "}
          <Link
            target="_blank"
            textColor={"common.white"}
            sx={{ textDecoration: "underline" }}
            href="https://warpcast.com/~/channel/yellow"
          >
            /yellow
          </Link>
          , powered by{" "}
          <Link
            href="https://openrank.com"
            textColor={"common.white"}
            sx={{ textDecoration: "underline" }}
            target="_blank"
          >
            OpenRank
          </Link>
          .
        </Typography>
        <Stack className="overflow">
          <TableDiscovery values={topLeaderboardValues} />
        </Stack>
        {topLeaderboardValues.length === 0 && (
          <Typography
            className="no-overflow"
            level="body-sm"
            sx={{ color: "common.white", mt: 2 }}
          >
            The leaderboard will be updated after the first week of noms.
          </Typography>
        )}
      </HeroSectionWithOverflow>
    </Stack>
  );
}
