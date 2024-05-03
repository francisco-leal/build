import { Typography, Stack } from "@mui/joy";
import { FingerNominate, Coin, DroneCameraAirdrop } from "@/shared/icons";

export default function HowToPlay() {
  return (
    <>
      <Typography
        sx={{ color: "common.white", fontSize: "40px", fontWeight: "bold" }}
      >
        How to play the BOSS game?
      </Typography>

      <Stack
        sx={{
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          gap: 3,
        }}
      >
        <Stack
          sx={{ height: "100%", flex: 1, p: 5, gap: 5, alignItems: "center" }}
        >
          <Stack sx={{ alignItems: "center", gap: 1 }}>
            <FingerNominate sx={{ color: "common.white", fontSize: "64px" }} />
            <Typography
              sx={{
                color: "common.white",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              Nominate
            </Typography>

            <Typography
              sx={{
                color: "common.white",
                fontSize: "16px",
                textAlign: "center",
              }}
            >
              If you have a SocialFi profile, you can nominate one builder per
              day. The builder earns BOSS points for every nomination received.
            </Typography>
          </Stack>
        </Stack>

        <Stack
          sx={{ height: "100%", flex: 1, p: 5, gap: 5, alignItems: "center" }}
        >
          <Stack sx={{ alignItems: "center", gap: 1 }}>
            <Coin sx={{ color: "common.white", fontSize: "64px" }} />
            <Typography
              sx={{
                color: "common.white",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              Budget
            </Typography>

            <Typography
              sx={{
                color: "common.white",
                fontSize: "16px",
                textAlign: "center",
              }}
            >
              The builder you nominate receives your daily budget of BOSS
              points. Every day you nominate, you also earn 10% of your budget.
            </Typography>
          </Stack>
        </Stack>

        <Stack
          sx={{ height: "100%", flex: 1, p: 5, gap: 5, alignItems: "center" }}
        >
          <Stack sx={{ alignItems: "center", gap: 1 }}>
            <DroneCameraAirdrop
              sx={{ color: "common.white", fontSize: "64px" }}
            />
            <Typography
              sx={{
                color: "common.white",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              Airdrop
            </Typography>

            <Typography
              sx={{
                color: "common.white",
                fontSize: "16px",
                textAlign: "center",
              }}
            >
              Valid nominations become BOSS points during Airdrop 1, that
              builders can claim as $BOSS tokens on Base when the airdrop is
              over.
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
