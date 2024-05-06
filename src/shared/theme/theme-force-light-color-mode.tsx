import { useColorScheme } from "@mui/joy";
import { useEffect } from "react";

export const ForceLightColorMode = () => {
    const { setMode } = useColorScheme();
    useEffect(() => setMode("light"), [setMode]);
    return null;
};