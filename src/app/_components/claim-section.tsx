"use client";

import { useState, useEffect } from "react";
import { Button, Typography, Stack, Divider, Link } from "@mui/joy";
import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import { toast } from "sonner";
import { parseEther } from "viem";
import { base, baseSepolia } from "viem/chains";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
  useChainId,
} from "wagmi";
import { useSwitchChain } from "wagmi";
import { BlockyCard } from "@/shared/components/blocky-card";
import { BlueCheck } from "@/shared/icons/blue-check";
import { LogoShort } from "@/shared/icons/logo-short";
import { MusicHeadset } from "@/shared/icons/music-headset";
import { RedCross } from "@/shared/icons/red-cross";
import MerkleDistributionAbi from "@/shared/utils/MerkleDistributionAbi.json";
import { formatLargeNumber, formatNumber } from "@/shared/utils/format-number";
import merkleTree from "@/shared/utils/merkleTree.json";
import { AirdropInfo } from "../_api/data/users";

type Props = {
  details: AirdropInfo | null;
};

export const ClaimSection = ({ details }: Props) => {
  const [showClaimFlow, setShowClaimFlow] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);
  const { address } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const { data: hash, error, isPending, writeContract } = useWriteContract();
  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    isError,
  } = useWaitForTransactionReceipt({
    hash: hash,
  });
  // add here the TX hash for the claim

  const [claiming, setClaiming] = useState<boolean>(false);

  useEffect(() => {
    if (isConfirming || isPending) {
      setClaiming(true);
    }
    if (isConfirmed) {
      toast.success("Transaction confirmed! " + hash);
      setShowClaimFlow(false);
      setClaiming(false);
    }
    if (isError) {
      toast.error("Transaction failed! " + error);
      setClaiming(false);
    }
  }, [isConfirmed, isConfirming, isPending, isError]);

  useEffect(() => {
    if (!showClaimFlow) {
      setStep(0);
    }
  }, [showClaimFlow]);

  const claimFull = async () => {
    if (!address) {
      toast.error("You must connect your wallet before you can claim");
      return;
    }

    if (!details || !details?.receiving_wallet) {
      toast.error(
        "We couldn't figure out the wallet that is associated for your airdrop, reach out to us.",
      );
      return;
    }

    if (address.toLowerCase() !== details?.receiving_wallet?.toLowerCase()) {
      toast.error(
        "The wallet that is associated to your nominations is: " +
          details?.receiving_wallet,
      );
    }

    if (chainId !== base.id) {
      await switchChain({ chainId: base.id });
    }

    setClaiming(true);
    toast.info(
      "We'll need you to sign a transaction, please check your wallet.",
    );
    const tree = StandardMerkleTree.load(
      JSON.parse(merkleTree.toString()) as any,
    );
    const proof = tree.getProof([address, parseEther("100")]);

    writeContract({
      abi: MerkleDistributionAbi.abi,
      address: "0x7fAEA5E40A2cD5ca4f81713cE8def97b52F83aF7",
      functionName: "donate",
      args: [proof, parseEther("100")],
      chainId: base.id,
    });
  };

  const claimHalf = async () => {
    if (!address) {
      toast.error("You must connect your wallet before you can claim");
      return;
    }

    if (chainId !== base.id) {
      await switchChain({ chainId: base.id });
    }

    setClaiming(true);
    toast.info(
      "We'll need you to sign a transaction, please check your wallet.",
    );
    const tree = StandardMerkleTree.load(merkleTree as any);
    const proof = tree.getProof([address, parseEther("100")]);

    writeContract({
      abi: MerkleDistributionAbi.abi,
      address: "0x7fAEA5E40A2cD5ca4f81713cE8def97b52F83aF7",
      functionName: "donateAndClaim",
      args: [proof, parseEther("100")],
      chainId: base.id,
    });
  };

  return (
    <>
      {!showClaimFlow && (
        <Button
          variant="solid"
          color="neutral"
          onClick={() => setShowClaimFlow(true)}
          sx={{ mt: 2 }}
          disabled={true}
        >
          Coming Soon
        </Button>
      )}
      {showClaimFlow && !!details && step === 0 && (
        <Stack
          sx={{
            flexDirection: "column",
            mt: 4,
            maxWidth: "600px",
          }}
        >
          <BlockyCard>
            <Stack
              sx={{
                flexDirection: "column",
                alignItems: "start",
                minWidth: "400px",
                gap: 1,
              }}
            >
              <Typography level="body-lg" sx={{ alignSelf: "center" }}>
                Potential Token Allocation
              </Typography>
              <Typography
                level="h2"
                sx={{
                  alignSelf: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  mt: 0,
                }}
              >
                <LogoShort sx={{ "&&": { height: 40, width: 40 } }} />{" "}
                {formatLargeNumber(details.build_points ?? 0)}
              </Typography>
              <Divider sx={{ backgroundColor: "neutral.400" }} />
              <Typography level="title-sm">Allocation</Typography>
              <Stack
                sx={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  minWidth: "100%",
                }}
              >
                <Typography level="body-sm">Total Build points</Typography>
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
                <Typography level="body-sm">Allocation multiplier</Typography>
                <Typography level="body-sm">10x (Verified Builder)</Typography>
              </Stack>
              <Divider sx={{ backgroundColor: "neutral.400" }} />
              <Stack
                sx={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  minWidth: "100%",
                }}
              >
                <Typography level="title-lg">$BUILD Allocation</Typography>
                <Typography level="title-lg">
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
                <Typography level="title-lg" textColor={"primary.500"}>
                  $BUILD Allocation x 10*
                </Typography>
                <Typography level="title-lg" textColor={"primary.500"}>
                  {formatNumber(details.build_points ?? 0)}
                </Typography>
              </Stack>
              <Divider sx={{ backgroundColor: "neutral.400" }} />
              <Typography level="body-sm" sx={{ textAlign: "start" }}>
                *Builder or not, all eligible users are able to claim tokens.
                But we reward verifiable builders and $BUILD token holders with
                an airdrop allocation multiplier. The multiplier only applies if
                you commit some tokens, in the next steps.
              </Typography>
              <Stack
                sx={{
                  alignSelf: "end",
                  display: "flex",
                  flexDirection: "row",
                  mt: 2,
                }}
              >
                <Button
                  variant="outlined"
                  color="neutral"
                  onClick={() => setShowClaimFlow(false)}
                  sx={{ mr: 2 }}
                >
                  Cancel
                </Button>
                <Button
                  variant="solid"
                  color="primary"
                  onClick={() => setStep(1)}
                >
                  Continue
                </Button>
              </Stack>
            </Stack>
          </BlockyCard>
        </Stack>
      )}
      {showClaimFlow && !!details && step === 1 && (
        <Stack
          sx={{
            flexDirection: "column",
            mt: 4,
            maxWidth: "600px",
          }}
        >
          <BlockyCard>
            <Stack
              sx={{
                flexDirection: "column",
                alignItems: "start",
                minWidth: "400px",
                gap: 1,
              }}
            >
              <Typography level="h3" sx={{ my: 0, alignSelf: "center" }}>
                <MusicHeadset />
              </Typography>
              <Typography level="h3" sx={{ mt: 0, alignSelf: "center" }}>
                Quit or Commit?
              </Typography>
              <Typography level="body-md" sx={{ textAlign: "start" }}>
                Airdrop 1 was a successful first experiment, but BUILD is just
                getting started. Now the community has a choice: we either
                commit or quit.
                <br></br>
                <br></br>
                We can commit to grow BUILD into a real onchain builder economy
                🫡 Or we can all claim our $BUILD tokens and kill this
                experiment 🪦
                <br></br>
                <br></br>
                If the community <strong>commits 75B $BUILD</strong> (50% of
                Airdrop 1), by the end of June, we will release a new
                nominations game for Onchain Summer and start preparing Airdrop
                2 for September.
                <br></br>
                <br></br>
                Read more about the future of BUILD{" "}
                <Link href="https://google.com">here</Link>.<br></br>
                <br></br>
                Real builders commit! Will you?
              </Typography>
              <Stack
                sx={{
                  alignSelf: "end",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  mt: 2,
                }}
              >
                <Button
                  variant="solid"
                  color="primary"
                  onClick={() => setStep(2)}
                >
                  Continue
                </Button>
              </Stack>
            </Stack>
          </BlockyCard>
        </Stack>
      )}
      {showClaimFlow && !!details && step === 2 && (
        <Stack
          sx={{
            flexDirection: "column",
            mt: 4,
            maxWidth: "600px",
          }}
        >
          <BlockyCard>
            <Stack
              sx={{
                flexDirection: "column",
                alignItems: "start",
                minWidth: "400px",
                gap: 1,
              }}
            >
              <Typography level="body-lg" sx={{ alignSelf: "center" }}>
                Potential Token Allocation
              </Typography>
              <Typography
                level="h2"
                sx={{
                  alignSelf: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  marginTop: 0,
                }}
              >
                <LogoShort sx={{ "&&": { height: 40, width: 40 } }} />{" "}
                {formatLargeNumber(details.build_points ?? 0)}
              </Typography>
              <BlockyCard
                sx={{
                  boxShadow: (theme) =>
                    `12px 12px 0px 0px ${theme.vars.palette.primary["500"]}`,
                  borderColor: "primary.500",
                }}
              >
                <Typography level="title-lg">Pay It All Forward</Typography>
                <Stack
                  sx={{
                    flexDirection: "row",
                    gap: 1,
                    minWidth: "100%",
                    alignItems: "center",
                  }}
                >
                  <BlueCheck sx={{ "&&": { width: 24, height: 24 } }} />
                  <Typography level="body-sm">
                    Commit 100% of your tokens to the BUILD Summer Fund.
                  </Typography>
                </Stack>
                <Stack
                  sx={{
                    flexDirection: "row",
                    gap: 1,
                    minWidth: "100%",
                  }}
                >
                  <BlueCheck sx={{ "&&": { width: 24, height: 24 } }} />
                  <Typography level="body-sm">
                    Airdrop allocation multiplier applied to tokens committed.
                  </Typography>
                </Stack>
                <Stack
                  sx={{
                    flexDirection: "row",
                    gap: 1,
                    minWidth: "100%",
                  }}
                >
                  <BlueCheck sx={{ "&&": { width: 24, height: 24 } }} />
                  <Typography level="body-sm">
                    Participate in BUILD governance decisions (coming soon).
                  </Typography>
                </Stack>
                <Stack
                  sx={{
                    flexDirection: "row",
                    gap: 1,
                    minWidth: "100%",
                  }}
                >
                  <BlueCheck sx={{ "&&": { width: 24, height: 24 } }} />
                  <Typography level="body-sm">
                    Budget for future airdrops based on tokens committed.
                  </Typography>
                </Stack>
                <Stack
                  sx={{
                    flexDirection: "row",
                    gap: 1,
                    minWidth: "100%",
                  }}
                >
                  <BlueCheck sx={{ "&&": { width: 24, height: 24 } }} />
                  <Typography level="body-sm">
                    Featured in new leaderboard, ranked by tokens committed.
                  </Typography>
                </Stack>
                <Button
                  variant="solid"
                  color="primary"
                  onClick={() => claimFull()}
                  sx={{
                    alignSelf: "center",
                    mt: 2,
                    "& svg": {
                      color: "primary.500",
                      width: 20,
                      height: 20,
                    },
                  }}
                  loading={claiming}
                >
                  Commit 100%
                </Button>
              </BlockyCard>
              <BlockyCard
                sx={{
                  mt: 2,
                  minWidth: "100%",
                }}
              >
                <Typography level="title-lg">Split & Commit Half</Typography>
                <Stack
                  sx={{
                    flexDirection: "row",
                    gap: 1,
                    minWidth: "100%",
                  }}
                >
                  <BlueCheck sx={{ "&&": { width: 24, height: 24 } }} />
                  <Typography level="body-sm">
                    Commit 50% of your tokens to the BUILD Summer Fund.
                  </Typography>
                </Stack>
                <Stack
                  sx={{
                    flexDirection: "row",
                    gap: 1,
                    minWidth: "100%",
                  }}
                >
                  <BlueCheck sx={{ "&&": { width: 24, height: 24 } }} />
                  <Typography level="body-sm">
                    Claim 50% of $BUILD tokens now, with allocation multiplier.
                  </Typography>
                </Stack>
                <Stack
                  sx={{
                    flexDirection: "row",
                    gap: 1,
                    minWidth: "100%",
                  }}
                >
                  <BlueCheck sx={{ "&&": { width: 24, height: 24 } }} />
                  <Typography level="body-sm">
                    Budget for future airdrops based on tokens committed.
                  </Typography>
                </Stack>
                <Stack
                  sx={{
                    flexDirection: "row",
                    gap: 1,
                    minWidth: "100%",
                  }}
                >
                  <BlueCheck sx={{ "&&": { width: 24, height: 24 } }} />
                  <Typography level="body-sm">
                    Featured in a new leaderboard, ranked by tokens committed.
                  </Typography>
                </Stack>
                <Button
                  variant="outlined"
                  color="neutral"
                  sx={{
                    borderColor: "neutral.500",
                    alignSelf: "center",
                    mt: 2,
                    "& svg": {
                      color: "primary.500",
                      width: 20,
                      height: 20,
                    },
                  }}
                  onClick={() => claimHalf()}
                  loading={claiming}
                >
                  Commit 50%
                </Button>
              </BlockyCard>
              <BlockyCard
                sx={{
                  mt: 2,
                  minWidth: "100%",
                }}
              >
                <Typography level="title-lg">Claim XX $BUILD</Typography>
                <Stack
                  sx={{
                    flexDirection: "row",
                    gap: 1,
                    minWidth: "100%",
                  }}
                >
                  <BlueCheck sx={{ "&&": { width: 24, height: 24 } }} />
                  <Typography level="body-sm">
                    Claim tokens on June 18th.
                  </Typography>
                </Stack>
                <Stack
                  sx={{
                    flexDirection: "row",
                    gap: 1,
                    minWidth: "100%",
                  }}
                >
                  <BlueCheck sx={{ "&&": { width: 24, height: 24 } }} />
                  <Typography level="body-sm">
                    Allocation multiplier is not considered.
                  </Typography>
                </Stack>
                <Stack
                  sx={{
                    flexDirection: "row",
                    gap: 1,
                    minWidth: "100%",
                  }}
                >
                  <BlueCheck sx={{ "&&": { width: 24, height: 24 } }} />
                  <Typography level="body-sm">
                    No BUILD budget for the next airdrops.
                  </Typography>
                </Stack>
                <Button
                  variant="outlined"
                  color="neutral"
                  disabled={true}
                  sx={{
                    alignSelf: "center",
                    mt: 2,
                    "& svg": {
                      color: "primary.500",
                      width: 20,
                      height: 20,
                    },
                  }}
                >
                  Claim on Jun 18
                </Button>
              </BlockyCard>
            </Stack>
          </BlockyCard>
        </Stack>
      )}
      {!!details && isConfirmed && (
        <Stack
        sx={{
          flexDirection: "column",
          mt: 4,
          maxWidth: "600px",
        }}
      >
        <BlockyCard>
          <Stack
            sx={{
              flexDirection: "column",
              alignItems: "start",
              minWidth: "400px",
              gap: 1,
            }}
          >
            <Typography level="body-lg" sx={{ alignSelf: "center" }}>
              You are officially a BUILD OG!
            </Typography>
            <Typography level="body-md" sx={{ textAlign: "start" }}>
              Thank you for committing $BUILD to the BUILD Summer Fund.
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
              <Typography level="body-sm">Total nominations received</Typography>
              <Typography level="body-sm">{details.nominations_received ?? 0}</Typography>
            </Stack>
            <Stack
              sx={{
                flexDirection: "row",
                justifyContent: "space-between",
                minWidth: "100%",
              }}
            >
              <Typography level="body-sm">Total points earned</Typography>
              <Typography level="body-sm">{formatNumber(details.build_points ?? 0)}</Typography>
            </Stack>
            <Stack
              sx={{
                flexDirection: "row",
                justifyContent: "space-between",
                minWidth: "100%",
              }}
            >
              <Typography level="body-sm">Final rank</Typography>
              <Typography level="body-sm">{0}</Typography>
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
                onClick={() => window.open("https://warpcast.com", "_blank")}
              >
                Share on farcaster
              </Button>
            </Stack>
          </Stack>
        </BlockyCard>
      </Stack>
      )}
      {showClaimFlow && !details && (
        <Stack
          sx={{
            flexDirection: "column",
            mt: 4,
            maxWidth: "600px",
          }}
        >
          <BlockyCard>
            <Stack
              sx={{
                flexDirection: "column",
                alignItems: "start",
                minWidth: "400px",
                gap: 1,
              }}
            >
              <Typography level="body-lg" sx={{ alignSelf: "center" }}>
                You&apos;re not eligible for Airdrop 1
              </Typography>

              <Stack
                sx={{
                  flexDirection: "row",
                  gap: 1,
                  minWidth: "100%",
                  alignItems: "center",
                }}
              >
                <RedCross sx={{ "&&": { width: 24, height: 24 } }} />
                <Typography level="body-sm">
                  You made at least one nomination
                </Typography>
              </Stack>
              <Stack
                sx={{
                  flexDirection: "row",
                  gap: 1,
                  minWidth: "100%",
                }}
              >
                <RedCross sx={{ "&&": { width: 24, height: 24 } }} />
                <Typography level="body-sm">
                  Farcaster ID, older than May 15th
                </Typography>
              </Stack>
              <Stack
                sx={{
                  flexDirection: "row",
                  gap: 1,
                  minWidth: "100%",
                }}
              >
                <RedCross sx={{ "&&": { width: 24, height: 24 } }} />
                <Typography level="body-sm">
                  ENS primary name, older than May 15th
                </Typography>
              </Stack>
              <Stack
                sx={{
                  flexDirection: "row",
                  gap: 1,
                  minWidth: "100%",
                }}
              >
                <RedCross sx={{ "&&": { width: 24, height: 24 } }} />
                <Typography level="body-sm">
                  Talent Passport w/ World ID credential
                </Typography>
              </Stack>
              <Stack
                sx={{
                  flexDirection: "row",
                  gap: 1,
                  minWidth: "100%",
                }}
              >
                <RedCross sx={{ "&&": { width: 24, height: 24 } }} />
                <Typography level="body-sm">
                  Talent Passport w/ Gitcoin credential
                </Typography>
              </Stack>
              <Divider sx={{ backgroundColor: "neutral.400" }} />
              <Typography level="body-sm" sx={{ textAlign: "start" }}>
                BUILD Airdrop 1 ended on June 4th, at 9pm UTC, with a data
                snapshot. Unfortunately this wallet doesn&apos;t meet any of the
                criteria to be eligible to claim $BUILD tokens. Information
                about the eligibility criteria has been public, since the
                project launched on May 14th, in the FAQ and on Farcaster.
              </Typography>
            </Stack>
          </BlockyCard>
        </Stack>
      )}
    </>
  );
};
