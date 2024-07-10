import { Typography, Link, Stack } from "@mui/joy";
import { LogoLong } from "../icons/logo-long";

export const Footer = () => {
  return (
    <Stack
      sx={{
        pt: 6,
        pb: 4,
        px: 2,
        gap: 3,
        alignItems: "center",
        width: "100%",
      }}
    >
      <Link href="/" sx={{ "& svg": { color: "common.white" } }}>
        <LogoLong sx={{ width: 256, height: 54 }} />
      </Link>
      <Stack
        sx={{
          flexDirection: { md: "row" },
          justifyContent: "center",
          alignItems: "center",
          gap: 3,
          width: "100%",
          maxWidth: "sm",
          "& a": {
            color: "common.white",
          },
          "& p": {
            color: "common.white",
            opacity: 0.5,
          },
        }}
      >
        <Link
          href="https://mirror.xyz/talentprotocol.eth/2miuIeU0Uq_uHIj_NzH0gk1Cdcc-06s_zyqo6iwO768"
          target="_blank"
        >
          Manifesto
        </Link>
        <Link href="https://warpcast.com/~/channel/build" target="_blank">
          Farcaster
        </Link>
        <Link href="https://x.com/buildtokenbase" target="_blank">
          Twitter
        </Link>
        <Link
          href="https://buildcommunity.notion.site/BUILD-FAQ-51bd011214534fa596f15632ef788b10?pvs=4"
          target="_blank"
        >
          FAQ
        </Link>
        <Link
          href="https://talentprotocol.notion.site/Build-API-Docs-98e5955978d14fcd8b871c582c5c60e6"
          target="_blank"
        >
          API
        </Link>
        <Link
          href="https://www.figma.com/design/C6VaYovGCC8ykY76q4aoem/%24BUILD---Community?node-id=2001%3A38&t=CEPigqzG5oDNhCAF-1"
          target="_blank"
        >
          Brand
        </Link>
        <Link
          href="https://app.uniswap.org/explore/tokens/base/0x3c281a39944a2319aa653d81cfd93ca10983d234"
          target="_blank"
        >
          Uniswap
        </Link>
        <Link href="https://www.coingecko.com/en/coins/build-2" target="_blank">
          CoinGecko
        </Link>
      </Stack>
      <Typography sx={{ color: "common.white", textAlign: "center" }}>
        BUILD is an experimental community project. Not Financial Advice. DYOR.
      </Typography>
    </Stack>
  );
};
