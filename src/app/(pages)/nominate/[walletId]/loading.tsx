import { headers } from "next/headers";
import { Divider, Skeleton, Stack } from "@mui/joy";
import {
  Modal,
  ModalActions,
  ModalBuilderProfile,
  ModalSubmitButton,
} from "./components";

export default function NominateBuilderLoading() {
  const referer = headers().get("referer") ?? "";
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "build.top";
  const disableGoBack = !referer.includes(appUrl);

  return (
    <Modal title="Nominate Builder" disableGoBack={disableGoBack}>
      <ModalBuilderProfile loading />
      <Stack sx={{ gap: 1.5, width: "100%", my: 3 }}>
        <Divider sx={{ backgroundColor: "neutral.400" }} />
        <Skeleton height={"1em"} width={"100%"} variant="rectangular" />
        <Skeleton height={"1em"} width={"100%"} variant="rectangular" />
        <Skeleton height={"1em"} width={"100%"} variant="rectangular" />
        <Skeleton height={"1em"} width={"100%"} variant="rectangular" />
        <Divider sx={{ backgroundColor: "neutral.400" }} />
      </Stack>
      <ModalActions>
        <ModalSubmitButton wallet={"123"} disabled />
      </ModalActions>
    </Modal>
  );
}
