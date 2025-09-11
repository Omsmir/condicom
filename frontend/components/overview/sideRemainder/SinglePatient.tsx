import CustomSkeleton, { SkeletonType } from '@/components/CustomSkeleton';
import { Button } from '@/components/ui/button';
import React from 'react';

const SinglePatient = () => {
    return (
            <div className="flex items-center justify-between p-2 w-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors mt-2 cursor-pointer rounded-md">
                <div className="flex justify-center items-center">
                    <CustomSkeleton
                        SkeletonType={SkeletonType.AVATAR}
                        shape="circle"
                        src="/assets/images/dr-cameron.png"
                        width={65}
                        height={65}
                        size={65}
                        loading
                        classname="border-none"
                    />
                    <div className="flex flex-col justify-start items-start ms-2">
                        <span className="flex  text-sm uppercase">
                            <p className="text-sm text-slate-500">#</p>
                            <p className="text-red-400"> EFSER123</p>
                        </span>
                        <h1 className="text-sm font-medium capitalize">Cameron Duiaz</h1>
                        <p className="text-xs text-slate-500">47 years old</p>
                    </div>
                </div>

                <div className="flex flex-col space-y-2">
                    <p className="text-slate-500 text-xs">from 1:30 am to 2:30 am</p>
                    <Button className="bg-green-700 text-slate-50 transition-colors hover:bg-green-600 text-sm max-h-[30px]">
                        complete
                    </Button>
                </div>
                {/* <Button className="bg-red-700 text-slate-50 transition-colors hover:bg-red-600 text-sm">
                            uncomplete
                        </Button> */}
            </div>
    );
};

export default SinglePatient;
