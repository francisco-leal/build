"use client";

import { FunctionComponent, PropsWithChildren, useEffect, useRef } from "react";
import { SiweMessage } from "siwe";
import { toast } from "sonner";
import { base } from "viem/chains";
import { useAccount, useSignMessage } from "wagmi";
import { connectUser, disconnectUser, getNonce } from "../_api/authentication";

export const AuthenticationProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const { address, status } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const oldStatus = useRef("disconnected");

  const login = async () => {
    if (!address) throw new Error("No address found.");
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

    await signMessageAsync({ message });
    await connectUser({
      address,
      nonce,
      message,
      signature: await signMessageAsync({ message }),
    });
  };

  const logout = async () => {
    await disconnectUser();
    toast.error("Disconnected from the app.");
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
