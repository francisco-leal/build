import { Box, Button, Link, Stack, Typography } from "@mui/joy";
import { BlockyCard } from "./blocky-card";

interface AnnouncementBarProps {
  title: string;
  message: string;
  action: string;
  link: string;
}

export const AnnouncementBar = ({
  title,
  message,
  action,
  link,
}: AnnouncementBarProps) => {
  return (
    <Box
      sx={{ display: "flex", width: "full", py: 1, justifyContent: "center" }}
    >
      <BlockyCard
        sx={{
          display: "flex",
          flexDirection: "row",
          padding: "8px 2px",
          justifyContent: "space-between",
          alignItems: "center",
          textAlign: "center",
          marginBottom: "16px",
          px: { xs: 2 },
          maxWidth: { md: "lg" },
          width: "90%",
          mx: "2%",
        }}
      >
        <Stack sx={{ alignItems: "flex-start", width: "80%" }}>
          <Typography
            level="h4"
            textColor="common.black"
            margin={0}
            sx={{
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
              maxWidth: "100%",
            }}
          >
            {title}
          </Typography>
          <Typography
            level="body-md"
            textColor="common.black"
            margin={0}
            sx={{
              textAlign: "left",
              maxWidth: "100%",
              display: { xs: "none", lg: "block" },
            }}
          >
            {message}
          </Typography>
        </Stack>
        <Button
          component={Link}
          href={link}
          target="_blank"
          sx={{ lineHeight: 1, maxWidth: "20%" }}
        >
          {action}
        </Button>
      </BlockyCard>
    </Box>
  );
};
