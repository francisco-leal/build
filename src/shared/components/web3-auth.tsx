'use client';

import { UserContext } from '@/context/user';
import { useContext, useEffect } from 'react';
import { useAccount } from 'wagmi';

export const Web3Auth: React.FunctionComponent<{ children: React.ReactNode }> = ({ children }) => {
    const { user, authUser } = useContext(UserContext);
    const { address } = useAccount();

    useEffect(() => {
        if (address && !user) {
            authUser();
        }
    }, [address]);

    return children;
};
