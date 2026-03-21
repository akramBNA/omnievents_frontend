"use client";

import { useAuth } from "../../hooks/useAuth";

export default function Dashboard() {
  useAuth(["admin", "super_admin"]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 px-4">
      <h1 className="p-6 text-2xl text-white font-bold">Dashboard Admin</h1>
    </div>
  );
}
