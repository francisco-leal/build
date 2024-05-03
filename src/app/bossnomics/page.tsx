import { Section1 } from "./section-1";
import { Section2 } from "./section-2";
import { Stack } from "@mui/joy";

export default function Bossnomics() {
  return (
    <Stack component="main" sx={{ alignItems: "center" }}>
      <Section1 />
      <Section2 />
      {/* hide section 3 for now */}
      {/* <Section3 /> */}
    </Stack>
  );
}
