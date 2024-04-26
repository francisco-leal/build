import { useAccount } from 'wagmi';
import { Box } from '@mui/joy';

export const ConnectWalletButton = ({ hideIfConnected }: { hideIfConnected?: boolean }) => {
    // Wallet
    const { address } = useAccount();

    if (hideIfConnected && address) return null;

    return (
        <Box
            sx={{
                '& *': { backgroundColor: 'white' }
            }}
        >
            <w3m-button />
        </Box>
    );
};
