"use client";

import { FunctionComponent, PropsWithChildren, useEffect, useRef } from "react";
import { SiweMessage } from "siwe";
import { toast } from "sonner";
import { base } from "viem/chains";
import { useAccount, useDisconnect, useSignMessage } from "wagmi";
import { connectUser, disconnectUser, getNonce } from "../_api/authentication";
import { getCurrentUser } from "../_api/get-user";

export const AuthenticationProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const { address, status } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { disconnectAsync } = useDisconnect();
  const oldStatus = useRef("disconnected");

  const login = async () => {
    if (!address) throw new Error("No address found.");

    if (await getCurrentUser()) return;

    const nonce = await getNonce();

    const message = new SiweMessage({
      domain: window.location.host,
      uri: window.location.origin,
      statement: "Sign in with Ethereum to the app.",
      version: "1",
      address,
      nonce,
      chainId: base.id,
    }).prepareMessage();

    try {
      await signMessageAsync({ message });
    } catch (error) {
      await disconnectAsync();
      toast.error(
        <>
          Failed to sign message.
          <br />
          Wallet has been disconnected.
        </>,
      );
      return;
    }

    await connectUser({
      address,
      nonce,
      message,
      signature: await signMessageAsync({ message }),
    });
  };

  const logout = async () => {
    await disconnectUser();
  };

  useEffect(() => {
    if (status === oldStatus.current) return;
    if (status === "connected") {
      oldStatus.current = "connected";
      login();
      return;
    }
    if (status === "disconnected") {
      oldStatus.current = "disconnected";
      logout();
      return;
    }
  });

  return children;
};
