'use client';

import { useState } from 'react';
import { Brain, TrendingUp, AlertTriangle, Lightbulb, ChevronDown, ChevronUp, Loader2, RefreshCw } from 'lucide-react';

interface Strength {
  skill: string;
  insight: string;
}

interface Weakness {
  skill: string;
  insight: string;
  priority: 'high' | 'medium' | 'low';
}

interface Recommendation {
  title: string;
  description: string;
  exerciseType: string;
  focusArea: string;
  why: string;
}

interface CoachAnalysis {
  overallAssessment: string;
  strengths: Strength[];
  weaknesses: Weakness[];
  recommendations: Recommendation[];
  nextSession: {
    suggestedTypes: string[];
    suggestedDifficulty: string;
    focus: string;
  };
  motivationalNote: string;
}

const priorityColor = {
  high: 'text-red-400 bg-red-400/10 border-red-400/20',
  medium: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  low: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
};

const typeIcon: Record<string, string> = {
  grammar: '📝',
  vocabulary: '📚',
  reading: '👁️',
  writing: '✍️',
  speaking: '🎤',
  listening: '👂',
};

export function AICoach() {
  const [analysis, setAnalysis] = useState<CoachAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [generatedAt, setGeneratedAt] = useState<string | null>(null);

  async function loadAnalysis() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/ai/coach');
      if (!res.ok) throw new Error('Failed to load analysis');
      const data = await res.json();
      setAnalysis(data.analysis);
      setGeneratedAt(data.generatedAt);
      setExpanded(true);
    } catch {
      setError('Could not generate analysis. Try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-gray-900 border border-purple-500/30 rounded-2xl overflow-hidden">
      {/* Header */}
      <button
        onClick={analysis ? () => setExpanded(!expanded) : loadAnalysis}
        className="w-full flex items-center justify-between p-5 hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
            <Brain className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-left">
            <p className="font-semibold text-white">AI Coach</p>
            <p className="text-xs text-gray-400">
              {generatedAt
                ? `Last analysed ${new Date(generatedAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}`
                : 'Personalised analysis of your performance'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {analysis && (
            <button
              onClick={(e) => { e.stopPropagation(); loadAnalysis(); }}
              className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              title="Refresh analysis"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          )}
          {loading ? (
            <Loader2 className="w-5 h-5 text-purple-400 animate-spin" />
          ) : analysis ? (
            expanded ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />
          ) : (
            <span className="text-xs text-purple-400 font-medium px-3 py-1.5 bg-purple-500/10 rounded-lg border border-purple-500/20">
              Analyse now
            </span>
          )}
        </div>
      </button>

      {/* Error */}
      {error && (
        <div className="px-5 pb-4 text-red-400 text-sm">{error}</div>
      )}

      {/* Content */}
      {analysis && expanded && (
        <div className="px-5 pb-5 space-y-5 border-t border-white/5 pt-4">

          {/* Overall Assessment */}
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
            <p className="text-sm text-gray-200 leading-relaxed">{analysis.overallAssessment}</p>
          </div>

          {/* Strengths & Weaknesses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Strengths */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-sm font-medium text-green-400">Strengths</span>
              </div>
              <div className="space-y-2">
                {analysis.strengths.map((s, i) => (
                  <div key={i} className="bg-green-400/5 border border-green-400/15 rounded-lg p-3">
                    <p className="text-xs font-medium text-green-300 capitalize mb-1">
                      {typeIcon[s.skill] || '⭐'} {s.skill}
                    </p>
                    <p className="text-xs text-gray-300">{s.insight}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Weaknesses */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-medium text-yellow-400">Focus Areas</span>
              </div>
              <div className="space-y-2">
                {analysis.weaknesses.map((w, i) => (
                  <div key={i} className={`border rounded-lg p-3 ${priorityColor[w.priority]}`}>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-medium capitalize">
                        {typeIcon[w.skill] || '🎯'} {w.skill}
                      </p>
                      <span className="text-xs opacity-70 capitalize">{w.priority}</span>
                    </div>
                    <p className="text-xs opacity-80">{w.insight}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-medium text-amber-400">Recommendations</span>
            </div>
            <div className="space-y-3">
              {analysis.recommendations.map((r, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-xl mt-0.5">{typeIcon[r.exerciseType] || '💡'}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white mb-1">{r.title}</p>
                      <p className="text-xs text-gray-300 mb-2">{r.description}</p>
                      <p className="text-xs text-purple-300 italic">{r.why}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Session */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
            <p className="text-xs font-medium text-blue-400 mb-1">Next Study Session</p>
            <p className="text-sm text-gray-200 mb-2">{analysis.nextSession.focus}</p>
            <div className="flex flex-wrap gap-2">
              {analysis.nextSession.suggestedTypes.map((t) => (
                <span key={t} className="text-xs px-2 py-1 bg-blue-500/10 border border-blue-500/20 rounded-md text-blue-300 capitalize">
                  {typeIcon[t]} {t}
                </span>
              ))}
              <span className="text-xs px-2 py-1 bg-white/5 border border-white/10 rounded-md text-gray-400 capitalize">
                {analysis.nextSession.suggestedDifficulty} difficulty
              </span>
            </div>
          </div>

          {/* Motivational Note */}
          <p className="text-xs text-center text-gray-400 italic">{analysis.motivationalNote}</p>
        </div>
      )}
    </div>
  );
}
