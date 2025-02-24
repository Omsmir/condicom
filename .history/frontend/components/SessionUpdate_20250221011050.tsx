import { getSession } from "next-auth/react";
import { useEffect } from "react";

const RefreshSession =  (state:) => {
 
  const UpdateSession = async () => {
    await getSession()
  }

  useEffect(() => {
   
  },[])

  return null;
};

export default RefreshSession;
