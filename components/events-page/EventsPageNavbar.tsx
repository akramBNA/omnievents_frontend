/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EventsPageNavbar({ onSearch }: any) {
  const { user } = useSelector((s: RootState) => s.auth);
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <>
      <div className="flex justify-between items-center p-4 bg-white shadow-md">
        <button className="md:hidden" onClick={() => setOpen(true)}>
          ☰
        </button>

        <h1 className="text-xl font-bold text-blue-700">OMNIEVENTS</h1>

        <div className="hidden md:flex items-center gap-4">
          <span>Bonjour, {user?.user_name}</span>

          <input
            placeholder="Chercher..."
            className="p-2 rounded border"
            onChange={(e) => onSearch(e.target.value)}
          />

          <button
            onClick={logout}
            className="bg-red-600 text-white px-3 py-1 rounded"
          >
            Déconnexion
          </button>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-10"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white z-20 p-6 transition ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <p className="mb-4 font-bold">Bonjour, {user?.user_name}</p>

        <input
          placeholder="Chercher..."
          className="w-full mb-4 p-2 border rounded"
          onChange={(e) => onSearch(e.target.value)}
        />

        <button
          onClick={logout}
          className="w-full bg-red-600 text-white py-2 rounded"
        >
          Déconnexion
        </button>
      </div>
    </>
  );
}
