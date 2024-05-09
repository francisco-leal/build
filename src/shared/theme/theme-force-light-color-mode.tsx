import { useEffect } from "react";
import { useColorScheme } from "@mui/joy";

export const ForceLightColorMode = () => {
  const { setMode } = useColorScheme();
  useEffect(() => setMode("light"), [setMode]);
  return null;
};
