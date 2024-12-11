import { getproducts } from "@/actions/getProducts";
import Products from "@/components/Products";
import { Suspense } from "react";
import Loading from "@/app/loading";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Dashboard",
  description: "Welcome to dashboard",
};

const Home = async () => {
  const products = await getproducts();

  

 if(!products.success) return (
  <div className="flex pt-10">
    <main className="h-screen my-auto w-full flex items-center justify-center">
      <p>No Products Exist</p>
    </main>
  </div>
 )

  return (
      <Suspense fallback={<Loading />}>
     <Products product={products.data} />
     </Suspense>
  
  );
};
export default Home;

export const dynamic = 'force-dynamic'