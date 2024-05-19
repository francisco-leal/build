export const abbreviateWalletAddress = (address: string | null) => {
  if (!address) return "";
  if (!address.includes("0x") && address.length !== 42) return address;

  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};
