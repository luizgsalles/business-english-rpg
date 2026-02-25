import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import Link from 'next/link';
import { isDemoMode } from '@/lib/demo';

export default async function HomePage() {
  const session = await auth();
  const isDemo = await isDemoMode();

  if (session?.user || isDemo) {
    redirect('/dashboard');
  }

  redirect('/auth/signin');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-white">
            Business English RPG 🎮
          </div>
          <Link
            href="/auth/signin"
            className="px-4 py-2 bg-white text-purple-600 rounded-lg font-semibold hover:bg-purple-50"
          >
            Sign in
          </Link>
        </div>
      </header>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-6 py-24 text-center text-white">
        <h1 className="text-7xl font-black mb-6 drop-shadow-lg">
          Master Business English 🚀
        </h1>

        <p className="text-2xl mb-12 text-white/90 max-w-3xl mx-auto">
          Aprenda inglês profissional com gamificação, IA e diversão!
        </p>

        {/* Buttons */}
        <div className="flex gap-6 justify-center mb-16">
          <Link
            href="/demo"
            className="px-10 py-5 bg-yellow-400 text-gray-900 rounded-2xl font-bold text-xl hover:bg-yellow-300 hover:scale-110 transition-all shadow-2xl"
          >
            🎮 Começar GRÁTIS
          </Link>

          <Link
            href="/demo"
            className="px-10 py-5 bg-white/20 backdrop-blur text-white border-2 border-white/40 rounded-2xl font-bold text-xl hover:bg-white/30 hover:scale-110 transition-all"
          >
            Ver Demo →
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
            <div className="text-6xl mb-3">📖</div>
            <div className="text-4xl font-bold mb-2">6</div>
            <div className="text-lg">Skills</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
            <div className="text-6xl mb-3">⭐</div>
            <div className="text-4xl font-bold mb-2">100+</div>
            <div className="text-lg">Exercícios</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
            <div className="text-6xl mb-3">🏆</div>
            <div className="text-4xl font-bold mb-2">∞</div>
            <div className="text-lg">Conquistas</div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-6xl font-black text-center mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Como Funciona
          </h2>
          <p className="text-2xl text-gray-600 text-center mb-16">
            Sistema completo de aprendizado gamificado
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-8 text-white hover:scale-105 transition-transform shadow-2xl">
              <div className="text-6xl mb-4">🎮</div>
              <h3 className="text-3xl font-bold mb-4">Progressão RPG</h3>
              <p className="text-lg text-white/90">
                Ganhe XP, suba de nível em 6 habilidades e desbloqueie conquistas!
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-pink-500 to-orange-500 rounded-3xl p-8 text-white hover:scale-105 transition-transform shadow-2xl">
              <div className="text-6xl mb-4">🤖</div>
              <h3 className="text-3xl font-bold mb-4">IA Claude</h3>
              <p className="text-lg text-white/90">
                Feedback instantâneo e correções detalhadas com inteligência artificial!
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-3xl p-8 text-white hover:scale-105 transition-transform shadow-2xl">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-3xl font-bold mb-4">Repetição Inteligente</h3>
              <p className="text-lg text-white/90">
                Algoritmo SM-2 otimiza sua retenção e te lembra de revisar!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-6xl font-black text-center mb-16 text-white">
            6 Skills para Dominar 💪
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-blue-500 rounded-3xl p-10 text-center text-white hover:scale-110 transition-transform shadow-2xl">
              <div className="text-7xl mb-4">📖</div>
              <h3 className="text-2xl font-bold">Grammar</h3>
            </div>
            <div className="bg-purple-500 rounded-3xl p-10 text-center text-white hover:scale-110 transition-transform shadow-2xl">
              <div className="text-7xl mb-4">📚</div>
              <h3 className="text-2xl font-bold">Vocabulary</h3>
            </div>
            <div className="bg-pink-500 rounded-3xl p-10 text-center text-white hover:scale-110 transition-transform shadow-2xl">
              <div className="text-7xl mb-4">👂</div>
              <h3 className="text-2xl font-bold">Listening</h3>
            </div>
            <div className="bg-orange-500 rounded-3xl p-10 text-center text-white hover:scale-110 transition-transform shadow-2xl">
              <div className="text-7xl mb-4">🎤</div>
              <h3 className="text-2xl font-bold">Speaking</h3>
            </div>
            <div className="bg-green-500 rounded-3xl p-10 text-center text-white hover:scale-110 transition-transform shadow-2xl">
              <div className="text-7xl mb-4">📄</div>
              <h3 className="text-2xl font-bold">Reading</h3>
            </div>
            <div className="bg-cyan-500 rounded-3xl p-10 text-center text-white hover:scale-110 transition-transform shadow-2xl">
              <div className="text-7xl mb-4">✍️</div>
              <h3 className="text-2xl font-bold">Writing</h3>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-yellow-400 py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-6xl font-black text-gray-900 mb-6">
            Pronto para Começar? 🚀
          </h2>
          <p className="text-2xl text-gray-700 mb-10">
            Junte-se a milhares de profissionais melhorando seu inglês!
          </p>
          <Link
            href="/demo"
            className="inline-block px-12 py-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold text-2xl hover:scale-110 transition-transform shadow-2xl"
          >
            🎮 COMEÇAR AGORA GRÁTIS
          </Link>
        </div>
      </div>
    </div>
  );
}
