
import { getSingleProduct } from "@/actions/getProducts";
import EditForm from "@/components/EditForm";


const EditHolder = async ({ id }: { id: string }) => {

  const product = await getSingleProduct(id)
  return (
    <div className="flex mx-auto py-20 max-w-3xl px-4 min-h-screen">
      <EditForm product={product}  />
    </div>
  );
};

export default EditHolder;
