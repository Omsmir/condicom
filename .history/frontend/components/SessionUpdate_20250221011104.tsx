import { getSession } from "next-auth/react";
import { useEffect } from "react";

const RefreshSession =  ({state}:{state:boolean}) => {
 
  const UpdateSession = async () => {
    await getSession()
  }

  useEffect(() => {
   if(state) 
  },[])

  return null;
};

export default RefreshSession;
