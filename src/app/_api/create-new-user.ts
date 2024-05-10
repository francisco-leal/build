"use server";

import { revalidateTag } from "next/cache";
import { supabase } from "@/db";
import { getBalance } from "@/services/boss-tokens";
import { hasMintedManifestoNFT } from "@/services/manifesto-nft";
import { getBuilderScore } from "@/services/talent-protocol";
import { BadRequestError } from "@/shared/utils/error";
import { wait } from "@/shared/utils/wait";
import { getBuilder } from "./get-builder";
import { getUser } from "./get-user";
import { CacheKey } from "./helpers/cache-keys";

export async function createNewUser(walletAddress: string) {
  const walletAddressLc = walletAddress.toLowerCase();
  const builderProfile = await getBuilder(walletAddressLc);
  if (!builderProfile) throw new BadRequestError("user not found");

  const [
    { score: builder_score, passport_id: passport_id },
    boss_tokens,
    has_manifesto_nft,
  ] = await Promise.all([
    getBuilderScore(walletAddressLc),
    getBalance(walletAddressLc),
    hasMintedManifestoNFT(walletAddressLc),
  ]);

  // calculate boss_budget
  // we ignore the boss points and nomination streak at this point,
  // given both are zero!
  const fid = builderProfile.farcasterId;

  // TODO fixme
  const boss_budget =
    builder_score === 0
      ? (fid ?? 0) > 20_000
        ? 500
        : 1000
      : (builder_score * 20 + boss_tokens * 0.001) *
        (has_manifesto_nft ? 1.2 : 1);

  const randomString = Buffer.from(crypto.randomUUID()).toString("base64");
  const inviteCode = randomString.slice(0, 8);

  const { data: past_given_nominations } = await supabase
    .from("boss_nominations")
    .select("*")
    .eq("wallet_origin", walletAddressLc.toLowerCase())
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
    .eq("wallet_destination", walletAddressLc.toLowerCase())
    .throwOnError();

  boss_score +=
    past_earned_nominations && past_earned_nominations.length > 0
      ? past_earned_nominations?.reduce((acc, nomination) => {
          return acc + nomination.boss_points_earned;
        }, 0)
      : 0;

  const user = {
    wallet: walletAddressLc.toLowerCase(),
    referral_code: inviteCode,
    username: builderProfile.username,
    manifesto_nft: has_manifesto_nft,
    boss_score,
    boss_budget,
    passport_builder_score: builder_score,
    boss_token_balance: boss_tokens,
    boss_nomination_streak: 0,
    farcaster_id: fid,
    passport_id: passport_id,
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

  await revalidateTag(
    `user_${walletAddressLc.toLowerCase()}` satisfies CacheKey,
  );
  // revalidateTag does not seem to be a sync method.
  await wait(5);
  const finalUser = await getUser(walletAddressLc);
  if (!finalUser) throw new Error("User creation failed");

  return await finalUser;
}
