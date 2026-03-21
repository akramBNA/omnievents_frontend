/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserFromToken } from "../services/authentication";

export const useAuth = (allowedRoles: string[]) => {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const user = getUserFromToken();

    if (!user) {
      router.replace("/access-denied");
      return;
    }

    if (!allowedRoles.includes(user.role)) {
      router.replace("/access-denied");
      return;
    }

    setAuthorized(true);
  }, []);

  return authorized;
};
