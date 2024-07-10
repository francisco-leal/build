import { Box, Button, Link, Stack, Typography } from "@mui/joy";
import { BlockyCard } from "./blocky-card";

interface HeroAlertNavbarProps {
  title: string;
  message: string;
  action: string;
  link: string;
}

const HeroAlertNavbar = ({
  title,
  message,
  action,
  link,
}: HeroAlertNavbarProps) => {
  return (
    <Box component="header" sx={{ py: 1 }}>
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
          mx: { xs: "2%", md: "auto" },
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
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
              maxWidth: "100%",
            }}
          >
            {message}
          </Typography>
        </Stack>
        <Button component={Link} href={link} target="_blank">
          {action}
        </Button>
      </BlockyCard>
    </Box>
  );
};

export default HeroAlertNavbar;
