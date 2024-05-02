"use client";
import { extendTheme } from "@mui/joy/styles";
import { ThemeLink } from "./theme-link";
import { inputClasses } from "@mui/joy";

const colors = {
  bossBlue: "#0142F5",
  white: "#FBFCFE",
  lighterBlue: "#97C3F0",
  lightBlue: "#CDD7E1",
  black: "#0B0D0E",
  grey: "#636B74",
  divider: "rgba(255, 255, 255, 0.30)",
};

export const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          200: colors.lighterBlue,
          300: colors.lightBlue,
          500: colors.bossBlue,
          outlinedColor: colors.white,
          outlinedHoverBg: "#1A54F6",
          solidHoverBg: "#51D7D0",
        },
        neutral: {
          500: colors.grey,
          solidColor: colors.bossBlue,
          solidBg: colors.white,
          solidHoverBg: "#CCD9FD",
        },
        common: {
          white: colors.white,
          black: colors.black,
        },
        divider: colors.divider,
      },
    },
  },
  shadow: {
    md: "12px 12px 0px 0px #0B0D0E",
  },
  fontFamily: {
    display: "Bricolage Grotesque, sans-serif",
    body: "Bricolage Grotesque, sans-serif",
  },
  typography: {
    h1: {
      textAlign: "center",
      color: "inherit",
      fontSize: "32px",
      lineHeight: "115%",
      fontWeight: "700",
      marginTop: 6 * 8,
      marginBottom: 2 * 8,
      ["@media (min-width: 600px)"]: {
        fontSize: "59px",
      },
    },
    h2: {
      fontSize: "30px",
      fontWeight: "bold",
      lineHeight: "166%",
      textAlign: "center",
      color: "inherit",
      marginTop: 4 * 8,
      marginBottom: 2 * 8,
      ["@media (min-width: 900px)"]: {
        fontSize: "40px",
      },
    },
    h3: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "inherit",
      marginTop: 1 * 8,
      marginBottom: 2 * 8,
    },
    "title-lg": {
      fontSize: "18px",
      fontWeight: "600",
      lineHeight: "166%",
      color: "inherit",
      marginTop: 1 * 8,
      marginBottom: 1 * 8,
    },
    "body-lg": {
      fontFamily: "Inter",
      fontSize: "18px",
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "155%",
      marginTop: 1 * 8,
      marginBottom: 1 * 8,
    },
    "body-md": {
      fontSize: "16px",
      lineHeight: "150%",
      fontWeight: "400",
      color: "inherit",
    },
  },
  components: {
    JoyLink: {
      defaultProps: {
        component: ThemeLink,
      },
    },
    JoyButton: {
      styleOverrides: {
        root: {
          height: 40,
          borderRadius: "0",
        },
      },
    },
    JoyInput: {
      styleOverrides: {
        root:  ( {theme }) => ({
          height: 40,
          border: "1px solid",
          borderColor: theme.vars.palette.primary[200],
          color: theme.vars.palette.primary[500],
          [`&.${inputClasses.focused}`]: {
            borderColor: theme.vars.palette.primary[200],
          },
        }),
      },
    },
    JoySheet: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...(ownerState.variant === "outlined" && {
            backgroundColor: theme.vars.palette.common.white,
            boxSizing: "border-box",
            boxShadow: `12px 12px 0px 0px ${theme.vars.palette.common.black}`,
            border: `4px solid ${theme.vars.palette.common.black}`,
          }),
          ...(ownerState.variant === "solid" && {
            backgroundColor: theme.vars.palette.common.white,
            border: "1px solid",
            borderColor: theme.vars.palette.primary[200],
          }),
        }),
      },
    },
  },
});
