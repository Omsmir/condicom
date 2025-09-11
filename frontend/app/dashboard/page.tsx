import { Metadata } from 'next';
import ConstructedLayout from '@/components/ConstructedLayout';
import OverviewLayout from '@/components/overview/OverviewLayout';

export const metadata: Metadata = {
    title: 'Health - Dashboard',
    description: 'Welcome to dashboard',
};

const Home = () => {
    return (
        <ConstructedLayout>
            <OverviewLayout />
        </ConstructedLayout>
    );
};
export default Home;
