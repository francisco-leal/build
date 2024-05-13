import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { cookieStorage, createStorage } from "wagmi";
import { base, mainnet } from "wagmi/chains";

// Get projectId at https://cloud.walletconnect.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) throw new Error("Project ID is not defined");

const metadata = {
  name: "BUILD",
  description:
    "BUILD is a token of appreciation on Base and a social game to reward onchain builders.",
  url: "https://boss.community",
  icons: ["https://boss.community/favicon.jpg"],
};

// Create wagmiConfig
const chains = [base, mainnet] as const;
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});
