import { SearchNomination } from "@/shared/components/search-nominations";
import { Stack, Typography } from "@mui/joy";

export default function MyStatsPage() {
  return (
    <>
      <Stack
        component="section"
        sx={{
          pt: 10,
          px: 2,
          pb: 5,
          gap: 2,
          maxWidth: "sm",
          mx: "auto",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          level="h1"
          sx={{
            color: "common.white",
            fontSize: { xs: "37px", sm: "64px" },
            m: 0,
            fontWeight: "bold",
            textAlign: "center",
            lineHeight: "1",
          }}
        >
          Nominate the best builders you know
        </Typography>

        <Typography
          sx={{
            color: "common.white",
            fontSize: "18px",
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          Name the builders breaking the corporate mold, and receive an airdrop of
          $BOSS. Search their name or share your custom link.
        </Typography>

        <SearchNomination
          sx={{ alignItems: "center", width: "100%", height: 280 }}
        />
      </Stack>
    </>
  )
}
