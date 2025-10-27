import React from 'react';
import { TimelineItem } from './TimeLineHistory';


const timelineData = [
    {
        title: 'Learned React',
        description: 'Studied fundamentals, JSX, hooks, and context API.',
    },
    {
        title: 'Built Portfolio',
        description: 'Created and deployed portfolio using Next.js + Vercel.',
    },
    {
        title: 'Mastered Framer Motion',
        description: 'Used animations for micro-interactions and layouts.',
    }
];

const MedicalLayout = () => {
    return (
        <div className="flex justify-center items-start p-4 h-full w-full">
            
            <div className="">
                {timelineData.map((element, index) => (
                    <TimelineItem
                        key={index}
                        index={index}
                        description={element.description}
                        title={element.title}
                    />
                ))}
            </div>
           
        </div>
    );
};

export default MedicalLayout;
