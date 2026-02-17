'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { GrammarDrill } from '@/components/exercises/GrammarDrill';
import Link from 'next/link';

// Mock exercise data - in production, this would come from the DB/API
const EXERCISES: Record<string, {
  id: string;
  type: string;
  title: string;
  description: string;
  difficulty: string;
  xpReward: number;
  icon: string;
  color: string;
  questions: {
    id: string;
    sentence: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  }[];
}> = {
  '1': {
    id: '1',
    type: 'grammar',
    title: 'Present Perfect Tense',
    description: 'Practice using present perfect in business context',
    difficulty: 'medium',
    xpReward: 25,
    icon: '📖',
    color: 'from-blue-500 to-blue-600',
    questions: [
      {
        id: 'q1',
        sentence: 'We ___ the quarterly report yet.',
        options: ["haven't finished", "didn't finish", "don't finish", "hasn't finished"],
        correctAnswer: "haven't finished",
        explanation: "Use 'haven't finished' for a task that was expected to be done by now but isn't complete yet. Present perfect with 'yet' is common in business communication.",
      },
      {
        id: 'q2',
        sentence: 'The client ___ our proposal since Monday.',
        options: ['has reviewed', 'reviewed', 'is reviewing', 'reviews'],
        correctAnswer: 'has reviewed',
        explanation: "Use present perfect 'has reviewed' to describe an action that happened at an unspecified time before now with current relevance.",
      },
      {
        id: 'q3',
        sentence: 'I ___ with several international clients this week.',
        options: ['have worked', 'worked', 'was working', 'work'],
        correctAnswer: 'have worked',
        explanation: "'Have worked' is correct here because 'this week' is a current, unfinished time period. Present perfect connects past action to the present.",
      },
      {
        id: 'q4',
        sentence: 'The team ___ the new software update already.',
        options: ['has implemented', 'implemented', 'had implemented', 'is implementing'],
        correctAnswer: 'has implemented',
        explanation: "Present perfect with 'already' indicates a completed action with present relevance. 'Has implemented' is correct for third-person singular.",
      },
      {
        id: 'q5',
        sentence: 'Have you ever ___ in an international negotiation?',
        options: ['participated', 'participate', 'participating', 'been participating'],
        correctAnswer: 'participated',
        explanation: "With 'ever' in questions, use past participle. 'Have you ever participated' asks about any experience up to now — a classic present perfect structure.",
      },
    ],
  },
  '2': {
    id: '2',
    type: 'vocabulary',
    title: 'Business Email Vocabulary',
    description: 'Essential vocabulary for professional emails',
    difficulty: 'easy',
    xpReward: 20,
    icon: '📚',
    color: 'from-purple-500 to-purple-600',
    questions: [
      {
        id: 'q1',
        sentence: 'I am writing to ___ the meeting scheduled for next Friday.',
        options: ['confirm', 'confine', 'conform', 'confer'],
        correctAnswer: 'confirm',
        explanation: "'Confirm' means to verify or make definite. In business emails, 'I am writing to confirm' is a standard professional opening.",
      },
      {
        id: 'q2',
        sentence: 'Please find the report ___ to this email.',
        options: ['attached', 'attached to', 'attaching', 'attachment'],
        correctAnswer: 'attached',
        explanation: "'Please find [X] attached' is the standard professional way to reference email attachments. 'Attached' is the adjective here.",
      },
      {
        id: 'q3',
        sentence: 'We would like to ___ our sincere apologies for the delay.',
        options: ['extend', 'expand', 'express', 'expose'],
        correctAnswer: 'express',
        explanation: "'Express our apologies' is the formal phrase used in business communication. 'Express' means to convey or communicate.",
      },
      {
        id: 'q4',
        sentence: 'I am looking ___ to hearing from you soon.',
        options: ['forward', 'ahead', 'for', 'after'],
        correctAnswer: 'forward',
        explanation: "'Looking forward to' is a fixed phrase meaning to anticipate something with pleasure. It's used at the end of professional emails.",
      },
      {
        id: 'q5',
        sentence: 'Please ___ me know if you have any questions.',
        options: ['let', 'make', 'do', 'have'],
        correctAnswer: 'let',
        explanation: "'Please let me know' is a polite and professional way to invite questions or responses. 'Let' here means to allow or permit.",
      },
    ],
  },
  '3': {
    id: '3',
    type: 'grammar',
    title: 'Business Meeting Conversation',
    description: 'Practice phrases used in business meetings',
    difficulty: 'hard',
    xpReward: 30,
    icon: '👂',
    color: 'from-pink-500 to-pink-600',
    questions: [
      {
        id: 'q1',
        sentence: 'Could we ___ on the main agenda item, please?',
        options: ['focus', 'focused', 'focusing', 'be focused'],
        correctAnswer: 'focus',
        explanation: "'Could we focus on...' is a polite way to redirect a meeting. After modal verbs like 'could/can/would', use the base form of the verb.",
      },
      {
        id: 'q2',
        sentence: "I'd like to ___ a point about the budget allocation.",
        options: ['make', 'do', 'raise', 'bring'],
        correctAnswer: 'raise',
        explanation: "'Raise a point' is the correct collocation for introducing a discussion topic in a meeting. You 'raise' issues, points, or concerns.",
      },
      {
        id: 'q3',
        sentence: "Let's ___ up where we left off from last week.",
        options: ['pick', 'take', 'carry', 'follow'],
        correctAnswer: 'pick',
        explanation: "'Pick up where we left off' is an idiom meaning to continue from where something stopped. It's commonly used to restart a discussion.",
      },
      {
        id: 'q4',
        sentence: 'Can we table ___ discussion for our next meeting?',
        options: ['this', 'that', 'the', 'a'],
        correctAnswer: 'this',
        explanation: "'Table this discussion' means to postpone it. In American English, 'table' means to set aside; 'this' refers to the current discussion.",
      },
      {
        id: 'q5',
        sentence: 'I move that we ___ on the proposal.',
        options: ['vote', 'voted', 'voting', 'be voted'],
        correctAnswer: 'vote',
        explanation: "'I move that we vote' is formal meeting language. 'I move that...' introduces a formal proposal. After 'that', use present tense (subjunctive).",
      },
    ],
  },
};

