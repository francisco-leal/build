"use client";

import { useState, useEffect } from "react";
import { Button, Typography, Stack, Divider, Link } from "@mui/joy";
import { toast } from "sonner";
import { parseEther, formatEther, Address } from "viem";
import { base } from "viem/chains";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
  useChainId,
  useReadContract,
} from "wagmi";
import { useSwitchChain } from "wagmi";
import { BlockyCard } from "@/shared/components/blocky-card";
import { BlueCheck } from "@/shared/icons/blue-check";
import { Heart } from "@/shared/icons/heart";
import { LogoShort } from "@/shared/icons/logo-short";
import { MusicHeadset } from "@/shared/icons/music-headset";
import { RedCross } from "@/shared/icons/red-cross";
import MerkleDistributionAbi from "@/shared/utils/MerkleDistributionAbi.json";
import { formatLargeNumber, formatNumber } from "@/shared/utils/format-number";
import { getWarpcastSharableLinkAirdrop1 } from "@/shared/utils/sharable-warpcast-link";
import { AirdropInfo } from "../_api/data/users";
import { User } from "../_api/data/users";

type Props = {
  details: AirdropInfo | null;
  user: User;
  getTreeProof: (index: number) => Promise<string[] | null>;
  getMultiplierProof: (index: number) => Promise<string[] | null>;
};

const MERKLE_DISTRIBUTION_CONTRACT =
  "0x556e182ad2b72f5934C2215d6A56cFC19936FdB7";

