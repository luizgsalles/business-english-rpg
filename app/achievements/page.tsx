import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/demo';

const ACHIEVEMENTS = [
  { id: '1', name: '7-Day Streak', description: 'Study for 7 consecutive days', icon: '🔥', tier: 'bronze', xpReward: 100, unlocked: false, progress: 71 },
  { id: '2', name: 'Grammar Master', description: 'Reach level 5 in Grammar', icon: '📚', tier: 'silver', xpReward: 200, unlocked: false, progress: 60 },
  { id: '3', name: 'First Exercise', description: 'Complete your first exercise', icon: '⭐', tier: 'bronze', xpReward: 50, unlocked: true, progress: 100 },
  { id: '4', name: 'Speed Learner', description: 'Complete 5 exercises in one day', icon: '⚡', tier: 'silver', xpReward: 150, unlocked: false, progress: 40 },
  { id: '5', name: 'Vocabulary King', description: 'Learn 100 new words', icon: '👑', tier: 'gold', xpReward: 500, unlocked: false, progress: 22 },
  { id: '6', name: 'Perfect Score', description: 'Get 100% accuracy on an exercise', icon: '🎯', tier: 'silver', xpReward: 200, unlocked: false, progress: 0 },
  { id: '7', name: 'Business Pro', description: 'Complete all business email exercises', icon: '💼', tier: 'gold', xpReward: 400, unlocked: false, progress: 33 },
  { id: '8', name: 'Dedicated Learner', description: 'Study for 30 consecutive days', icon: '🏅', tier: 'platinum', xpReward: 1000, unlocked: false, progress: 17 },
  { id: '9', name: 'Early Bird', description: 'Complete an exercise before 8 AM', icon: '🌅', tier: 'bronze', xpReward: 75, unlocked: true, progress: 100 },
  { id: '10', name: 'Night Owl', description: 'Complete an exercise after 10 PM', icon: '🦉', tier: 'bronze', xpReward: 75, unlocked: false, progress: 0 },
  { id: '11', name: 'Polyglot', description: 'Practice 3 different skill areas in one day', icon: '🌍', tier: 'silver', xpReward: 150, unlocked: false, progress: 67 },
  { id: '12', name: 'XP Collector', description: 'Earn 5000 total XP', icon: '💎', tier: 'gold', xpReward: 300, unlocked: false, progress: 30 },
];

const TIER_COLORS = {
  bronze: { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200', badge: 'bg-amber-600' },
  silver: { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-300', badge: 'bg-gray-500' },
  gold: { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-200', badge: 'bg-yellow-500' },
  platinum: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-200', badge: 'bg-purple-600' },
};

export default async function AchievementsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/auth/signin');
  }

  const unlockedCount = ACHIEVEMENTS.filter((a) => a.unlocked).length;
  const totalXP = ACHIEVEMENTS.filter((a) => a.unlocked).reduce((sum, a) => sum + a.xpReward, 0);

  return (
    <div className="min-h-screen bg-gradient-mesh">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <div>
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
                <span className="text-gradient">Achievements</span> 🏆
              </h1>
            </div>
            <div className="flex gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-gradient">{unlockedCount}/{ACHIEVEMENTS.length}</div>
                <div className="text-sm text-gray-500">Unlocked</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-500">+{totalXP}</div>
                <div className="text-sm text-gray-500">XP Earned</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container-custom py-12">
        {/* Progress Banner */}
        <div className="card-glass mb-8 p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold">Overall Progress</span>
            <span className="text-gradient font-bold">{Math.round((unlockedCount / ACHIEVEMENTS.length) * 100)}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${(unlockedCount / ACHIEVEMENTS.length) * 100}%` }} />
          </div>
          <p className="text-sm text-gray-500 mt-2">{ACHIEVEMENTS.length - unlockedCount} achievements remaining</p>
        </div>

        {/* Achievement Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ACHIEVEMENTS.map((achievement) => {
            const colors = TIER_COLORS[achievement.tier as keyof typeof TIER_COLORS];
            return (
              <div
                key={achievement.id}
                className={`card ${achievement.unlocked ? '' : 'opacity-70'} hover:shadow-lg transition-all`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-2xl ${colors.bg} ${colors.border} border-2 flex items-center justify-center text-2xl flex-shrink-0`}>
                    {achievement.unlocked ? achievement.icon : '🔒'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-gray-900 truncate">{achievement.name}</h3>
                      <span className={`text-xs px-1.5 py-0.5 rounded text-white ${colors.badge} flex-shrink-0`}>
                        {achievement.tier}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">{achievement.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-amber-600">+{achievement.xpReward} XP</span>
                      {achievement.unlocked ? (
                        <span className="text-xs text-green-600 font-semibold">✓ Unlocked</span>
                      ) : (
                        <span className="text-xs text-gray-400">{achievement.progress}%</span>
                      )}
                    </div>
                    {!achievement.unlocked && achievement.progress > 0 && (
                      <div className="progress-bar mt-2">
                        <div className="progress-fill" style={{ width: `${achievement.progress}%` }} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
