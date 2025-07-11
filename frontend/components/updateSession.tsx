'use client';
import { useSession } from 'next-auth/react';

const UpdateSessionExample = () => {
    const { data: session, update } = useSession();

    const handleUpdateSession = async () => {
        await update();
    };

    return (
        <div>
            <button onClick={handleUpdateSession}>Update Session</button>
        </div>
    );
};

export default UpdateSessionExample;
