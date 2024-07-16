import { Metadata } from "next";
import { headers } from "next/headers";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/inter";
import { Box, Stack } from "@mui/joy";
import { Toaster } from "sonner";
import { cookieToInitialState } from "wagmi";
import { Web3ModalProvider } from "@/app/_providers/web-3-modal-provider";
import { config } from "@/config";
import { AnnouncementBar } from "@/shared/components/announcement-bar";
import { Footer } from "@/shared/components/footer";
import { Header } from "@/shared/components/header";
import { ThemeRegistry } from "@/shared/theme/theme-registry";
import { AuthenticationProvider } from "./_providers/authentication-provider";

const description = [
  "BUILD is a meme and a social game designed to reward builders via",
  "onchain nominations.",
].join(" ");

export const metadata: Metadata = {
  title: "BUILD",
  description: description,
  openGraph: {
    title: "BUILD",
    description: description,
    type: "website",
    url: "https://build.top",
    images: [
      "https://build-top-images.s3.eu-west-2.amazonaws.com/BUILD-thumbnail.jpg?1",
    ],
  },
  twitter: {
    title: "BUILD",
    description: description,
    images: [
      "https://build-top-images.s3.eu-west-2.amazonaws.com/BUILD-thumbnail.jpg?1",
    ],
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
        <meta property="og:type" content="website" />
        <meta
          name="description"
          content="BUILD is a social game on Base and Farcaster that rewards onchain builders via peer nominations."
        />
        <meta
          name="og:image"
          content="https://build-top-images.s3.eu-west-2.amazonaws.com/BUILD-thumbnail.jpg?1"
        />
        <meta name="og:title" content="build.top" />
        <meta
          name="og:description"
          content="BUILD is a social game on Base and Farcaster that rewards onchain builders via peer nominations."
        />
        <meta name="X:card" content="summary_large_image" />
        <meta
          name="X:image"
          content="https://build-top-images.s3.eu-west-2.amazonaws.com/BUILD-thumbnail.jpg?1"
        />
        <meta name="twitter:title" content="build.top" />
        <meta
          name="twitter:description"
          content="BUILD is a social game on Base and Farcaster that rewards onchain builders via peer nominations."
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image"
          content="https://build-top-images.s3.eu-west-2.amazonaws.com/BUILD-thumbnail.jpg?1"
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
              <AnnouncementBar
                title="BUILD Noms Are Back"
                message="A 2nd round of BUILD noms will kick off on July 16th and distribute 50B $BUILD."
                action="Read more"
                link="https://paragraph.xyz/@macedo/build-log-7"
              />
              <Stack sx={{ minHeight: "80vh" }}>{children}</Stack>
              <Footer />
              <Toaster richColors closeButton />
            </AuthenticationProvider>
          </Web3ModalProvider>
        </Box>
      </ThemeRegistry>
    </html>
  );
}
