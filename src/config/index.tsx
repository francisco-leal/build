import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { cookieStorage, createStorage } from "wagmi";
import { base, mainnet } from "wagmi/chains";

// Get projectId at https://cloud.walletconnect.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) throw new Error("Project ID is not defined");

const metadata = {
  name: "BUILD",
  description:
    "BUILD is a meme and a social game designed to reward builders via onchain nominations.",
  url: "https://talentprotocol.com", // origin must match your domain & subdomain
  icons: ["https://talentprotocol.com/images/favicon.jpg"],
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
