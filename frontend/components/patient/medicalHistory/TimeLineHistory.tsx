import { motion, useMotionValue, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';

type TimelineItemProps = {
    title: string;
    description: string;
    index: number;
};

export const TimelineItem = ({ title, description, index }: TimelineItemProps) => {
    const containerVariants = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            },
        },
    };

    const targetRef = useRef(null);

    const scrollContainerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        container: scrollContainerRef,
        target: targetRef,
        offset: ['start end', 'end start'], // [elementStart screenBottom, elementEnd screenTop]
    });

    const isInView = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
    const show = useMotionValue(false);

    useEffect(() => {
        return isInView.on('change', v => {
            if (v >= 0.5) show.set(true);
        });
    }, [isInView]);

    return (
        <motion.section
            ref={scrollContainerRef}
            variants={containerVariants}
            initial="hidden"
            animate={show.get() ? 'show' : 'hidden'}
            className="relative pr-10 h-full max-w-[586px] pb-40"
        >
            {/* Vertical line */}
            <div className="absolute top-0 w-1 h-full bg-gray-300 left-[-5px]" />

            {/* Bullet circle */}
            <motion.div ref={targetRef} className="absolute left-[-10px] top-0 w-4 h-4 bg-sky-600 rounded-full border-2 border-white z-10" />

            {/* Text box */}
            <motion.div className="relative ml-10  bg-white shadow-md p-4  rounded-md w-full">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <p className="text-slate-500 text-sm">2024-06-27</p>
                </div>
                <p className="text-gray-600 text-sm">
                    {description} Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem nam
                    obcaecati doloribus quam nesciunt perferendis aliquid facere modi laboriosam et!
                    Expedita soluta doloribus facilis minus! Nam delectus corporis suscipit dolorum!
                </p>
            </motion.div>
        </motion.section>
    );
};
