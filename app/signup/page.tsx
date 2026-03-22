"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAuthFromResponse } from "@/utils/auth.utils";
import { setUser } from "@/store/authSlice";
import { useRouter } from "next/navigation";
import { signup } from "../../services/authentication";

export default function SignupPage() {
  const dispatch = useDispatch();
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

    if (!firstName) {
      return setError("Prénom requis");
    }

    if (!lastName) {
      return setError("Nom requis");
    }

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
      const res = await signup(firstName, lastName, email, password);
      // const payload = JSON.parse(atob(res.token.split(".")[1]));
      // const data = res.data;

      const role = setAuthFromResponse(res, dispatch);
            console.log("res ----> L: ", res);

      if (role && role === "user") {
        router.push("/eventsPage");
      } else {
        router.push("/access-denied");
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Erreur";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 px-4">
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
          <button
            type="button"
            onClick={() => router.push("/")}
            className="w-full bg-red-600 text-white p-4 rounded-xl hover:bg-red-700 transition cursor-pointer"
          >
            Retour
          </button>
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
      </p>{" "}
    </div>
  );
}