export const ClaimSection = ({
  details,
  user,
  getTreeProof,
  getMultiplierProof,
}: Props) => {
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
  const { data: donated, refetch } = useReadContract({
    abi: MerkleDistributionAbi.abi,
    address: MERKLE_DISTRIBUTION_CONTRACT,
    functionName: "donated",
    args: [address],
    chainId: base.id,
  });
  const { data: claimed, refetch: refetchClaimed } = useReadContract({
    abi: MerkleDistributionAbi.abi,
    address: MERKLE_DISTRIBUTION_CONTRACT,
    functionName: "claimed",
    args: [address],
    chainId: base.id,
  });

  const [claiming, setClaiming] = useState<boolean>(false);

  useEffect(() => {
    if (error) {
      toast.error("Transaction failed! " + error.cause);
      setClaiming(false);
    }
  }, [error]);

  useEffect(() => {
    if ((donated as bigint) > 0n) {
      toast.info("You've already claimed your tokens");
      setShowClaimFlow(false);
      setClaiming(false);
    }

    if (isConfirming || isPending) {
      setClaiming(true);
    }
    if (isConfirmed) {
      toast.success("Transaction confirmed! " + hash);
      setShowClaimFlow(false);
      setClaiming(false);
      refetch();
      refetchClaimed();
    }
    if (isError) {
      toast.error("Transaction failed! " + error);
      setClaiming(false);
    }
  }, [isConfirmed, isConfirming, isPending, isError, donated]);

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
      return;
    }

    if (!details || !details?.airdrop_allocation) {
      toast.error("We couldn't figure out your airdrop allocation.");
      return;
    }

    if (chainId !== base.id) {
      await switchChain({ chainId: base.id });
    }

    setClaiming(true);
    toast.info(
      "We're calculating the required proofs. It can take a few seconds. We'll need you to sign a transaction after, please check your wallet.",
      { duration: 30000 },
    );

    const amountToClaim = parseEther(details.airdrop_allocation.toString());
    const proof = await getTreeProof(details.tree_index ?? -1);
    const proofMultiplier = await getMultiplierProof(details.tree_index ?? -1);

    await writeContract({
      abi: MerkleDistributionAbi.abi,
      address: MERKLE_DISTRIBUTION_CONTRACT,
      functionName: "donate",
      args: [proof, amountToClaim, proofMultiplier, details.multiplier],
      chainId: base.id,
    });
  };

  const claimHalf = async () => {
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

    if (!details || !details?.airdrop_allocation) {
      toast.error("We couldn't figure out your airdrop allocation.");
      return;
    }

    if (address.toLowerCase() !== details?.receiving_wallet?.toLowerCase()) {
      toast.error(
        "The wallet that is associated to your nominations is: " +
          details?.receiving_wallet,
      );
      return;
    }

    if (chainId !== base.id) {
      await switchChain({ chainId: base.id });
    }

    setClaiming(true);
    toast.info(
      "We're calculating the required proofs. It can take a few seconds. We'll need you to sign a transaction after, please check your wallet.",
      { duration: 30000 },
    );

    const amountToClaim = parseEther(details.airdrop_allocation.toString());
    const proof = await getTreeProof(details.tree_index ?? -1);
    const proofMultiplier = await getMultiplierProof(details.tree_index ?? -1);

    await writeContract({
      abi: MerkleDistributionAbi.abi,
      address: MERKLE_DISTRIBUTION_CONTRACT,
      functionName: "donateAndClaim",
      args: [proof, amountToClaim, proofMultiplier, details.multiplier],
      chainId: base.id,
    });
  };

  const claim = async () => {
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

    if (!details || !details?.airdrop_allocation) {
      toast.error("We couldn't figure out your airdrop allocation.");
      return;
    }

    if (address.toLowerCase() !== details?.receiving_wallet?.toLowerCase()) {
      toast.error(
        "The wallet that is associated to your nominations is: " +
          details?.receiving_wallet,
      );
      return;
    }

    if (chainId !== base.id) {
      await switchChain({ chainId: base.id });
    }

    setClaiming(true);
    toast.info(
      "We're calculating the required proofs. It can take a few seconds. We'll need you to sign a transaction after, please check your wallet.",
      { duration: 30000 },
    );
    const amountToClaim = parseEther(details.airdrop_allocation.toString());

    const proof = await getTreeProof(details.tree_index ?? -1);

    await writeContract({
      abi: MerkleDistributionAbi.abi,
      address: MERKLE_DISTRIBUTION_CONTRACT,
      functionName: "claim",
      args: [proof, amountToClaim],
      chainId: base.id,
    });
  };

  return (
    <>
      {!showClaimFlow && !(isConfirmed || (donated as bigint) > 0n) && <></>}
      {showClaimFlow && !!details && step === 0 && (
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
                {formatLargeNumber(
                  details.airdrop_allocation_with_multiplier ?? 0,
                )}
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
                <Typography level="body-sm">Point to Token ratio</Typography>
                <Typography level="body-sm">30</Typography>
              </Stack>
              <Stack
                sx={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  minWidth: "100%",
                }}
              >
                <Typography level="body-sm">
                  My $BUILD Token allocation
                </Typography>
                <Typography level="body-sm">
                  {formatNumber(details.airdrop_allocation ?? 0)}
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
                <Typography level="body-sm">{details.multiplier}x</Typography>
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
                  {formatNumber(details.airdrop_allocation ?? 0)}
                </Typography>
              </Stack>
              <Stack
                sx={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  minWidth: "100%",
                }}
              >
                <Typography
                  level="title-lg"
                  textColor={"primary.500"}
                  textAlign={"start"}
                >
                  $BUILD Allocation x {details.multiplier ?? 1}*
                </Typography>
                <Typography level="title-lg" textColor={"primary.500"}>
                  {formatNumber(
                    details.airdrop_allocation_with_multiplier ?? 0,
                  )}
                </Typography>
              </Stack>
              <Divider sx={{ backgroundColor: "neutral.400" }} />
              <Typography level="body-sm" sx={{ textAlign: "start" }}>
                *We reward verifiable builders and $BUILD token holders with an
                airdrop allocation multiplier. The multiplier only applies if
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
              <Typography level="h3" sx={{ my: 0, alignSelf: "center" }}>
                <MusicHeadset />
              </Typography>
              <Typography level="h3" sx={{ mt: 0, alignSelf: "center" }}>
                Quit or Commit?
              </Typography>
              <Typography level="body-md" sx={{ textAlign: "start" }}>
                Airdrop 1 was a successful first experiment, but BUILD is just
                getting started. Now the community has a choice: we either{" "}
                <strong>commit</strong> or <strong>quit</strong>.<br></br>
                <br></br>
                We can commit to grow BUILD into the onchain builder economy 🫡
                <br></br>
                Or we can all claim our $BUILD tokens and quit this experiment
                🪦
                <br></br>
                <br></br>
                Let&apos;s push for a collective commitment of {">"}50% on
                Airdrop 1 and keep building during Onchain Summer. Read more
                about the future of BUILD{" "}
                <Link
                  href="https://paragraph.xyz/@macedo/build-announcement-4"
                  target="_blank"
                >
                  here
                </Link>
                .<br></br>
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
                {formatLargeNumber(
                  details.airdrop_allocation_with_multiplier ?? 0,
                )}
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
                    Commit 100% of your tokens to the{" "}
                    <Link
                      href="https://paragraph.xyz/@macedo/build-announcement-4#h-build-summer-fund"
                      target="_blank"
                    >
                      BUILD Summer Fund
                    </Link>
                    .
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
                    Participate in BUILD governance decisions (in the future).
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
                  <Typography level="body-sm" textAlign={"start"}>
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
                    Commit 50% of your tokens to the{" "}
                    <Link
                      href="https://paragraph.xyz/@macedo/build-announcement-4#h-build-summer-fund"
                      target="_blank"
                    >
                      BUILD Summer Fund
                    </Link>
                    .
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
                  <Typography level="body-sm" textAlign={"start"}>
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
                <Typography level="title-lg">
                  Claim {formatLargeNumber(details.airdrop_allocation ?? 0)}{" "}
                  $BUILD
                </Typography>
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
                    Lower BUILD budget for the next airdrops.
                  </Typography>
                </Stack>
                <Button
                  variant="outlined"
                  color="neutral"
                  onClick={() => claim()}
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
                  Claim
                </Button>
              </BlockyCard>
            </Stack>
          </BlockyCard>
        </Stack>
      )}
      {!!details && (isConfirmed || (donated as bigint) > 0n) && (
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
      {!!details &&
        (isConfirmed ||
          ((donated as bigint) <= 0n && (claimed as bigint) > 0n)) && (
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
                  <Typography level="body-sm">
                    Total nominations given
                  </Typography>
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
                  <Typography level="body-sm">
                    {details.rank ?? "---"}
                  </Typography>
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
      {showClaimFlow && !details && (
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
                You were not eligible for Airdrop 1
              </Typography>

              <Stack
                sx={{
                  flexDirection: "row",
                  gap: 1,
                  minWidth: "100%",
                  alignItems: "center",
                }}
              >
                {(user.nominations_made ?? 0) > 0 ? (
                  <BlueCheck sx={{ "&&": { width: 24, height: 24 } }} />
                ) : (
                  <RedCross sx={{ "&&": { width: 24, height: 24 } }} />
                )}
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
                snapshot. Unfortunately this wallet doesn&apos;t meet the
                minimum criteria to be eligible to claim $BUILD tokens.
                Information about the eligibility criteria has been public,
                since the project launched on May 14th, in the{" "}
                <Link
                  href="https://buildcommunity.notion.site/BUILD-FAQ-51bd011214534fa596f15632ef788b10?pvs=4"
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
