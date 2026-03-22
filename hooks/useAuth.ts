/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserFromToken } from "../services/authentication";

export const useAuth = (allowedRoles: string[]) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = getUserFromToken();

    if (!user || !allowedRoles.includes(user.role)) {
      router.push("/access-denied");
    } else {
      setLoading(false);
    }
  }, [allowedRoles, router]);

  return { loading };
};