"use client";

import { Stack, Typography } from "@mui/joy";
import { LogoShort } from "@/shared/icons/logo-short";
import { Modal, ModalActions, ModalGoBackButton } from "./components";

export default function NominatedBuilderNotFound() {
  return (
    <Modal title="Nominate Builder" disableGoBack>
      <Stack sx={{ alignItems: "center" }}>
        <LogoShort
          sx={{
            width: "40px",
            height: "40px",
            color: "neutral.500",
            mt: 6,
          }}
        />
        <Typography color="neutral" level="body-lg" sx={{ mb: 6 }}>
          Builder not found
        </Typography>
      </Stack>
      <ModalActions>
        <ModalGoBackButton disableGoBack>Cancel</ModalGoBackButton>
      </ModalActions>
    </Modal>
  );
}
