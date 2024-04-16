import { init, fetchQuery } from "@airstack/node";

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
    const [
        { data: talentProtocolData, error: talentProtocolError },
        { data: airstackData, error: airstackError }
    ] = await Promise.all([
        { data: [], error: null },
        fetchQuery(query)
    ]);

    if (airstackError) {
        throw new Error(airstackError);
    }
    if (talentProtocolError) {
        throw new Error(talentProtocolError);
    }

    return [].concat(airstackData.Socials.Social ?? []).concat(talentProtocolData);
}

async function getNominationsFromFarcaster() {
    // TODO: inject into app_daily_nominations
}

async function computeUserNominationsAndStats() {
    // TODO: update app_nomination and app_user_stats
}

async function computeLeaderboard() {
    // TODO: update app_leaderboard
}