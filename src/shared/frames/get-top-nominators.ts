import { getTopNominationsForUser } from "@/app/_api/data/nominations";
import { User } from "@/app/_api/data/users";
import {
  FarcasterAPIUser,
  getFarcasterUserByFid,
} from "@/app/_api/external/farcaster";
import {
  PassportResult,
  getTalentProtocolUser,
} from "@/app/_api/external/talent-protocol";

export type FrameNominatorUserType = {
  username: string;
  profile_picture_url: string;
} | null;

export function getUser(nominator: FarcasterAPIUser | PassportResult | null) {
  if (!nominator) return null;
  let user: FrameNominatorUserType = { profile_picture_url: "", username: "" };
  // FarcasterAPIUser
  if ("username" in nominator) {
    user.username = nominator?.username;
    user.profile_picture_url = nominator?.pfp_url;
  }
  // PassportResult
  if ("user" in nominator) {
    user = nominator?.user!;
  }
  return user;
}

export async function getTopNominators(
  currentUser: User,
): Promise<FrameNominatorUserType[]> {
  const topNominations = await getTopNominationsForUser(currentUser);
  const topNominators = await Promise.all(
    topNominations.map((n) => {
      if (!n.originFarcasterId && !n.originPassportId) return null;
      let user;
      if (n.originFarcasterId) {
        user = getFarcasterUserByFid(n.originFarcasterId);
      } else {
        user = getTalentProtocolUser(n.originPassportId?.toString() ?? "");
      }
      return user;
    }),
  );
  return topNominators.map(getUser);
}
