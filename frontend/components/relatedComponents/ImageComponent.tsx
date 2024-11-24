import React from "react";
import Image from "next/image";
import { Images } from "@/types";



export const ImageComponent = ({ file ,handelDeletedImages}: { file: Images,handelDeletedImages: (id: string) => void }) => {
  return (
    <div
      className="w-full overflow-hidden relative mr-2 rounded-md"
      key={file._id}
    >
      <div
        className="flex items-center justify-center absolute inset-0 cursor-pointer opacity-25 bg-slate-50"
        onClick={() => handelDeletedImages(file._id)}
      >
        <p className="dark:text-dark-300">click to delete</p>
      </div>
      <Image
        src={file.url}
        alt="uploaded-image"
        width={200}
        height={200}
        className="w-full h-full  object-cover object-center px-2"
      />
    </div>
  );
};



