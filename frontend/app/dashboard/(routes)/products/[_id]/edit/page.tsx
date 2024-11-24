import { getSingleProduct } from "@/actions/getProducts";
import Loading from "@/app/loading";
import EditHolder from "@/components/EditHolder";
import React, { Suspense } from "react";



const page = async ({ params }: { params: Promise<{ _id: string }> }) => {
  const { _id: id } = await params;
  return (
    <Suspense fallback={<Loading />}>
      <EditHolder
        id={id}
      />
    </Suspense>
  );
};

export default page;
