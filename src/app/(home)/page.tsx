import { Header } from "@/shared/components/header";
import { Footer } from "@/shared/components/footer";
import { Stack } from "@mui/joy";
import { Section1 } from "./section-1";
import { Section2 } from "./section-2";
import { Section3 } from "./section-3";
import { Section4 } from "./section-4";

export default function Home() {
  return (
    <>
      <Header />
      <Stack component="main">
        <Section1 />
        <Section2 />
        {/* hide section 3 for now */}
        {/* <Section3 /> */}
        <Section4 />
      </Stack>
      <Footer />
    </>
  );
}
