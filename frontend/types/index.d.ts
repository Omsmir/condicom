import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare interface Props {
  name: string;
  price: number;
  image: any;
}
declare interface editConditinaol {
  name?: string;
  price?: number;
  image?: any | undefined;
}
declare interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: {
    url: string;
    ThumbnailImage: boolean;
  }[] ;
}

declare interface types {
  product?:{
    image: {
      url: string;
      ThumbnailImage: boolean;
    }[]
  } | undefined  
}

declare interface Param {
  params: {
    _id: string;
  };
}



declare interface ProductsProp {
  product: Product[];
}

declare interface singleProduct {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: {
    url: string;
    ThumbnailImage: boolean;
  }[];
}

declare interface singleProductProps {
  singleProduct: singleProduct;
}

declare interface FileUploaderProps {
  files: File[] | undefined;
  onChange: (files: File[]) => void;
  state?:boolean;
  children?:React.ReactNode  
}

declare interface Images {
  url: string;
  _id: string;
}


declare interface prop {
  onHandle?: () => void;
  name?: string;
  className?: string;
  id?: string;
  state?:boolean
}

// Extend the User object returned by NextAuth
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    role: string;
  }
}

// Extend the JWT object returned by NextAuth
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
  }
}