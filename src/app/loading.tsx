import { Skeleton, Stack } from "@mui/joy";
import { HeroSection } from "@/shared/components/hero-section";
import { HeroSectionSlim } from "@/shared/components/hero-section-slim";

export default function Loading() {
  return (
    <Stack component="main">
      <HeroSectionSlim sx={{ ".MuiSkeleton-root::before": { my: 0 } }}>
        <Skeleton level="h1" variant="text" width={"80%"} sx={{ mb: 1 }} />
        <Skeleton level="h1" variant="text" width={"100%"} sx={{ mt: 1 }} />

        <Skeleton
          level="title-lg"
          variant="text"
          width={"85%"}
          sx={{ mt: 3 }}
        />
        <Skeleton
          level="title-lg"
          variant="text"
          width={"95%"}
          sx={{ my: 1 }}
        />
        <Skeleton
          level="title-lg"
          variant="text"
          width={"83%"}
          sx={{ my: 1 }}
        />
        <Skeleton
          level="title-lg"
          variant="text"
          width={"63%"}
          sx={{ my: 1 }}
        />
      </HeroSectionSlim>
      <HeroSection>
        <Skeleton variant="rectangular" sx={{ height: 400, width: "100%" }} />
      </HeroSection>
    </Stack>
  );
}
