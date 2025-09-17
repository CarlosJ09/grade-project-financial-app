import { PrismaClient } from '@/infraestructure/prisma/generated/prisma';

interface ContentItemData {
  sectionId: string;
  moduleId: number;
  sequence: number;
  title: string;
  fileUrl: string;
  markdownBody: string;
}

/**
 * Seed data for content items
 * Educational content for each module with markdown content
 */
const contentItemData: ContentItemData[] = [
  // Module 1: Introduction to Personal Finance
  {
    sectionId: 'intro-pf-1',
    moduleId: 1,
    sequence: 1,
    title: 'What is Personal Finance?',
    fileUrl: '',
    markdownBody: `# What is Personal Finance?

Personal finance is the management of your money and financial decisions. It includes:

- **Budgeting**: Planning how to spend your money
- **Saving**: Setting aside money for future needs  
- **Investing**: Growing your money over time
- **Debt Management**: Handling loans and credit responsibly

## Why is it Important?

Good personal finance habits help you:
- Achieve your financial goals
- Reduce financial stress
- Build wealth over time
- Prepare for emergencies

## Getting Started

The first step in personal finance is understanding where your money comes from and where it goes. This awareness is the foundation of all other financial decisions.`,
  },
  {
    sectionId: 'intro-pf-2',
    moduleId: 1,
    sequence: 2,
    title: 'The Financial Planning Process',
    fileUrl: '',
    markdownBody: `# The Financial Planning Process

Financial planning is a step-by-step approach to managing your money:

## 1. Assess Your Current Situation
- Calculate your net worth
- Track your income and expenses
- Identify your financial strengths and weaknesses

## 2. Set Financial Goals
- Short-term (1 year or less)
- Medium-term (1-5 years)  
- Long-term (5+ years)

## 3. Create a Plan
- Develop strategies to reach your goals
- Choose appropriate financial tools
- Set realistic timelines

## 4. Implement Your Plan
- Start taking action
- Use budgets and tracking tools
- Stay disciplined

## 5. Monitor and Adjust
- Review your progress regularly
- Make adjustments as needed
- Celebrate your successes`,
  },

  // Module 2: Understanding Income and Expenses
  {
    sectionId: 'income-exp-1',
    moduleId: 2,
    sequence: 1,
    title: 'Types of Income',
    fileUrl: '',
    markdownBody: `# Types of Income

Understanding your income sources is crucial for financial planning:

## Active Income
Money earned from work or services:
- **Salary**: Fixed annual compensation
- **Hourly wages**: Payment based on hours worked
- **Commissions**: Payment based on sales performance
- **Tips**: Additional income from service work
- **Freelance income**: Project-based earnings

## Passive Income
Money earned with minimal ongoing effort:
- **Investment dividends**: Payments from stock ownership
- **Rental income**: Money from property rentals
- **Interest**: Earnings from savings and bonds
- **Royalties**: Payments from intellectual property

## Portfolio Income
Income from investments:
- **Capital gains**: Profit from selling investments
- **Trading profits**: Income from buying/selling securities

## Tax Considerations
Different types of income may be taxed differently. Understanding this can help you make better financial decisions.`,
  },
  {
    sectionId: 'income-exp-2',
    moduleId: 2,
    sequence: 2,
    title: 'Categorizing Expenses',
    fileUrl: '',
    markdownBody: `# Categorizing Expenses

Organizing your expenses helps you understand your spending patterns:

## Fixed Expenses
Costs that stay the same each month:
- Rent or mortgage payments
- Insurance premiums
- Loan payments
- Subscription services

## Variable Expenses
Costs that change from month to month:
- Groceries
- Utilities
- Gas for your car
- Entertainment

## Discretionary Expenses
Non-essential spending:
- Dining out
- Hobbies
- Travel
- Shopping for non-essentials

## Periodic Expenses
Costs that occur occasionally:
- Car maintenance
- Medical expenses
- Holiday gifts
- Annual memberships

## The 50/30/20 Rule
A simple framework:
- 50% for needs (fixed + essential variable)
- 30% for wants (discretionary)
- 20% for savings and debt payment`,
  },

  // Module 3: Building Your First Budget
  {
    sectionId: 'budget-1',
    moduleId: 3,
    sequence: 1,
    title: 'Creating Your Budget',
    fileUrl: '',
    markdownBody: `# Creating Your Budget

A budget is a plan for how you'll spend your money. Here's how to create one:

## Step 1: Calculate Your Income
- Add up all sources of monthly income
- Use your take-home (after-tax) amount
- If income varies, use an average or conservative estimate

## Step 2: List Your Expenses
- Start with fixed expenses
- Add variable expenses
- Don't forget periodic expenses (divide annual costs by 12)
- Include savings as an "expense"

## Step 3: Choose a Budgeting Method

### Zero-Based Budget
Every dollar has a purpose. Income minus expenses should equal zero.

### 50/30/20 Budget
- 50% needs
- 30% wants  
- 20% savings/debt payment

### Envelope Method
Allocate cash for different spending categories in separate envelopes.

## Step 4: Track and Adjust
- Monitor your actual spending
- Compare to your budget
- Make adjustments as needed

Remember: Your first budget won't be perfect. It takes time to get it right!`,
  },

  // Module 4: Setting Financial Goals
  {
    sectionId: 'goals-1',
    moduleId: 4,
    sequence: 1,
    title: 'SMART Financial Goals',
    fileUrl: '',
    markdownBody: `# Setting SMART Financial Goals

Goals give direction to your financial decisions. Make them SMART:

## SMART Criteria

### Specific
Be clear about what you want to achieve:
- ❌ "Save money"
- ✅ "Save $5,000 for an emergency fund"

### Measurable  
Include numbers so you can track progress:
- ❌ "Pay off debt"
- ✅ "Pay off $10,000 in credit card debt"

### Achievable
Set realistic goals based on your situation:
- Consider your income and expenses
- Start with smaller goals and build up
- Challenge yourself but stay realistic

### Relevant
Goals should matter to your life:
- Align with your values and priorities
- Consider your life stage and circumstances
- Focus on what's important to you

### Time-bound
Set deadlines to create urgency:
- ❌ "Buy a house someday"
- ✅ "Save $20,000 for a house down payment by December 2025"

## Types of Financial Goals

### Short-term (1 year or less)
- Build a $1,000 emergency fund
- Pay off a credit card
- Save for a vacation

### Medium-term (1-5 years)
- Save for a car down payment
- Build a 6-month emergency fund
- Pay off student loans

### Long-term (5+ years)
- Buy a house
- Save for retirement
- Fund children's education

## Writing Your Goals
Write your goals down and review them regularly. This increases your chances of success!`,
  },

  // Investment Fundamentals Module 5: What is Investing?
  {
    sectionId: 'invest-1',
    moduleId: 5,
    sequence: 1,
    title: 'Investing vs Saving',
    fileUrl: '',
    markdownBody: `# Investing vs Saving

Understanding the difference between saving and investing is crucial:

## Saving
**Purpose**: Preserve money and provide easy access
**Timeline**: Short-term (less than 5 years)
**Risk**: Very low
**Return**: Low but guaranteed
**Liquidity**: High - easy to access

### Best for:
- Emergency funds
- Short-term goals
- Money you need within 2-3 years

### Common savings options:
- Savings accounts
- Money market accounts
- Certificates of deposit (CDs)

## Investing  
**Purpose**: Grow money over time
**Timeline**: Long-term (5+ years)
**Risk**: Higher but manageable
**Return**: Higher potential returns
**Liquidity**: Lower - may take time to access

### Best for:
- Long-term goals
- Retirement
- Wealth building

### Common investment options:
- Stocks
- Bonds
- Mutual funds
- Real estate

## The Power of Compound Interest

When you invest, you earn returns on both your original money AND on previous returns. This compounding effect can significantly grow your wealth over time.

**Example**: $1,000 invested at 7% annual return:
- After 10 years: $1,967
- After 20 years: $3,870
- After 30 years: $7,612

## Key Takeaway
Save for short-term needs, invest for long-term growth!`,
  },
];

