"use server";

import { revalidateTag } from "next/cache";
import { farcaster } from "frames.js/middleware";
import { supabase } from "@/db";
import { Database } from "@/db/database.types";
import { getBalance } from "@/services/boss-tokens";
import { getFarcasterUser } from "@/services/farcaster";
import { hasMintedManifestoNFT } from "@/services/manifesto-nft";
import {
  getBuilderScore,
  getTalentProtocolUser,
} from "@/services/talent-protocol";
import { BadRequestError } from "@/shared/utils/error";
import { getWalletInfo } from "./get-wallet-info";
import { getUserFromId } from "./get-user";
import { CacheKey } from "./helpers/cache-keys";

export type User = Database["public"]["Tables"]["users"]["Row"];
export type Wallet = Database["public"]["Tables"]["wallets"]["Row"];
export type PartialWallet = Partial<Wallet> & Pick<Wallet, "wallet">;

export const createNewUserForWallet = async (wallet: string): Promise<User> => {
  const walletLc = wallet.toLowerCase();
  const talentUser = await getTalentProtocolUser(walletLc);
  const farcasterUser = await getFarcasterUser(walletLc);

  const allWallets: PartialWallet[] = [
    ...(talentUser?.verified_wallets ?? []).map((w) => ({
      wallet: w,
      passport_id: talentUser?.passport_id,
    })),
    ...(farcasterUser?.allWallets ?? []).map((w) => ({
      wallet: w,
      farcaster_id: farcasterUser?.profileTokenId,
    })),
  ];

  const existingWallets = await supabase
    .from("wallets")
    .select("user_id")
    .in("wallet", allWallets)
    .throwOnError()
    .then((res) => res.data);

  const userId = existingWallets?.find((w) => w.user_id)?.user_id;
  if (userId) {
    const user = await getUserFromId(userId);
    if (!user) throw new Error("User creation failed");
    return user;
  }

  const newUser: Omit<User, "created_at" | "id"> = {
    username: farcasterUser?.username ?? talentUser?.user?.username ?? walletLc,
    manifesto_nft_token_id: await hasMintedManifestoNFT(walletLc),
    boss_budget: 0,
    passport_builder_score: talentUser?.score ?? 0,
    boss_token_balance: await getBalance(walletLc),
    boss_nomination_streak: 0,
    farcaster_id: farcasterUser?.profileTokenId ?? null,
    passport_id: talentUser?.passport_id ?? null,
  };

  const user = await supabase
    .from("users")
    .insert(newUser)
    .throwOnError()
    .select("*")
    .then((res) => res.data?.[0]);

  if (!user) throw new Error("User creation failed");
  return user;
};

export const connectUserToWallets = async (user: User, wallet: string) => {
  const walletLc = wallet.toLowerCase();
  const talentUser = await getTalentProtocolUser(walletLc);
  const farcasterUser = await getFarcasterUser(walletLc);

  const existingWallets = await supabase
    .from("wallets")
    .select("wallet, farcaster_id, passport_id, user_id")
    .eq("user_id", user.id)
    .throwOnError()
    .then((res) => res.data);

  const allWallets: PartialWallet[] = [
    ...(existingWallets ?? []),
    ...(talentUser?.verified_wallets ?? []).map((w) => ({
      wallet: w,
      passport_id: talentUser?.passport_id,
      user_id: user.id,
    })),
    ...(farcasterUser?.allWallets ?? []).map((w) => ({
      wallet: w,
      farcaster_id: farcasterUser?.profileTokenId,
      user_id: user.id,
    })),
  ].reduce<PartialWallet[]>((acc, w) => {
    const index = acc.findIndex((e) => e.wallet === w.wallet);
    if (index === -1) {
      acc.push(w);
    } else {
      acc[index] = { ...acc[index], ...w };
    }
    return acc;
  }, []);

  await supabase
    .from("wallets")
    .upsert(allWallets.map((w) => ({ ...w })))
    .throwOnError();
};

