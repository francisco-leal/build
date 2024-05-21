import { Link } from "@mui/joy";
import { Farcaster } from "../icons/farcaster";

export const FarcasterLink = ({
  farcaster_id,
  username,
}: {
  farcaster_id: number | undefined;
  username: string | undefined;
}) => {
  if (!farcaster_id) return null;
  if (!username) return null;

  return (
    <Link
      href={`https://warpcast.com/${username}`}
      target="_blank"
      variant="outlined"
      sx={{ color: "primary.500", alignSelf: "flex-end" }}
    >
      <Farcaster sx={{ p: 0.25, width: 16, height: 16 }} />
    </Link>
  );
};
