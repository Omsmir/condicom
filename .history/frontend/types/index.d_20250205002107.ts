import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";
import 'jspdf';

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
  profileState?: boolean
  className?: string;
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
  style?:string
}

// Extend the User object returned by NextAuth
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      verified?:boolean;
      code:string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    role: string;
    verified?: boolean;

  }
}

// Extend the JWT object returned by NextAuth
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string
    verified?: boolean;
    trigger:any;
    session:any;
    code:string;
  }
}

declare interface Appointment {
  _id:string;
  task:string;
  description:string;
  startDate:Date;
  endDate:Date;
  interval:string;
  color:string;
  user:string;
  completed:boolean;
  createdAt:Date;
}


declare interface Appointments {
appointment:Appointment[]
}


declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}


declare interface Notification {
  _id: string;
  type: string;
  title: string;
  description: string;
  user: string;
  assignedBy:string;
  assignedTo?:string;
  eventId?: string;
  updatedAt: Date;
  seen: boolean;
}
declare interface Notifications {
  notifications: Notification[]
}



declare interface UserInformation {
  _id:string;
  name:string;
  weight:string;
  height:string;
  bio:string;
  address:string;
  phone:string;
  birthDate:Date;
  gender:string;
  occupation:string;
  role:string;
  email:string;
  profileImg:{
    url:string
  }
  code:string;
  country:string;
  verified:boolean;
  profileState?:boolean
}


declare interface ObjectType{
  public:{
    title:string;
    tone:string
  }
  adminOnly:{
    title:string;
    tone:string
  }
}

interface patient {
  _id:string;
  profileImg?:{
    url:string
  }
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: Date;
  phone: string;
  bloodType: string; // Optional field
  country: string;
  height?: number;
  weight?: number;
  email?: string;
  emergencyContactPerson?: string;
  emergencyContactRelationship?: string;
  emergencyContactNumber: string;
  residentialAddress?: string;
  insuranceProvider?: string;
  medicalConditions: string;
  allergies: string;
  pastSurgeries?: string;
  familyMedicalHistory?: string;
  currentMedications: string;
  smoking: string;
  smokingFrequency?: string;
  alcohol: string;
  alcoholFrequency?: string;
  createdAt:Date;
  updatedAt:Date;
}


declare interface medication {
  _id:string;
  name:string;
  genericName:string;
  description?:string;
  form?:string;
  strength:string;
  Route?:string;
  manufacturer?:string;
  batchNumber?:string;
  storageConditions:string;
  Expiry Date
}