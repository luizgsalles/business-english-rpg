// ============================================================================
// AI-Generated Exercise Seed — Business English RPG
// ============================================================================
// 60 exercises across 5 types: grammar, vocabulary, reading, writing, speaking
// Listening excluded (requires audio files)
// ============================================================================

import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { db } from '@/lib/db';
import { exercises } from '@/db/schema';
import { nanoid } from 'nanoid';

async function seedExercises() {
  console.log('🚀 Seeding exercises...');

  const data = [

    // =========================================================================
    // GRAMMAR (12 exercises)
    // =========================================================================

    {
      id: nanoid(), type: 'grammar',
      title: 'Modal Verbs for Requests',
      description: 'Practice polite requests and suggestions in the workplace',
      difficulty: 'easy', estimatedTimeSeconds: 180,
      requiredOverallLevel: 1, isActive: true,
      content: {
        questions: [
          { id: '1', sentence: '___ you please send me the updated report by tomorrow?', options: ['Will', 'Could', 'Should', 'Shall'], correctAnswer: 'Could', explanation: '"Could you please" is the most polite form for requests in business contexts.' },
          { id: '2', sentence: 'You ___ submit the form before the deadline or your application will be rejected.', options: ['could', 'might', 'must', 'would'], correctAnswer: 'must', explanation: '"Must" expresses obligation or strong necessity.' },
          { id: '3', sentence: 'We ___ reschedule the meeting if more people are unavailable.', options: ['must', 'might', 'shall', 'will'], correctAnswer: 'might', explanation: '"Might" expresses possibility, suitable for tentative decisions.' },
        ],
      },
    },

    {
      id: nanoid(), type: 'grammar',
      title: 'Passive Voice in Reports',
      description: 'Use passive voice correctly in formal business writing',
      difficulty: 'medium', estimatedTimeSeconds: 200,
      requiredOverallLevel: 2, isActive: true,
      content: {
        questions: [
          { id: '1', sentence: 'The budget proposal ___ by the finance team last Monday.', options: ['approved', 'was approved', 'has approved', 'is approving'], correctAnswer: 'was approved', explanation: 'Passive voice (was + past participle) is used when the action is more important than the subject.' },
          { id: '2', sentence: 'The new policy ___ to all employees via email next week.', options: ['will communicate', 'will be communicated', 'is communicated', 'communicated'], correctAnswer: 'will be communicated', explanation: 'Future passive (will be + past participle) for planned announcements.' },
          { id: '3', sentence: 'Several issues ___ during the last quality review.', options: ['identified', 'were identifying', 'were identified', 'have identifying'], correctAnswer: 'were identified', explanation: 'Past passive (were + past participle) for issues found in the past.' },
        ],
      },
    },

    {
      id: nanoid(), type: 'grammar',
      title: 'Articles in Business Context',
      description: 'Master the use of a, an, and the in professional writing',
      difficulty: 'easy', estimatedTimeSeconds: 150,
      requiredOverallLevel: 1, isActive: true,
      content: {
        questions: [
          { id: '1', sentence: 'We need to hire ___ experienced project manager for this role.', options: ['a', 'an', 'the', '—'], correctAnswer: 'an', explanation: '"An" is used before words starting with a vowel sound. "Experienced" starts with a vowel sound.' },
          { id: '2', sentence: '___ CEO announced the merger at the shareholder meeting.', options: ['A', 'An', 'The', '—'], correctAnswer: 'The', explanation: '"The" is used when referring to a specific, known person or thing.' },
          { id: '3', sentence: 'She presented ___ quarterly results to the board.', options: ['a', 'an', 'the', '—'], correctAnswer: 'the', explanation: '"The" is used for specific results that both speaker and listener know about.' },
        ],
      },
    },

    {
      id: nanoid(), type: 'grammar',
      title: 'Reported Speech in Meetings',
      description: 'Report what was said in meetings using indirect speech',
      difficulty: 'hard', estimatedTimeSeconds: 240,
      requiredOverallLevel: 5, isActive: true,
      content: {
        questions: [
          { id: '1', sentence: 'The manager said that the project ___ on schedule.', options: ['is', 'was', 'will be', 'would be'], correctAnswer: 'was', explanation: 'Reported speech shifts the verb tense back (backshift). "Is" becomes "was".' },
          { id: '2', sentence: 'She told us she ___ send the report by Friday.', options: ['will', 'would', 'can', 'could'], correctAnswer: 'would', explanation: '"Will" changes to "would" in reported speech.' },
          { id: '3', sentence: 'He asked if we ___ finished the analysis.', options: ['have', 'had', 'has', 'would have'], correctAnswer: 'had', explanation: '"Have finished" becomes "had finished" in reported speech.' },
        ],
      },
    },

    {
      id: nanoid(), type: 'grammar',
      title: 'Business Prepositions',
      description: 'Use prepositions correctly in business phrases and idioms',
      difficulty: 'easy', estimatedTimeSeconds: 150,
      requiredOverallLevel: 1, isActive: true,
      content: {
        questions: [
          { id: '1', sentence: 'We are responsible ___ delivering results on time.', options: ['of', 'for', 'to', 'with'], correctAnswer: 'for', explanation: '"Responsible for" is the correct collocation in English.' },
          { id: '2', sentence: 'The meeting is ___ schedule — it starts at 3 PM as planned.', options: ['in', 'by', 'on', 'at'], correctAnswer: 'on', explanation: '"On schedule" means proceeding as planned.' },
          { id: '3', sentence: 'We need to focus ___ the core issues before expanding the scope.', options: ['at', 'in', 'on', 'to'], correctAnswer: 'on', explanation: '"Focus on" is the standard collocation.' },
        ],
      },
    },

    {
      id: nanoid(), type: 'grammar',
      title: 'Future Tenses in Planning',
      description: 'Use will, going to, and present continuous for future plans',
      difficulty: 'medium', estimatedTimeSeconds: 200,
      requiredOverallLevel: 3, isActive: true,
      content: {
        questions: [
          { id: '1', sentence: 'Look at those numbers — we ___ miss our Q4 target.', options: ["We're going to", "We'll", "We're missing", "We miss"], correctAnswer: "We're going to", explanation: '"Going to" is used for predictions based on current evidence.' },
          { id: '2', sentence: '___ the client at 2 PM. It is already in my calendar.', options: ["I'm going to call", "I'll call", "I'm calling", "I call"], correctAnswer: "I'm calling", explanation: 'Present continuous is used for fixed future arrangements.' },
          { id: '3', sentence: "Don't worry, ___ take care of the invoice right now.", options: ["I'm going to", "I'll", "I'm taking", "I take"], correctAnswer: "I'll", explanation: '"Will" is used for spontaneous decisions made at the moment of speaking.' },
        ],
      },
    },

    {
      id: nanoid(), type: 'grammar',
      title: 'Relative Clauses in Descriptions',
      description: 'Use who, which, that, and where to describe people and things',
      difficulty: 'medium', estimatedTimeSeconds: 200,
      requiredOverallLevel: 4, isActive: true,
      content: {
        questions: [
          { id: '1', sentence: 'The client ___ we met last week has confirmed the order.', options: ['who', 'which', 'where', 'what'], correctAnswer: 'who', explanation: '"Who" is used for people in relative clauses.' },
          { id: '2', sentence: 'This is the report ___ caused so much discussion in the board meeting.', options: ['who', 'which', 'where', 'whom'], correctAnswer: 'which', explanation: '"Which" is used for things in non-restrictive relative clauses.' },
          { id: '3', sentence: 'The office ___ the deal was signed is now a museum.', options: ['which', 'who', 'where', 'what'], correctAnswer: 'where', explanation: '"Where" is used for places in relative clauses.' },
        ],
      },
    },

    {
      id: nanoid(), type: 'grammar',
      title: 'Comparatives and Superlatives',
      description: 'Compare products, performance, and results in business',
      difficulty: 'easy', estimatedTimeSeconds: 150,
      requiredOverallLevel: 1, isActive: true,
      content: {
        questions: [
          { id: '1', sentence: 'This quarter\'s results are ___ than the previous one.', options: ['good', 'better', 'best', 'well'], correctAnswer: 'better', explanation: '"Better" is the comparative form of "good".' },
          { id: '2', sentence: 'This is ___ deal we have closed in five years.', options: ['bigger', 'the bigger', 'the biggest', 'most big'], correctAnswer: 'the biggest', explanation: 'Superlatives use "the" + adjective + "-est" (for short adjectives).' },
          { id: '3', sentence: 'Our new software is ___ efficient than the legacy system.', options: ['more', 'most', 'much', 'very'], correctAnswer: 'more', explanation: '"More" is used before long adjectives to form comparatives.' },
        ],
      },
    },

    {
      id: nanoid(), type: 'grammar',
      title: 'Question Tags in Conversation',
      description: 'Use question tags to confirm information in business conversations',
      difficulty: 'medium', estimatedTimeSeconds: 180,
      requiredOverallLevel: 3, isActive: true,
      content: {
        questions: [
          { id: '1', sentence: 'The proposal is due tomorrow, ___?', options: ["isn't it", "is it", "doesn't it", "wasn't it"], correctAnswer: "isn't it", explanation: 'Positive statement takes a negative tag: "is" → "isn\'t it".' },
          { id: '2', sentence: 'You haven\'t submitted the report yet, ___?', options: ["haven't you", "have you", "do you", "did you"], correctAnswer: "have you", explanation: 'Negative statement takes a positive tag: "haven\'t" → "have you".' },
          { id: '3', sentence: 'They cancelled the contract, ___?', options: ["didn't they", "don't they", "haven't they", "weren't they"], correctAnswer: "didn't they", explanation: 'Past simple statement takes "didn\'t" + subject as tag.' },
        ],
      },
    },

    {
      id: nanoid(), type: 'grammar',
      title: 'Gerunds vs Infinitives',
      description: 'Choose correctly between gerund (-ing) and infinitive (to) forms',
      difficulty: 'hard', estimatedTimeSeconds: 220,
      requiredOverallLevel: 6, isActive: true,
      content: {
        questions: [
          { id: '1', sentence: 'We decided ___ the supplier contract for another year.', options: ['renewing', 'to renew', 'renew', 'renewed'], correctAnswer: 'to renew', explanation: '"Decide" is followed by an infinitive (to + verb).' },
          { id: '2', sentence: 'I suggest ___ the meeting to next Thursday.', options: ['to postpone', 'postpone', 'postponing', 'postponed'], correctAnswer: 'postponing', explanation: '"Suggest" is followed by a gerund (-ing form).' },
          { id: '3', sentence: 'The team finished ___ the prototype ahead of schedule.', options: ['to build', 'building', 'build', 'built'], correctAnswer: 'building', explanation: '"Finish" is followed by a gerund (-ing form).' },
        ],
      },
    },

    {
      id: nanoid(), type: 'grammar',
      title: 'Connectors and Transitions',
      description: 'Link ideas coherently using discourse markers in formal writing',
      difficulty: 'medium', estimatedTimeSeconds: 200,
      requiredOverallLevel: 3, isActive: true,
      content: {
        questions: [
          { id: '1', sentence: 'Sales increased by 20%. ___, our costs also rose significantly.', options: ['Therefore', 'However', 'Moreover', 'Thus'], correctAnswer: 'However', explanation: '"However" introduces a contrasting idea.' },
          { id: '2', sentence: 'The product has strong market demand. ___, we should accelerate production.', options: ['However', 'Although', 'Therefore', 'Despite'], correctAnswer: 'Therefore', explanation: '"Therefore" introduces a conclusion or result.' },
          { id: '3', sentence: '___ the delays, the project was delivered within budget.', options: ['Despite', 'However', 'Therefore', 'Moreover'], correctAnswer: 'Despite', explanation: '"Despite" is followed by a noun phrase to show contrast.' },
        ],
      },
    },

    {
      id: nanoid(), type: 'grammar',
      title: 'Third Conditional — Past Hypotheticals',
      description: 'Reflect on past business decisions using third conditional',
      difficulty: 'hard', estimatedTimeSeconds: 240,
      requiredOverallLevel: 7, isActive: true,
      content: {
        questions: [
          { id: '1', sentence: 'If we ___ the contract earlier, we would have avoided the penalty.', options: ['sign', 'signed', 'had signed', 'would sign'], correctAnswer: 'had signed', explanation: 'Third conditional: "If + had + past participle" for unreal past conditions.' },
          { id: '2', sentence: 'We would have met the deadline if the team ___ more resources.', options: ['has', 'had', 'had had', 'would have'], correctAnswer: 'had had', explanation: '"Had had" is the past perfect of "have" — correct for third conditional.' },
          { id: '3', sentence: 'If the CEO ___ the trend earlier, the company might have pivoted in time.', options: ['sees', 'saw', 'has seen', 'had seen'], correctAnswer: 'had seen', explanation: 'Third conditional always uses past perfect in the if-clause.' },
        ],
      },
    },

    // =========================================================================
    // VOCABULARY (12 exercises)
    // =========================================================================

    {
      id: nanoid(), type: 'vocabulary',
      title: 'Meeting Vocabulary',
      description: 'Key words and phrases used in business meetings',
      difficulty: 'easy', estimatedTimeSeconds: 300,
      requiredOverallLevel: 1, isActive: true,
      content: {
        cards: [
          { id: '1', word: 'Agenda', definition: 'A list of items to be discussed in a meeting', example: 'Please review the agenda before the meeting starts.', businessContext: 'Sent in advance to participants so they can prepare.' },
          { id: '2', word: 'Minutes', definition: 'The official written record of what was discussed and decided in a meeting', example: 'Can you take the minutes today?', businessContext: 'Distributed after the meeting to confirm decisions.' },
          { id: '3', word: 'Action item', definition: 'A specific task assigned to someone after a meeting', example: 'Let\'s list the action items before we close.', businessContext: 'Ensures accountability and follow-through on decisions.' },
          { id: '4', word: 'Quorum', definition: 'The minimum number of members required to conduct a meeting', example: 'We don\'t have a quorum yet — let\'s wait five minutes.', businessContext: 'Important for formal board or committee meetings.' },
        ],
      },
    },

    {
      id: nanoid(), type: 'vocabulary',
      title: 'Negotiation Language',
      description: 'Expressions and vocabulary used in business negotiations',
      difficulty: 'medium', estimatedTimeSeconds: 300,
      requiredOverallLevel: 3, isActive: true,
      content: {
        cards: [
          { id: '1', word: 'Counteroffer', definition: 'A response to an offer that proposes different terms', example: 'We received their offer and sent a counteroffer reducing the price by 10%.', businessContext: 'Used in contract and salary negotiations.' },
          { id: '2', word: 'Bottom line', definition: 'The minimum acceptable terms; the final profit or loss figure', example: 'Our bottom line is a 15% discount — we can\'t go lower.', businessContext: 'Common in price negotiations to indicate limits.' },
          { id: '3', word: 'Win-win', definition: 'An outcome that benefits all parties involved', example: 'We reached a win-win agreement that works for both sides.', businessContext: 'Describes the ideal outcome of collaborative negotiation.' },
          { id: '4', word: 'Leverage', definition: 'Power or advantage used to achieve a goal in a negotiation', example: 'Our strong Q3 numbers give us leverage in the acquisition talks.', businessContext: 'Used to describe strategic advantages at the negotiating table.' },
        ],
      },
    },

    {
      id: nanoid(), type: 'vocabulary',
      title: 'Finance and Numbers',
      description: 'Essential vocabulary for discussing financial results',
      difficulty: 'medium', estimatedTimeSeconds: 300,
      requiredOverallLevel: 4, isActive: true,
      content: {
        cards: [
          { id: '1', word: 'Revenue', definition: 'Total income generated by a business before expenses', example: 'Our revenue grew by 25% year over year.', businessContext: 'Distinguished from profit, which is revenue minus expenses.' },
          { id: '2', word: 'Forecast', definition: 'An estimate of future financial performance', example: 'The Q4 forecast projects a 12% increase in sales.', businessContext: 'Used in planning meetings and investor communications.' },
          { id: '3', word: 'Break-even', definition: 'The point at which revenue equals costs — no profit, no loss', example: 'We expect to break even by the end of Q2.', businessContext: 'Critical milestone for new products and ventures.' },
          { id: '4', word: 'ROI', definition: 'Return on Investment — a measure of profitability relative to cost', example: 'The marketing campaign had an ROI of 300%.', businessContext: 'Used to justify investments and evaluate performance.' },
        ],
      },
    },

    {
      id: nanoid(), type: 'vocabulary',
      title: 'HR and Recruitment Terms',
      description: 'Vocabulary for human resources and hiring processes',
      difficulty: 'easy', estimatedTimeSeconds: 280,
      requiredOverallLevel: 1, isActive: true,
      content: {
        cards: [
          { id: '1', word: 'Onboarding', definition: 'The process of integrating a new employee into the company', example: 'Your onboarding program starts Monday and lasts two weeks.', businessContext: 'Covers orientation, training, and cultural integration.' },
          { id: '2', word: 'Turnover', definition: 'The rate at which employees leave and are replaced', example: 'High turnover is costing us significant recruitment expenses.', businessContext: 'A key HR metric used to measure workforce stability.' },
          { id: '3', word: 'Headcount', definition: 'The total number of employees in an organisation', example: 'We\'re planning to grow our headcount by 20% next year.', businessContext: 'Used in budget planning and workforce discussions.' },
          { id: '4', word: 'KPI', definition: 'Key Performance Indicator — a measurable goal used to evaluate success', example: 'Customer satisfaction score is one of our main KPIs.', businessContext: 'Used across all departments to track performance against targets.' },
        ],
      },
    },

    {
      id: nanoid(), type: 'vocabulary',
      title: 'Sales and Client Management',
      description: 'Vocabulary used in sales cycles and client relationships',
      difficulty: 'medium', estimatedTimeSeconds: 300,
      requiredOverallLevel: 3, isActive: true,
      content: {
        cards: [
          { id: '1', word: 'Pipeline', definition: 'The set of potential deals or clients at various stages of the sales process', example: 'We have $2M in our pipeline for this quarter.', businessContext: 'Used in CRM tools and sales forecasting.' },
          { id: '2', word: 'Churn', definition: 'The rate at which customers stop doing business with a company', example: 'We need to reduce churn by improving our customer success team.', businessContext: 'Critical metric in subscription-based businesses.' },
          { id: '3', word: 'Upsell', definition: 'Encouraging a customer to purchase a more expensive or upgraded product', example: 'We upsold 30% of our basic plan customers to the premium tier.', businessContext: 'A core revenue growth strategy in SaaS and retail.' },
          { id: '4', word: 'Lead', definition: 'A potential customer who has shown interest in your product or service', example: 'Marketing generated 200 new leads last month.', businessContext: 'Leads move through the pipeline from prospect to client.' },
        ],
      },
    },

    {
      id: nanoid(), type: 'vocabulary',
      title: 'Presentation Vocabulary',
      description: 'Language for delivering and structuring effective presentations',
      difficulty: 'medium', estimatedTimeSeconds: 300,
      requiredOverallLevel: 4, isActive: true,
      content: {
        cards: [
          { id: '1', word: 'Takeaway', definition: 'The main point or lesson the audience should remember', example: 'The key takeaway from this presentation is that we need to act now.', businessContext: 'Often used at the end of a presentation to summarise.' },
          { id: '2', word: 'Transition', definition: 'A phrase or word used to move from one section to another', example: 'Moving on to our next point — let\'s look at the data.', businessContext: 'Helps the audience follow the structure of your talk.' },
          { id: '3', word: 'Benchmark', definition: 'A standard or point of reference used for comparison', example: 'Our NPS score is well above the industry benchmark.', businessContext: 'Used to contextualise data and performance claims.' },
          { id: '4', word: 'Drill down', definition: 'To examine details more closely', example: 'Let me drill down into these numbers on the next slide.', businessContext: 'Common idiom in data-heavy business presentations.' },
        ],
      },
    },

    {
      id: nanoid(), type: 'vocabulary',
      title: 'Email Phrases and Openers',
      description: 'Professional phrases for starting and ending business emails',
      difficulty: 'easy', estimatedTimeSeconds: 250,
      requiredOverallLevel: 1, isActive: true,
      content: {
        cards: [
          { id: '1', word: 'I hope this email finds you well', definition: 'A polite greeting used to open a business email', example: 'I hope this email finds you well. I am writing to discuss...', businessContext: 'Standard professional opener, especially for first contact.' },
          { id: '2', word: 'Please find attached', definition: 'A phrase used to indicate that a file is included with the email', example: 'Please find attached the signed contract for your review.', businessContext: 'Used when sending documents, reports, or other files.' },
          { id: '3', word: 'As per our conversation', definition: 'Refers to what was discussed in a previous meeting or call', example: 'As per our conversation, I am sending you the updated proposal.', businessContext: 'Links the email to a prior interaction.' },
          { id: '4', word: 'Looking forward to hearing from you', definition: 'A polite closing that expects a reply', example: 'Looking forward to hearing from you at your earliest convenience.', businessContext: 'Standard formal closing for emails requiring a response.' },
        ],
      },
    },

    {
      id: nanoid(), type: 'vocabulary',
      title: 'Project Management Terms',
      description: 'Core vocabulary for managing projects and timelines',
      difficulty: 'medium', estimatedTimeSeconds: 300,
      requiredOverallLevel: 3, isActive: true,
      content: {
        cards: [
          { id: '1', word: 'Milestone', definition: 'A significant event or achievement in a project timeline', example: 'Completing the beta launch is a major milestone for the team.', businessContext: 'Used in project planning to mark key checkpoints.' },
          { id: '2', word: 'Scope creep', definition: 'The gradual expansion of a project beyond its original objectives', example: 'We need to control scope creep before it delays the launch.', businessContext: 'A common risk in software and consulting projects.' },
          { id: '3', word: 'Stakeholder', definition: 'Anyone with an interest or concern in a project or business', example: 'We need to align all stakeholders before making the final decision.', businessContext: 'Includes clients, employees, investors, and partners.' },
          { id: '4', word: 'Deliverable', definition: 'A specific output or result that must be completed as part of a project', example: 'The main deliverable for this sprint is the working prototype.', businessContext: 'Defines what the team must produce by a given deadline.' },
        ],
      },
    },

    {
      id: nanoid(), type: 'vocabulary',
      title: 'Negotiation MCQ — Advanced',
      description: 'Choose the right negotiation term in context',
      difficulty: 'hard', estimatedTimeSeconds: 200,
      requiredOverallLevel: 6, isActive: true,
      content: {
        questions: [
          { id: '1', sentence: 'Both parties agreed on a ___ — each side gave up something to reach a deal.', options: ['concession', 'leverage', 'counteroffer', 'benchmark'], correctAnswer: 'concession', explanation: 'A concession is something you give up in a negotiation to reach agreement.' },
          { id: '2', sentence: 'We have ___ in this negotiation because they need our technology exclusively.', options: ['a quorum', 'leverage', 'an agenda', 'churn'], correctAnswer: 'leverage', explanation: 'Leverage means having a strategic advantage in a negotiation.' },
          { id: '3', sentence: 'The deal has a ___ clause — if conditions change, either party can exit without penalty.', options: ['scope creep', 'break-even', 'walk-away', 'counteroffer'], correctAnswer: 'walk-away', explanation: 'A walk-away clause allows exit from a deal under defined conditions.' },
        ],
      },
    },

    {
      id: nanoid(), type: 'vocabulary',
      title: 'Strategy and Growth Terms',
      description: 'High-level business strategy vocabulary',
      difficulty: 'hard', estimatedTimeSeconds: 300,
      requiredOverallLevel: 7, isActive: true,
      content: {
        cards: [
          { id: '1', word: 'Pivot', definition: 'A significant change in business strategy or product direction', example: 'After losing key clients, we pivoted from B2C to B2B.', businessContext: 'Common in startup culture when the original model isn\'t working.' },
          { id: '2', word: 'Scalability', definition: 'The ability of a business to grow efficiently without proportional cost increase', example: 'Our SaaS model has strong scalability — we can add 1,000 users at low cost.', businessContext: 'Key factor in investor decisions and long-term planning.' },
          { id: '3', word: 'Synergy', definition: 'The combined value of two entities working together exceeding their individual values', example: 'The merger created synergies that reduced costs by 15%.', businessContext: 'Frequently used in mergers, acquisitions, and partnerships.' },
          { id: '4', word: 'Disruptive', definition: 'Describing innovation that fundamentally changes an industry', example: 'Their disruptive pricing model forced competitors to lower prices.', businessContext: 'Often used to describe startups challenging established industries.' },
        ],
      },
    },

    {
      id: nanoid(), type: 'vocabulary',
      title: 'Workplace Communication',
      description: 'Common expressions for day-to-day professional communication',
      difficulty: 'easy', estimatedTimeSeconds: 250,
      requiredOverallLevel: 1, isActive: true,
      content: {
        cards: [
          { id: '1', word: 'Touch base', definition: 'To make brief contact to check in or share updates', example: 'Let\'s touch base tomorrow to review the numbers.', businessContext: 'Casual but professional; used for informal check-ins.' },
          { id: '2', word: 'Circle back', definition: 'To return to a topic or person later', example: 'I don\'t have the data now — can we circle back on this after lunch?', businessContext: 'Used when a topic needs to be revisited.' },
          { id: '3', word: 'Get the ball rolling', definition: 'To start a process or project', example: 'Let\'s get the ball rolling on the new campaign today.', businessContext: 'Idiom used to initiate action.' },
          { id: '4', word: 'On the same page', definition: 'Having the same understanding or agreement about something', example: 'Before we start, I want to make sure we\'re all on the same page.', businessContext: 'Used to confirm shared understanding before proceeding.' },
        ],
      },
    },

    {
      id: nanoid(), type: 'vocabulary',
      title: 'Data and Analytics Language',
      description: 'Vocabulary for discussing data, metrics, and analysis',
      difficulty: 'medium', estimatedTimeSeconds: 280,
      requiredOverallLevel: 4, isActive: true,
      content: {
        cards: [
          { id: '1', word: 'Baseline', definition: 'The initial measurement used for comparison over time', example: 'Our baseline conversion rate was 2%; it\'s now 4.5%.', businessContext: 'Used in A/B testing, analytics, and performance tracking.' },
          { id: '2', word: 'Cohort', definition: 'A group of users or customers who share a common characteristic over a time period', example: 'The January cohort had 30% better retention than the previous month.', businessContext: 'Used in product analytics and subscription businesses.' },
          { id: '3', word: 'Granular', definition: 'Detailed and specific, broken down into small components', example: 'The report gives us granular data on user behaviour by region.', businessContext: 'Contrasts with "high-level" — used when detail matters.' },
          { id: '4', word: 'Outlier', definition: 'A data point that differs significantly from others', example: 'That spike in sales was an outlier caused by a one-time promotion.', businessContext: 'Important to identify outliers before drawing conclusions.' },
        ],
      },
    },

    // =========================================================================
    // READING (12 exercises)
    // =========================================================================

    {
      id: nanoid(), type: 'reading',
      title: 'Client Follow-Up Email',
      description: 'Read and comprehend a professional follow-up email',
      difficulty: 'easy', estimatedTimeSeconds: 240,
      requiredOverallLevel: 1, isActive: true,
      content: {
        passage: {
          title: 'Follow-Up After Sales Meeting',
          type: 'email',
          wordCount: 120,
          content: `Subject: Follow-Up — Product Demo | Acme Corp

Dear Ms. Johnson,

Thank you for taking the time to meet with us yesterday. It was a pleasure discussing how our platform can support Acme Corp's expansion goals.

As discussed, I am attaching our pricing proposal along with the case study from a similar client in your industry. The key points we covered were:

1. Reducing operational costs by up to 30%
2. Integration with your existing CRM within 2 weeks
3. Dedicated onboarding support for your team

I would love to schedule a follow-up call early next week to address any questions. Would Tuesday at 10 AM or Wednesday at 2 PM work for you?

Best regards,
Daniel Carter
Senior Account Executive`,
        },
        questions: [
          { id: '1', question: 'What is the main purpose of this email?', type: 'multiple-choice', options: ['To cancel a meeting', 'To follow up after a sales demo and propose next steps', 'To send a complaint', 'To introduce a new product'], correctAnswer: 'To follow up after a sales demo and propose next steps', explanation: 'The email references "yesterday\'s" meeting and proposes a follow-up call.' },
          { id: '2', question: 'What is attached to the email?', type: 'multiple-choice', options: ['A contract', 'A pricing proposal and case study', 'A meeting agenda', 'A product brochure'], correctAnswer: 'A pricing proposal and case study', explanation: '"I am attaching our pricing proposal along with the case study" — both documents are attached.' },
          { id: '3', question: 'True or False: Integration takes more than a month.', type: 'true-false', options: ['True', 'False'], correctAnswer: 'False', explanation: 'The email states integration takes "within 2 weeks".' },
        ],
      },
    },

    {
      id: nanoid(), type: 'reading',
      title: 'Internal Memo — Policy Update',
      description: 'Understand a formal internal memo announcing a policy change',
      difficulty: 'easy', estimatedTimeSeconds: 250,
      requiredOverallLevel: 1, isActive: true,
      content: {
        passage: {
          title: 'Remote Work Policy Update',
          type: 'memo',
          wordCount: 130,
          content: `MEMORANDUM

TO: All Employees
FROM: People & Culture Team
DATE: February 20, 2026
RE: Updated Remote Work Policy

Effective March 1, 2026, all employees are required to be present in the office a minimum of three days per week. This replaces the previous policy of two days per week.

The change reflects our commitment to collaboration and team culture. Managers retain the flexibility to approve exceptions for individual circumstances on a case-by-case basis.

Employees who require accommodations should speak with their line manager before February 28. All requests will be reviewed within five business days.

Attendance will be tracked via the building access system starting March 1. For questions, contact hr@company.com.`,
        },
        questions: [
          { id: '1', question: 'How many days per week must employees now be in the office?', type: 'multiple-choice', options: ['Two', 'Three', 'Four', 'Five'], correctAnswer: 'Three', explanation: 'The memo states "a minimum of three days per week".' },
          { id: '2', question: 'What is the deadline to request an accommodation?', type: 'multiple-choice', options: ['March 1', 'February 20', 'February 28', 'March 15'], correctAnswer: 'February 28', explanation: '"Employees who require accommodations should speak with their line manager before February 28."' },
          { id: '3', question: 'True or False: Exceptions to the policy are completely prohibited.', type: 'true-false', options: ['True', 'False'], correctAnswer: 'False', explanation: '"Managers retain the flexibility to approve exceptions for individual circumstances."' },
        ],
      },
    },

    {
      id: nanoid(), type: 'reading',
      title: 'Q3 Earnings Summary',
      description: 'Read and analyse a business financial summary',
      difficulty: 'medium', estimatedTimeSeconds: 320,
      requiredOverallLevel: 4, isActive: true,
      content: {
        passage: {
          title: 'Q3 2025 Financial Results',
          type: 'report',
          wordCount: 160,
          content: `Q3 2025 Financial Highlights — Nexora Technologies

Nexora Technologies reported strong third-quarter results, with total revenue reaching $48.2 million, a 22% increase year over year. Recurring subscription revenue accounted for 74% of total revenue, up from 68% in Q3 2024.

Operating expenses grew by 14%, driven primarily by increased R&D investment and headcount additions in the sales division. As a result, operating margin improved to 18.4%, compared to 15.9% in the same period last year.

Customer metrics also performed well. The company added 1,200 new enterprise clients during the quarter, bringing the total to 8,750. Net Revenue Retention (NRR) stood at 118%, indicating strong expansion revenue from existing customers.

Looking ahead, management raised its full-year revenue guidance to $185–190 million, citing strong pipeline visibility and anticipated contract renewals in Q4.`,
        },
        questions: [
          { id: '1', question: 'What percentage of revenue came from subscriptions in Q3 2025?', type: 'multiple-choice', options: ['68%', '74%', '22%', '18.4%'], correctAnswer: '74%', explanation: '"Recurring subscription revenue accounted for 74% of total revenue."' },
          { id: '2', question: 'What does an NRR of 118% indicate?', type: 'multiple-choice', options: ['Customers are churning rapidly', 'Existing customers are spending more over time', 'New customer acquisition is declining', 'Operating costs are rising'], correctAnswer: 'Existing customers are spending more over time', explanation: 'NRR above 100% means existing customers expanded their spending, offsetting churn.' },
          { id: '3', question: 'True or False: Operating expenses grew faster than revenue.', type: 'true-false', options: ['True', 'False'], correctAnswer: 'False', explanation: 'Revenue grew 22% while operating expenses grew 14% — revenue grew faster.' },
        ],
      },
    },

    {
      id: nanoid(), type: 'reading',
      title: 'Meeting Minutes',
      description: 'Read and extract key information from meeting minutes',
      difficulty: 'easy', estimatedTimeSeconds: 260,
      requiredOverallLevel: 2, isActive: true,
      content: {
        passage: {
          title: 'Product Team — Sprint Review Minutes',
          type: 'memo',
          wordCount: 140,
          content: `Meeting: Sprint 14 Review
Date: February 18, 2026 | Time: 2:00 PM
Attendees: Sarah (PM), James (Tech Lead), Ana (Design), Paulo (QA)

COMPLETED THIS SPRINT:
- User authentication module (James)
- New onboarding flow wireframes (Ana)
- Performance testing completed for checkout flow (Paulo)

IN PROGRESS:
- Dashboard redesign — 70% complete (Ana)
- API integration with payment provider (James) — blocked pending vendor credentials

ACTION ITEMS:
1. Sarah to follow up with vendor for API credentials by Feb 20
2. Paulo to write regression tests for auth module by Feb 22
3. Ana to present final dashboard mockups at next sprint review

NEXT SPRINT PLANNING: February 25, 2026 at 10:00 AM`,
        },
        questions: [
          { id: '1', question: 'What is blocking the API integration?', type: 'multiple-choice', options: ['Lack of developer resources', 'Pending vendor credentials', 'Budget approval', 'Design mockups not ready'], correctAnswer: 'Pending vendor credentials', explanation: '"API integration with payment provider — blocked pending vendor credentials."' },
          { id: '2', question: 'Who is responsible for following up with the vendor?', type: 'multiple-choice', options: ['James', 'Ana', 'Sarah', 'Paulo'], correctAnswer: 'Sarah', explanation: '"Sarah to follow up with vendor for API credentials by Feb 20."' },
          { id: '3', question: 'How complete is the dashboard redesign?', type: 'multiple-choice', options: ['50%', '60%', '70%', '100%'], correctAnswer: '70%', explanation: '"Dashboard redesign — 70% complete (Ana)."' },
        ],
      },
    },

    {
      id: nanoid(), type: 'reading',
      title: 'Business Article — Remote Leadership',
      description: 'Read an article and answer comprehension questions',
      difficulty: 'medium', estimatedTimeSeconds: 340,
      requiredOverallLevel: 5, isActive: true,
      content: {
        passage: {
          title: 'Leading Remote Teams in 2026',
          type: 'article',
          wordCount: 175,
          content: `The shift to hybrid and remote work has fundamentally changed what it means to lead a team. Managers who once relied on in-person observation now need to develop new skills: intentional communication, asynchronous collaboration, and outcome-based performance management.

Research from McKinsey (2025) found that remote-first companies with strong documentation culture outperformed hybrid organisations by 18% on employee productivity metrics. The key differentiator was not the location of work, but the quality of written communication.

High-performing remote managers share several habits. They over-communicate — using written updates to keep teams aligned across time zones. They create psychological safety by establishing clear norms for availability and response times. And they measure performance by deliverables and outcomes, not activity or hours logged.

However, remote leadership is not without risk. Isolation, miscommunication, and difficulty building trust are real challenges, particularly for new employees. Organisations that invest in structured onboarding and regular in-person gatherings tend to mitigate these risks most effectively.

The conclusion is clear: remote work succeeds not by accident, but by design.`,
        },
        questions: [
          { id: '1', question: 'According to McKinsey, what was the key differentiator between remote-first and hybrid companies?', type: 'multiple-choice', options: ['Number of remote days', 'Quality of written communication', 'Salary levels', 'Office location'], correctAnswer: 'Quality of written communication', explanation: '"The key differentiator was not the location of work, but the quality of written communication."' },
          { id: '2', question: 'Which group is most vulnerable to isolation in remote settings?', type: 'multiple-choice', options: ['Senior executives', 'New employees', 'Sales teams', 'Part-time workers'], correctAnswer: 'New employees', explanation: '"Particularly for new employees" — stated explicitly in the article.' },
          { id: '3', question: 'True or False: Remote work success is primarily about technology tools.', type: 'true-false', options: ['True', 'False'], correctAnswer: 'False', explanation: 'The article emphasises communication quality, habits, and design — not technology.' },
        ],
      },
    },

    {
      id: nanoid(), type: 'reading',
      title: 'Job Offer Letter',
      description: 'Comprehend the key terms of a formal job offer',
      difficulty: 'medium', estimatedTimeSeconds: 300,
      requiredOverallLevel: 3, isActive: true,
      content: {
        passage: {
          title: 'Offer Letter — Senior Marketing Manager',
          type: 'email',
          wordCount: 155,
          content: `Dear Mr. Almeida,

We are delighted to offer you the position of Senior Marketing Manager at Brightfield Group, effective March 3, 2026.

COMPENSATION AND BENEFITS:
- Base Salary: R$18,500/month
- Annual Performance Bonus: up to 20% of base salary
- Health Insurance: Premium plan for employee and dependants
- Remote Work: 2 days per week from home
- Annual Leave: 22 business days per year

EMPLOYMENT CONDITIONS:
- Probationary Period: 90 days
- Notice Period: 30 days (after probation)
- Non-Compete Clause: 12 months post-employment within the marketing industry

This offer is conditional on satisfactory reference checks and background verification. Please sign and return this letter by February 27, 2026.

We look forward to welcoming you to the team.

Sincerely,
Helena Souza
Head of People & Culture`,
        },
        questions: [
          { id: '1', question: 'What is the maximum annual bonus the candidate can receive?', type: 'multiple-choice', options: ['10% of base salary', '15% of base salary', '20% of base salary', 'R$18,500'], correctAnswer: '20% of base salary', explanation: '"Annual Performance Bonus: up to 20% of base salary."' },
          { id: '2', question: 'For how long does the non-compete clause apply after leaving the company?', type: 'multiple-choice', options: ['6 months', '12 months', '24 months', '90 days'], correctAnswer: '12 months', explanation: '"Non-Compete Clause: 12 months post-employment."' },
          { id: '3', question: 'True or False: The offer is unconditional and does not require any verification.', type: 'true-false', options: ['True', 'False'], correctAnswer: 'False', explanation: '"This offer is conditional on satisfactory reference checks and background verification."' },
        ],
      },
    },

    {
      id: nanoid(), type: 'reading',
      title: 'Supplier Complaint Email',
      description: 'Read a formal complaint email and identify key information',
      difficulty: 'medium', estimatedTimeSeconds: 280,
      requiredOverallLevel: 3, isActive: true,
      content: {
        passage: {
          title: 'Complaint Regarding Late Delivery',
          type: 'email',
          wordCount: 135,
          content: `Subject: Formal Complaint — Order #45892 | Delayed Delivery

Dear Supplier Relations Team,

I am writing to formally raise a complaint regarding Order #45892, placed on January 15, 2026, with a confirmed delivery date of February 1, 2026.

As of today, February 18, we have not received the shipment. This 17-day delay has caused significant disruption to our production schedule, resulting in an estimated cost impact of R$45,000.

We have contacted your logistics team on three separate occasions (February 5, 10, and 15) without resolution. This level of service is not consistent with the terms of our supply agreement, which stipulates a maximum delay of 5 business days.

We request the following:
1. Immediate delivery confirmation with a new guaranteed date
2. A written explanation of the root cause
3. A credit note for R$10,000 to offset the impact

If we do not receive a response within 48 hours, we will escalate this matter to senior management.

Regards,
Operations Team — Ferreira Industries`,
        },
        questions: [
          { id: '1', question: 'How many days late is the delivery as of the email date?', type: 'multiple-choice', options: ['5 days', '10 days', '17 days', '30 days'], correctAnswer: '17 days', explanation: 'Delivery was due February 1; the email is dated February 18 — 17 days late.' },
          { id: '2', question: 'What is the financial impact claimed by the sender?', type: 'multiple-choice', options: ['R$10,000', 'R$45,000', 'R$45,892', 'Not mentioned'], correctAnswer: 'R$45,000', explanation: '"...resulting in an estimated cost impact of R$45,000."' },
          { id: '3', question: 'True or False: The company is requesting a full refund.', type: 'true-false', options: ['True', 'False'], correctAnswer: 'False', explanation: 'They requested a credit note for R$10,000 — not a full refund.' },
        ],
      },
    },

    {
      id: nanoid(), type: 'reading',
      title: 'Executive Summary — Market Entry',
      description: 'Read and comprehend a strategic executive summary',
      difficulty: 'hard', estimatedTimeSeconds: 360,
      requiredOverallLevel: 7, isActive: true,
      content: {
        passage: {
          title: 'Executive Summary: Brazil Market Entry Strategy',
          type: 'report',
          wordCount: 200,
          content: `This report evaluates the feasibility and strategic rationale for entering the Brazilian market in 2026.

MARKET OPPORTUNITY
Brazil represents the largest economy in Latin America, with a GDP of approximately $2.1 trillion. The B2B SaaS sector is projected to grow at 19% CAGR through 2028, driven by digital transformation initiatives across mid-sized enterprises. Our target segment — HR technology buyers in companies with 200–1,000 employees — represents a total addressable market (TAM) of $780 million.

KEY RISKS
1. Regulatory complexity: Brazil's labour law and data protection regulations (LGPD) require local legal counsel and product adaptation.
2. Currency exposure: BRL volatility may impact revenue predictability for USD-denominated contracts.
3. Competition: Local incumbents hold approximately 45% of the market, with strong brand loyalty.

RECOMMENDATION
We recommend a phased market entry beginning with São Paulo in Q3 2026, prioritising partnerships with local HR consulting firms as the primary go-to-market channel. Initial investment required: $2.4 million over 18 months, with break-even projected at month 22.

Subject to board approval, a pilot programme should commence by June 2026.`,
        },
        questions: [
          { id: '1', question: 'What is the projected CAGR for the B2B SaaS sector in Brazil?', type: 'multiple-choice', options: ['9%', '12%', '19%', '45%'], correctAnswer: '19%', explanation: '"The B2B SaaS sector is projected to grow at 19% CAGR through 2028."' },
          { id: '2', question: 'What is the recommended primary go-to-market channel?', type: 'multiple-choice', options: ['Direct sales team', 'Online advertising', 'Partnerships with local HR consulting firms', 'Acquisition of a local competitor'], correctAnswer: 'Partnerships with local HR consulting firms', explanation: '"...prioritising partnerships with local HR consulting firms as the primary go-to-market channel."' },
          { id: '3', question: 'True or False: The report recommends entering multiple Brazilian cities simultaneously.', type: 'true-false', options: ['True', 'False'], correctAnswer: 'False', explanation: '"We recommend a phased market entry beginning with São Paulo in Q3 2026."' },
        ],
      },
    },

    // =========================================================================
    // WRITING (12 exercises)
    // =========================================================================

    {
      id: nanoid(), type: 'writing',
      title: 'Follow-Up After Interview',
      description: 'Write a professional thank-you email after a job interview',
      difficulty: 'easy', estimatedTimeSeconds: 600,
      requiredOverallLevel: 1, isActive: true,
      content: {
        prompt: {
          id: 'w1',
          title: 'Post-Interview Thank You Email',
          scenario: 'You just interviewed for a Marketing Manager position at TechCorp. The interviewer was Ana Lima, Head of Marketing. The interview went well and you discussed a campaign strategy idea that excited her. Write a follow-up email.',
          context: 'email',
          targetAudience: 'manager',
          desiredTone: 'professional',
          wordCountMin: 80,
          wordCountMax: 150,
        },
      },
    },

    {
      id: nanoid(), type: 'writing',
      title: 'Meeting Invitation Email',
      description: 'Write a clear and professional meeting invitation',
      difficulty: 'easy', estimatedTimeSeconds: 500,
      requiredOverallLevel: 1, isActive: true,
      content: {
        prompt: {
          id: 'w2',
          title: 'Schedule a Project Kickoff Meeting',
          scenario: 'You are the project manager for a new CRM implementation. You need to invite 5 stakeholders (2 from IT, 2 from Sales, 1 from Finance) to a kickoff meeting. The meeting is on March 5 at 10 AM in Conference Room B. Include a brief agenda.',
          context: 'email',
          targetAudience: 'team',
          desiredTone: 'professional',
          wordCountMin: 80,
          wordCountMax: 160,
        },
      },
    },

    {
      id: nanoid(), type: 'writing',
      title: 'Complaint to Supplier',
      description: 'Write a firm but professional complaint email',
      difficulty: 'medium', estimatedTimeSeconds: 700,
      requiredOverallLevel: 3, isActive: true,
      content: {
        prompt: {
          id: 'w3',
          title: 'Late Delivery Complaint',
          scenario: 'Your company ordered 500 units of a product from Supplier Co. on January 10. The delivery date was January 25. It is now February 10 and nothing has arrived. You have called twice with no resolution. Write a formal complaint requesting an update, compensation, and a delivery date.',
          context: 'email',
          targetAudience: 'client',
          desiredTone: 'formal',
          wordCountMin: 120,
          wordCountMax: 220,
        },
      },
    },

    {
      id: nanoid(), type: 'writing',
      title: 'Project Status Update',
      description: 'Write a concise internal project update for your manager',
      difficulty: 'easy', estimatedTimeSeconds: 550,
      requiredOverallLevel: 2, isActive: true,
      content: {
        prompt: {
          id: 'w4',
          title: 'Weekly Project Status Email',
          scenario: 'You are managing the launch of a new internal HR platform. This week you completed user testing (all 12 test cases passed), finalised the training materials, and identified one risk: the IT team may not be ready for the go-live date of March 15. Write a weekly status email to your manager.',
          context: 'email',
          targetAudience: 'manager',
          desiredTone: 'professional',
          wordCountMin: 100,
          wordCountMax: 180,
        },
      },
    },

    {
      id: nanoid(), type: 'writing',
      title: 'Apology and Resolution Email',
      description: 'Write a professional apology email to a client',
      difficulty: 'medium', estimatedTimeSeconds: 650,
      requiredOverallLevel: 3, isActive: true,
      content: {
        prompt: {
          id: 'w5',
          title: 'Apology for Service Disruption',
          scenario: 'Your company\'s platform was down for 4 hours on February 18, affecting 200 enterprise clients. The root cause was a failed database migration. Write a professional apology email to your clients acknowledging the issue, explaining briefly what happened, and describing what you are doing to prevent it from happening again.',
          context: 'email',
          targetAudience: 'client',
          desiredTone: 'formal',
          wordCountMin: 120,
          wordCountMax: 200,
        },
      },
    },

    {
      id: nanoid(), type: 'writing',
      title: 'Proposal Email',
      description: 'Write a persuasive business proposal email to a prospect',
      difficulty: 'medium', estimatedTimeSeconds: 750,
      requiredOverallLevel: 4, isActive: true,
      content: {
        prompt: {
          id: 'w6',
          title: 'Software Solution Proposal',
          scenario: 'You are selling an HR analytics platform. Your prospect is Ricardo Mendes, HR Director at Globo Retail (2,000 employees). After an initial call, he mentioned their biggest pain point is high employee turnover (32% annually). Write a proposal email connecting your product to this specific problem, include 2–3 key benefits, and suggest a next step.',
          context: 'email',
          targetAudience: 'client',
          desiredTone: 'professional',
          wordCountMin: 150,
          wordCountMax: 250,
        },
      },
    },

    {
      id: nanoid(), type: 'writing',
      title: 'Performance Review Self-Assessment',
      description: 'Write a professional self-assessment for your annual review',
      difficulty: 'hard', estimatedTimeSeconds: 900,
      requiredOverallLevel: 6, isActive: true,
      content: {
        prompt: {
          id: 'w7',
          title: 'Annual Self-Assessment',
          scenario: 'It is your annual performance review. This year you: (1) exceeded your sales target by 18%, (2) led the onboarding of 3 new team members, (3) implemented a new lead qualification process that increased conversion by 12%. However, you struggled with time management in Q1. Write your self-assessment covering achievements, areas for improvement, and goals for next year.',
          context: 'report',
          targetAudience: 'manager',
          desiredTone: 'professional',
          wordCountMin: 200,
          wordCountMax: 350,
        },
      },
    },

    {
      id: nanoid(), type: 'writing',
      title: 'Executive Summary',
      description: 'Write a concise executive summary for a business report',
      difficulty: 'hard', estimatedTimeSeconds: 900,
      requiredOverallLevel: 7, isActive: true,
      content: {
        prompt: {
          id: 'w8',
          title: 'Executive Summary — Cost Reduction Initiative',
          scenario: 'Your team completed a 3-month analysis of operational costs. Key findings: (1) Cloud infrastructure costs can be reduced by 40% by consolidating vendors, (2) Outsourcing customer support Tier 1 to a partner in Porto Alegre saves R$800k annually, (3) Automating invoice processing eliminates 2 FTE positions and reduces errors by 90%. Total projected savings: R$2.1M/year. Investment required: R$400k. Write a 1-page executive summary for the CFO.',
          context: 'report',
          targetAudience: 'manager',
          desiredTone: 'formal',
          wordCountMin: 200,
          wordCountMax: 350,
        },
      },
    },

    {
      id: nanoid(), type: 'writing',
      title: 'Declining a Meeting Request',
      description: 'Politely decline a meeting while maintaining the relationship',
      difficulty: 'medium', estimatedTimeSeconds: 500,
      requiredOverallLevel: 3, isActive: true,
      content: {
        prompt: {
          id: 'w9',
          title: 'Declining a Sales Meeting',
          scenario: 'You received a cold outreach from a software vendor requesting a 30-minute demo. You are not interested in their product right now — your budget is frozen until Q3. Write a polite, professional email declining the meeting while leaving the door open for future contact.',
          context: 'email',
          targetAudience: 'colleague',
          desiredTone: 'professional',
          wordCountMin: 60,
          wordCountMax: 120,
        },
      },
    },

    {
      id: nanoid(), type: 'writing',
      title: 'Resignation Letter',
      description: 'Write a professional and gracious resignation letter',
      difficulty: 'medium', estimatedTimeSeconds: 600,
      requiredOverallLevel: 4, isActive: true,
      content: {
        prompt: {
          id: 'w10',
          title: 'Professional Resignation Letter',
          scenario: 'You have accepted a senior role at another company. You have been with your current employer for 3 years and have a positive relationship with your manager. Your contract requires 30 days notice. Write a formal resignation letter expressing gratitude, stating your last day, and offering to help with the transition.',
          context: 'email',
          targetAudience: 'manager',
          desiredTone: 'formal',
          wordCountMin: 100,
          wordCountMax: 180,
        },
      },
    },

    {
      id: nanoid(), type: 'writing',
      title: 'Negotiation Response Email',
      description: 'Respond professionally to a pricing objection',
      difficulty: 'hard', estimatedTimeSeconds: 700,
      requiredOverallLevel: 6, isActive: true,
      content: {
        prompt: {
          id: 'w11',
          title: 'Counter-Offer After Price Objection',
          scenario: 'A client replied to your proposal saying your annual contract price of R$120,000 is 25% above their budget. They like the product but need you to reduce the price. You can offer a 10% discount but not more. You could also offer a shorter initial contract (6 months) or a phased implementation. Write a response that holds value while showing flexibility.',
          context: 'email',
          targetAudience: 'client',
          desiredTone: 'professional',
          wordCountMin: 150,
          wordCountMax: 250,
        },
      },
    },

    {
      id: nanoid(), type: 'writing',
      title: 'Meeting Agenda',
      description: 'Write a clear and structured meeting agenda',
      difficulty: 'easy', estimatedTimeSeconds: 400,
      requiredOverallLevel: 1, isActive: true,
      content: {
        prompt: {
          id: 'w12',
          title: 'Quarterly Business Review Agenda',
          scenario: 'You are preparing a 90-minute Quarterly Business Review (QBR) with a key client, Maxima Retail. Topics to cover: Q1 results review (KPIs), issues and escalations from the quarter, product roadmap update, Q2 planning and goals, any questions. Write a structured agenda with time allocations for each topic.',
          context: 'meeting',
          targetAudience: 'client',
          desiredTone: 'professional',
          wordCountMin: 80,
          wordCountMax: 150,
        },
      },
    },

    // =========================================================================
    // SPEAKING (12 exercises)
    // =========================================================================

    {
      id: nanoid(), type: 'speaking',
      title: 'Professional Self-Introduction',
      description: 'Introduce yourself confidently in a business context',
      difficulty: 'easy', estimatedTimeSeconds: 300,
      requiredOverallLevel: 1, isActive: true,
      content: {
        prompt: {
          id: 's1',
          question: 'Introduce yourself in a business meeting as if you are meeting a new client for the first time. Include your name, role, company, and one key thing you are working on.',
          sampleAnswer: "Hi, I'm Luiz, Senior Account Manager at Nexora Technologies. I've been with the company for three years, focusing on enterprise clients in the retail sector. Currently, I'm leading a digital transformation project for one of our top 10 accounts. It's a pleasure to meet you.",
          tips: ['Keep it under 30 seconds', 'Mention your role and company clearly', 'Add one specific, interesting detail about your work', 'Smile and make eye contact (even on video)'],
          maxDurationSeconds: 45,
        },
      },
    },

    {
      id: nanoid(), type: 'speaking',
      title: 'Opening a Meeting',
      description: 'Practice opening a professional meeting with a clear structure',
      difficulty: 'easy', estimatedTimeSeconds: 350,
      requiredOverallLevel: 2, isActive: true,
      content: {
        prompt: {
          id: 's2',
          question: 'You are the meeting facilitator. Open a product review meeting. Welcome the participants, state the meeting objective, review the agenda, and set time expectations.',
          sampleAnswer: "Good morning, everyone. Thank you for joining. Today's meeting is our monthly product review. Our objective is to assess Q1 progress, identify blockers, and align on Q2 priorities. We have 60 minutes, so let's stay focused. We'll start with a status update from each team, then move to open issues, and close with our Q2 roadmap. Does anyone have anything to add before we begin?",
          tips: ['Welcome participants warmly but briefly', 'State the objective clearly in one sentence', 'Outline the agenda structure', 'Ask if anyone has additions before starting'],
          maxDurationSeconds: 60,
        },
      },
    },

    {
      id: nanoid(), type: 'speaking',
      title: 'Presenting Data to Stakeholders',
      description: 'Describe a chart or key data point to a business audience',
      difficulty: 'medium', estimatedTimeSeconds: 400,
      requiredOverallLevel: 3, isActive: true,
      content: {
        prompt: {
          id: 's3',
          question: 'You are presenting Q3 results. Revenue grew 22% year over year to $48.2M. Subscription revenue is 74% of total. You added 1,200 new enterprise clients. Present these 3 data points in 45-60 seconds, contextualising what each means for the business.',
          sampleAnswer: "I'm pleased to share our Q3 results. Revenue reached $48.2 million, a 22% increase over Q3 last year — our strongest quarterly growth in two years. What's particularly encouraging is that 74% of that revenue is recurring subscription, up from 68%, which means our business is becoming more predictable. And on the customer side, we added 1,200 new enterprise clients, bringing our total to 8,750. These numbers tell a clear story: we're growing, we're more resilient, and we're scaling with the right clients.",
          tips: ['Lead with the headline number', 'Give context to each figure (vs. last year, vs. target)', 'Explain what each number means — don\'t just read it', 'Conclude with a brief summary message'],
          maxDurationSeconds: 70,
        },
      },
    },

    {
      id: nanoid(), type: 'speaking',
      title: 'Handling Objections',
      description: 'Respond to a client objection professionally and persuasively',
      difficulty: 'hard', estimatedTimeSeconds: 450,
      requiredOverallLevel: 5, isActive: true,
      content: {
        prompt: {
          id: 's4',
          question: 'A prospect says: "Your product looks good, but it\'s too expensive. Our budget is 30% lower than your asking price." Respond to this objection without discounting immediately. Focus on value before price.',
          sampleAnswer: "I understand budget is a real constraint, and I appreciate your honesty. Before we talk about numbers, I'd like to make sure we're looking at the full picture. Based on what you've shared, your team is spending about 15 hours a week on manual processes our platform automates. At your team size, that's roughly R$80,000 in annual cost. Our platform would eliminate that. So the question isn't really the price — it's whether the ROI justifies the investment. And in most cases, clients see payback within 6 months. Can I share a quick case study from a company your size?",
          tips: ['Acknowledge the concern without agreeing', 'Reframe from cost to value and ROI', 'Use numbers when possible', 'End with a question to keep the conversation going'],
          maxDurationSeconds: 75,
        },
      },
    },

    {
      id: nanoid(), type: 'speaking',
      title: 'Giving Constructive Feedback',
      description: 'Deliver critical feedback professionally and empathetically',
      difficulty: 'hard', estimatedTimeSeconds: 400,
      requiredOverallLevel: 6, isActive: true,
      content: {
        prompt: {
          id: 's5',
          question: 'You need to give feedback to a team member who has been missing deadlines. They are talented but disorganised. Give them 60 seconds of feedback that is honest, specific, and constructive — without demotivating them.',
          sampleAnswer: "I want to talk about something important because I believe in your potential. Over the last month, three deliverables have come in late — the client report on the 5th, the analysis on the 12th, and the presentation last week. I know the quality of your work is excellent, but the timing is creating challenges for the team and for our clients. I'd like us to work together on a system — whether that's breaking projects into smaller milestones or a check-in midweek. What do you think would help you most?",
          tips: ['Be specific about the behaviour, not the person', 'Acknowledge strengths before raising the issue', 'Use concrete examples', 'End with a collaborative question, not a lecture'],
          maxDurationSeconds: 70,
        },
      },
    },

    {
      id: nanoid(), type: 'speaking',
      title: 'Negotiation Opening Statement',
      description: 'Open a negotiation with a clear and confident position',
      difficulty: 'medium', estimatedTimeSeconds: 380,
      requiredOverallLevel: 4, isActive: true,
      content: {
        prompt: {
          id: 's6',
          question: 'You are entering a contract renewal negotiation with a long-term client. You want to increase the annual contract value by 15%. Open the negotiation by establishing rapport, stating your position, and framing the value you have delivered.',
          sampleAnswer: "Thank you for making time today — we really value this partnership. Three years together, and I think we've built something strong. Before we get into numbers, I want to acknowledge what we've achieved together: 99.8% uptime, a 40% reduction in your support tickets, and your team expanded from 50 to 120 users on the platform. That kind of growth is meaningful. Given the value delivered and the investment we're making in the product roadmap — particularly the AI features you requested — we're proposing a 15% increase for the renewal. I want to walk you through exactly what that investment covers.",
          tips: ['Start with rapport — acknowledge the relationship', 'State your position early — don\'t bury it', 'Lead with the value you\'ve delivered', 'Frame price increase as investment, not cost'],
          maxDurationSeconds: 75,
        },
      },
    },

    {
      id: nanoid(), type: 'speaking',
      title: 'Elevator Pitch',
      description: 'Pitch your product or idea in under 60 seconds',
      difficulty: 'medium', estimatedTimeSeconds: 360,
      requiredOverallLevel: 3, isActive: true,
      content: {
        prompt: {
          id: 's7',
          question: 'You are at a networking event and meet the CFO of a mid-sized retail company. You have 45 seconds to pitch your HR analytics platform. What do you say?',
          sampleAnswer: "Mid-sized retailers lose an average of R$1.2M a year to employee turnover. Most don't know why people leave until it's too late. Our platform analyses retention patterns across your workforce and flags at-risk employees 90 days before they resign — giving managers time to act. It integrates with any existing HRIS in under a day. We work with 12 retailers in Brazil, and the average client reduces turnover by 28% in the first year. I'd love to show you a quick demo — would that be worth 20 minutes next week?",
          tips: ['Open with the problem, not your product name', 'Quantify the pain and the solution', 'Name-drop a relevant client type for credibility', 'End with a clear, low-commitment call to action'],
          maxDurationSeconds: 55,
        },
      },
    },

    {
      id: nanoid(), type: 'speaking',
      title: 'Asking for a Raise',
      description: 'Advocate for yourself professionally in a salary conversation',
      difficulty: 'hard', estimatedTimeSeconds: 420,
      requiredOverallLevel: 6, isActive: true,
      content: {
        prompt: {
          id: 's8',
          question: 'You have been at your company for 2 years with consistently strong performance. You are earning R$12,000/month and want to request R$15,000. Prepare a 60-second opening statement for your salary review conversation.',
          sampleAnswer: "I'd like to talk about my compensation. Over the past two years, I've consistently exceeded my targets — 115% of quota last year and 122% this year. I led the implementation of the new lead scoring process that increased qualified opportunities by 35%. I've also taken on additional responsibilities managing the junior sales team since March. Based on my performance, the expanded scope of my role, and benchmarking data I've researched for similar roles in São Paulo, I'm requesting a salary adjustment to R$15,000. I believe this reflects both the value I've delivered and the market rate for this level of contribution.",
          tips: ['Open with your intention — don\'t bury it', 'Lead with achievements and numbers', 'Reference expanded responsibilities', 'Use market data to anchor the ask — it depersonalises it'],
          maxDurationSeconds: 70,
        },
      },
    },

    {
      id: nanoid(), type: 'speaking',
      title: 'Closing a Meeting',
      description: 'Close a meeting professionally and confirm next steps',
      difficulty: 'easy', estimatedTimeSeconds: 300,
      requiredOverallLevel: 2, isActive: true,
      content: {
        prompt: {
          id: 's9',
          question: 'Close a 1-hour strategy meeting. Summarise the 3 key decisions made, confirm who owns each action item, and state the next meeting date.',
          sampleAnswer: "Before we close, let me summarise where we landed. First, we agreed to launch the pilot in São Paulo in Q3 — Maria owns the timeline by March 10. Second, we'll pause the partnership with Vendor B and evaluate two alternatives — João will have the analysis ready by March 15. Third, the budget request will be submitted to Finance this week — Carla is the owner. Our next meeting is March 20 at 2 PM. I'll send the minutes with these action items by tomorrow morning. Thank you all — great discussion today.",
          tips: ['Summarise decisions, not discussions', 'Name an owner for every action item', 'State the deadline and next meeting date', 'Thank the group — close on a positive note'],
          maxDurationSeconds: 60,
        },
      },
    },

    {
      id: nanoid(), type: 'speaking',
      title: 'Asking Clarifying Questions',
      description: 'Ask effective questions to understand a complex business request',
      difficulty: 'medium', estimatedTimeSeconds: 340,
      requiredOverallLevel: 3, isActive: true,
      content: {
        prompt: {
          id: 's10',
          question: 'Your manager gave you a vague instruction: "We need to improve customer experience." Ask 4 clarifying questions to understand what is actually expected before you start working.',
          sampleAnswer: "I want to make sure I tackle this in the right direction. A few questions before I start: First, when you say customer experience — are we focused on a specific touchpoint, like onboarding or support, or is this end-to-end? Second, what's prompting this now — is there data, a client complaint, or a strategic priority I should be aware of? Third, what does success look like for you — is there a metric we're targeting, like NPS or response time? And finally, what's the timeline you have in mind, and do I have a budget to work with? These will really help me focus on what matters most.",
          tips: ['Ask about scope before diving in', 'Ask about the trigger — why now?', 'Ask about success metrics', 'Ask about constraints: time and budget'],
          maxDurationSeconds: 65,
        },
      },
    },

    {
      id: nanoid(), type: 'speaking',
      title: 'Disagreeing Professionally',
      description: 'Express disagreement respectfully in a business context',
      difficulty: 'hard', estimatedTimeSeconds: 380,
      requiredOverallLevel: 5, isActive: true,
      content: {
        prompt: {
          id: 's11',
          question: 'In a strategy meeting, your director proposes cutting the customer success team by 50% to reduce costs. You strongly disagree based on data you have about retention risk. How do you respond in the meeting?',
          sampleAnswer: "I appreciate the cost pressure — I understand where this is coming from. Before we move forward, I want to share some data that I think is important for this decision. Our analysis shows that 68% of our churn events in the last 12 months were linked to accounts with low CS engagement. Each churned enterprise account represents an average of R$180,000 in lost ARR. If we reduce the CS team by 50%, based on current ratios, we estimate an additional 15–20% churn risk on the mid-market segment. That's potentially R$3.2M in revenue at risk — significantly more than the R$800k in cost savings. I fully support finding efficiencies, but I'd like to propose we look at this more carefully before making the cut. Can we schedule a dedicated session to model the full revenue impact?",
          tips: ['Acknowledge the other person\'s logic first', 'Lead with data, not opinion', 'Quantify the risk of the proposal', 'Offer an alternative — don\'t just say no'],
          maxDurationSeconds: 80,
        },
      },
    },

    {
      id: nanoid(), type: 'speaking',
      title: 'Virtual Meeting Etiquette',
      description: 'Handle common situations in a video conference professionally',
      difficulty: 'easy', estimatedTimeSeconds: 300,
      requiredOverallLevel: 1, isActive: true,
      content: {
        prompt: {
          id: 's12',
          question: 'You join a video call and notice your audio was cutting out. Another participant is talking over someone else, and you need to redirect. Practice handling these two situations naturally in English.',
          sampleAnswer: "Sorry to interrupt — I think my audio was cutting out. Could you repeat the last point? I want to make sure I didn't miss anything important. [Pause] Also, I noticed we might have two conversations happening at once — let's let Maria finish her thought, and then we can hear from the others. Maria, please go ahead.",
          tips: ['Apologise briefly when interrupting — don\'t over-explain', 'Ask for repetition clearly and specifically', 'Redirect group conversations politely but firmly', 'Use names to give the floor to someone specific'],
          maxDurationSeconds: 50,
        },
      },
    },

  ];

  console.log(`Inserting ${data.length} exercises...`);
  await db.insert(exercises).values(data);
  console.log(`✅ ${data.length} exercises inserted successfully!`);
}

seedExercises()
  .then(() => { console.log('🎉 Done!'); process.exit(0); })
  .catch((err) => { console.error('❌ Failed:', err); process.exit(1); });
