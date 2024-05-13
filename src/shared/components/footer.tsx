import { Typography, Link, Stack } from "@mui/joy";
import { LogoLong } from "../icons";

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
          href="https://app.uniswap.org/swap?chain=base&inputCurrency=ETH&outputCurrency=0x3c281a39944a2319aa653d81cfd93ca10983d234"
          target="_blank"
          sx={{ color: "common.white" }}
        >
          Buy
        </Link>
        <Link
          href="https://warpcast.com/~/channel/build"
          target="_blank"
          sx={{ color: "common.white" }}
        >
          Farcaster
        </Link>
        <Link
          href="https://base.party.app/party/0x04483a3F6435bB96c9dcD3C1eDAF4482f7367bA5"
          target="_blank"
        >
          Party.app
        </Link>
        <Link
          href="https://buildcommunity.notion.site/BUILD-FAQ-51bd011214534fa596f15632ef788b10?pvs=4"
          target="_blank"
        >
          FAQ
        </Link>
        <Link
          href="https://www.figma.com/file/sSlPPPR0XdJztdqZaImV6Z/%24BOSS---Community?type=design&node-id=2005-2166&mode=design&t=LxazggdeJ4F2pRFk-0"
          target="_blank"
        >
          Figma
        </Link>
        <Link
          href="https://basescan.org/token/0x3c281a39944a2319aa653d81cfd93ca10983d234"
          target="_blank"
        >
          Contract
        </Link>
        <Link
          href="https://dexscreener.com/base/0x3c281a39944a2319aa653d81cfd93ca10983d234"
          target="_blank"
        >
          Dexscreener
        </Link>
      </Stack>

      <Typography sx={{ color: "common.white", textAlign: "center" }}>
        BUILD is an experimental community project. Not Financial Advice. DYOR.
      </Typography>
    </Stack>
  );
};
