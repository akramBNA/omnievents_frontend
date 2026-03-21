import { ShieldX } from 'lucide-react';
import Link from 'next/link';

export default function AccessDenied() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 px-4">
      <div className="bg-white p-10 md:p-16 rounded-3xl shadow-2xl text-center max-w-xl w-full">
        <ShieldX className="w-12 h-12 md:w-16 md:h-16 text-red-600 mx-auto mb-4" />
        <h1 className="text-2xl md:text-3xl font-bold text-red-600 mb-4">Accès Interdit</h1>

        <p className="text-gray-700 text-base md:text-lg mb-6">
          Veuillez vous identifier d&apos;abord.
        </p>

        <Link
          href="/"
          className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
        >
          Retour
        </Link>
      </div>
    </div>
  );
}