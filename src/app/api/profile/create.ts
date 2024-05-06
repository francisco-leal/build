import { supabase } from "@/db";
import { generateRandomSequence, searchSocialUser } from "@/services";
import { getBalance } from "@/services/boss-tokens";
import { hasMintedManifestoNFT } from "@/services/manifesto-nft";
import { getBuilderScore } from "@/services/talent-protocol";

export async function createProfile(wallet_address: string) {
  const socialProfiles = await searchSocialUser(wallet_address);
  if (socialProfiles.length === 0) {
    return { error: "user not found", data: null };
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
  // we ignore the boss points and nomination streak at this point, given both are zero!
  const fid = socialProfiles.filter(
    (profile) => profile.dapp === "farcaster",
  )?.[0]?.profileTokenId;
  const boss_budget =
    builder_score === 0
      ? fid > 20_000
        ? 500
        : 1000
      : (builder_score * 20 + boss_tokens * 0.01) *
        (has_manifesto_nft ? 1.2 : 1);
  const { error: error_write, data } = await supabase.rpc("insert_user_v2", {
    wallet_address,
    referral_code: generateRandomSequence(16),
    boss_score: 0,
    boss_budget,
    builder_score,
    username: username || "",
    social_profiles: socialProfiles,
    manifesto_nft: has_manifesto_nft,
  });

  if (error_write) {
    return { error: error_write, data: null };
  }

  return { error: null, data: data };
}
