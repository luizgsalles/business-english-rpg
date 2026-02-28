// ============================================================================
// Learn Page — Grammar & Skills Grid
// ============================================================================

import { GRAMMAR_TOPICS, CATEGORIES, getTopicsByCategory } from '@/lib/content/grammar-topics';
import { TopicCard } from '@/components/learn/TopicCard';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { isDemoMode } from '@/lib/demo';

export const metadata = {
  title: 'Learn — Road to Fluency',
  description: 'Master English grammar and business vocabulary with structured theory and exercises.',
};

export default async function LearnPage() {
  const session = await auth();
  const isDemo = await isDemoMode();

  if (!session?.user && !isDemo) {
    redirect('/auth/signin');
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Grammar & Skills</h1>
        <p className="text-slate-500 mt-1 text-sm">
          Learn a topic, then practice with exercises that go into your spaced repetition queue.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
          <p className="text-2xl font-bold text-slate-900">{GRAMMAR_TOPICS.length}</p>
          <p className="text-xs text-slate-500 mt-0.5">Topics</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
          <p className="text-2xl font-bold text-slate-900">{GRAMMAR_TOPICS.length * 5}</p>
          <p className="text-xs text-slate-500 mt-0.5">Exercises</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
          <p className="text-2xl font-bold text-slate-900">{CATEGORIES.length}</p>
          <p className="text-xs text-slate-500 mt-0.5">Categories</p>
        </div>
      </div>

      {/* Topics by category */}
      <div className="space-y-10">
        {CATEGORIES.map((category) => {
          const topics = getTopicsByCategory(category);
          const categoryColors: Record<string, string> = {
            'Verb Tenses':  '#3B82F6',
            'Modals':       '#8B5CF6',
            'Conditionals': '#EC4899',
            'Structure':    '#F59E0B',
            'Vocabulary':   '#10B981',
          };
          const color = categoryColors[category] ?? '#64748B';

          return (
            <div key={category}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
                <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                  {category}
                </h2>
                <span className="text-xs text-slate-400">({topics.length})</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {topics.map((topic) => (
                  <TopicCard key={topic.slug} topic={topic} exerciseCount={5} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
