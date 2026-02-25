import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/demo';
import { SignOutButton } from '@/components/SignOutButton';

export default async function SettingsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/auth/signin');
  }

  return (
    <div className="min-h-screen bg-gradient-mesh">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container-custom py-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-1"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">Dashboard</span>
          </Link>
          <h1 className="text-3xl font-bold">
            <span className="text-gradient">Settings</span> ⚙️
          </h1>
        </div>
      </header>

      <div className="container-custom py-12 max-w-2xl mx-auto">
        {/* Profile */}
        <div className="card mb-6">
          <h2 className="text-xl font-bold mb-4">Profile</h2>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-2xl font-bold text-purple-600">
              {user.name?.charAt(0) || 'U'}
            </div>
            <div>
              <div className="font-bold text-lg">{user.name || 'User'}</div>
              <div className="text-gray-500">{user.email}</div>
            </div>
          </div>
        </div>

        {/* Learning Preferences */}
        <div className="card mb-6">
          <h2 className="text-xl font-bold mb-4">Learning Preferences</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Native Language</label>
              <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none" defaultValue={user.nativeLanguage || 'pt-BR'}>
                <option value="pt-BR">Português (Brasil)</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
                <option value="zh">中文</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty Level</label>
              <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none" defaultValue={user.difficultyPreference || 'medium'}>
                <option value="easy">Easy - I&apos;m just starting out</option>
                <option value="medium">Medium - I know some basics</option>
                <option value="hard">Hard - I want a challenge</option>
              </select>
            </div>
          </div>
          <button className="btn-primary mt-6">Save Preferences</button>
        </div>

        {/* Stats */}
        <div className="card mb-6">
          <h2 className="text-xl font-bold mb-4">Your Progress</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center bg-purple-50 rounded-xl p-4">
              <div className="text-2xl font-bold text-purple-600">{user.overallLevel}</div>
              <div className="text-sm text-gray-600">Level</div>
            </div>
            <div className="text-center bg-amber-50 rounded-xl p-4">
              <div className="text-2xl font-bold text-amber-600">{user.totalXP}</div>
              <div className="text-sm text-gray-600">Total XP</div>
            </div>
            <div className="text-center bg-orange-50 rounded-xl p-4">
              <div className="text-2xl font-bold text-orange-500">{user.currentStreak}</div>
              <div className="text-sm text-gray-600">Day Streak</div>
            </div>
          </div>
        </div>

        {/* Sign Out */}
        <div className="card">
          <h2 className="text-xl font-bold mb-2">Account</h2>
          <p className="text-gray-500 mb-4">Manage your account settings</p>
          <SignOutButton />
        </div>
      </div>
    </div>
  );
}
