"use client";

import { useState } from "react";
import { login } from "../services/authentication";
import { setAuthFromResponse } from "@/utils/auth.utils";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch } from "react-redux";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const currentYear = new Date().getFullYear();

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      return setError("Email requis");
    }

    if (!validateEmail(email)) {
      return setError("Email invalide");
    }
    if (!password) {
      return setError("Mot de passe requis");
    }

    if (password.length < 6) {
      return setError("Mot de passe doit contenir au moins 6 caractères");
    }

    setLoading(true);

    try {
      const res = await login(email, password);
      // const payload = JSON.parse(atob(res.token.split(".")[1]));
      // const data = JSON.parse(JSON.stringify(res.data));
      const role = setAuthFromResponse(res, dispatch);

      if (role === "admin" || role === "super_admin") {
        router.push("/dashboard");
      } else {
        router.push("/eventsPage");
      }
    } catch (err: unknown) {
      setError((err instanceof Error ? err.message : "Erreur") || "Erreur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 px-4">
      <div className="w-full max-w-md md:max-w-lg bg-white p-10 rounded-3xl shadow-2xl">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-blue-900">
          Bienvenue au OMNIEVENTS
        </h1>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-4 text-lg border rounded-xl focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Mot de passe"
            className="w-full p-4 text-lg border rounded-xl focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-4 rounded-xl hover:bg-blue-700 transition flex items-center justify-center cursor-pointer"
          >
            {loading ? (
              <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Se connecter"
            )}
          </button>

          <Link href="/signup">
            <button
              type="button"
              className="w-full bg-blue-100 text-blue-900 p-4 rounded-xl hover:bg-blue-200 transition cursor-pointer"
            >
              S&apos;inscrire
            </button>
          </Link>
        </form>
      </div>
      <p className="mt-6 text-white text-sm md:text-base text-center opacity-90">
        Réalisé par{" "}
        <a
          href="https://akram-benaoun.site"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold hover:underline"
        >
          Akram Benaoun
        </a>{" "}
        © {currentYear}
      </p>
    </div>
  );
}
