"use client";

import { useAuth } from "../../hooks/useAuth";

export default function Dashboard() {
  useAuth(["admin", "super_admin"]);

  return <h1 className="p-6 text-2xl">Dashboard Admin 🚀</h1>;
}