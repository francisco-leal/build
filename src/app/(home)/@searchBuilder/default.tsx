import { SearchBuilder } from "@/app/_components/@searchBuilder";
import { Interface, MusicHeadeset } from "@/shared/icons";
import { Link, Typography } from "@mui/joy";

export default function NominateBuilder() {
  return (
    <>
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
        builders, play the nomination game, and earn $BOSS. Nominations start on
        May 8th.
      </Typography>

      <SearchBuilder
        sx={{
          mt: 1,
          alignItems: "center",
          width: "100%",
          height: 280,
        }}
      />
    </>
  );
}
