"use client";

import { FunctionComponent, ReactNode, useEffect, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Avatar,
  Button,
  Divider,
  Modal,
  ModalClose,
  ModalDialog,
  ModalOverflow,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from "@mui/joy";
import { toast } from "sonner";
import { createNewNomination } from "@/app/_api/create-new-nomination";
import { forcePathRevalidation } from "@/app/_api/force-path-revalidation";
import { ConnectWalletButton } from "@/shared/components/connect-wallet-button";
import { useMediaQuery } from "@/shared/hooks/use-media-query";
import { abbreviateWalletAddress } from "@/shared/utils/abbreviate-wallet-address";
import { formatNumber } from "@/shared/utils/format-number";

export type NominationState =
  | "LOADING"
  | "NOT_CONNECTED"
  | "VALID_NOMINATION"
  | "INVALID_NOMINATION"
  | "ALREADY_NOMINATED";

export type NominateBuilderComponentProps = {
  state: NominationState;
  backAvailable?: boolean;
  infoMessage?: ReactNode;
  date: string;
  builderImage?: string;
  builderUsername?: string;
  builderWallet?: string;
  currentUserBossDailyBudget?: number;
  currentUserBossPointsToBeGiven?: number;
  currentUserBossPointsToBeEarned?: number;
  currentUserBossTotalPoints?: number;
};

export const NominateBuilderComponent: FunctionComponent<
  NominateBuilderComponentProps
> = ({
  state,
  backAvailable,
  infoMessage,
  date,
  builderImage,
  builderUsername,
  builderWallet,
  currentUserBossDailyBudget,
  currentUserBossPointsToBeGiven,
  currentUserBossPointsToBeEarned,
  currentUserBossTotalPoints,
}) => {
  const [isNominating, startNomination] = useTransition();
  const router = useRouter();
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.up("md"));
  const pathname = usePathname();

  const goBack = () => {
    if (backAvailable) router.back();
    else router.push("/");
  };

  const nominateUser = () => {
    startNomination(async () => {
      if (!builderWallet) return;
      try {
        await createNewNomination(builderWallet);
        toast.success("Successfully nominated user!");
      } catch (e) {
        if (e instanceof Error) toast.error(e.message);
        else toast.error("Failed to nominate user!");
      }
    });
  };

  const isLoading = state === "LOADING";
  const isNotConnected = state === "NOT_CONNECTED";
  const isDisplayingUserValues = !isLoading && !isNotConnected;

  const isPrimaryColor = ["VALID_NOMINATION", "ALREADY_NOMINATED"].includes(
    state,
  );

  useEffect(() => {
    if (state !== "INVALID_NOMINATION") return;
    const interval = setInterval(() => forcePathRevalidation(pathname), 10_000);
    return () => clearInterval(interval);
  }, [state, pathname]);

  return (
    <Modal open onClose={goBack}>
      <ModalOverflow>
        <ModalDialog
          variant="solid"
          layout={isMediumScreen ? "center" : "fullscreen"}
          sx={{
            width: "100%",
            maxWidth: { xs: "lg", md: "sm" },
            color: "neutral.500",
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography level="h3" sx={{ mb: 3, color: "common.black" }}>
            Nominate This Builder
          </Typography>
          <Stack sx={{ alignItems: "center", mt: 2 }}>
            {isLoading ? (
              <Skeleton
                variant="circular"
                sx={{ width: "48px", height: "48px" }}
              />
            ) : (
              <Avatar
                sx={{ width: "48px", height: "48px" }}
                src={builderImage}
                alt={builderUsername}
              />
            )}
            <Typography
              level="title-lg"
              textColor="common.black"
              sx={{ mb: 0 }}
            >
              {isLoading ? "---" : builderUsername}
            </Typography>
            <Typography level="body-sm" sx={{ mb: 0 }}>
              {isLoading ? "---" : abbreviateWalletAddress(builderWallet ?? "")}
            </Typography>
          </Stack>

          <Stack sx={{ gap: 1.5, width: "100%", my: 3 }}>
            <Divider sx={{ backgroundColor: "neutral.400" }} />

            <Stack direction="row" alignItems={"center"}>
              <Typography level="body-sm">Date</Typography>
              <Typography
                level="body-sm"
                textColor="common.black"
                sx={{ ml: "auto", mr: 0.5 }}
              >
                {date}
              </Typography>
            </Stack>

            <Stack direction="row" alignItems={"center"}>
              <Typography level="body-sm">My Daily Budget</Typography>
              <Typography
                level="body-sm"
                textColor="common.black"
                sx={{ ml: "auto", mr: 0.5 }}
              >
                {isDisplayingUserValues
                  ? formatNumber(currentUserBossDailyBudget ?? 0)
                  : "--"}
              </Typography>
            </Stack>

            <Stack direction="row" alignItems={"center"}>
              <Typography level="body-sm">BOSS Points Sent</Typography>
              <Typography
                level="body-sm"
                textColor="common.black"
                sx={{ ml: "auto", mr: 0.5 }}
              >
                {isDisplayingUserValues
                  ? formatNumber(currentUserBossPointsToBeGiven ?? 0)
                  : "--"}
              </Typography>
            </Stack>

            <Stack direction="row" alignItems={"center"}>
              <Typography level="body-sm">BOSS Points Earned</Typography>
              <Typography
                level="body-sm"
                textColor="common.black"
                sx={{ ml: "auto", mr: 0.5 }}
              >
                {isDisplayingUserValues
                  ? formatNumber(currentUserBossPointsToBeEarned ?? 0)
                  : "--"}
              </Typography>
            </Stack>

            <Divider sx={{ backgroundColor: "neutral.400" }} />

            <Stack direction="row" justifyContent="space-between">
              <Typography level="body-sm">My BOSS Points</Typography>
              <Typography
                level="title-md"
                textColor="common.black"
                sx={{ ml: "auto", mr: 0.5 }}
              >
                {isDisplayingUserValues
                  ? formatNumber(currentUserBossTotalPoints ?? 0)
                  : "--"}
              </Typography>
            </Stack>
          </Stack>

          <Stack
            sx={{
              flexDirection: "row",
              justifyContent: "end",
              alignItems: "center",
              gap: 1,
            }}
          >
            {
              {
                ["NOT_CONNECTED"]: <ConnectWalletButton />,
                ["LOADING"]: (
                  <>
                    <Button
                      variant="outlined"
                      color="neutral"
                      onClick={goBack}
                      sx={{ color: "neutral.500", borderColor: "neutral.500" }}
                    >
                      Cancel
                    </Button>
                    <Button variant="solid" disabled>
                      Confirm
                    </Button>
                  </>
                ),
                ["VALID_NOMINATION"]: (
                  <>
                    <Button
                      variant="outlined"
                      color="neutral"
                      onClick={goBack}
                      sx={{ color: "neutral.500", borderColor: "neutral.500" }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="solid"
                      disabled={(currentUserBossDailyBudget ?? 0) <= 0}
                      loading={isNominating}
                      onClick={() => nominateUser()}
                    >
                      Confirm
                    </Button>
                  </>
                ),
                ["INVALID_NOMINATION"]: (
                  <Typography
                    level="body-sm"
                    textAlign={"center"}
                    sx={{ mr: 1, flex: 1 }}
                  >
                    {infoMessage}
                  </Typography>
                ),
                ["ALREADY_NOMINATED"]: (
                  <Typography
                    level="body-sm"
                    textAlign={"center"}
                    sx={{ mr: 1, flex: 1 }}
                  >
                    {infoMessage}
                  </Typography>
                ),
              }[state]
            }
          </Stack>
        </ModalDialog>
      </ModalOverflow>
    </Modal>
  );
};