// Default exercise for IDs 4-8
const getExercise = (id: string) => {
  if (EXERCISES[id]) return EXERCISES[id];
  return {
    id,
    type: 'vocabulary',
    title: 'Business Vocabulary Practice',
    description: 'Essential vocabulary for professional communication',
    difficulty: 'medium',
    xpReward: 25,
    icon: '📚',
    color: 'from-purple-500 to-purple-600',
    questions: [
      {
        id: 'q1',
        sentence: 'The company decided to ___ its operations in the Asia-Pacific region.',
        options: ['expand', 'expose', 'explain', 'explore'],
        correctAnswer: 'expand',
        explanation: "'Expand operations' means to grow or extend business activities into new areas. Common business vocabulary for growth strategies.",
      },
      {
        id: 'q2',
        sentence: 'We need to ___ a new marketing strategy for Q4.',
        options: ['develop', 'discover', 'deliver', 'define'],
        correctAnswer: 'develop',
        explanation: "'Develop a strategy' means to create and refine a plan. 'Develop' is a key business verb for creating, building, or improving something.",
      },
      {
        id: 'q3',
        sentence: 'The project was completed ___ schedule.',
        options: ['ahead of', 'in front of', 'before to', 'prior for'],
        correctAnswer: 'ahead of',
        explanation: "'Ahead of schedule' means finishing earlier than planned. This is a fixed business phrase used to describe projects completed early.",
      },
    ],
  };
};

export default function ExercisePage() {
  const params = useParams();
  const exerciseId = params.id as string;
  const exercise = getExercise(exerciseId);

  const [completed, setCompleted] = useState(false);
  const [results, setResults] = useState<{ questionId: string; correct: boolean; userAnswer: string }[]>([]);
  const [xpEarned, setXpEarned] = useState(0);
  const [leveledUp, setLeveledUp] = useState(false);
  const [startTime] = useState(() => Date.now());

  const handleComplete = async (exerciseResults: { questionId: string; correct: boolean; userAnswer: string }[]) => {
    setResults(exerciseResults);
    setCompleted(true);

    const correctCount = exerciseResults.filter((r) => r.correct).length;
    const accuracy = Math.round((correctCount / exerciseResults.length) * 100);
    const timeSpentSeconds = Math.round((Date.now() - startTime) / 1000);

    try {
      const res = await fetch('/api/progress/record', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          exerciseId: exerciseId,
          exerciseType: exercise.type,
          accuracy,
          timeSpentSeconds,
          questionsTotal: exerciseResults.length,
          questionsCorrect: correctCount,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setXpEarned(data.xpEarned);
        setLeveledUp(data.leveledUp);
      }
    } catch (e) {
      // Non-blocking: don't break the UI if API fails
    }
  };

  const correctCount = results.filter((r) => r.correct).length;
  const accuracy = results.length > 0 ? Math.round((correctCount / results.length) * 100) : 0;

  if (completed) {
    return (
      <div className="min-h-screen bg-gradient-mesh flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="card p-8">
            {leveledUp && (
              <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-sm font-bold px-4 py-2 rounded-full mb-4 inline-block">
                Subiu de nível!
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
                <div className="text-2xl font-bold text-success-600">{correctCount}/{results.length}</div>
                <div className="text-sm text-gray-600">Corretas</div>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <div className="text-2xl font-bold text-slate-600">+{xpEarned}</div>
                <div className="text-sm text-gray-600">Pontos</div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Link href="/exercises" className="btn-primary w-full">
                More Exercises
              </Link>
              <Link href="/dashboard" className="btn-outline w-full">
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-mesh">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/exercises"
                className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="font-medium">Back</span>
              </Link>
              <div>
                <div className="flex items-center gap-2">
                  <span className={`w-8 h-8 rounded-lg bg-gradient-to-br ${exercise.color} flex items-center justify-center text-sm`}>
                    {exercise.icon}
                  </span>
                  <h1 className="font-bold text-gray-900">{exercise.title}</h1>
                </div>
                <p className="text-sm text-gray-500 ml-10">{exercise.description}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Reward</div>
              <div className="font-bold text-gradient">+{exercise.xpReward} XP</div>
            </div>
          </div>
        </div>
      </header>

      {/* Exercise Content */}
      <div className="container-custom py-12">
        <GrammarDrill
          questions={exercise.questions}
          onComplete={handleComplete}
        />
      </div>
    </div>
  );
}
