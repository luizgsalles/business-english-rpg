import { notFound, redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/demo';
import { db } from '@/lib/db';
import { exercises } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { ExerciseClient } from './ExerciseClient';

export default async function ExercisePage({ params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user) redirect('/auth/signin');

  const { id } = await params;

  const [exercise] = await db
    .select()
    .from(exercises)
    .where(eq(exercises.id, id))
    .limit(1);

  if (!exercise) notFound();

  return <ExerciseClient exercise={exercise} />;
}
