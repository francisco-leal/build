import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useAccount } from "wagmi";

export const useShareLink = (): [
  string | undefined,
  (e: React.MouseEvent) => void,
] => {
  const [hasMounted, setHasMounted] = useState(false);
  const { address } = useAccount();

  useEffect(() => setHasMounted(true), []);
  if (typeof window === "undefined") return [undefined, () => {}];
  if (!hasMounted) return [undefined, () => {}];
  if (!address) return [undefined, () => {}];

  const shareLink = `${window.location.origin}/nominate/${address}`;

  const onShare = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(shareLink);
    toast.info("Link copied to clipboard!");
  };

  return [shareLink, onShare];
};
