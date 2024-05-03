import { Box, Link, Stack, Typography } from "@mui/joy";
import { Interface, MusicHeadeset } from "@/shared/icons";
import { SearchNomination } from "@/shared/components/search-nominations";
import { HeroSectionSlim } from "@/shared/components/hero-section-slim";

export default function Section1() {
  return (
    <HeroSectionSlim backgroundImage="/images/homepage.png">
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
          height: 280
        }}
      />
    </HeroSectionSlim>
  );
}
