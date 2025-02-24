import { getSession } from "next-auth/react";
import { useEffect } from "react";

const RefreshSession =  () => {
 
  const UpdateSession = async () => {
    await getSession()
  }

  useEffect(() => {
   await UpdateSession()
  },[])

  return null;
};

export default RefreshSession;
