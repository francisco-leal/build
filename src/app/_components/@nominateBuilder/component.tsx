"use client";
import { ConnectWalletButton } from "@/shared/components/connect-wallet-button";
import { useMediaQuery } from "@/shared/hooks/use-media-query";
import { LogoShort } from "@/shared/icons";
import {
  Avatar,
  Button,
  Divider,
  Link,
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
import { FunctionComponent, useState } from "react";
import { abbreviateWalletAddress } from "@/shared/utils/abbreviate-wallet-address";
import { toast } from "sonner";

export type NominateBuilderComponentProps = {
  backAvailable?: boolean;
  connected?: boolean;
  loading?: boolean;
  date: string;
  builderImage?: string;
  builderUsername?: string;
  builderWallet?: string;

  currentUserDailyBudget?: number;
  currentUserTotalBossPoints?: number;
  previouslyNominatedBossUsername?: string;
  previouslyNominatedBossWallet?: string;
};

export const NominateBuilderComponent: FunctionComponent<
  NominateBuilderComponentProps
> = ({
  backAvailable,
  connected,
  loading,
  date,
  builderImage,
  builderUsername,
  builderWallet,
  previouslyNominatedBossUsername,
  previouslyNominatedBossWallet,
  currentUserDailyBudget,
  currentUserTotalBossPoints,
}) => {
  const [isNominating, setIsNominating] = useState(false);
  const router = useRouter();
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.up("md"));

  const goBack = () => {
    if (backAvailable) router.back();
    else router.push("/");
  };

  const currentUserBossPointsSent = (currentUserDailyBudget ?? 0) * 0.9;
  const currentUserBossPointsEarned = (currentUserDailyBudget ?? 0) * 0.1;

  const isReadyToNominate =
    !loading && connected && !previouslyNominatedBossUsername;

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
            {loading ? (
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
              {loading ? "---" : builderUsername}
            </Typography>
            <Typography level="body-sm">
              {loading ? "---" : abbreviateWalletAddress(builderWallet ?? "")}
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
              <LogoShort color={isReadyToNominate ? "primary" : "neutral"} />
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
              <LogoShort color={isReadyToNominate ? "primary" : "neutral"} />
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
              <LogoShort color={isReadyToNominate ? "primary" : "neutral"} />
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
                {(currentUserTotalBossPoints ?? 0) +
                  currentUserBossPointsEarned ?? "--"}
              </Typography>
              <LogoShort color={isReadyToNominate ? "primary" : "neutral"} />
            </Stack>
          </Stack>

          <Stack sx={{ flexDirection: "row", justifyContent: "end", gap: 1 }}>
            {previouslyNominatedBossWallet && (
              <Typography level="body-sm" textAlign={"right"} sx={{ mr: 1 }}>
                {"You have nominated "}
                <Link href={`/nominate/${previouslyNominatedBossWallet}`}>
                  {previouslyNominatedBossUsername}
                </Link>
                {" as a BOSS today."}
                <br />
                {"Come back tomorrow to nominate a different BOSS."}
              </Typography>
            )}
            <Button
              variant="outlined"
              color="neutral"
              onClick={goBack}
              sx={{ color: "neutral.500", borderColor: "neutral.500" }}
            >
              Cancel
            </Button>
            {loading && (
              <Button variant="solid" disabled>
                Confirm
              </Button>
            )}
            {isReadyToNominate && (
              <Button
                variant="solid"
                disabled={(currentUserDailyBudget ?? 0) <= 0}
                loading={isNominating}
                onClick={() => nominateUser()}
              >
                Confirm
              </Button>
            )}
            {!connected && !loading && <ConnectWalletButton />}
          </Stack>
        </ModalDialog>
      </ModalOverflow>
    </Modal>
  );
};
