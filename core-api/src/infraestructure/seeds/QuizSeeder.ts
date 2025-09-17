import { PrismaClient } from '@/infraestructure/prisma/generated/prisma';

interface QuizQuestionData {
  contentItemId: number;
  questionText: string;
  questionType: string;
  explanation: string;
  options: QuizOptionData[];
}

interface QuizOptionData {
  optionText: string;
  isCorrect: boolean;
}

/**
 * Seed data for quiz questions and options
 * Educational quizzes for content items to test comprehension
 */
const quizData: QuizQuestionData[] = [
  // Content Item 1: What is Personal Finance?
  {
    contentItemId: 1,
    questionText: 'What are the main components of personal finance?',
    questionType: 'multiple_choice',
    explanation:
      'Personal finance includes budgeting (planning spending), saving (setting aside money), investing (growing money), and debt management (handling loans responsibly).',
    options: [
      {
        optionText: 'Budgeting, saving, investing, and debt management',
        isCorrect: true,
      },
      {
        optionText: 'Only saving and investing',
        isCorrect: false,
      },
      {
        optionText: 'Just earning more money',
        isCorrect: false,
      },
      {
        optionText: 'Spending and shopping',
        isCorrect: false,
      },
    ],
  },
  {
    contentItemId: 1,
    questionText: 'Why is personal finance important?',
    questionType: 'multiple_choice',
    explanation:
      'Good personal finance habits help you achieve your financial goals, reduce financial stress, build wealth over time, and prepare for emergencies.',
    options: [
      {
        optionText: 'It helps achieve financial goals and reduces stress',
        isCorrect: true,
      },
      {
        optionText: "It's only for wealthy people",
        isCorrect: false,
      },
      {
        optionText: "It's too complicated to matter",
        isCorrect: false,
      },
      {
        optionText: 'It only helps with taxes',
        isCorrect: false,
      },
    ],
  },

  // Content Item 2: The Financial Planning Process
  {
    contentItemId: 2,
    questionText: 'What is the first step in the financial planning process?',
    questionType: 'multiple_choice',
    explanation:
      'The first step is to assess your current financial situation by calculating your net worth, tracking income and expenses, and identifying strengths and weaknesses.',
    options: [
      {
        optionText: 'Assess your current financial situation',
        isCorrect: true,
      },
      {
        optionText: 'Start investing immediately',
        isCorrect: false,
      },
      {
        optionText: 'Buy insurance',
        isCorrect: false,
      },
      {
        optionText: 'Pay off all debt',
        isCorrect: false,
      },
    ],
  },

  // Content Item 3: Types of Income
  {
    contentItemId: 3,
    questionText: 'Which of the following is an example of passive income?',
    questionType: 'multiple_choice',
    explanation:
      'Rental income is passive income because it requires minimal ongoing effort once the property is rented. Salary and hourly wages are active income.',
    options: [
      {
        optionText: 'Rental income from property',
        isCorrect: true,
      },
      {
        optionText: 'Salary from your job',
        isCorrect: false,
      },
      {
        optionText: 'Hourly wages',
        isCorrect: false,
      },
      {
        optionText: 'Overtime pay',
        isCorrect: false,
      },
    ],
  },

  // Content Item 4: Categorizing Expenses
  {
    contentItemId: 4,
    questionText:
      'According to the 50/30/20 rule, what percentage should go to wants?',
    questionType: 'multiple_choice',
    explanation:
      'The 50/30/20 rule allocates 50% for needs, 30% for wants (discretionary spending), and 20% for savings and debt payment.',
    options: [
      {
        optionText: '30%',
        isCorrect: true,
      },
      {
        optionText: '50%',
        isCorrect: false,
      },
      {
        optionText: '20%',
        isCorrect: false,
      },
      {
        optionText: '40%',
        isCorrect: false,
      },
    ],
  },
  {
    contentItemId: 4,
    questionText: 'Which expense category includes rent or mortgage payments?',
    questionType: 'multiple_choice',
    explanation:
      'Rent or mortgage payments are fixed expenses because they stay the same amount each month.',
    options: [
      {
        optionText: 'Fixed expenses',
        isCorrect: true,
      },
      {
        optionText: 'Variable expenses',
        isCorrect: false,
      },
      {
        optionText: 'Discretionary expenses',
        isCorrect: false,
      },
      {
        optionText: 'Periodic expenses',
        isCorrect: false,
      },
    ],
  },

  // Content Item 5: Creating Your Budget
  {
    contentItemId: 5,
    questionText:
      'In a zero-based budget, what should your income minus expenses equal?',
    questionType: 'multiple_choice',
    explanation:
      'In a zero-based budget, every dollar has a purpose. Your income minus all planned expenses (including savings) should equal zero.',
    options: [
      {
        optionText: 'Zero',
        isCorrect: true,
      },
      {
        optionText: 'Your savings amount',
        isCorrect: false,
      },
      {
        optionText: '10% of your income',
        isCorrect: false,
      },
      {
        optionText: 'Whatever is left over',
        isCorrect: false,
      },
    ],
  },

  // Content Item 6: SMART Financial Goals
  {
    contentItemId: 6,
    questionText: 'Which of these is a SMART financial goal?',
    questionType: 'multiple_choice',
    explanation:
      'A SMART goal is Specific, Measurable, Achievable, Relevant, and Time-bound. "Save $5,000 for an emergency fund by December 2024" meets all these criteria.',
    options: [
      {
        optionText: 'Save $5,000 for an emergency fund by December 2024',
        isCorrect: true,
      },
      {
        optionText: 'Save money',
        isCorrect: false,
      },
      {
        optionText: 'Get rich someday',
        isCorrect: false,
      },
      {
        optionText: 'Have more money',
        isCorrect: false,
      },
    ],
  },
  {
    contentItemId: 6,
    questionText: 'What does the "T" in SMART goals stand for?',
    questionType: 'multiple_choice',
    explanation:
      'The "T" in SMART goals stands for Time-bound, meaning your goal should have a specific deadline.',
    options: [
      {
        optionText: 'Time-bound',
        isCorrect: true,
      },
      {
        optionText: 'Trackable',
        isCorrect: false,
      },
      {
        optionText: 'Tactical',
        isCorrect: false,
      },
      {
        optionText: 'Targeted',
        isCorrect: false,
      },
    ],
  },

  // Content Item 7: Investing vs Saving
  {
    contentItemId: 7,
    questionText: 'What is the main purpose of investing?',
    questionType: 'multiple_choice',
    explanation:
      'The main purpose of investing is to grow your money over time through compound returns, building wealth for long-term goals.',
    options: [
      {
        optionText: 'To grow money over time',
        isCorrect: true,
      },
      {
        optionText: 'To preserve money safely',
        isCorrect: false,
      },
      {
        optionText: 'To have easy access to funds',
        isCorrect: false,
      },
      {
        optionText: 'To avoid all financial risk',
        isCorrect: false,
      },
    ],
  },
  {
    contentItemId: 7,
    questionText: 'For which timeline is investing most appropriate?',
    questionType: 'multiple_choice',
    explanation:
      'Investing is most appropriate for long-term goals (5+ years) because it allows time for compound growth and to ride out market volatility.',
    options: [
      {
        optionText: '5+ years (long-term)',
        isCorrect: true,
      },
      {
        optionText: '1-2 years (short-term)',
        isCorrect: false,
      },
      {
        optionText: 'Less than 1 year',
        isCorrect: false,
      },
      {
        optionText: 'Only when you need money immediately',
        isCorrect: false,
      },
    ],
  },
];

