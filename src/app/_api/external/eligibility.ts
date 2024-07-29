import { fetchQuery, init } from "@airstack/node";
import { DateTime } from "luxon";
import { User } from "../data/users";
import { PassportCredentials } from "./talent-protocol";

init(process.env.AIRSTACK_API_KEY!);

type FarcasterAirstackQuery = {
  data: {
    Socials: {
      Social: {
        dappName: string;
        profileName: string;
        fnames: string[];
        followerCount: number;
        followingCount: number;
        isFarcasterPowerUser: boolean;
        profileCreatedAtBlockNumber: number;
        profileCreatedAtBlockTimestamp: string;
        profileLastUpdatedAtBlockNumber: number;
        profileLastUpdatedAtBlockTimestamp: string;
        userAddress: `0x${string}`;
        userAddressDetails: {
          addresses: `0x${string}`[];
        };
        userAssociatedAddresses: `0x${string}`[];
        userCreatedAtBlockNumber: number;
        userCreatedAtBlockTimestamp: string;
        userLastUpdatedAtBlockNumber: number;
        userLastUpdatedAtBlockTimestamp: string;
        userRecoveryAddress: `0x${string}`;
      }[];
    };
  };
  error: any;
};

export const checkFarcasterId = async (user: User): Promise<boolean> => {
  const fid = user.farcaster_id;
  if (!fid) return false;

  const airstackQuery = `
    query GetFarcasterUserWithFID {
      Socials(
        input: {filter: {dappName: {_eq: farcaster}, userId: {_eq: "${fid}"}}, blockchain: ethereum}
      ) {
        Social {
          dappName
          profileName
          fnames
          followerCount
          followingCount
          isFarcasterPowerUser
          profileCreatedAtBlockNumber
          profileCreatedAtBlockTimestamp
          profileLastUpdatedAtBlockNumber
          profileLastUpdatedAtBlockTimestamp
          userAddress
          userAddressDetails {
            addresses
          }
          userAssociatedAddresses
          userCreatedAtBlockNumber
          userCreatedAtBlockTimestamp
          userLastUpdatedAtBlockNumber
          userLastUpdatedAtBlockTimestamp
          userRecoveryAddress
        }
      }
    }
  `;

  try {
    const response = (await fetchQuery(
      airstackQuery,
    )) as FarcasterAirstackQuery;
    if (!!response.error) return false;
    const relevantDates = response.data.Socials.Social.map((user) => {
      return {
        profileCreatedAt: DateTime.fromISO(user.profileCreatedAtBlockTimestamp),
        profileLastUpdatedAt: DateTime.fromISO(
          user.profileLastUpdatedAtBlockTimestamp,
        ),
        userCreatedAt: DateTime.fromISO(user.userCreatedAtBlockTimestamp),
        userLastUpdatedAt: DateTime.fromISO(
          user.userLastUpdatedAtBlockTimestamp,
        ),
      };
    });

    const cutoffDate = DateTime.fromISO("2024-05-16T00:00:00.000Z");

    const staleUsers = relevantDates.filter((user) => {
      return (
        user.profileCreatedAt > cutoffDate ||
        user.profileLastUpdatedAt > cutoffDate ||
        user.userCreatedAt > cutoffDate ||
        user.userLastUpdatedAt > cutoffDate
      );
    });

    if (staleUsers.length === relevantDates.length) {
      return false;
    } else {
      return true;
    }
  } catch {
    return false;
  }
};

type ENSAirstackQuery = {
  data: {
    Domains: {
      Domain: {
        name: string;
        owner: `0x${string}`;
        resolvedAddress: `0x${string}`;
        createdAtBlockNumber: number;
        createdAtBlockTimestamp: string;
        dappName: string;
        dappSlug: string;
        expiryTimestamp: string;
        isPrimary: boolean;
        lastUpdatedBlockNumber: number;
        lastUpdatedBlockTimestamp: string;
        tokenNft: {
          lastTransferBlock: number;
          lastTransferHash: string;
          lastTransferTimestamp: string;
        };
      }[];
    };
  };
  error: any;
};

export const checkEns = async (user: User): Promise<boolean> => {
  const wallets = user.wallets.map((w) => w.wallet.toLowerCase());

  if (wallets.length === 0) return false;

  const walletsString = wallets.map((w) => `"${w}"`).join(", ");

  const airstackQuery = `
    query CheckResolvedAddress {
      Domains(
        input: {filter: {owner: {_in: [${walletsString}]}, isPrimary: {_eq: true}}, blockchain: ethereum, limit: 50}
      ) {
        Domain {
          name
          owner
          resolvedAddress
          createdAtBlockNumber
          createdAtBlockTimestamp
          dappName
          dappSlug
          expiryTimestamp
          isPrimary
          lastUpdatedBlockNumber
          lastUpdatedBlockTimestamp
          tokenNft {
            lastTransferBlock
            lastTransferHash
            lastTransferTimestamp
          }
        }
      }
    }
  `;

  try {
    const response = (await fetchQuery(airstackQuery)) as ENSAirstackQuery;

    if (!!response.error) {
      return false;
    }

    const relevantDates = response.data.Domains.Domain.filter(
      (d) => d.isPrimary,
    )
      .map((domain) => {
        return {
          owner: domain.owner,
          createdAt: DateTime.fromISO(domain.createdAtBlockTimestamp),
          expiresAt: DateTime.fromISO(domain.expiryTimestamp),
          lastUpdated: DateTime.fromISO(domain.lastUpdatedBlockTimestamp),
          lastTransfer: DateTime.fromISO(domain.tokenNft.lastTransferTimestamp),
        };
      })
      .filter((d) => wallets.includes(d.owner.toLowerCase()));

    const cutoffDate = DateTime.fromISO("2024-05-16T00:00:00.000Z");

    const staleDomains = relevantDates.filter((domain) => {
      return (
        domain.createdAt > cutoffDate ||
        domain.lastTransfer > cutoffDate ||
        domain.expiresAt < cutoffDate
      );
    });

    if (staleDomains.length === relevantDates.length) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
};

export const checkCredentials = async (user: User): Promise<boolean> => {
  const api_url = process.env.PASSPORT_API_URL;
  const api_token = process.env.PASSPORT_API_TOKEN;
  const id = user.passport_id;

  if (!id) return false;

  const url = `${api_url}/api/v2/passport_credentials?id=${id}`;
  const headers = {
    "Content-Type": "application/json",
    "X-API-KEY": api_token || "",
  };

  try {
    const response = await fetch(url, { headers });
    const data = (await response.json()) as PassportCredentials;

    const hasHumanityCredential = data.passport_credentials
      .filter((c) => c.score > 0.0)
      .some(
        (credential) =>
          credential.type === "PassportCredentials::Worldcoin" ||
          credential.type === "PassportCredentials::Gitcoin",
      );

    return hasHumanityCredential;
  } catch {
    return false;
  }
};
