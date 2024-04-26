import { useAccount } from 'wagmi';

export const ConnectWalletButton = ({ hideIfConnected }: { hideIfConnected?: boolean }) => {
    // Wallet
    const { address } = useAccount();

    if (hideIfConnected && address) return null;

    return <w3m-button />;
};
