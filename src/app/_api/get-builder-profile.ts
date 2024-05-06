import { fetchQuery } from "@airstack/node";

type BuilderProfile = {
  image: string;
  username: string;
  address: string;
};

const getFarcasterBuilderProfile = async (
  walledId: string,
): Promise<BuilderProfile | null> => {
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
                        "lens/@${walledId}",
                        "fc_fname:${walledId}", 
                        "${walledId}.eth"
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
};

const getTalentProtocolBuilderProfile = async (
  walledId: string,
): Promise<BuilderProfile | null> => {
  // TODO: Implement this function it should return the BuilderProfile of the user with the given username
  // from the talent protocol API
  return null;
};

export const getBuilderProfile = async (
  walledId: string,
): Promise<BuilderProfile | null> => {
  const tb = await getTalentProtocolBuilderProfile(walledId);
  const fb = await getFarcasterBuilderProfile(walledId);
  return tb ?? fb;
};
