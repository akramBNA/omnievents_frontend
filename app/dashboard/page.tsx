"use client";

import { useAuth } from "../../hooks/useAuth";

export default function Dashboard() {
  const authorized = useAuth(["admin", "super_admin"]);

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 px-4">
        <div className="w-20 h-20 border-10 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 px-4">
      <h1 className="p-6 text-2xl text-white font-bold">Dashboard Admin</h1>
    </div>
  );
}
