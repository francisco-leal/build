import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { useAccount } from "wagmi";

export const useShareLink = (): [
    string | undefined,
    (e: React.MouseEvent) => void
] => {
    const hasMounted = useRef(false);
    const { address } = useAccount();
    useEffect(() => { hasMounted.current = true });
    
    if (typeof window === 'undefined') return [undefined, () => {}];
    if (!hasMounted.current) return [undefined, () => {}];
    if (!address) return [undefined, () => {}];

    const shareLink = `${window.location.origin}/nominate/${address}`;

    const onShare = (e: React.MouseEvent) => {
        e.preventDefault();
        navigator.clipboard.writeText(shareLink);
        toast.info("Link copied to clipboard!");
    }

    return [shareLink, onShare];
}
