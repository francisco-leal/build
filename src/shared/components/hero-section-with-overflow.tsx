import { Stack, StackProps } from '@mui/joy';
import { FunctionComponent } from 'react';
import { HeroSection } from './hero-section';

export type HeroSectionWithOverflowProps = StackProps;

export const HeroSectionWithOverflow: FunctionComponent<HeroSectionWithOverflowProps> = ({
    component = 'section',
    sx,
    ...props
}) => (
    <HeroSection
        {...props}
        component={component}
        sx={{
            pl: 2,
            pr: { xs: 0, md: 0, lg: 0 },
            width: '100%',
            position: 'relative',
            overflowX: 'hidden',

            '& .no-overflow': {
                pr: { xs: 2, md: 4, lg: 8 }
            },

            '& .overflow': {
                width: '100%',
                overflowX: { xs: 'scroll', md: 'hidden' },
                pr: { xs: 0, md: 4, lg: 8 },

                '& > *': {
                    width: { xs: 980, md: '100%' },
                    mr: { xs: 2, md: 0 },
                    my: 4
                }
            },

            ...sx
        }}
    />
);
