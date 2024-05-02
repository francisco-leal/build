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
import { SearchNomination } from "@/shared/components/search-nominations";

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
        Name the builders breaking the corporate mold, and receive an airdrop
        of $BOSS. Search their name or share your custom link.
      </Typography>
    </Stack>
  );
};
