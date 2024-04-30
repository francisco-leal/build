import { supabase } from "@/db";
import { init, fetchQuery } from "@airstack/node";
import { searchTalentProtocolUser } from "./talent-protocol";

init(process.env.AIRSTACK_API_KEY!);

export function generateRandomSequence(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export async function searchSocialUser(querySearch: string) {
  let addressToSearch = "";
  let username = "";
  if (querySearch.length === 42 && querySearch.startsWith("0x")) {
    addressToSearch = querySearch;
  } else {
    username = querySearch;
  }

  // TODO: [possible improvement] add a 5 mins cache

  const query = `query QueryUserOnLensAndFarcaster {
        Socials(
            input: {
                filter: {
                    dappName: { _in: [farcaster, lens] },
                    identity: { ${addressToSearch.length > 0 ? `_eq: "${addressToSearch}"` : `_in: ["lens/@${username}","fc_fname:${username}", "${username}.eth"]`} }
                },
                blockchain: ethereum
            }
        ) {
            Social {
                userAddress
                dappName
                profileName
                profileImage
                userAssociatedAddresses
            }
        }
    }`;
  const [
    { data: talentProtocolData, error: talentProtocolError },
    { data: airstackData, error: airstackError },
  ] = await Promise.all([
    searchTalentProtocolUser(querySearch),
    fetchQuery(query),
  ]);

  if (airstackError) {
    throw new Error(airstackError);
  }
  if (talentProtocolError && talentProtocolData !== null) {
    throw new Error(talentProtocolError);
  }

  const filterFarcasterAddress = (
    userAddress: string,
    userAssociatedAddresses: string[],
  ) => {
    if (userAssociatedAddresses.length === 1) {
      return userAddress;
    }
    const f = userAssociatedAddresses.filter((ua) => ua !== userAddress);
    return f.length === 1 ? f[0] : userAddress;
  };

    // format results
    const result: {
        address: string;
        username: string;
        profile_image: string;
        dapp: string;
    }[] = [];
    return result
        .concat(
            airstackData.Socials.Social
                ? airstackData.Socials.Social.map(
                      (s: {
                          userAddress: string;
                          profileName: string;
                          dappName: string;
                          profileImage: string;
                          userAssociatedAddresses: string[];
                      }) => ({
                          address: filterFarcasterAddress(s.userAddress, s.userAssociatedAddresses),
                          username: s.profileName,
                          profile_image: s.profileImage,
                          dapp: s.dappName
                      })
                  )
                : []
        )
        .concat(
            talentProtocolData
                ? talentProtocolData.map(t => ({
                      address: '',
                      username: t.user ? t.user.username : t.passport_profile!.name,
                      profile_image: t.user ? t.user.profile_picture_url : t.passport_profile!.image_url,
                      dapp: 'talent-protocol'
                  }))
                : []
        );
}

export async function getNominationsFromFarcaster() {
  // TODO: inject into app_daily_nominations
}

export async function computeUserNominationsAndStats() {
  console.log("calculating user nominations and stats...");
  const { error: error_update_nominations } =
    await supabase.rpc("update_nominations");
  if (error_update_nominations) {
    throw error_update_nominations;
  }
  console.log("calculating user stats...");
  const { error: error_update_user_stats } =
    await supabase.rpc("update_user_stats");
  if (error_update_user_stats) {
    throw error_update_user_stats;
  }
  console.log("calculating user boss score...");
  const { error: error_user_boss_score } = await supabase.rpc(
    "update_user_boss_score",
  );
  if (error_user_boss_score) {
    throw error_user_boss_score;
  }
  console.log("calculating user boss budget...");
  const { error: error_user_boss_budget } = await supabase.rpc(
    "update_user_boss_budget",
  );
  if (error_user_boss_budget) {
    throw error_user_boss_budget;
  }
}

export async function computeLeaderboard() {
  const { error: error_update_leaderboard } =
    await supabase.rpc("update_leaderboard");
  if (error_update_leaderboard) {
    throw error_update_leaderboard;
  }
}
