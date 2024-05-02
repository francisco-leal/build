"use client";

import React, { createContext, useState } from "react";
import { useAccount, useSignMessage } from "wagmi";
import { SiweMessage } from "siwe";
import { base } from "viem/chains";

interface UserProviderProps {
  children: React.ReactNode;
}

export interface User {
  created_at: string;
  id: number;
  max_nominations: number;
  referral_code: string;
  social_profiles: any;
  username: string | null;
  wallet_address: string;
}

interface UserContextType {
  user: User | null;
  authUser: () => Promise<boolean>;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  authUser: async () => false,
});

// Context provider component
export const UserProvider: React.FunctionComponent<UserProviderProps> = ({
  children,
}) => {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [authingUser, setAuthingUser] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const checkCookieForUser = async () => {
    const res = await fetch("/api/profile", {
      credentials: "include",
    });

    if (!res.ok) {
      return false;
    }

    const userResponse = await res.json() as User;
    setUser(userResponse);
    return true;
  };

  // Function to update user data
  const authUser = async () => {
    if (authingUser) return false;
    if (user) return true;

    const userSaved = await checkCookieForUser();
    if (userSaved) return true;

    setAuthingUser(true);
    const res = await fetch("/api/profile/nonce", {
      credentials: "include",
    });

    if (!res.ok) {
      return false;
    }

    const { nonce } = await res.json() as { nonce: string };

    const message = new SiweMessage({
      domain: window.location.host,
      uri: window.location.origin,
      statement: "Sign in with Ethereum to the app.",
      version: "1",
      address,
      nonce: nonce,
      chainId: base.id,
    }).prepareMessage();

    const signature = await signMessageAsync({ message });

    const verification = await fetch("/api/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        wallet_address: address,
        siwe: { message, signature, nonce },
      }),
      credentials: "include",
    });

    const userResponse = await verification.json() as User;
    setUser(userResponse);
    setAuthingUser(false);
    return true;
  };

  return (
    <UserContext.Provider value={{ user, authUser }}>
      {children}
    </UserContext.Provider>
  );
};
