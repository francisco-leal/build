import { supabase } from "@/db";
import { getFarcasterUser } from "@/services/farcaster";
import { getTalentProtocolUser } from "@/services/talent-protocol";
import { PartialWallet, User } from "../data/users";

/**
 * connects a user to a new wallet. This will be a redundant action
 * most times, as the wallet will already be connected, but in case it is
 * not it will make sure we invalidate duplicate nominations, and prevent
 * future duplicates.
 */
export const createUserConnections = async (user: User, newWallet: string) => {
  const walletLc = newWallet.toLowerCase();
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

  // TODO invalidate duplicate nominations
};
