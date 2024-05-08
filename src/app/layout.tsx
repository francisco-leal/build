import type { Metadata } from "next";
import { headers } from "next/headers";
import { cookieToInitialState } from "wagmi";
import { config } from "@/config";
import { Web3ModalProvider } from "@/shared/context/web-3-modal-provider";
import { Box } from "@mui/joy";
import { UserProvider } from "@/shared/context/user";
import { Web3Auth } from "@/shared/components/web3-auth";
import { ThemeRegistry } from "@/shared/theme/theme-registry";
import { Footer } from "@/shared/components/footer";
import { Header } from "@/shared/components/header";
import { Toaster } from "sonner";

import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/inter";

export const metadata: Metadata = {
  title: "BOSS",
  description:
    "BOSS is a meme and a social game designed to reward builders via onchain nominations.",
  openGraph: {
    title: "BOSS",
    description:
      "BOSS is a meme and a social game designed to reward builders via onchain nominations.",
    type: "website",
    url: "https://boss.community",
    images: ["https://boss.community/images/BOSS-thumbnail.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(config, headers().get("cookie"));

  return (
    <html lang="en">
      <ThemeRegistry options={{ key: "joy" }}>
        <Box
          component="body"
          sx={{ backgroundColor: "primary.500", m: 0, p: 0 }}
        >
          <Web3ModalProvider initialState={initialState}>
            <UserProvider>
              <Header />
              {children}
              <Footer />
              <Web3Auth />
              <Toaster richColors />
            </UserProvider>
          </Web3ModalProvider>
        </Box>
      </ThemeRegistry>
    </html>
  );
}
