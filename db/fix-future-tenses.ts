import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { db } from '@/lib/db';
import { exercises } from '@/db/schema';
import { eq } from 'drizzle-orm';

async function fix() {
  const [exercise] = await db
    .select()
    .from(exercises)
    .where(eq(exercises.title, 'Future Tenses in Planning'))
    .limit(1);

  if (!exercise) {
    console.log('Exercise not found');
    return;
  }

  await db.update(exercises).set({
    content: {
      questions: [
        { id: '1', sentence: 'Look at those numbers — we ___ miss our Q4 target.', options: ["We're going to", "We'll", "We're missing", "We miss"], correctAnswer: "We're going to", explanation: '"Going to" is used for predictions based on current evidence.' },
        { id: '2', sentence: '___ the client at 2 PM. It is already in my calendar.', options: ["I'm going to call", "I'll call", "I'm calling", "I call"], correctAnswer: "I'm calling", explanation: 'Present continuous is used for fixed future arrangements.' },
        { id: '3', sentence: "Don't worry, ___ take care of the invoice right now.", options: ["I'm going to", "I'll", "I'm taking", "I take"], correctAnswer: "I'll", explanation: '"Will" is used for spontaneous decisions made at the moment of speaking.' },
      ],
    },
  }).where(eq(exercises.id, exercise.id));

  console.log('✅ Fixed Future Tenses in Planning');
}

fix()
  .then(() => process.exit(0))
  .catch(e => { console.error(e); process.exit(1); });
