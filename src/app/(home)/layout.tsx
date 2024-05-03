import { Header } from "@/shared/components/header";
import { Footer } from "@/shared/components/footer";
import { Stack } from "@mui/joy";

export default function HomePageLayout({
  section1,
  section2,
  section3,
  section4,
}: {
  section1: React.ReactNode;
  section2: React.ReactNode;
  section3: React.ReactNode;
  section4: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <Stack component="main">
        {section1}
        {section2}
        {section3}
        {section4}
      </Stack>
      <Footer />
    </>
  );
}
