/* eslint-disable react/no-unescaped-entities */
"use client";
import { Sheet, Stack, Typography } from "@mui/joy";
import { Header } from "@/shared/components/header";
import { Footer } from "@/shared/components/footer";
import Signature from "../../../public/images/signature.png";
import Image from "next/image";

const content = [
  "Dear builder,",
  "If you could go ahead and read this letter, that'd be great.",
  "I hope this memo finds you... doing whatever it is you do.",
  "Look, I'll cut to the chase - we're letting you go. Yeah, sorry about that.",
  "I mean, don't get me wrong, your whole decentralized thing is intriguing and all, but let's face it - there's no room for onchain troublemakers in the corporate workplace.",
  "I know you're all about your autonomy, transparency and whatnot, but that's just not how we do things around here, okay? We like our hierarchies and nine-to-fives, thank you very much.",
  "And all this talk about meritocracy, innovation and equal opportunity? Yeah, that's gonna be a no from us. We prefer to keep things nice and cozy for the folks at the top.",
  "So, yeah, consider this your official termination notice. Mmmkay?",
  "You may think you're all cutting-edge with your web3 dreams, but the real world runs on a different kind of \"blockchain\" - it's called the corporate ladder. And it takes more than just talent and passion to climb it.",
  "Kind regards,",
];

export default function Memo() {
  return (
    <main>
      <Header />

      <Stack sx={{ alignItems: "center" }}>
        <Stack
          component="section"
          sx={{
            maxWidth: { md: "lg" },
            py: 10,
            px: { xs: 2, md: 0 },
          }}
        >
          <Sheet
            variant="outlined"
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              py: { xs: 5, md: 15 },
              px: { xs: 2, md: 21 },
              gap: 5,
            }}
          >
            <Typography
              sx={{ fontSize: { xs: "32px", md: "56px" }, fontWeight: "bold" }}
            >
              Dear builder, you're fired.
            </Typography>

            <Stack sx={{ gap: 4 }}>
              {content.map((line, index) => (
                <Typography
                  key={index}
                  sx={{ fontSize: "18px", fontWeight: "600" }}
                >
                  {line}
                </Typography>
              ))}
              <Image src={Signature} alt="signature" />
            </Stack>
          </Sheet>
        </Stack>
      </Stack>

      <Footer />
    </main>
  );
}
