"use client";

import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { State, WagmiProvider } from "wagmi";
import { config, projectId } from "@/config";

// Setup queryClient
const queryClient = new QueryClient();

if (!projectId) throw new Error("Project ID is not defined");

// Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  themeMode: "light",
  themeVariables: {
    "--w3m-border-radius-master": "0px",
    "--w3m-color-mix": "#0142F5",
    "--w3m-color-mix-strength": 0,
    "--w3m-z-index": 10000,
  },
});

export function Web3ModalProvider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: State;
}) {
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
