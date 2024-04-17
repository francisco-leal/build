import { supabase } from '@/db';
import { init, fetchQuery } from '@airstack/node';

init(process.env.AIRSTACK_API_KEY!);

export async function searchSocialUser(username: string) {
    const query = `query QueryUserOnLensAndFarcaster {
        Socials(
            input: {
                filter: {
                    dappName: { _in: [farcaster, lens] },
                    identity: { _in: ["lens/@${username}","fc_fname:${username}", "${username}.eth"]}
                },
                blockchain: ethereum
            }
        ) {
            Social {
                userAddress
                dappName
                profileName
                profileImage
            }
        }
    }`;
    // TODO: complete talent protocol data
    const [{ data: talentProtocolData, error: talentProtocolError }, { data: airstackData, error: airstackError }] =
        await Promise.all([{ data: [], error: null }, fetchQuery(query)]);

    if (airstackError) {
        throw new Error(airstackError);
    }
    if (talentProtocolError) {
        throw new Error(talentProtocolError);
    }

    return [].concat(airstackData.Socials.Social ?? []).concat(talentProtocolData);
}

export async function getNominationsFromFarcaster() {
    // TODO: inject into app_daily_nominations
}

export async function computeUserNominationsAndStats() {
    const { error: error_update_nominations } = await supabase.rpc('update_nominations');
    if (error_update_nominations) {
        throw error_update_nominations;
    }
    const { error: error_update_user_stats } = await supabase.rpc('update_user_stats');
    if (error_update_user_stats) {
        throw error_update_user_stats;
    }
}

export async function computeLeaderboard() {
    const { error: error_update_leaderboard } = await supabase.rpc('update_leaderboard');
    if (error_update_leaderboard) {
        throw error_update_leaderboard;
    }
}
