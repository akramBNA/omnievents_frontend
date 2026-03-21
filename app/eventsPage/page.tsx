/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

import { useAuth } from "../../hooks/useAuth";

export default function eventsPage() {
  const authorized = useAuth(["user", "admin", "super_admin"]);
  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 px-4">
      <div className="w-full max-w-2xl bg-white p-8 rounded-3xl shadow-xl text-center">
        <h1 className="text-4xl font-bold mb-6 text-blue-800">
          Bienvenue au OMNIEVENTS
        </h1>
        <p className="text-lg mb-8 text-gray-700">
          Votre plateforme de gestion d&apos;événements tout-en-un
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="/signup"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Créer un compte
          </a>
          <a
            href="/"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Se connecter
          </a>
        </div>
      </div>
    </div>
  );
}
