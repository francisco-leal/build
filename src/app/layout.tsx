import { headers } from "next/headers";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/inter";
import { Box, Alert } from "@mui/joy";
import { Toaster } from "sonner";
import { cookieToInitialState } from "wagmi";
import { Web3ModalProvider } from "@/app/_providers/web-3-modal-provider";
import { config } from "@/config";
import { Footer } from "@/shared/components/footer";
import { Header } from "@/shared/components/header";
import { ThemeRegistry } from "@/shared/theme/theme-registry";
import { AuthenticationProvider } from "./_providers/authentication-provider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BUILD",
  description:
    "BUILD is a meme and a social game designed to reward builders via onchain nominations.",
  openGraph: {
    title: "BUILD",
    description:
      "BUILD is a meme and a social game designed to reward builders via onchain nominations.",
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
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <ThemeRegistry options={{ key: "joy" }}>
        <Box
          component="body"
          sx={{ backgroundColor: "primary.500", m: 0, p: 0 }}
        >
          <Web3ModalProvider initialState={initialState}>
            <AuthenticationProvider>
              <Header />
              {children}
              <Alert color="danger" sx={{ borderRadius: 0 }}>
                This page is still under construction. Data can be deleted and
                recalculated at any point. Reach out to the devs if you find
                issues.
              </Alert>
              <Footer />
              <Toaster richColors closeButton />
            </AuthenticationProvider>
          </Web3ModalProvider>
        </Box>
      </ThemeRegistry>
    </html>
  );
}
