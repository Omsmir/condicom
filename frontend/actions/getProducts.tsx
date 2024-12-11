import axios from "axios";

export interface Product {
  name: string;
  price: number;
  image: string;
  _id: string;
}

export async function getproducts() {
  try {
    const { status, data } = await axios.get(
      "http://localhost:8080/api/products/"
    );

    await new Promise((resolve) => setTimeout(resolve, 500));
    if (status === 200) {
      return data;
    }

    return { success: false, msg: "error getting the data" };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export const getSingleProduct = async (id: string) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/products/${id}/`
    );

    if (!response.data) {
      throw new Error("Failed to fetch the product");
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const singleProduct = await response.data;
    return singleProduct.product;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
