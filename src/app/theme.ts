'use client';
import { extendTheme } from '@mui/joy/styles';

export const theme = extendTheme({
    colorSchemes: {
        light: {
            palette: {
                neutral: {
                    solidColor: '#0142F5',
                    solidBg: '#FBFCFE',
                    solidHoverBg: '#CCD9FD'
                },
                common: {
                    white: '#FBFCFE'
                }
            }
        }
    },
    components: {
        JoyButton: {
            styleOverrides: {
                root: {
                    borderRadius: '0'
                }
            }
        }
    }
});
