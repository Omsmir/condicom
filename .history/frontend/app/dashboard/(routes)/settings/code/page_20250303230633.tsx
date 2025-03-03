import React from 'react'
import dynamic from "next/dynamic";

const Code = dynamic(() => import("@/components/settings/code/code"));
const page = () => {
  return <Code />
}

export default page
