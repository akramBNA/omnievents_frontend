"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getUserFromToken } from "../services/authentication";

export const useAuth = (allowedRoles: string[]) => {
  const router = useRouter();

  useEffect(() => {
    const user = getUserFromToken();

    if (!user) {
      router.push("/access-denied");
      return;
    }

    if (!allowedRoles.includes(user.role)) {
      router.push("/access-denied");
    }
  }, []);
};