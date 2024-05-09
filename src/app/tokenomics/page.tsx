import { Section1 } from "./section-1";
import { Section2 } from "./section-2";
import { Stack } from "@mui/joy";
import { Section3 } from "./section-3";

export default function Tokenomics() {
  return (
    <Stack component="main" sx={{ alignItems: "center" }}>
      <Section1 />
      <Section2 />
      <Section3 />
    </Stack>
  );
}
