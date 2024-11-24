import Loading from "@/app/loading";
import SingleProduct from "@/components/SingleProduct";
import { Suspense } from "react";

const page = async ({ params }: { params: Promise<{ _id: string}> }) => {
  const {_id:id} = await params;
  
  return (
    <Suspense fallback={<Loading/>}>
      <SingleProduct id={id}/>
    </Suspense>
  );
};

export default page;
