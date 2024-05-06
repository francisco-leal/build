"use client";
import { ConnectWalletButton } from "@/shared/components/connect-wallet-button";
import { useMediaQuery } from "@/shared/hooks/use-media-query";
import { LogoShort } from "@/shared/icons";
import {
  Avatar,
  Button,
  Divider,
  Modal,
  ModalClose,
  ModalDialog,
  ModalOverflow,
  Stack,
  Typography,
  useTheme,
} from "@mui/joy";
import { useRouter } from "next/navigation";
import { FunctionComponent } from "react";
import { abbreviateWalletAddress } from "@/shared/utils/abbreviate-wallet-address";

export type NominateBuilderComponentProps = {
  connected?: boolean;
  loading?: boolean;
  date: string;
  nominatedBossProfileImage?: string;
  nominatedBossUsername?: string;
  nominatedBossAddress?: string;
  currentUserDailyBudget?: number;
  currentUserTotalBossPoints?: number;
};

export const NominateBuilderComponent: FunctionComponent<
  NominateBuilderComponentProps
> = ({
  connected,
  loading,
  date,
  nominatedBossProfileImage: profileImage,
  nominatedBossUsername: username,
  nominatedBossAddress: address,
  currentUserDailyBudget,
  currentUserTotalBossPoints,
}) => {
  const router = useRouter();
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.up("md"));
  const isLoading = loading || !connected;

  const goBack = () => {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "boss.community";
    if (document.referrer.includes(appUrl)) router.back();
    else window.location.href = "/";
  };

  const currentUserBossPointsSent = (currentUserDailyBudget ?? 0) * 0.9;
  const currentUserBossPointsEarned = (currentUserDailyBudget ?? 0) * 0.1;

  return (
    <Modal open onClose={goBack}>
      <ModalOverflow>
        <ModalDialog
          variant="solid"
          sx={{ width: "100%", maxWidth: "sm", color: "neutral.500" }}
          layout={isMediumScreen ? "center" : "fullscreen"}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />

          <Typography level="h4">Confirm Nomination</Typography>

          <Stack sx={{ alignItems: "center" }}>
            <Avatar
              sx={{ width: "48px", height: "48px", mb: 1 }}
              src={profileImage}
              alt={username}
            />
            <Typography level="title-lg" textColor="common.black">
              {username}
            </Typography>
            <Typography level="body-sm">
              {abbreviateWalletAddress(address ?? "")}
            </Typography>
          </Stack>

          <Stack sx={{ gap: 1.5, width: "100%", my: 3 }}>
            <Divider sx={{ backgroundColor: "neutral.400" }} />

            <Stack direction="row">
              <Typography level="body-sm">Date</Typography>
              <Typography
                level="body-sm"
                textColor="common.black"
                sx={{ ml: "auto", mr: 0.5 }}
              >
                {date}
              </Typography>
              <LogoShort color={!isLoading ? "primary" : "neutral"} />
            </Stack>

            <Stack direction="row">
              <Typography level="body-sm">My Daily Budget</Typography>
              <Typography
                level="body-sm"
                textColor="common.black"
                sx={{ ml: "auto", mr: 0.5 }}
              >
                {currentUserDailyBudget ?? "--"}
              </Typography>
              <LogoShort color={!isLoading ? "primary" : "neutral"} />
            </Stack>

            <Stack direction="row">
              <Typography level="body-sm">BOSS Points Sent</Typography>
              <Typography
                level="body-sm"
                textColor="common.black"
                sx={{ ml: "auto", mr: 0.5 }}
              >
                {currentUserBossPointsSent ?? "--"}
              </Typography>
              <LogoShort color={!isLoading ? "primary" : "neutral"} />
            </Stack>

            <Stack direction="row">
              <Typography level="body-sm">BOSS Points Earned</Typography>
              <Typography
                level="body-sm"
                textColor="common.black"
                sx={{ ml: "auto", mr: 0.5 }}
              >
                {currentUserBossPointsEarned ?? "--"}
              </Typography>
              <LogoShort color={!isLoading ? "primary" : "neutral"} />
            </Stack>

            <Divider sx={{ backgroundColor: "neutral.400" }} />

            <Stack direction="row" justifyContent="space-between">
              <Typography level="body-sm">My BOSS Points</Typography>
              <Typography
                level="title-md"
                textColor="common.black"
                sx={{ ml: "auto", mr: 0.5 }}
              >
                {(currentUserTotalBossPoints ?? 0) +
                  currentUserBossPointsEarned ?? "--"}
              </Typography>
              <LogoShort color={!isLoading ? "primary" : "neutral"} />
            </Stack>
          </Stack>

          <Stack sx={{ flexDirection: "row", justifyContent: "end", gap: 1 }}>
            <Button
              variant="outlined"
              color="neutral"
              onClick={goBack}
              sx={{ color: "neutral.500", borderColor: "neutral.500" }}
            >
              Cancel
            </Button>
            {!isLoading ? (
              <Button
                variant="solid"
                disabled={(currentUserDailyBudget ?? 0) <= 0}
                onClick={() => {}}
              >
                Confirm
              </Button>
            ) : (
              <ConnectWalletButton />
            )}
          </Stack>
        </ModalDialog>
      </ModalOverflow>
    </Modal>
  );
};
