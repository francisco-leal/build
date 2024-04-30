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
                    outlinedHoverBg: '#1A54F6',
                    solidHoverBg:  '#51D7D0',
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
    fontFamily: {
        display: 'Bricolage Grotesque, sans-serif',
        body: 'Bricolage Grotesque, sans-serif'
    },
    typography: {
        h1: {
            textAlign: 'center',
            color: 'inherit',
            fontSize: '32px',
            lineHeight: '115%',
            fontWeight: '700',
            marginTop: 6 * 8,
            marginBottom: 2 * 8,
            ['@media (min-width: 600px)']: {
                fontSize: '59px'
            }
        },
        h2: {
            fontSize: '30px',
            fontWeight: 'bold',
            lineHeight: '166%',
            textAlign: 'center',
            color: 'inherit',
            marginTop: 4 * 8,
            marginBottom: 2 * 8,
            ['@media (min-width: 900px)']: {
                fontSize: '40px'
            }
        },
        h3: {
            fontSize: '24px',
            fontWeight: 'bold',
            color: 'inherit',
            marginTop: 1 * 8,
            marginBottom: 2 * 8
        },
        'body-lg': {
            fontSize: '18px',
            fontWeight: '600',
            lineHeight: '166%',
            color: 'inherit',
            marginTop: 1 * 8,
            marginBottom: 1 * 8
        },
        'body-md': {
            fontSize: '18px',
            lineHeight: '155%',
            fontWeight: '400',
            color: 'inherit'
        }
    },
    components: {
        JoyLink: {
            defaultProps: {
                component: ThemeLink
            }
        },
        JoyButton: {
            styleOverrides: {
                root: {
                    height: 40,
                    borderRadius: '0'
                }
            }
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
