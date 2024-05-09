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
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from "@mui/joy";
import { useRouter } from "next/navigation";
import { FunctionComponent, ReactNode, useState } from "react";
import { abbreviateWalletAddress } from "@/shared/utils/abbreviate-wallet-address";
import { toast } from "sonner";

export type NominationState =
  | "LOADING"
  | "NOT_CONNECTED"
  | "VALID_NOMINATION"
  | "INVALID_NOMINATION";

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
  const [isNominating, setIsNominating] = useState(false);
  const router = useRouter();
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.up("md"));

  const goBack = () => {
    if (backAvailable) router.back();
    else router.push("/");
  };

  const nominateUser = async () => {
    setIsNominating(true);
    try {
      const response = await fetch("/api/nominate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nominatedUserAddress: builderWallet }),
      });

      const json = (await response.json()) as { error?: string };

      if (json.error) {
        toast.error(json.error);
      } else {
        toast.success("Successfully nominated user!");
      }
    } catch (e) {
      toast.error("An error occurred while nominating user.");
    } finally {
      setIsNominating(false);
    }
  };

  const isLoading = state === "LOADING";
  const isNotConnected = state === "NOT_CONNECTED";
  const isReadyToNominate = state === "VALID_NOMINATION";
  const isDisplayingUserValues = !isLoading && !isNotConnected;

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
            {isLoading ? (
              <Skeleton
                variant="circular"
                sx={{ width: "48px", height: "48px", mb: 1 }}
              />
            ) : (
              <Avatar
                sx={{ width: "48px", height: "48px", mb: 1 }}
                src={builderImage}
                alt={builderUsername}
              />
            )}
            <Typography level="title-lg" textColor="common.black">
              {isLoading ? "---" : builderUsername}
            </Typography>
            <Typography level="body-sm">
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
              <LogoShort color={isReadyToNominate ? "primary" : "neutral"} />
            </Stack>

            <Stack direction="row" alignItems={"center"}>
              <Typography level="body-sm">My Daily Budget</Typography>
              <Typography
                level="body-sm"
                textColor="common.black"
                sx={{ ml: "auto", mr: 0.5 }}
              >
                {isDisplayingUserValues ? currentUserBossDailyBudget : "--"}
              </Typography>
              <LogoShort color={isReadyToNominate ? "primary" : "neutral"} />
            </Stack>

            <Stack direction="row" alignItems={"center"}>
              <Typography level="body-sm">BOSS Points Sent</Typography>
              <Typography
                level="body-sm"
                textColor="common.black"
                sx={{ ml: "auto", mr: 0.5 }}
              >
                {isDisplayingUserValues ? currentUserBossPointsToBeGiven : "--"}
              </Typography>
              <LogoShort color={isReadyToNominate ? "primary" : "neutral"} />
            </Stack>

            <Stack direction="row" alignItems={"center"}>
              <Typography level="body-sm">BOSS Points Earned</Typography>
              <Typography
                level="body-sm"
                textColor="common.black"
                sx={{ ml: "auto", mr: 0.5 }}
              >
                {isDisplayingUserValues
                  ? currentUserBossPointsToBeEarned
                  : "--"}
              </Typography>
              <LogoShort color={isReadyToNominate ? "primary" : "neutral"} />
            </Stack>

            <Divider sx={{ backgroundColor: "neutral.400" }} />

            <Stack direction="row" justifyContent="space-between">
              <Typography level="body-sm">My BOSS Points</Typography>
              <Typography
                level="title-md"
                textColor="common.black"
                sx={{ ml: "auto", mr: 0.5 }}
              >
                {isDisplayingUserValues ? currentUserBossTotalPoints : "--"}
              </Typography>
              <LogoShort color={isReadyToNominate ? "primary" : "neutral"} />
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
              }[state]
            }
          </Stack>
        </ModalDialog>
      </ModalOverflow>
    </Modal>
  );
};
