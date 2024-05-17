import { headers } from "next/headers";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/inter";
import { Box } from "@mui/joy";
import { Toaster } from "sonner";
import { cookieToInitialState } from "wagmi";
import { Web3ModalProvider } from "@/app/_providers/web-3-modal-provider";
import { config } from "@/config";
import { Footer } from "@/shared/components/footer";
import { Header } from "@/shared/components/header";
import { ThemeRegistry } from "@/shared/theme/theme-registry";
import { AuthenticationProvider } from "./_providers/authentication-provider";

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
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
        <meta
          property="fc:frame:image"
          content="https://build.top/images/BUILD-thumbnail.jpg?2"
        />
        <meta property="og:type" content="website" />
        <meta
          name="description"
          content="BUILD is a meme and a social game designed to reward builders via onchain nominations."
        />
        <meta
          name="og:image"
          content="https://build.top/images/BUILD-thumbnail.jpg?2"
        />
        <meta name="og:title" content="Passport App by Talent Protocol" />
        <meta
          name="og:description"
          content="BUILD is a meme and a social game designed to reward builders via onchain nominations."
        />
        <meta name="X:card" content="summary_large_image" />
        <meta
          name="X:image"
          content="https://build.top/images/BUILD-thumbnail.jpg?2"
        />
        <meta name="twitter:title" content="Passport App by Talent Protocol" />
        <meta
          name="twitter:description"
          content="BUILD is a meme and a social game designed to reward builders via onchain nominations."
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image"
          content="https://build.top/images/BUILD-thumbnail.jpg?2"
        />
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
              <Footer />
              <Toaster richColors closeButton />
              {modal}
            </AuthenticationProvider>
          </Web3ModalProvider>
        </Box>
      </ThemeRegistry>
    </html>
  );
}

export const dynamic = "force-dynamic";
