import { fetchQuery } from "@airstack/node";

type BuilderProfile = {
    image: string;
    username: string;
    address: string;
}

const getFarcasterBuilderProfile = async (username: string): Promise<BuilderProfile | null> => {
    return null;
    // TODO: Implement this function it should return the BuilderProfile of the user with the given username
    // from the farecaster API

    const farcasterQuery = `query QueryUserOnLensAndFarcaster {
        Socials(
            input: {
                filter: {
                    dappName: { _in: [farcaster, lens] },
                    identity: { 
                        _in: [
                        "lens/@${username}",
                        "fc_fname:${username}", 
                        "${username}.eth"
                        ] 
                    }
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
                profileTokenId
            }
        }
    }`;

    const result = await fetchQuery(farcasterQuery);
    if (result.error) throw new Error(result.error);

}

const getTalentProtocolBuilderProfile = async (username: string): Promise<BuilderProfile | null> => {
    // TODO: Implement this function it should return the BuilderProfile of the user with the given username
    // from the talent protocol API
    return null;
}

export const getBuilderProfile = async (username: string): Promise<BuilderProfile | null> => {
    const tb = await getTalentProtocolBuilderProfile(username);
    const fb = await getFarcasterBuilderProfile(username);
    return tb ?? fb;
}