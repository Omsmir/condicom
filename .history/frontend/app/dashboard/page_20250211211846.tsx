import { getproducts } from "@/actions/getProducts";
import Products from "@/components/Products";
import { Suspense } from "react";
import Loading from "@/app/loading";
import { Metadata } from "next";
import Overview from "@/components/Overview";
export const metadata: Metadata = {
  title: "Health - Dashboard",
  description: "Welcome to dashboard",
};

const Home = async () => {
  const notifications = get

  return (
      <Suspense fallback={<Loading />}>
     <Overview />
     </Suspense>
  
  );
};
export default Home;

export const dynamic = 'force-dynamic'