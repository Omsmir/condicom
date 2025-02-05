import { getproducts } from "@/actions/getProducts";
import Products from "@/components/Products";
import { Suspense } from "react";
import Loading from "@/app/loading";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Health - Dashboard",
  description: "Welcome to dashboard",
};

const Home = async () => {
  

  return (
      <Suspense fallback={<Loading />}>
     <Products product={products.data} />
     </Suspense>
  
  );
};
export default Home;

export const dynamic = 'force-dynamic'