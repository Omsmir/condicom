import { getSession } from 'next-auth/react';
import { useEffect } from 'react';

const RefreshSession = () => {
    useEffect(() => {
        const interval = setInterval(
            async () => {
                await getSession();
            },
            1 * 60 * 1000
        );

        return () => clearInterval(interval);
    }, []);

    return null;
};

export default RefreshSession;
