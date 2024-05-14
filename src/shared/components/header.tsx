"use client";

import { FunctionComponent, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  Box,
  Drawer,
  IconButton,
  Link,
  Stack,
  Typography,
  linkClasses,
} from "@mui/joy";
import { useDisclose } from "../hooks/use-disclose";
import { Cross } from "../icons/cross";
import { Hamburger } from "../icons/hamburger";
import { LogoLong } from "../icons/logo-long";
import { LogoShort } from "../icons/logo-short";
import { ConnectWalletButton } from "./connect-wallet-button";

const MOBILE_BREAKPOINT = "md" as const;
const MOBILE_ONLY = { xs: "block", [MOBILE_BREAKPOINT]: "none" } as const;
const DESKTOP_ONLY = { xs: "none", [MOBILE_BREAKPOINT]: "flex" } as const;

export const Header: FunctionComponent = () => {
  const pathname = usePathname();
  const drawer = useDisclose();
  const headerRef = useRef<HTMLDivElement>(null);
  const activePath = pathname.split("/")[1];

  // FIXME this could lead to leaky styles if the header size becomes dynamic.
  const headerHeight = headerRef.current?.clientHeight ?? 0;
  const drawerHeight = `calc(100dvh - ${headerHeight}px)`;

  return (
    <Box
      ref={headerRef}
      component="header"
      sx={{ py: 1, borderBottom: 1, borderColor: "neutral.300" }}
    >
      <Stack
        direction="row"
        maxWidth={{ xs: "md", md: "lg" }}
        px={{ xs: 2, md: 4, lg: 8 }}
        mx="auto"
      >
        <Stack direction="row" flex={1}>
          <Link
            href="/"
            sx={{ "& svg": { color: "common.white" } }}
            onClick={drawer.close}
          >
            <LogoLong sx={{ display: DESKTOP_ONLY, width: 132, height: 40 }} />
            <LogoShort sx={{ display: MOBILE_ONLY, width: 40, height: 40 }} />
          </Link>
        </Stack>

        <Stack
          direction="row"
          flex={1}
          component="nav"
          gap={2}
          justifyContent={"center"}
          display={DESKTOP_ONLY}
          sx={{
            "& a": {
              color: "common.white",
            },
            [`& a.${linkClasses.disabled}`]: {
              color: "primary.700",
            },
          }}
        >
          <Link
            target="_blank"
            href="https://mirror.xyz/talentprotocol.eth/2miuIeU0Uq_uHIj_NzH0gk1Cdcc-06s_zyqo6iwO768"
          >
            Manifesto
          </Link>
          <Link disabled={activePath === "airdrop"} href="/airdrop">
            Airdrop
          </Link>
          <Link disabled={activePath === "tokenomics"} href="/tokenomics">
            Tokenomics
          </Link>
        </Stack>

        <Stack
          direction={"row"}
          flex={1}
          justifyContent={"flex-end"}
          alignItems={"center"}
        >
          {!drawer.isOpen && (
            <ConnectWalletButton
              sx={{ flex: { xs: 1, md: "initial", justifyContent: "center" } }}
            />
          )}
          <IconButton
            onClick={() => {
              drawer.toggle();
              window.scrollTo(0, 0);
            }}
            sx={{
              display: MOBILE_ONLY,
              "& svg": {
                color: "common.white",
                width: "36px",
                height: "36px",
              },
              ":hover": {
                background: "transparent",
                "& svg": {
                  color: "neutral.solidHoverBg",
                },
              },
            }}
          >
            {drawer.isOpen ? <Cross /> : <Hamburger />}
          </IconButton>
        </Stack>
      </Stack>
      <Drawer
        anchor={"bottom"}
        open={drawer.isOpen}
        onClose={drawer.close}
        hideBackdrop
        disableEnforceFocus
        slotProps={{
          root: {
            sx: {
              display: MOBILE_ONLY,
              height: drawerHeight,
              bottom: 0,
              top: headerHeight,
            },
          },
          content: {
            sx: {
              backgroundColor: "primary.500",
              borderTop: 1,
              borderColor: "common.white",
              height: drawerHeight,
              px: 2,
              pt: 6,
              pb: 3,

              [`& a`]: {
                color: "common.white",
                pb: 5,
                fontSize: "32px",
                fontWeight: "700",
                lineHeight: "115%",
              },
            },
          },
        }}
      >
        <Link
          target="_blank"
          href="https://mirror.xyz/talentprotocol.eth/2miuIeU0Uq_uHIj_NzH0gk1Cdcc-06s_zyqo6iwO768"
        >
          Manifesto
        </Link>
        <Link
          // Prefetch is not recognized by LinkProps, but it's part of Next Link
          {...{ prefetch: true }}
          href="/airdrop"
          onClick={drawer.close}
        >
          Airdrop
        </Link>
        <Link
          // Prefetch is not recognized by LinkProps, but it's part of Next Link
          {...{ prefetch: true }}
          href="/tokenomics"
          onClick={drawer.close}
        >
          Tokenomics
        </Link>

        <Typography
          sx={{ color: "neutral.50", mt: "auto", textAlign: "center" }}
          level="body-md"
        >
          BUILD is an experimental community project. Not Financial Advice.
          DYOR.
        </Typography>
      </Drawer>
    </Box>
  );
};
