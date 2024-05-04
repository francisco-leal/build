"use client";

import { UserContext } from "@/shared/context/user";
import { useContext, useEffect, useRef } from "react";
import { useAccount } from "wagmi";

export const Web3Auth = () => {
  const { user, authUser, logout } = useContext(UserContext);
  const { address, isDisconnected } = useAccount();
  const adressRef = useRef<`0x${string}` | null>();

  useEffect(() => {
    if (adressRef.current === address) return;

    adressRef.current = address;
    if (address && !user) authUser();
    if (isDisconnected && user) logout();
  });

  return null;
};
