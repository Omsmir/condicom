import { getSession } from "next-auth/react";
import { useEffect } from "react";

const RefreshSession = () => {
  useEffect(() => {
    const interval = setInterval(async () => {
      await getSession(); // Refresh session data
    }, 5 * 60 * 1000); // Every 5 minutes

    return () => clearInterval(interval);
  }, []);

  return null;
};

export default RefreshSession;
