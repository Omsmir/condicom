import { getSession } from "next-auth/react";
import { useEffect } from "react";

const RefreshSession = () => {
  useEffect(() => {
      await getSession(); // Refresh session data

    return () => clearInterval(interval);
  }, []);

  return null;
};

export default RefreshSession;
