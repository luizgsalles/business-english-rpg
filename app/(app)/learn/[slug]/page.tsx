// ============================================================================
// Topic Page — Theory + Practice
// ============================================================================

import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/auth';
import { isDemoMode } from '@/lib/demo';
import { getTopicContent } from '@/lib/content/index';
import { TheorySection } from '@/components/learn/TheorySection';
import { ExercisesSection } from '@/components/learn/ExercisesSection';
import { ChevronLeft } from 'lucide-react';

interface TopicPageProps {
  params: Promise<{ slug: string }>;
}

const LEVEL_LABELS: Record<string, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

export async function generateMetadata({ params }: TopicPageProps) {
  const { slug } = await params;
  const topic = getTopicContent(slug);
  if (!topic) return { title: 'Topic Not Found' };
  return {
    title: `${topic.title} — Road to Fluency`,
    description: `Learn ${topic.title}: theory, examples, and 5 practice exercises.`,
  };
}

export default async function TopicPage({ params }: TopicPageProps) {
  const session = await auth();
  const isDemo = await isDemoMode();

  if (!session?.user && !isDemo) {
    redirect('/auth/signin');
  }

  const { slug } = await params;
  const topic = getTopicContent(slug);

  if (!topic) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      {/* Back link */}
      <Link
        href="/learn"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors mb-6"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Grammar
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-3"
          style={{ backgroundColor: `${topic.color}18`, color: topic.color }}
        >
          {topic.category}
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-1">{topic.title}</h1>
        <p className="text-sm text-slate-500">
          {LEVEL_LABELS[topic.level]} · {topic.exercises.length} exercises (+{topic.exercises.length * 13} XP)
        </p>
      </div>

      {/* Two-column layout on wide screens */}
      <div className="space-y-10 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-10">
        {/* Theory */}
        <div>
          <h2 className="text-base font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-100">
            Theory
          </h2>
          <TheorySection theory={topic.theory} color={topic.color} />
        </div>

        {/* Practice */}
        <div>
          <h2 className="text-base font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-100">
            Practice
            <span className="ml-2 text-xs font-normal text-slate-400">(50% XP — theory visible)</span>
          </h2>
          <ExercisesSection exercises={topic.exercises} topicColor={topic.color} />
        </div>
      </div>
    </div>
  );
}
