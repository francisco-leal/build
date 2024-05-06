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
import { usePathname, useRouter } from "next/navigation";
import { FunctionComponent } from "react";

export type NominateBuilderComponentProps = {
  connected?: boolean;
  loading?: boolean;
  date: string;
  nominatedBossProfileImage?: string;
  nominatedBossUsername?: string;
  nominatedBossAddress?: string;
  currentUserDailyBudget?: number;
  currentUserBossPointsSent?: number;
  currentUserBossPointsEarned?: number;
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
  currentUserBossPointsSent,
  currentUserBossPointsEarned,
  currentUserTotalBossPoints,
}) => {
  const router = useRouter();
  const theme = useTheme();
  const pathname = usePathname();
  const isMediumScreen = useMediaQuery(theme.breakpoints.up("md"));
  const isLoading = loading || !connected;
  const backPath = pathname.split("/").slice(0, -2).join("/");

  const goBack = () => {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "boss.community";
    if (document.referrer.includes(appUrl)) router.back();
    else window.location.href = "/";
  };

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
            <Typography level="body-sm">{address}</Typography>
          </Stack>

          <Stack sx={{ gap: 1.5, width: "100%", my: 3 }}>
            <Divider sx={{ backgroundColor: "neutral.400" }} />

            <Stack direction="row">
              <Typography level="body-sm">Date</Typography>
              <LogoShort
                sx={{ ml: "auto", mr: 0.5 }}
                color={isLoading ? "primary" : "neutral"}
              />
              <Typography level="body-sm" textColor="common.black">
                {date}
              </Typography>
            </Stack>

            <Stack direction="row">
              <Typography level="body-sm">My Daily Budget</Typography>
              <LogoShort
                sx={{ ml: "auto", mr: 0.5 }}
                color={isLoading ? "primary" : "neutral"}
              />
              <Typography level="body-sm" textColor="common.black">
                {currentUserDailyBudget ?? "--"}
              </Typography>
            </Stack>

            <Stack direction="row">
              <Typography level="body-sm">BOSS Points Sent</Typography>
              <LogoShort
                sx={{ ml: "auto", mr: 0.5 }}
                color={isLoading ? "primary" : "neutral"}
              />
              <Typography level="body-sm" textColor="common.black">
                {currentUserBossPointsSent ?? "--"}
              </Typography>
            </Stack>

            <Stack direction="row">
              <Typography level="body-sm">BOSS Points Earned</Typography>
              <LogoShort
                sx={{ ml: "auto", mr: 0.5 }}
                color={isLoading ? "primary" : "neutral"}
              />
              <Typography level="body-sm" textColor="common.black">
                {currentUserBossPointsEarned ?? "--"}
              </Typography>
            </Stack>

            <Divider sx={{ backgroundColor: "neutral.400" }} />

            <Stack direction="row" justifyContent="space-between">
              <Typography level="body-sm">My BOSS Points</Typography>
              <LogoShort
                sx={{ ml: "auto", mr: 0.5 }}
                color={isLoading ? "primary" : "neutral"}
              />
              <Typography level="title-md" textColor="common.black">
                {currentUserTotalBossPoints ?? "--"}
              </Typography>
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
            {isLoading ? (
              <Button
                variant="solid"
                disabled={(currentUserDailyBudget ?? 0) > 0}
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
