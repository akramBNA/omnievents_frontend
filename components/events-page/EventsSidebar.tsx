"use client";

import { useRouter } from "next/navigation";

export default function EventsSidebar({ username }: { username: string }) {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg flex flex-col justify-between p-6">
      <div>
        <h2 className="text-xl font-bold text-blue-700 mb-6">OMNIEVENTS</h2>

        <p className="text-gray-600">Bonjour,</p>
        <p className="font-semibold text-lg">{username}</p>
      </div>

      <button
        onClick={logout}
        className="bg-red-600 text-white py-2 rounded hover:bg-red-700"
      >
        Déconnexion
      </button>
    </aside>
  );
}
