"use client";
import { useState } from "react";
import { ImageComponent } from "./relatedComponents/ImageComponent";
import { Images, Product } from "@/types";

const ProductReview = ({
  product,
  setIdsArray,
}: {
  product: Product;
  setIdsArray: (prev: any) => void;
}) => {
  const [files, setFiles] = useState<any | []>([]);
  const [state, setState] = useState<boolean>(true);

  const handelDeletedImages = (id: string) => {
    setIdsArray((prev: string[]) => {
      const updatedIds = Array.from(new Set([...prev, id]));

      // Convert updated IDs array to a Set for faster lookup
      const idsSet = new Set(updatedIds);

      // Filter out files whose _id exists in updated idsArray
      const files = product.image?.filter(
        (image: any) => !idsSet.has(image._id)
      );

      if (files.length > 0) {
        setState(true);
      } else {
        setState(false);
      }

      // Update the files state
      setFiles(files);

      return updatedIds;
    });
  };

  const Component = () => {
    if (state) {
      if (files && files.length > 0) {
        return files.map((file: Images) => (
          <ImageComponent
            file={file}
            key={file._id}
            handelDeletedImages={handelDeletedImages}
          />
        ));
      } else if (product.image && product.image.length > 0) {
        return product.image.map((file: any) => (
          <ImageComponent
            file={file}
            key={file._id}
            handelDeletedImages={handelDeletedImages}
          />
        ));
      }
    } else {
      return (
        <div className="w-full flex justify-center items-center">
          <p className="text-xl">No Elements</p>
        </div>
      );
    }
  };
  return (
    <div className="flex flex-col">
      <div className="flex bg-[hsl(var(--sidebar-background))] dark:bg-transparent rounded-md p-4">
        <Component />
      </div>
    </div>
  );
};

export default ProductReview;
