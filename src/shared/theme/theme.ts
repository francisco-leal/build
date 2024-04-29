'use client';
import { extendTheme } from '@mui/joy/styles';
import { ThemeLink } from './theme-link';

const colors = {
    blue: '#0142F5',
    white: '#FBFCFE',
    lightBlue: '#CDD7E1',
    black: '#0B0D0E',
    grey: '#636B74'
};

export const theme = extendTheme({
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    500: colors.blue,
                    outlinedColor: colors.white,
                    outlinedHoverBg: '#1A54F6'
                },
                neutral: {
                    500: colors.grey,
                    solidColor: colors.blue,
                    solidBg: colors.white,
                    solidHoverBg: '#CCD9FD'
                },
                common: {
                    white: colors.white,
                    black: colors.black
                }
            }
        }
    },
    shadow: {
        md: '12px 12px 0px 0px #0B0D0E'
    },
    typography: {},
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
                    borderRadius: '0'
                }
            },
        },
        JoySheet: {
            styleOverrides: {
                root: ({ ownerState, theme }) => ({
                    ...(ownerState.variant === 'outlined' && {
                        backgroundColor: theme.vars.palette.common.white,
                        boxSizing: 'border-box',
                        boxShadow: `12px 12px 0px 0px ${theme.vars.palette.common.black}`,
                        border: `4px solid ${theme.vars.palette.common.black}`
                    })
                })
            }
        }
    }
});
