"use client";

import { useState } from "react";
import { login } from "../services/authentication";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await login(email, password);

      localStorage.setItem("token", res.token);
      router.push("/dashboard");
    } catch (err: unknown) {
      if (err && typeof err === "object" && "message" in err) {
        setError(err.message as string);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-800">
          Bienvenue au OMNIEVENTS
        </h1>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
          >
            Se connecter
          </button>

          <Link href="/signup">
            <button
              type="button"
              className="w-full bg-blue-100 text-blue-800 p-3 rounded-lg hover:bg-blue-200 transition"
            >
              S&apos;inscrire
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}