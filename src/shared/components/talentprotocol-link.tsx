import { Link } from "@mui/joy";
import { TalentProtocol } from "../icons/talent-protocol";

export const TalentProtocolLink = ({ passportId }: { passportId: number }) => {
  return (
    <Link
      href={`https://passport.talentprotocol.com/profile/${passportId}`}
      target="_blank"
      variant="outlined"
      sx={{ color: "primary.500", alignSelf: "flex-end" }}
    >
      <TalentProtocol sx={{ p: 0.25, width: 16, height: 16 }} />
    </Link>
  );
};
