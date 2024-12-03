import Image from "next/image";
import Link from "next/link";
import { ProductsProp } from "@/types";

const Products: React.FC<ProductsProp> = ({ product }) => {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-20 md:max-w-5xl lg:max-w-7xl lg:px-10 xl:max-w-[1488px]">
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-4">
        {product.map((product) => (
          <div key={product._id} className="group relative">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none transition-opacity group-hover:opacity-75 lg:h-80">
              <Image
                priority
                alt={"product"}
                src={product.image[0].url}
                width={1000}
                height={1000}
                className="h-full w-full min-w-[250px] object-cover object-center lg:h-full lg:w-full"
              />
            </div>
            <div className="mt-4 flex justify-between overflow-hidden">
              <div>
                <h3 className="text-sm text-gray-700">
                  <Link
                    prefetch
                    href={`/dashboard/products/${encodeURIComponent(
                      product._id
                    )}`}
                    className="dark:text-slate-50"
                  >
                    <span aria-hidden="true" className="absolute inset-0 " />
                    {product.name}
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-slate-200">
                  {product.description.split(".")[0]}
                </p>
              </div>
              <p className="text-sm font-medium text-gray-900 dark:text-slate-50">
                ${product.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
