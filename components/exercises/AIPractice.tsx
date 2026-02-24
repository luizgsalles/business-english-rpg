'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Sparkles } from 'lucide-react';

const SKILLS = [
  { type: 'grammar',    label: 'Grammar',    icon: '📝', desc: 'Tenses, modals, conditionals' },
  { type: 'vocabulary', label: 'Vocabulary', icon: '📚', desc: 'Business terms & phrases' },
  { type: 'reading',    label: 'Reading',    icon: '👁️', desc: 'Emails, reports, articles' },
  { type: 'writing',    label: 'Writing',    icon: '✍️', desc: 'Emails, proposals, summaries' },
  { type: 'speaking',   label: 'Speaking',   icon: '🎤', desc: 'Presentations & conversations' },
] as const;

type SkillType = typeof SKILLS[number]['type'];

export function AIPractice() {
  const router = useRouter();
  const [loading, setLoading] = useState<SkillType | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function generate(type: SkillType) {
    setLoading(type);
    setError(null);
    try {
      const res = await fetch('/api/ai/generate-exercise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type }),
      });
      if (!res.ok) throw new Error('Generation failed');
      const { exerciseId } = await res.json();
      router.push(`/exercise/${exerciseId}`);
    } catch {
      setError('Could not generate exercise. Try again.');
      setLoading(null);
    }
  }

  return (
    <div className="mb-10">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-xl bg-purple-100 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-900">AI Practice</h2>
          <p className="text-sm text-muted-foreground">Fresh exercise every time — generated for your level</p>
        </div>
      </div>

      {/* Skill grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {SKILLS.map(({ type, label, icon, desc }) => (
          <button
            key={type}
            onClick={() => generate(type)}
            disabled={loading !== null}
            className="group relative flex flex-col items-center gap-2 p-4 rounded-2xl border-2 border-slate-100 bg-white hover:border-purple-300 hover:bg-purple-50 transition-all disabled:opacity-60 disabled:cursor-not-allowed text-center shadow-sm hover:shadow-md"
          >
            {loading === type ? (
              <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
            ) : (
              <span className="text-3xl group-hover:scale-110 transition-transform">{icon}</span>
            )}
            <span className="text-sm font-semibold text-slate-800">{label}</span>
            <span className="text-xs text-muted-foreground leading-tight">{desc}</span>

            {loading === type && (
              <span className="absolute inset-0 flex items-end justify-center pb-2 text-xs text-purple-600 font-medium">
                Generating...
              </span>
            )}
          </button>
        ))}
      </div>

      {error && (
        <p className="mt-3 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}
