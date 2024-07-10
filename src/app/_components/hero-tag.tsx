import { Typography } from "@mui/joy";
import { BlockyCard } from "@/shared/components/blocky-card";

interface HeroTagProps {
  progress: string;
  tag: string;
}

const HeroTag = ({ progress, tag }: HeroTagProps) => {
  return (
    <BlockyCard
      sx={{
        position: "absolute",
        transform: "rotate(3deg)",
        top: "-3%",
        right: "2%",
        maxWidth: { xs: "md", md: "lg" },
        padding: "8px 16px 8px 8px",
        zIndex: 10,
      }}
    >
      <Typography level="h4" textColor="primary.500">
        <Typography
          sx={{
            color: "common.white",
            backgroundColor: "primary.500",
            padding: "2px 4px",
          }}
        >
          {progress}
        </Typography>{" "}
        {tag}
      </Typography>
    </BlockyCard>
  );
};

export default HeroTag;
