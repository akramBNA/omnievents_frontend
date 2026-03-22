"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface SidebarProps {
  username: string;
  currentSection: "events" | "users";
  setCurrentSection: (section: "events" | "users") => void;
}

export default function Sidebar({
  username,
  currentSection,
  setCurrentSection,
}: SidebarProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  const navButton = (label: string, section: "events" | "users") => (
    <button
      className={`w-full text-left p-2 rounded cursor-pointer ${
        currentSection === section
          ? "bg-blue-500 text-white"
          : "bg-gray-200 hover:bg-gray-300"
      }`}
      onClick={() => {
        setCurrentSection(section);
        setOpen(false);
      }}
    >
      {label}
    </button>
  );

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-10 md:hidden transition-opacity ${
          open ? "block" : "hidden"
        }`}
        onClick={() => setOpen(false)}
      />

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-20 transform md:translate-x-0 transition-transform ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } rounded-xl`}
      >
        <div className="flex flex-col h-full justify-between p-6">
          <div>
            <h1 className="text-2xl font-bold mb-4">DASHBOARD</h1>
            <p className="text-gray-700 mb-6">Bonjour, {username}</p>

            <nav className="flex flex-col gap-2">
              {navButton("Utilisateurs", "users")}
              {navButton("Événements", "events")}
            </nav>
          </div>

          <button
            onClick={logout}
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 mt-4 cursor-pointer"
          >
            Déconnexion
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
