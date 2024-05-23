import { Link } from "@mui/joy";
import { Farcaster } from "../icons/farcaster";

export const FarcasterLink = ({ username }: { username: string }) => {
  return (
    <Link
      href={`https://warpcast.com/${username}`}
      target="_blank"
      variant="outlined"
      sx={{
        color: "primary.500",
        alignSelf: "flex-end",
        "&:hover": { backgroundColor: "primary.400" },
      }}
    >
      <Farcaster sx={{ width: 16, height: 16 }} />
    </Link>
  );
};
