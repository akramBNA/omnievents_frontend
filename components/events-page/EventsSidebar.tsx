"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EventsSidebar({ username }: { username: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-10 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg p-6 z-20 transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div>
          <h2 className="mb-8 mt-4 text-3xl font-extrabold text-black">OMNIEVENTS</h2>

          <p className="mb-4 text-2xl font-bold">Bonjour</p>
          <p className="mb-4 text-2xl font-bold">{username}</p>
        </div>

        <button
          onClick={logout}
          className="mt-auto bg-red-600 text-white py-2 rounded hover:bg-red-700 w-full"
        >
          Déconnexion
        </button>
      </aside>

      <button
        className={`fixed top-4 left-4 z-30 md:hidden bg-white p-2 rounded shadow ${
          open ? "hidden" : ""
        }`}
        onClick={() => setOpen(true)}
      >
        ☰
      </button>
    </>
  );
}
