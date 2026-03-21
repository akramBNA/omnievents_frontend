"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface SidebarProps {
  username: string;
}

export default function Sidebar({ username }: SidebarProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 z-10 md:hidden transition-opacity ${
          open ? "block" : "hidden"
        }`}
        onClick={() => setOpen(false)}
      />

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-20 transform md:translate-x-0 transition-transform ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full justify-between p-6">
          <div>
            <h1 className="text-xl font-bold mb-4">DASHBOARD</h1>
            <p className="text-gray-700 mb-6">Welcome, {username}</p>

            <nav className="flex flex-col gap-2">
              <button className="w-full text-left p-2 rounded hover:bg-gray-100">
                Users
              </button>
              <button className="w-full text-left p-2 rounded hover:bg-gray-100">
                Events
              </button>
            </nav>
          </div>

          <button
            onClick={logout}
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 mt-4"
          >
            Logout
          </button>
        </div>
      </aside>

      <button
        className="fixed top-4 left-4 z-30 md:hidden bg-white p-2 rounded shadow"
        onClick={() => setOpen(true)}
      >
        ☰
      </button>
    </>
  );
}
