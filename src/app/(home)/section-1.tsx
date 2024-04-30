import { SetStateAction, useState } from "react";
import {
  Box,
  Link,
  Stack,
  Typography,
  Autocomplete,
  Modal,
  ModalClose,
  Button,
  Sheet,
  ModalDialog,
  ModalOverflow,
} from "@mui/joy";
import { Interface, MusicHeadeset } from "@/shared/icons";
import { useMediaQuery } from "@/shared/hooks/use-media-query";
import { useTheme } from "@mui/joy";

export const Section1 = () => {
  const mockdata = ["gil", "leal", "filipe", "pedro", "pupo"];
  const [open, setOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.up("md"));

  const handleUserSelect = (user: SetStateAction<string | null>) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleCancel = () => {
    setSelectedUser(null);
    setOpen(false);
  };

  return (
    <Stack
      component="section"
      sx={{
        pt: { xs: 10, lg: 14 },
        pb: 10,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          width: "100%",
          height: "100%",
          backgroundImage: { lg: "url(/images/homepage.png)" },
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          zIndex: -1,
        }}
      />
      <Stack
        sx={{
          maxWidth: "md",
          px: 2,
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          color: "common.white",
          gap: 2,
        }}
      >
        <Typography level="h1">
          Nominate <Interface /> the best
          <br />
          builders <MusicHeadeset /> you know.
        </Typography>

        <Typography level="body-lg" sx={{ maxWidth: "sm" }}>
          Read the{" "}
          <Link
            href="/memo"
            sx={{ color: "common.white", textDecoration: "underline" }}
          >
            memo
          </Link>
          : there&apos;s no room for builders in the corporate world! Stand for
          builders, play the nomination game, and earn BOSS.
        </Typography>

        <Stack
          sx={{
            flexDirection: { xs: "column-reverse", sm: "row" },
            alignItems: "center",
            width: "100%",
          }}
        >
          <Autocomplete
            placeholder="Search for builders with Farcaster, Talent Protocol, Lens or ENS..."
            type="search"
            freeSolo
            disableClearable
            options={mockdata}
            sx={{ borderRadius: 0, width: "100%" }}
            renderOption={(props, option) => (
              <Stack
                sx={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  py: 1,
                  px: 2,
                }}
              >
                <Typography {...props}>{option}</Typography>
                <Button
                  variant="solid"
                  onClick={() => handleUserSelect(option)}
                  sx={{ py: "2px", px: "12px" }}
                >
                  Nominate
                </Button>
              </Stack>
            )}
          />
        </Stack>

        <Modal
          open={open}
          onClose={() => setOpen(false)}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ModalOverflow>
            <ModalDialog layout={isMediumScreen ? "center" : "fullscreen"}>
              <Sheet
                variant="plain"
                sx={{
                  borderRadius: 0,
                  display: "flex",
                  flexDirection: "column",
                  width: { sx: "100%", md: "600px" },
                  p: 3,
                  gap: 3,
                }}
              >
                <ModalClose variant="plain" sx={{ m: 1 }} />

                <Typography level="h4">Confirm Nomination</Typography>

                <Stack sx={{ alignItems: "center" }}>
                  <Typography>{selectedUser}</Typography>
                </Stack>

                <Stack sx={{ gap: 2, width: "100%" }}>
                  <Box
                    sx={{
                      backgroundColor: "common.black",
                      opacity: "0.3",
                      height: "1px",
                      width: "100%",
                    }}
                  />

                  <Stack
                    sx={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography sx={{ fontSize: "14px", color: "neutral.500" }}>
                      Date
                    </Typography>
                    <Typography sx={{ fontSize: "14px" }}>May 09</Typography>
                  </Stack>

                  <Stack
                    sx={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography sx={{ fontSize: "14px", color: "neutral.500" }}>
                      My Daily Budget
                    </Typography>
                    <Typography sx={{ fontSize: "14px" }}>100</Typography>
                  </Stack>

                  <Stack
                    sx={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography sx={{ fontSize: "14px", color: "neutral.500" }}>
                      BOSS Points Sent
                    </Typography>
                    <Typography sx={{ fontSize: "14px" }}>90</Typography>
                  </Stack>

                  <Stack
                    sx={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography sx={{ fontSize: "14px", color: "neutral.500" }}>
                      BOSS Points Earned
                    </Typography>
                    <Typography sx={{ fontSize: "14px" }}>10</Typography>
                  </Stack>

                  <Box
                    sx={{
                      backgroundColor: "common.black",
                      opacity: "0.3",
                      height: "1px",
                      width: "100%",
                    }}
                  />

                  <Stack
                    sx={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography sx={{ fontSize: "14px", color: "neutral.500" }}>
                      My BOSS Points
                    </Typography>
                    <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>
                      1.150
                    </Typography>
                  </Stack>
                </Stack>

                <Stack
                  sx={{ flexDirection: "row", justifyContent: "end", gap: 1 }}
                >
                  <Button
                    variant="outlined"
                    color="neutral"
                    onClick={handleCancel}
                    sx={{ color: "neutral.500", borderColor: "neutral.500" }}
                  >
                    Cancel
                  </Button>
                  <Button variant="solid">Connect wallet</Button>
                </Stack>
              </Sheet>
            </ModalDialog>
          </ModalOverflow>
        </Modal>

        <Stack
          sx={{
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            gap: "16px",
          }}
        >
          <Box
            sx={{
              backgroundColor: "common.white",
              opacity: "0.3",
              height: "1px",
              width: "50%",
            }}
          />
          <Typography sx={{ color: "common.white" }}>Or</Typography>
          <Box
            sx={{
              backgroundColor: "common.white",
              opacity: "0.3",
              height: "1px",
              width: "50%",
            }}
          />
        </Stack>

        <Link
          href="#"
          sx={{ color: "common.white", textDecoration: "underline" }}
        >
          Share your nomination link
        </Link>
      </Stack>
    </Stack>
  );
};
