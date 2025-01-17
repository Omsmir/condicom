"use client"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const BreadCrumb = () => {
    const router = useRouter()
    const {data:session} = useSession()
  return (
    <Breadcrumb className="p-4">
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/dashboard" className="text-slate-500">
          Home
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator className="text-slate-500" />
      <BreadcrumbItem>
        <BreadcrumbLink
         onClick={() => router.back()}
          className="text-slate-500 cursor-pointer"
        >
          Doctors
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator className="text-slate-500" />
      <BreadcrumbItem>
        <BreadcrumbPage>current</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
  )
}

export default BreadCrumb