/**
 * Seed content items into the database
 */
export async function seedContentItems(prisma: PrismaClient): Promise<void> {
  console.log('📄 Seeding content items...');

  try {
    // Check if content items already exist
    const existingCount = await prisma.contentItem.count();
    if (existingCount > 0) {
      console.log(
        `📄 Content items already exist (${existingCount} found), skipping...`
      );
      return;
    }

    // Verify modules exist first
    const moduleCount = await prisma.module.count();
    if (moduleCount === 0) {
      throw new Error('No modules found. Please seed modules first.');
    }

    const contentItems = await prisma.contentItem.createMany({
      data: contentItemData,
      skipDuplicates: true,
    });

    console.log(`📄 Successfully seeded ${contentItems.count} content items`);

    // Log the created content items for reference
    const createdItems = await prisma.contentItem.findMany({
      select: {
        id: true,
        title: true,
        moduleId: true,
        sequence: true,
      },
      orderBy: [{ moduleId: 'asc' }, { sequence: 'asc' }],
    });

    console.log('📄 Created content items:');
    createdItems.forEach(item => {
      console.log(
        `   ${item.id}: Module ${item.moduleId} - ${item.sequence}. ${item.title}`
      );
    });
  } catch (error) {
    console.error('❌ Error seeding content items:', error);
    throw error;
  }
}
