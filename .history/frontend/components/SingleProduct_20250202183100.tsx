import { getSingleProduct } from "@/actions/getProducts";
import { MyHandler } from "./Togglers/Handlers";
import ProductOverview from "./ProductOverview";
import { inter } from "@/fonts/fonts";
import { items } from "@/lib/constants";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";



const SingleProduct = async ({ id }: { id: string }) => {
  const singleProduct = await getSingleProduct(id);

  return (
    <div className="py-14  max-w-7xl mx-auto min-h-screen">
      <div className="mt-6 grid grid-cols-12 gap-4 h-full p-4 rounded-md">
        <div className="col-span-12 lg:col-span-6">
          <ProductOverview singleProduct={singleProduct} />
        </div>
        <div className="col-span-12 lg:col-span-6">
          <div className="flex flex-col mt-4">
            <div className={`flex flex-col ${inter.className}`}>
              <h1 className="text-3xl font-bold capitalize mb-3">
                {singleProduct.name}
              </h1>
              <h5 className="text-3xl font-light">${singleProduct.price}</h5>
              <p className="mt-4 text-slate-600 dark:text-slate-100">
                {singleProduct.description}
              </p>
            </div>
            <div className="flex flex-col mt-4">
              <div className="flex">
                <MyHandler
                  name="Delete product"
                  className="bg-[#4F46E5] w-full mr-2 text-slate-100"
                  id={id}
                  state={false}
                />
                <MyHandler
                  name="Edit product"
                  className="bg-[#4F46E5] w-full  text-slate-100"
                  id={id}
                  state={true}
                />
              </div>
              <Accordion type="single" collapsible className="mt-4">
             {items.map((item) => (
                 <AccordionItem value={item.title} className="py-3">
                 <AccordionTrigger className="hover:no-underline data-[state=open]:text-sky-800 dark:data-[state=open]:text-slate-300" >{item.title}</AccordionTrigger>
                 <AccordionContent>
                   <ul className="list-disc list-inside">
                     {item.listItems.map((text) => (
                    
                       <li className="text-slate-600 dark:text-slate-100" key={text}>{text}</li>
                    
                     ))}
                   </ul>
                 </AccordionContent>
               </AccordionItem>
             ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
