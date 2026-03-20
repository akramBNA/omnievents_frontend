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

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

       try {
         const res = await signup(firstName, lastName, email, password);
         localStorage.setItem("token", res.token);
         router.push("/mainPage");
     } catch (err: unknown) {
       if (err && typeof err === "object" && "message" in err) {
         setError(err.message as string);
       } else {
         setError("An unexpected error occurred");
       }
     }
   };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-800">
          Créer un compte
        </h1>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Prénom"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Nom"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
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
            S&apos;inscrire
          </button>
        </form>
      </div>
    </div>
  );
}