"use client";
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
} from "@mui/joy";

export const Section1 = () => {
  const mockdata = ["gil", "leal", "filipe", "pedro", "pupo"];
  const [open, setOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

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
        pt: 10,
        pb: 5,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack
        sx={{
          maxWidth: "sm",
          px: 2,
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
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
          Name the builders breaking the corporate mold, and receive an airdrop
          of $BOSS. Search their name or share your custom link.
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
          <Sheet
            variant="plain"
            sx={{
              borderRadius: 0,
              display: "flex",
              flexDirection: "column",
              width: "600px",
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
                sx={{ flexDirection: "row", justifyContent: "space-between" }}
              >
                <Typography sx={{ fontSize: "14px", color: "neutral.500" }}>
                  Date
                </Typography>
                <Typography sx={{ fontSize: "14px" }}>May 09</Typography>
              </Stack>

              <Stack
                sx={{ flexDirection: "row", justifyContent: "space-between" }}
              >
                <Typography sx={{ fontSize: "14px", color: "neutral.500" }}>
                  My Daily Budget
                </Typography>
                <Typography sx={{ fontSize: "14px" }}>100</Typography>
              </Stack>

              <Stack
                sx={{ flexDirection: "row", justifyContent: "space-between" }}
              >
                <Typography sx={{ fontSize: "14px", color: "neutral.500" }}>
                  BOSS Points Sent
                </Typography>
                <Typography sx={{ fontSize: "14px" }}>90</Typography>
              </Stack>

              <Stack
                sx={{ flexDirection: "row", justifyContent: "space-between" }}
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
                sx={{ flexDirection: "row", justifyContent: "space-between" }}
              >
                <Typography sx={{ fontSize: "14px", color: "neutral.500" }}>
                  My BOSS Points
                </Typography>
                <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>
                  1.150
                </Typography>
              </Stack>
            </Stack>

            <Stack sx={{ flexDirection: "row", justifyContent: "end", gap: 1 }}>
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