async function old_createNewUser(walletAddress: string, hasLoggedIn: boolean) {
  const walletAddressLc = walletAddress.toLowerCase();
  const builderProfile = await getWalletInfo(walletAddressLc);
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
  const fid = builderProfile.farcaster_id;

  const randomString = Buffer.from(crypto.randomUUID()).toString("base64");
  const inviteCode = randomString.slice(0, 8);

  const user = {
    wallet: walletAddressLc,
    referral_code: inviteCode,
    username: builderProfile.username,
    manifesto_nft: has_manifesto_nft,
    boss_score: 0,
    boss_budget: 0,
    passport_builder_score: builder_score,
    boss_token_balance: boss_tokens,
    boss_nomination_streak: 0,
    farcaster_id: fid,
    passport_id: passport_id,
    unique: false,
  };

  const { data: newUser } = await supabase
    .from("users")
    .select("*")
    .eq("wallet", user.wallet)
    .single();

  if (!newUser) {
    await supabase.from("users").insert(user).throwOnError();
  }

  if (hasLoggedIn) {
    // get all users with the same farcaster id
    const { data: usersWithSameFarcasterId } = await supabase
      .from("users")
      .select("*")
      .eq("farcaster_id", fid ?? -1);

    // get all users with the same passport id
    const { data: usersWithSamePassportId } = await supabase
      .from("users")
      .select("*")
      .eq("passport_id", passport_id ?? -1);

    if (
      usersWithSameFarcasterId?.length === 0 &&
      usersWithSamePassportId?.length === 0
    ) {
      user.unique = true;
    } else {
      const mainUser =
        usersWithSameFarcasterId?.find((u) => u.unique) ??
        usersWithSamePassportId?.find((u) => u.unique);

      if (mainUser) {
        return mainUser;
      } else {
        user.unique = true;

        const { data: nominationsFromAssociatedWallets } = await supabase
          .from("boss_nominations")
          .select("*")
          .in("wallet_destination", [
            ...(usersWithSameFarcasterId ?? []).map((u) => u.wallet),
            ...(usersWithSamePassportId ?? []).map((u) => u.wallet),
          ]);

        await nominationsFromAssociatedWallets?.forEach(async (nomination) => {
          const newNomination = {
            boss_points_earned: nomination.boss_points_earned,
            boss_points_given: nomination.boss_points_given,
            wallet_origin: nomination.wallet_origin,
            wallet_destination: user.wallet,
          };
          const { data: nominationFromMainWallet } = await supabase
            .from("boss_nominations")
            .insert(newNomination)
            .select("*");

          await supabase
            .from("boss_nominations")
            .update({
              transfer_id: nominationFromMainWallet
                ? nominationFromMainWallet[0].id
                : null,
              valid: false,
            })
            .eq("id", nomination.id);
        });
      }
    }
  }

  if (user.unique) {
    await supabase
      .from("users")
      .update({ unique: user.unique })
      .eq("wallet", user.wallet);

    // update boss score
    await supabase.rpc("calculate_boss_budget_for_user", {
      wallet_to_update: user.wallet,
    });

    await supabase
      .from("boss_leaderboard")
      .insert({
        rank: null,
        wallet: user.wallet,
        username: user.username,
        boss_score: user.boss_score,
        passport_builder_score: user.passport_builder_score,
        boss_nominations_received: 0,
      })
      .throwOnError();
  }

  revalidateTag(`user_${walletAddressLc}` satisfies CacheKey);
  revalidateTag("leaderboard" satisfies CacheKey);
  const finalUser = await getUserSkipCache(walletAddressLc);
  if (!finalUser) throw new Error("User creation failed");

  return await finalUser;
}

export const old_getOrCreateUser = async (
  wallet: string,
  hasLoggedIn: boolean = false,
): Promise<User> => {
  if (!wallet) throw new BadRequestError("Invalid wallet address");

  return (
    (await getUserSkipCache(wallet)) ??
    (await old_createNewUser(wallet, hasLoggedIn))
  );
};
