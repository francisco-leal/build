"use client";

import { inputClasses, tabClasses, tabPanelClasses } from "@mui/joy";
import { extendTheme } from "@mui/joy/styles";
import { SystemProps } from "@mui/joy/styles/types";
import Background from "@/app/(pages)/(home)/nominate/[walletId]/page";
import { ThemeLink } from "./theme-link";

const colors = {
  bossBlue: "#0142F5",
  bossMint: "#51D7D0",
  white: "#FBFCFE",
  lighterBlue: "#97C3F0",
  lightBlue: "#CDD7E1",
  black: "#0B0D0E",
  lighterGrey: "rgba(99, 107, 116, 0.30)",
  lightGrey: "rgba(251, 252, 254, 0.30)",
  mehGrey: "rgba(99, 107, 116, 0.3)",
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
          700: colors.bossMint,
          outlinedColor: colors.white,
          outlinedHoverBg: "#1A54F6",
          solidHoverBg: colors.bossMint,
        },
        neutral: {
          200: colors.lighterGrey,
          300: colors.lightGrey,
          400: colors.mehGrey,
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
  fontFamily: {
    display: "Bricolage Grotesque, sans-serif, Inter Variable",
    body: "Bricolage Grotesque, sans-serif, Inter Variable",
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
      marginBottom: 1 * 8,
      ["@media (min-width: 900px)"]: {
        fontSize: "40px",
      },
    },
    h3: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "inherit",
      marginTop: 1 * 8,
      marginBottom: 1 * 8,
    },
    "title-lg": {
      fontFamily: "Inter Variable",
      fontSize: "18px",
      fontStyle: "normal",
      fontWeight: "700",
      lineHeight: "166%",
      color: "inherit",
      marginTop: 1 * 8,
      marginBottom: 1 * 8,
    },
    "body-lg": {
      fontFamily: "Inter Variable",
      fontSize: "18px",
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "155%",
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
          "&:hover": {
            textDecoration: "none",
          },
        },
      },
    },
    JoySelect: {
      styleOverrides: {
        root: ({ theme }) => ({
          height: 40,
          border: "1px solid",
          borderColor: theme.vars.palette.primary[200],
          color: theme.vars.palette.primary[400],
          [`&:not([data-inverted-colors="false"])`]: {
            "--Select-focusedHighlight": theme.vars.palette.primary[400],
          },
        }),
      },
    },
    JoyInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          "--Input-placeholderOpacity": 1,
          height: 40,
          border: "1px solid",
          borderColor: theme.vars.palette.primary[200],
          color: theme.vars.palette.primary[400],
          [`&:not([data-inverted-colors="false"])`]: {
            "--Input-focusedHighlight": theme.vars.palette.primary[400],
          },
        }),
      },
    },
    JoyModalDialog: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.vars.palette.common.white,
          borderRadius: 0,
          border: "1px solid",
          borderColor: theme.vars.palette.neutral[300],
          padding: theme.spacing(3),
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
    JoyTable: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.vars.palette.common.white,
          tr: { textAlign: "left" },
          "& tr.blue": { color: theme.vars.palette.primary[500] },
          "& tr.yellow": { color: theme.vars.palette.warning[400] },
          "& tr.odd": { background: theme.vars.palette.neutral[100] },
          "--TableCell-borderColor": theme.vars.palette.neutral[200],
        }),
      },
    },
    JoyTabs: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: 0,
          marginTop: 1,
          backgroundColor: "transparent",
          "--Tab-indicatorThickness": "1px",

          [`& .${tabClasses.root}`]: {
            color: theme.vars.palette.common.white,
            backgroundColor: "transparent",
            "&::after": {
              color: theme.vars.palette.common.white,
            },
            [`&:not(.${tabClasses.selected}, [aria-selected="true"]):hover`]: {
              color: theme.vars.palette.primary[700],
              backgroundColor: "transparent",
            },
            [`&.${tabClasses.selected}`]: {
              color: theme.vars.palette.primary[700],
              backgroundColor: "transparent",
            },
          },

          [`& .${tabPanelClasses.root}`]: {
            padding: 0,
          },
        }),
      },
    },
    JoySvgIcon: {
      styleOverrides: {
        root: {
          color: "currentColor",
        },
      },
    },
  },
});
