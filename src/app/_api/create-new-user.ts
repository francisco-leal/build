import { supabase } from "@/db";
import { getBalance } from "@/services/boss-tokens";
import { hasMintedManifestoNFT } from "@/services/manifesto-nft";
import { getBuilderScore } from "@/services/talent-protocol";
import { searchBuilders } from "./search-builders";
import { BadRequestError } from "@/shared/utils/error";

export async function createNewUser(wallet_address: string) {
  const socialProfiles = await searchBuilders(wallet_address);
  if (socialProfiles.length === 0) {
    throw new BadRequestError("user not found");
  }

  let username = socialProfiles.find((profile) => !!profile.username)?.username;
  if (!!username && username.includes("lens/@")) {
    username = username.split("lens/@")[1];
  }

  // get builder score and  boss tokens
  const [builder_score, boss_tokens, has_manifesto_nft] = await Promise.all([
    getBuilderScore(wallet_address),
    getBalance(wallet_address),
    hasMintedManifestoNFT(wallet_address),
  ]);

  // calculate boss_budget
  // we ignore the boss points and nomination streak at this point,
  // given both are zero!
  const fid = socialProfiles.filter(
    (profile) => profile.dapp === "farcaster",
  )?.[0]?.profileTokenId;

  const boss_budget =
    builder_score === 0
      ? fid > 20_000
        ? 500
        : 1000
      : (builder_score * 20 + boss_tokens * 0.001) *
        (has_manifesto_nft ? 1.2 : 1);

  const randomString = Buffer.from(crypto.randomUUID()).toString("base64");
  const inviteCode = randomString.slice(0, 8);

  const { data: past_given_nominations } = await supabase
    .from("boss_nominations")
    .select("*")
    .eq("wallet_origin", wallet_address.toLowerCase())
    .throwOnError();

  let boss_score = 0;
  boss_score +=
    past_given_nominations && past_given_nominations.length > 0
      ? past_given_nominations.reduce((acc, nomination) => {
          return acc + nomination.boss_points_earned;
        }, 0)
      : 0;

  const { data: past_earned_nominations } = await supabase
    .from("boss_nominations")
    .select("*")
    .eq("wallet_destination", wallet_address.toLowerCase())
    .throwOnError();

  boss_score +=
    past_earned_nominations && past_earned_nominations.length > 0
      ? past_earned_nominations?.reduce((acc, nomination) => {
          return acc + nomination.boss_points_earned;
        }, 0)
      : 0;

  const user = {
    wallet: wallet_address.toLowerCase(),
    referral_code: inviteCode,
    username: username,
    manifesto_nft: has_manifesto_nft,
    boss_score,
    boss_budget,
    passport_builder_score: builder_score,
    boss_token_balance: boss_tokens,
    boss_nomination_streak: 0,
    farcaster_id: fid,
  };

  await supabase.from("users").insert(user).throwOnError();

  await supabase
    .from("boss_leaderboard")
    .insert({
      rank: null,
      wallet: user.wallet,
      username: user.username,
      boss_score: user.boss_score,
      passport_builder_score: user.passport_builder_score,
      boss_nominations_received: past_earned_nominations?.length ?? 0,
    })
    .throwOnError();

  return user;
}
