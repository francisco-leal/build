"use client";

import { Button, Typography, Stack, Divider, Link } from "@mui/joy";
import { formatEther } from "viem";
import { base } from "viem/chains";
import { useAccount, useReadContract } from "wagmi";
import { BlockyCard } from "@/shared/components/blocky-card";
import { Heart } from "@/shared/icons/heart";
import MerkleDistributionAbi from "@/shared/utils/MerkleDistributionAbi.json";
import { formatLargeNumber, formatNumber } from "@/shared/utils/format-number";
import { getWarpcastSharableLinkAirdrop1 } from "@/shared/utils/sharable-warpcast-link";
import { AirdropInfo } from "../_api/data/users";
import { User } from "../_api/data/users";

type Props = {
  details: AirdropInfo | null;
};

const MERKLE_DISTRIBUTION_CONTRACT =
  "0x556e182ad2b72f5934C2215d6A56cFC19936FdB7";

export const ClaimSection = ({ details }: Props) => {
  const { address } = useAccount();
  const { data: donated } = useReadContract({
    abi: MerkleDistributionAbi.abi,
    address: MERKLE_DISTRIBUTION_CONTRACT,
    functionName: "donated",
    args: [address],
    chainId: base.id,
  });
  const { data: claimed } = useReadContract({
    abi: MerkleDistributionAbi.abi,
    address: MERKLE_DISTRIBUTION_CONTRACT,
    functionName: "claimed",
    args: [address],
    chainId: base.id,
  });

  const donatedTokens = !!details && (donated as bigint) > 0n;
  const claimedTokens =
    !!details && (donated as bigint) <= 0n && (claimed as bigint) > 0n;
  const missedOut = !donatedTokens && !claimedTokens;

  return (
    <>
      {donatedTokens && (
        <Stack
          sx={{
            flexDirection: "column",
            mt: 4,
            maxWidth: "min(600px, 100%)",
          }}
        >
          <BlockyCard>
            <Stack
              sx={{
                flexDirection: "column",
                alignItems: "start",
                minWidth: "340px",
                gap: 1,
              }}
            >
              <Heart sx={{ alignSelf: "center" }} />
              <Typography level="body-lg" sx={{ alignSelf: "center" }}>
                You are officially a BUILD OG!
              </Typography>
              <Typography
                level="body-md"
                sx={{ textAlign: "center", alignSelf: "center" }}
              >
                Thank you for committing{" "}
                {(donated as bigint) > 0n ? (
                  <strong>
                    {formatLargeNumber(
                      parseInt(formatEther(donated as bigint)),
                    )}{" "}
                  </strong>
                ) : (
                  ""
                )}
                $BUILD<br></br>to the{" "}
                <Link
                  href="https://paragraph.xyz/@macedo/build-announcement-4#h-build-summer-fund"
                  target="_blank"
                >
                  BUILD Summer Fund
                </Link>
                .
              </Typography>
              <Divider sx={{ backgroundColor: "neutral.400" }} />
              <Typography level="title-sm">Airdrop 1 stats</Typography>
              <Stack
                sx={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  minWidth: "100%",
                }}
              >
                <Typography level="body-sm">Total nominations given</Typography>
                <Typography level="body-sm">
                  {details.nominations_made ?? 0}
                </Typography>
              </Stack>
              <Stack
                sx={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  minWidth: "100%",
                }}
              >
                <Typography level="body-sm">
                  Total nominations received
                </Typography>
                <Typography level="body-sm">
                  {details.nominations_received ?? 0}
                </Typography>
              </Stack>
              <Stack
                sx={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  minWidth: "100%",
                }}
              >
                <Typography level="body-sm">Total points earned</Typography>
                <Typography level="body-sm">
                  {formatNumber(details.build_points ?? 0)}
                </Typography>
              </Stack>
              <Stack
                sx={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  minWidth: "100%",
                }}
              >
                <Typography level="body-sm">Final rank</Typography>
                <Typography level="body-sm">{details.rank ?? "---"}</Typography>
              </Stack>
              <Divider sx={{ backgroundColor: "neutral.400" }} />
              <Stack
                sx={{
                  alignSelf: "end",
                  display: "flex",
                  flexDirection: "row",
                  mt: 2,
                }}
              >
                <Button
                  variant="solid"
                  color="primary"
                  onClick={() =>
                    window.open(
                      getWarpcastSharableLinkAirdrop1(
                        parseInt(formatEther(donated as bigint)),
                        address!,
                      ),
                      "_blank",
                    )
                  }
                >
                  Share on farcaster
                </Button>
              </Stack>
            </Stack>
          </BlockyCard>
        </Stack>
      )}
      {claimedTokens && (
        <Stack
          sx={{
            flexDirection: "column",
            mt: 4,
            maxWidth: "min(600px, 100%)",
          }}
        >
          <BlockyCard>
            <Stack
              sx={{
                flexDirection: "column",
                alignItems: "start",
                minWidth: "340px",
                gap: 1,
              }}
            >
              <Heart sx={{ alignSelf: "center" }} />
              <Typography level="body-lg" sx={{ alignSelf: "center" }}>
                Thank you for participating
              </Typography>
              <Divider sx={{ backgroundColor: "neutral.400" }} />
              <Typography level="title-sm">Airdrop 1 stats</Typography>
              <Stack
                sx={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  minWidth: "100%",
                }}
              >
                <Typography level="body-sm">Total nominations given</Typography>
                <Typography level="body-sm">
                  {details.nominations_made ?? 0}
                </Typography>
              </Stack>
              <Stack
                sx={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  minWidth: "100%",
                }}
              >
                <Typography level="body-sm">
                  Total nominations received
                </Typography>
                <Typography level="body-sm">
                  {details.nominations_received ?? 0}
                </Typography>
              </Stack>
              <Stack
                sx={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  minWidth: "100%",
                }}
              >
                <Typography level="body-sm">Total points earned</Typography>
                <Typography level="body-sm">
                  {formatNumber(details.build_points ?? 0)}
                </Typography>
              </Stack>
              <Stack
                sx={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  minWidth: "100%",
                }}
              >
                <Typography level="body-sm">Final rank</Typography>
                <Typography level="body-sm">{details.rank ?? "---"}</Typography>
              </Stack>
              <Divider sx={{ backgroundColor: "neutral.400" }} />
              <Stack
                sx={{
                  alignSelf: "end",
                  display: "flex",
                  flexDirection: "row",
                  mt: 2,
                }}
              >
                <Button
                  variant="solid"
                  color="primary"
                  onClick={() =>
                    window.open(
                      getWarpcastSharableLinkAirdrop1(
                        parseInt(formatEther(donated as bigint)),
                        address!,
                      ),
                      "_blank",
                    )
                  }
                >
                  Share on farcaster
                </Button>
              </Stack>
            </Stack>
          </BlockyCard>
        </Stack>
      )}
      {missedOut && (
        <Stack
          sx={{
            flexDirection: "column",
            mt: 4,
            maxWidth: "min(600px, 100%)",
          }}
        >
          <BlockyCard>
            <Stack
              sx={{
                flexDirection: "column",
                alignItems: "start",
                minWidth: "340px",
                gap: 1,
              }}
            >
              <Typography level="body-lg" sx={{ alignSelf: "center" }}>
                The claiming period for Airdrop 1 is over.
              </Typography>
              <Typography level="body-md" sx={{ textAlign: "start" }}>
                BUILD Airdrop 1 ended on June 4th, at 9pm UTC, with a data
                snapshot. Unfortunately this wallet doesn&apos;t meet the
                minimum criteria to be eligible to claim $BUILD tokens.
                Information about the eligibility criteria has been public,
                since the project launched on May 14th, in the{" "}
                <Link
                  href="https://buildcommunity.notion.site/BUILD-FAQ-Round-2-6c8c4ebbfff1452d9123ed74a530cf25"
                  target="_blank"
                >
                  FAQ
                </Link>{" "}
                and on Farcaster.
              </Typography>
            </Stack>
          </BlockyCard>
        </Stack>
      )}
    </>
  );
};
