"use client";

import { FunctionComponent, ReactNode, useEffect, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Avatar,
  Badge,
  Button,
  Divider,
  Modal as JoyModal,
  ModalClose,
  ModalDialog,
  ModalOverflow,
  Skeleton,
  Stack,
  Typography,
  modalDialogClasses,
} from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";
import { toast } from "sonner";
import { createNewNominationForCurrentUser } from "@/app/_api/data/nominations";
import { forcePathRevalidation } from "@/app/_api/functions/force-path-revalidation";
import { FarcasterLink } from "@/shared/components/farcaster-link";
import { TalentProtocolLink } from "@/shared/components/talentprotocol-link";
import { abbreviateWalletAddress } from "@/shared/utils/abbreviate-wallet-address";

export const Modal: FunctionComponent<{
  title: ReactNode;
  children: ReactNode;
  disableGoBack?: boolean;
  pokeForUpdate?: boolean;
}> = ({ title, children, disableGoBack, pokeForUpdate }) => {
  const pathname = usePathname();
  const router = useRouter();
  const goBack = () => (disableGoBack ? router.push("/") : router.back());

  useEffect(() => {
    if (!pokeForUpdate) return;
    const interval = setInterval(() => forcePathRevalidation(pathname), 10_000);
    return () => clearInterval(interval);
  }, [pokeForUpdate, pathname]);

  return (
    <JoyModal open onClose={goBack} disablePortal>
      <ModalOverflow sx={{ p: 0 }}>
        <ModalDialog
          variant="solid"
          layout={"center"}
          sx={{
            width: "100%",
            maxWidth: { xs: "lg", md: "sm" },
            color: "neutral.500",
            [`&.${modalDialogClasses.layoutCenter}`]: {
              minHeight: { xs: "100vh", md: "auto" },
            },
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography level="h3" sx={{ mb: 3, color: "common.black" }}>
            {title}
          </Typography>
          {children}
        </ModalDialog>
      </ModalOverflow>
    </JoyModal>
  );
};

export const ModalActions: FunctionComponent<{
  children: ReactNode;
}> = ({ children }) => (
  <Stack
    sx={{
      flexDirection: "row",
      justifyContent: "end",
      alignItems: "center",
      gap: 1,
    }}
  >
    {children}
  </Stack>
);

export const ModalGoBackButton: FunctionComponent<{
  children?: ReactNode;
  loading?: boolean;
  disableGoBack?: boolean;
}> = ({ children, disableGoBack }) => {
  const router = useRouter();
  const goBack = () => (disableGoBack ? router.push("/") : router.back());

  return (
    <Button
      variant="outlined"
      color="neutral"
      onClick={goBack}
      sx={{ color: "neutral.500", borderColor: "neutral.500" }}
    >
      {children}
    </Button>
  );
};

export const ModalSubmitButton: FunctionComponent<{
  disabled?: boolean;
  loading?: boolean;
  wallet: string;
}> = ({ wallet, disabled, loading }) => {
  const [isNominating, startNomination] = useTransition();
  const router = useRouter();

  const nominateUser = () => {
    startNomination(async () => {
      try {
        await createNewNominationForCurrentUser(wallet);
        toast.success("Successfully nominated user!");
        router.refresh();
      } catch (e) {
        if (e instanceof Error) toast.error(e.message);
        else toast.error("Failed to nominate user!");
      }
    });
  };

  return (
    <Button
      variant="solid"
      disabled={disabled}
      loading={isNominating || loading}
      onClick={() => nominateUser()}
    >
      Confirm
    </Button>
  );
};

export type ModalBuilderProfileProps = {};

export const ModalBuilderProfile: FunctionComponent<{
  loading?: boolean;
  builderRank?: number;
  builderImage?: string;
  builderUsername?: string;
  builderWallet?: string;
  builderFarcasterUsername?: string;
  builderTalentId?: number;
}> = ({
  loading,
  builderImage,
  builderUsername,
  builderWallet,
  builderRank,
  builderFarcasterUsername,
  builderTalentId,
}) => (
  <Stack sx={{ alignItems: "center", mt: 2 }}>
    {loading ? (
      <Skeleton variant="circular" sx={{ width: "48px", height: "48px" }} />
    ) : (
      <Badge
        badgeContent={builderRank ? `#${builderRank}` : "#---"}
        size="sm"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Avatar
          sx={{ width: "48px", height: "48px" }}
          src={builderImage}
          alt={builderUsername}
        />
      </Badge>
    )}
    <Typography level="title-lg" textColor="common.black" sx={{ mb: 0 }}>
      {loading ? "---" : builderUsername}
    </Typography>
    <Typography level="body-sm" sx={{ mb: 0 }}>
      {loading ? "---" : abbreviateWalletAddress(builderWallet ?? "")}
    </Typography>
    <Stack direction="row" spacing={0.5} pt={1} justifyContent={"center"}>
      {builderTalentId && !loading && (
        <TalentProtocolLink passportId={builderTalentId} />
      )}
      {builderFarcasterUsername && !loading && (
        <FarcasterLink username={builderFarcasterUsername} />
      )}
    </Stack>
  </Stack>
);

export const ModalNominationValues: FunctionComponent<{
  loading?: boolean;
  entries?: Array<{ label: string; value: string }>;
}> = ({ loading, entries }) => (
  <Stack sx={{ gap: 1.5, width: "100%", my: 3 }}>
    <Divider sx={{ backgroundColor: "neutral.400" }} />
    {entries?.map(({ label, value }) => (
      <Stack key={label} direction="row" alignItems={"center"}>
        <Typography level="body-sm">{label}</Typography>
        <Typography
          level="body-sm"
          textColor="common.black"
          sx={{ ml: "auto", mr: 0.5 }}
        >
          {loading ? "--" : value}
        </Typography>
      </Stack>
    ))}
    <Divider sx={{ backgroundColor: "neutral.400" }} />
  </Stack>
);

export const ModalActionMessage: FunctionComponent<{
  children: ReactNode;
  sx?: SxProps;
}> = ({ children, sx }) => (
  <Typography
    level="body-sm"
    textAlign={"center"}
    sx={{ mr: 1, flex: 1, ...sx }}
  >
    {children}
  </Typography>
);
