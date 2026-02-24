'use client';

import { useState } from 'react';
import Link from 'next/link';
import { GrammarDrill } from '@/components/exercises/GrammarDrill';
import { VocabularyFlashcards } from '@/components/exercises/VocabularyFlashcards';
import { ReadingExercise } from '@/components/exercises/ReadingExercise';
import { WritingExercise } from '@/components/exercises/WritingExercise';
import { SpeakingExercise } from '@/components/exercises/SpeakingExercise';

const TYPE_META: Record<string, { icon: string; color: string }> = {
  grammar:    { icon: '📝', color: 'from-blue-500 to-blue-600' },
  vocabulary: { icon: '📚', color: 'from-purple-500 to-purple-600' },
  listening:  { icon: '👂', color: 'from-pink-500 to-pink-600' },
  speaking:   { icon: '🎤', color: 'from-amber-500 to-amber-600' },
  reading:    { icon: '👁️', color: 'from-emerald-500 to-emerald-600' },
  writing:    { icon: '✍️', color: 'from-cyan-500 to-cyan-600' },
};

interface Exercise {
  id: string;
  type: string;
  title: string;
  description: string;
  difficulty: string;
  estimatedTimeSeconds: number;
  content: unknown;
}

interface ExerciseClientProps {
  exercise: Exercise;
}

async function recordProgress(exerciseId: string, exerciseType: string, accuracy: number, timeSpentSeconds: number, questionsTotal: number, questionsCorrect: number) {
  try {
    const res = await fetch('/api/progress/record', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ exerciseId, exerciseType, accuracy, timeSpentSeconds, questionsTotal, questionsCorrect }),
    });
    if (res.ok) return await res.json();
  } catch {
    // non-blocking
  }
  return null;
}

