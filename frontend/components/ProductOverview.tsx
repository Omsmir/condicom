"use client";
import { singleProductProps } from "@/types";
import clsx from "clsx";
import Image from "next/image";

import { useState } from "react";

const ProductOverview = ({ singleProduct }: singleProductProps) => {
  const [activeImage, setActiveImage] = useState<string>(
    singleProduct.image[0].url
  );

  const setUrl = (url: string) => {
    setActiveImage(url);
  };

  return (
    <div className="flex flex-col">
      <div className="h-[80%]">
        <div className="overflow-hidden mb-2 rounded-md h-full">
          <Image
            priority
            height={1000}
            width={1000}
            src={activeImage}
            alt="head"
            className="w-full h-full object-cover object-center lg:w-full lg:h-full"
          />
        </div>
      </div>
      <div className="h-[20%] mt-4">
        <div className="flex ">
          {singleProduct.image.map((image: any) => (
            <div
              onClick={() => setUrl(image.url)}
              className={clsx(
                "relative overflow-hidden w-full h-full rounded-md mr-1 last-of-type:mr-0 group cursor-pointer",
                {
                  "outline outline-3 outline-sky-600":
                    activeImage === image.url,
                }
              )}
              key={image._id}
            >
              <Image
                key={image._id}
                height={125}
                width={125}
                alt="subImg"
                id={image._id}
                src={image.url}
                className="w-full h-full object-cover object-center group-hover:opacity-75"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductOverview;