/**
 * Seed quiz questions and options into the database
 */
export async function seedQuizzes(prisma: PrismaClient): Promise<void> {
  console.log('🧠 Seeding quiz questions and options...');

  try {
    // Check if quiz questions already exist
    const existingQuestions = await prisma.quizQuestion.count();
    if (existingQuestions > 0) {
      console.log(
        `🧠 Quiz questions already exist (${existingQuestions} found), skipping...`
      );
      return;
    }

    // Verify content items exist first
    const contentItemCount = await prisma.contentItem.count();
    if (contentItemCount === 0) {
      throw new Error(
        'No content items found. Please seed content items first.'
      );
    }

    let totalQuestions = 0;
    let totalOptions = 0;

    // Create questions and options
    for (const quizItem of quizData) {
      // Create the question
      const question = await prisma.quizQuestion.create({
        data: {
          contentItemId: quizItem.contentItemId,
          questionText: quizItem.questionText,
          questionType: quizItem.questionType,
          explanation: quizItem.explanation,
        },
      });

      totalQuestions++;

      // Create the options for this question
      for (const optionData of quizItem.options) {
        await prisma.quizOption.create({
          data: {
            quizQuestionId: question.id,
            optionText: optionData.optionText,
            isCorrect: optionData.isCorrect,
          },
        });
        totalOptions++;
      }
    }

    console.log(
      `🧠 Successfully seeded ${totalQuestions} quiz questions and ${totalOptions} options`
    );

    // Log the created questions for reference
    const createdQuestions = await prisma.quizQuestion.findMany({
      select: {
        id: true,
        questionText: true,
        contentItemId: true,
      },
      orderBy: { contentItemId: 'asc' },
    });

    console.log('🧠 Created quiz questions:');
    createdQuestions.forEach(question => {
      console.log(
        `   ${question.id}: Content ${question.contentItemId} - ${question.questionText.substring(0, 50)}...`
      );
    });
  } catch (error) {
    console.error('❌ Error seeding quizzes:', error);
    throw error;
  }
}
