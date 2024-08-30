"use client";

import { useEffect, useState } from "react";
import { Button, Typography, Stack, Divider, Link } from "@mui/joy";
import { toast } from "sonner";
import { formatEther, parseEther } from "viem";
import { base } from "viem/chains";
import {
  useAccount,
  useReadContract,
  useChainId,
  useSwitchChain,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { BlockyCard } from "@/shared/components/blocky-card";
import { BlueCheck } from "@/shared/icons/blue-check";
import { Heart } from "@/shared/icons/heart";
import { LogoShort } from "@/shared/icons/logo-short";
import { MusicHeadset } from "@/shared/icons/music-headset";
import { RedCross } from "@/shared/icons/red-cross";
import BuildRound2DistributionAbi from "@/shared/utils/BuildRound2DistributionAbi.json";
import { formatLargeNumber, formatNumber } from "@/shared/utils/format-number";
import { getWarpcastSharableLinkAirdrop1 } from "@/shared/utils/sharable-warpcast-link";
import { AirdropInfo } from "../_api/data/users";
import { User } from "../_api/data/users";

type Props = {
  details: AirdropInfo | null;
  user: User;
};

const BUILD_ROUND_2_DISTRIBUTION_CONTRACT =
  "0x992AC77f0E0E55274a7FF18D6d7421c967a4B96F";

export const ClaimSection = ({ details, user }: Props) => {
  const { address } = useAccount();
  const { data: claimed, refetch } = useReadContract({
    abi: BuildRound2DistributionAbi.abi,
    address: BUILD_ROUND_2_DISTRIBUTION_CONTRACT,
    functionName: "claimed",
    args: [address],
    chainId: base.id,
  });
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
  const [claiming, setClaiming] = useState<boolean>(false);
  const [showClaimFlow, setShowClaimFlow] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);

  const airdropAmount = details?.value
    ? Math.round(Number(details.value ?? "0") / 10 ** 18)
    : "0";
  const amountToClaim = parseEther(airdropAmount.toString());

  useEffect(() => {
    if (error) {
      console.log(error);
      toast.error("Transaction failed! " + error.cause);
      setClaiming(false);
    }
  }, [error]);

  useEffect(() => {
    if ((claimed as bigint) > 0n) {
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
    }
    if (isError) {
      toast.error("Transaction failed! " + error);
      setClaiming(false);
    }
  }, [isConfirmed, isConfirming, isPending, isError, claimed]);

  useEffect(() => {
    if (!showClaimFlow) {
      setStep(0);
    }
  }, [showClaimFlow]);

  const burn90 = async () => {
    if (!address) {
      toast.error("You must connect your wallet before you can claim");
      return;
    }

    if (!details || !details?.wallet) {
      toast.error(
        "We couldn't figure out the wallet that is associated for your airdrop, reach out to us.",
      );
      return;
    }

    if (address.toLowerCase() !== details?.wallet?.toLowerCase()) {
      toast.error(
        "The wallet that is associated to your nominations is: " +
          details?.wallet,
      );
      return;
    }

    if (!details || !details?.value) {
      toast.error("We couldn't figure out your airdrop allocation.");
      return;
    }

    if (chainId !== base.id) {
      await switchChain({ chainId: base.id });
    }

    setClaiming(true);
    toast.info("Confirm the claim on your wallet", { duration: 5000 });

    await writeContract({
      abi: BuildRound2DistributionAbi.abi,
      address: BUILD_ROUND_2_DISTRIBUTION_CONTRACT,
      functionName: "burn90",
      args: [details.proofs, amountToClaim],
      chainId: base.id,
    });
  };

  const burn50 = async () => {
    if (!address) {
      toast.error("You must connect your wallet before you can claim");
      return;
    }

    if (!details || !details?.wallet) {
      toast.error(
        "We couldn't figure out the wallet that is associated for your airdrop, reach out to us.",
      );
      return;
    }

    if (!details || !details?.value) {
      toast.error("We couldn't figure out your airdrop allocation.");
      return;
    }

    if (address.toLowerCase() !== details?.wallet?.toLowerCase()) {
      toast.error(
        "The wallet that is associated to your nominations is: " +
          details?.wallet,
      );
      return;
    }

    if (chainId !== base.id) {
      await switchChain({ chainId: base.id });
    }

    setClaiming(true);
    toast.info("Confirm the claim on your wallet", { duration: 5000 });

    await writeContract({
      abi: BuildRound2DistributionAbi.abi,
      address: BUILD_ROUND_2_DISTRIBUTION_CONTRACT,
      functionName: "burn50",
      args: [details.proofs, amountToClaim],
      chainId: base.id,
    });
  };

  const claim = async () => {
    if (!address) {
      toast.error("You must connect your wallet before you can claim");
      return;
    }

    if (!details || !details?.wallet) {
      toast.error(
        "We couldn't figure out the wallet that is associated for your airdrop, reach out to us.",
      );
      return;
    }

    if (!details || !details?.value) {
      toast.error("We couldn't figure out your airdrop allocation.");
      return;
    }

    if (address.toLowerCase() !== details?.wallet?.toLowerCase()) {
      toast.error(
        "The wallet that is associated to your nominations is: " +
          details?.wallet,
      );
      return;
    }

    if (chainId !== base.id) {
      await switchChain({ chainId: base.id });
    }

    setClaiming(true);
    toast.info("Confirm the claim on your wallet", { duration: 5000 });

    await writeContract({
      abi: BuildRound2DistributionAbi.abi,
      address: BUILD_ROUND_2_DISTRIBUTION_CONTRACT,
      functionName: "claim",
      args: [details.proofs, amountToClaim],
      chainId: base.id,
    });
  };

  return (
    <>
      {!showClaimFlow && !(isConfirmed || (claimed as bigint) > 0n) && (
        <Button
          variant="solid"
          color="neutral"
          onClick={() => setShowClaimFlow(true)}
          sx={{ mt: 2 }}
        >
          Check your allocation
        </Button>
      )}
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
                My $BUILD Token allocation
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
                {formatLargeNumber(Number(airdropAmount))}
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
                <Typography level="body-sm">Round 2 Build points</Typography>
                <Typography level="body-sm">
                  {formatNumber(Math.round(user.boss_score ?? 0))}
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
                  Round 2 $BUILD allocation
                </Typography>
                <Typography level="body-sm">
                  {formatNumber(Number(airdropAmount))}
                </Typography>
              </Stack>
              <Divider sx={{ backgroundColor: "neutral.400" }} />
              <Typography level="body-sm" sx={{ textAlign: "start" }}>
                The allocation is based on the BUILD points and past
                contributions. Verifiable builders, $BUILD token holders,
                liquidity providers, and community members who have contributed
                to the BUILD ecosystem received an allocation boost.
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
                Kill or Support?
              </Typography>
              <Typography level="body-md" sx={{ textAlign: "start" }}>
                Although Round 2 Noms weren&apos;t as popular amongst active
                builders as Round 1, BUILD is still pretty effective at
                supporting builders.<br></br>
                <br></br>
                Did you know that 80% of the tokens committed on Round 1 are
                being distributed to real builders in other ways? You can see
                the breakdown{" "}
                <Link
                  href={
                    "https://buildcommunity.notion.site/BUILD-Summer-Fund-a6ca6433bc344822bc3489de971b1954"
                  }
                  target="_blank"
                  underline="always"
                  sx={{ textDecoration: "underline" }}
                >
                  here
                </Link>
                .<br></br>
                <br></br>
                This is your 2nd chance to &quot;vote&quot; on the future of
                BUILD:
                <br></br>
                1. Wait until September to claim all your tokens, if you think
                we should sunset BUILD 🪦
                <br></br>
                2. Burn part of your token allocation to show your support and
                access cool perks 🫡
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
                Round 2 Token Allocation
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
                {formatLargeNumber(Number(airdropAmount))}
              </Typography>
              <BlockyCard
                sx={{
                  boxShadow: (theme) =>
                    `12px 12px 0px 0px ${theme.vars.palette.primary["500"]}`,
                  borderColor: "primary.500",
                }}
              >
                <Typography level="title-lg">
                  Contribute by burning 90%
                </Typography>
                <Stack
                  sx={{
                    flexDirection: "row",
                    gap: 1,
                    minWidth: "100%",
                    alignItems: "center",
                  }}
                >
                  <BlueCheck sx={{ "&&": { width: 24, height: 24 } }} />
                  <Typography level="body-sm" textAlign={"start"}>
                    Move up the ladder on the{" "}
                    <Link href="/leaderboard" target="_blank">
                      Top Contributors leaderboard
                    </Link>{" "}
                    the next time it is calculated.
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
                    Receive raffle tickets proportional to the burned amount to
                    win the 5 ETH prize. Each 100k $BUILD burned is 1 ticket.
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
                    Your Builder Score on the{" "}
                    <Link
                      href="https://passport.talentprotocol.com/"
                      target="_blank"
                    >
                      Talent Passport
                    </Link>{" "}
                    will increase.
                  </Typography>
                </Stack>
                <Button
                  variant="solid"
                  color="primary"
                  onClick={() => burn90()}
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
                  Claim 10%
                </Button>
              </BlockyCard>
              <BlockyCard
                sx={{
                  mt: 2,
                  minWidth: "100%",
                }}
              >
                <Typography level="title-lg">
                  Contribute by burning 50%
                </Typography>
                <Stack
                  sx={{
                    flexDirection: "row",
                    gap: 1,
                    minWidth: "100%",
                    alignItems: "center",
                  }}
                >
                  <BlueCheck sx={{ "&&": { width: 24, height: 24 } }} />
                  <Typography level="body-sm" textAlign={"start"}>
                    Move up the ladder on the{" "}
                    <Link href="/leaderboard" target="_blank">
                      Top Contributors leaderboard
                    </Link>{" "}
                    the next time it is calculated.
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
                    Receive raffle tickets proportional to the burned amount to
                    win the 5 ETH prize. Each 100k $BUILD burned is 1 ticket.
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
                    Your builder score on the{" "}
                    <Link
                      href="https://passport.talentprotocol.com/"
                      target="_blank"
                    >
                      Talent Passport
                    </Link>{" "}
                    will increase.
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
                  onClick={() => burn50()}
                  loading={claiming}
                >
                  Claim 50%
                </Button>
              </BlockyCard>
              <BlockyCard
                sx={{
                  mt: 2,
                  minWidth: "100%",
                }}
              >
                <Typography level="title-lg">Claim</Typography>
                <Stack
                  sx={{
                    flexDirection: "row",
                    gap: 1,
                    minWidth: "100%",
                  }}
                >
                  <BlueCheck sx={{ "&&": { width: 24, height: 24 } }} />
                  <Typography level="body-sm">
                    Wallet and FID will be excluded from future BUILD
                    initiatives.
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
                    Wait until September to claim tokens.
                  </Typography>
                </Stack>
                <Button
                  variant="outlined"
                  color="neutral"
                  onClick={() => claim()}
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
                  Claim
                </Button>
              </BlockyCard>
            </Stack>
          </BlockyCard>
        </Stack>
      )}
      {!!details && (isConfirmed || (claimed as bigint) > 0n) && (
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
                {(claimed as bigint) > 0n ? (
                  <strong>
                    {formatLargeNumber(
                      parseInt(formatEther(claimed as bigint)),
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
              <Typography level="title-sm">Airdrop 2 stats</Typography>
              <Stack
                sx={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  minWidth: "100%",
                }}
              >
                <Typography level="body-sm">Total nominations given</Typography>
                <Typography level="body-sm">
                  {user.nominations_made ?? 0}
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
                  {user.nominations_received ?? 0}
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
                  {formatNumber(user.boss_score ?? 0)}
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
                        parseInt(formatEther(claimed as bigint)),
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
                You were not eligible for the Round 2 airdrop
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
                  alignItems: "center",
                }}
              >
                {(user.boss_score ?? 0) > 0 ? (
                  <BlueCheck sx={{ "&&": { width: 24, height: 24 } }} />
                ) : (
                  <RedCross sx={{ "&&": { width: 24, height: 24 } }} />
                )}
                <Typography level="body-sm">
                  You received atleast a nomination
                </Typography>
              </Stack>
              <Stack
                sx={{
                  flexDirection: "row",
                  gap: 1,
                  minWidth: "100%",
                }}
              >
                {!user.humanity_checkmark ? (
                  <BlueCheck sx={{ "&&": { width: 24, height: 24 } }} />
                ) : (
                  <RedCross sx={{ "&&": { width: 24, height: 24 } }} />
                )}
                <Typography level="body-sm">
                  Talent Passport w/ Human Checkmark
                </Typography>
              </Stack>
              <Divider sx={{ backgroundColor: "neutral.400" }} />
              <Typography level="body-sm" sx={{ textAlign: "start" }}>
                BUILD Airdrop round 2 ends on September 30th, with a data
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
