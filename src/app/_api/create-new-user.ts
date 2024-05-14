"use server";

import { revalidateTag } from "next/cache";
import { supabase } from "@/db";
import { getBalance } from "@/services/boss-tokens";
import { hasMintedManifestoNFT } from "@/services/manifesto-nft";
import { getBuilderScore } from "@/services/talent-protocol";
import { BadRequestError } from "@/shared/utils/error";
import { getBuilder } from "./get-builder";
import { User, getUserSkipCache } from "./get-user";
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

  const randomString = Buffer.from(crypto.randomUUID()).toString("base64");
  const inviteCode = randomString.slice(0, 8);

  const { data: past_given_nominations } = await supabase
    .from("boss_nominations")
    .select("*")
    .eq("wallet_origin", walletAddressLc)
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
    .eq("wallet_destination", walletAddressLc)
    .throwOnError();

  boss_score +=
    past_earned_nominations && past_earned_nominations.length > 0
      ? past_earned_nominations?.reduce((acc, nomination) => {
          return acc + nomination.boss_points_earned;
        }, 0)
      : 0;

  const user = {
    wallet: walletAddressLc,
    referral_code: inviteCode,
    username: builderProfile.username,
    manifesto_nft: has_manifesto_nft,
    boss_score,
    boss_budget: 0,
    passport_builder_score: builder_score,
    boss_token_balance: boss_tokens,
    boss_nomination_streak: 0,
    farcaster_id: fid,
    passport_id: passport_id,
  };

  await supabase.from("users").insert(user).throwOnError();

  const { data: sameFarcasterUser } = fid
    ? await supabase
        .from("users")
        .select("*")
        .eq("farcaster_id", fid)
        .throwOnError()
    : { data: null };
  const { data: samePassportUSer } = passport_id
    ? await supabase
        .from("users")
        .select("*")
        .eq("passport_id", passport_id)
        .throwOnError()
    : { data: null };

  // only update budget for users that are not duplicated passports or farcaster ids
  // TODO: Add a flag for users that have logged in into the app to be set via frame or login
  // and only update the budget for those users, this must also affect the calculation for boss budget for all users
  if (
    sameFarcasterUser &&
    sameFarcasterUser.length === 1 &&
    samePassportUSer &&
    samePassportUSer.length === 1
  ) {
    await supabase.rpc("calculate_boss_budget_for_user", {
      wallet_to_update: user.wallet,
    });
  }

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

  revalidateTag(`user_${walletAddressLc}` satisfies CacheKey);
  const finalUser = await getUserSkipCache(walletAddressLc);
  if (!finalUser) throw new Error("User creation failed");

  return await finalUser;
}

export const getOrCreateUser = async (wallet: string): Promise<User> => {
  if (!wallet) throw new BadRequestError("Invalid wallet address");

  return (await getUserSkipCache(wallet)) ?? (await createNewUser(wallet));
};
