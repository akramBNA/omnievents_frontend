"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signup } from "../../services/authentication";

export default function SignupPage() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const currentYear = new Date().getFullYear();

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!firstName || !lastName) {
      return setError("Nom et prénom requis");
    }

    if (!validateEmail(email)) {
      return setError("Email invalide");
    }

    if (password.length < 6) {
      return setError("Mot de passe doit contenir au moins 6 caractères");
    }

    setLoading(true);

    try {
      const res = await signup(firstName, lastName, email, password);
      localStorage.setItem("token", res.token);
      router.push("/dashboard");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Erreur";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 px-4">
      <div className="w-full max-w-md md:max-w-lg bg-white p-10 rounded-3xl shadow-2xl">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-blue-900">
          Créer un compte
        </h1>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <form onSubmit={handleSignup} className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="Prénom"
            className="p-4 text-lg border rounded-xl focus:ring-2 focus:ring-blue-500"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Nom"
            className="p-4 text-lg border rounded-xl focus:ring-2 focus:ring-blue-500"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="p-4 text-lg border rounded-xl focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Mot de passe"
            className="p-4 text-lg border rounded-xl focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-4 rounded-xl hover:bg-blue-700 transition flex justify-center cursor-pointer"
          >
            {loading ? (
              <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "S'inscrire"
            )}
          </button>
        </form>
      </div>
      <div className="text-white justify-center">Realisé par <a href="#" className="text-2xl font-bold">Akram Benaoun</a> @ {currentYear}</div>
    </div>
  );
}
