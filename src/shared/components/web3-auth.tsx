"use client";

import { UserContext } from "@/shared/context/user";
import { useContext, useEffect } from "react";
import { useAccount } from "wagmi";

export const Web3Auth = () => {
  const { user, authUser, logout } = useContext(UserContext);
  const { address, isDisconnected } = useAccount();

  useEffect(() => {
    if (address && !user) {
      authUser();
    } else if (isDisconnected && user) {
      logout();
    }
  }, [address]);

  return null;
};
