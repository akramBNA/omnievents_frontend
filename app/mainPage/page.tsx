/* eslint-disable @next/next/no-html-link-for-pages */
export default function mainPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-200 via-green-300 to-green-400 px-4">
            <div className="w-full max-w-2xl bg-white p-8 rounded-3xl shadow-xl text-center">
                <h1 className="text-4xl font-bold mb-6 text-green-800">Bienvenue au OMNIEVENTS</h1>
                <p className="text-lg mb-8 text-gray-700">Votre plateforme de gestion d&apos;événements tout-en-un</p>
                <div className="flex justify-center gap-4">
                    <a href="/signup" className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">Créer un compte</a>
                    <a href="/" className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">Se connecter</a>
                </div>
            </div>
        </div>
    );
}