export function ExerciseClient({ exercise }: ExerciseClientProps) {
  const [completed, setCompleted] = useState(false);
  const [accuracy, setAccuracy] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [leveledUp, setLeveledUp] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [startTime] = useState(() => Date.now());

  const meta = TYPE_META[exercise.type] ?? TYPE_META.grammar;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const content = exercise.content as Record<string, any>;

  async function finish(correct: number, total: number) {
    const acc = total > 0 ? Math.round((correct / total) * 100) : 100;
    const time = Math.round((Date.now() - startTime) / 1000);
    setAccuracy(acc);
    setCorrectCount(correct);
    setTotalCount(total);
    setCompleted(true);

    const data = await recordProgress(exercise.id, exercise.type, acc, time, total, correct);
    if (data) {
      setXpEarned(data.xpEarned ?? 0);
      setLeveledUp(data.leveledUp ?? false);
    }
  }

  // --- Grammar / Vocabulary MCQ ---
  function handleGrammarComplete(results: { questionId: string; correct: boolean; userAnswer: string }[]) {
    const correct = results.filter(r => r.correct).length;
    finish(correct, results.length);
  }

  // --- Vocabulary Flashcards ---
  function handleFlashcardsComplete(masteredCards: string[]) {
    const cards = (content.cards as unknown[]) ?? [];
    finish(masteredCards.length, cards.length);
  }

  // --- Reading ---
  function handleReadingComplete(results: { questionId: string; correct: boolean; userAnswer: string }[]) {
    const correct = results.filter(r => r.correct).length;
    finish(correct, results.length);
  }

  // --- Writing ---
  async function handleWritingSubmit(_text: string) {
    setIsProcessing(true);
    await finish(1, 1);
    setIsProcessing(false);
  }

  // --- Speaking ---
  async function handleSpeakingSubmit(_audioBlob: Blob) {
    setIsProcessing(true);
    await finish(1, 1);
    setIsProcessing(false);
  }

  // -------------------------------------------------------------------------
  // COMPLETED SCREEN
  // -------------------------------------------------------------------------
  if (completed) {
    return (
      <div className="min-h-screen bg-gradient-mesh flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="card p-8">
            {leveledUp && (
              <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-sm font-bold px-4 py-2 rounded-full mb-4 inline-block">
                Subiu de nível! 🎉
              </div>
            )}
            <div className="text-6xl mb-4">
              {accuracy >= 80 ? '✅' : accuracy >= 60 ? '👍' : '📖'}
            </div>
            <h1 className="text-3xl font-bold mb-2">
              {accuracy >= 80 ? 'Excelente!' : accuracy >= 60 ? 'Bom trabalho!' : 'Continue praticando!'}
            </h1>
            <p className="text-gray-600 mb-6">{exercise.title}</p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-primary-50 rounded-xl p-4">
                <div className="text-2xl font-bold text-primary-600">{accuracy}%</div>
                <div className="text-sm text-gray-600">Acerto</div>
              </div>
              <div className="bg-success-50 rounded-xl p-4">
                <div className="text-2xl font-bold text-success-600">{correctCount}/{totalCount}</div>
                <div className="text-sm text-gray-600">Corretas</div>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <div className="text-2xl font-bold text-slate-600">+{xpEarned}</div>
                <div className="text-sm text-gray-600">XP</div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Link href="/exercises" className="btn-primary w-full">More Exercises</Link>
              <Link href="/dashboard" className="btn-outline w-full">Back to Dashboard</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // EXERCISE SCREEN
  // -------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-gradient-mesh">
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/exercises" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="font-medium">Back</span>
              </Link>
              <div>
                <div className="flex items-center gap-2">
                  <span className={`w-8 h-8 rounded-lg bg-gradient-to-br ${meta.color} flex items-center justify-center text-sm`}>
                    {meta.icon}
                  </span>
                  <h1 className="font-bold text-gray-900">{exercise.title}</h1>
                </div>
                <p className="text-sm text-gray-500 ml-10">{exercise.description}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 capitalize">{exercise.type} · {exercise.difficulty}</div>
              <div className="font-bold text-gradient">~{Math.round(exercise.estimatedTimeSeconds / 60)}min</div>
            </div>
          </div>
        </div>
      </header>

      <div className="container-custom py-12">
        {/* Grammar MCQ */}
        {exercise.type === 'grammar' && content.questions && (
          <GrammarDrill
            questions={content.questions as Parameters<typeof GrammarDrill>[0]['questions']}
            onComplete={handleGrammarComplete}
          />
        )}

        {/* Vocabulary — flashcards */}
        {exercise.type === 'vocabulary' && content.cards && (
          <VocabularyFlashcards
            cards={content.cards as Parameters<typeof VocabularyFlashcards>[0]['cards']}
            onComplete={handleFlashcardsComplete}
          />
        )}

        {/* Vocabulary — MCQ questions */}
        {exercise.type === 'vocabulary' && content.questions && !content.cards && (
          <GrammarDrill
            questions={content.questions as Parameters<typeof GrammarDrill>[0]['questions']}
            onComplete={handleGrammarComplete}
          />
        )}

        {/* Reading */}
        {exercise.type === 'reading' && content.passage && content.questions && (
          <ReadingExercise
            passage={content.passage as Parameters<typeof ReadingExercise>[0]['passage']}
            questions={content.questions as Parameters<typeof ReadingExercise>[0]['questions']}
            onComplete={handleReadingComplete}
          />
        )}

        {/* Writing */}
        {exercise.type === 'writing' && content.prompt && (
          <WritingExercise
            prompt={content.prompt as Parameters<typeof WritingExercise>[0]['prompt']}
            onSubmit={handleWritingSubmit}
            isLoading={isProcessing}
          />
        )}

        {/* Speaking */}
        {exercise.type === 'speaking' && content.prompt && (
          <SpeakingExercise
            prompt={content.prompt as Parameters<typeof SpeakingExercise>[0]['prompt']}
            onSubmit={handleSpeakingSubmit}
            isProcessing={isProcessing}
          />
        )}
      </div>
    </div>
  );
}
