/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserFromToken } from "../services/authentication";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/authSlice";

export const useAuth = (allowedRoles: string[]) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const payload = getUserFromToken();
    const token = localStorage.getItem("token");

    if (!payload || !allowedRoles.includes(payload.role)) {
      router.push("/access-denied");
      return;
    }
    dispatch(
      setUser({
        user: {
          user_id: payload.user_id,
          user_name: payload.user_name || "",
          user_lastname: payload.user_lastname || "",
          user_email: payload.user_email || "",
          user_role_id: payload.role === "super_admin" ? 1 : payload.role === "admin" ? 2 : 3,
        },
        token: token || "",
        role: payload.role,
      }),
    );

    setLoading(false);
  }, [allowedRoles, router, dispatch]);

  return { loading };
};
