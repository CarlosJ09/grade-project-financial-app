# Education Module Seeders

This document explains how to use the Prisma seeders for the education module.

## Overview

The education module includes 4 main seeders that create a complete educational experience:

1. **CourseSeeder** - Creates educational courses
2. **ModuleSeeder** - Creates modules within courses
3. **ContentItemSeeder** - Creates learning content for modules
4. **QuizSeeder** - Creates quiz questions and options for content

## Seeded Data

### Courses (8 courses)

- Financial Literacy Basics
- Investment Fundamentals
- Budgeting Mastery
- Debt Management Strategies
- Retirement Planning
- Emergency Fund Essentials
- Understanding Credit
- Tax Planning Basics

### Modules (16 modules)

- 4 modules for Financial Literacy Basics
- 4 modules for Investment Fundamentals
- 3 modules for Budgeting Mastery
- 3 modules for Debt Management
- 3 modules for Emergency Fund Essentials

### Content Items (7 detailed content items)

- Rich markdown content with educational material
- Step-by-step guides and explanations
- Real-world examples and tips

### Quiz Questions (10 questions with 40 options)

- Multiple choice questions to test comprehension
- Detailed explanations for each answer
- Covers key concepts from the content

## Usage

### Seed Education Data Only

```bash
# Navigate to core-api directory
cd core-api

# Seed only education module data
npm run seed:education

# Clear only education module data
npm run seed:education:clear
```

### Seed All Data (Including Education)

```bash
# Seed all application data
npm run seed

# Clear all seed data
npm run seed:clear
```

### Manual Execution

```bash
# Seed education data
npx tsx src/infraestructure/seeds/educationSeeder.ts seed

# Clear education data
npx tsx src/infraestructure/seeds/educationSeeder.ts clear
```

## Dependencies

The seeders must be run in order due to foreign key constraints:

1. **Courses** (independent)
2. **Modules** (requires courses)
3. **ContentItems** (requires modules)
4. **Quizzes** (requires content items)

The seeders handle this automatically and will skip seeding if data already exists.

## Database Tables Populated

### Primary Tables

- `courses` - Course information
- `modules` - Module information and sequencing
- `content_items` - Learning content with markdown
- `quiz_questions` - Quiz questions with explanations
- `quiz_options` - Multiple choice options

### Related Tables (for user progress)

- `course_enrollments` - User course enrollments
- `user_module_progress` - User progress through modules
- `quiz_attempts` - User quiz attempts
- `quiz_attempt_answers` - User quiz answers

## Sample Data Structure

### Course Example

```typescript
{
  name: 'Financial Literacy Basics',
  description: 'Learn the fundamentals of personal finance, budgeting, and money management. Perfect for beginners who want to take control of their financial future.'
}
```

### Module Example

```typescript
{
  courseId: 1,
  contentItem: 'Introduction to Personal Finance',
  sequence: 1,
  summary: 'Understanding the basics of money management and financial planning. Learn what personal finance is and why it matters.',
  estimatedMinutes: 15
}
```

### Content Item Example

```typescript
{
  sectionId: 'intro-pf-1',
  moduleId: 1,
  sequence: 1,
  title: 'What is Personal Finance?',
  markdownBody: '# What is Personal Finance?\n\nPersonal finance is the management of your money and financial decisions...'
}
```

### Quiz Question Example

```typescript
{
  contentItemId: 1,
  questionText: 'What are the main components of personal finance?',
  questionType: 'multiple_choice',
  explanation: 'Personal finance includes budgeting, saving, investing, and debt management.',
  options: [
    { optionText: 'Budgeting, saving, investing, and debt management', isCorrect: true },
    { optionText: 'Only saving and investing', isCorrect: false }
    // ... more options
  ]
}
```

## Testing the Data

After seeding, you can test the education module:

1. **Start the API server**:

   ```bash
   npm run dev
   ```

2. **Test endpoints**:

   ```bash
   # Get all courses
   curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:3000/courses

   # Get course by ID
   curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:3000/courses/1

   # Get modules for a course
   curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:3000/modules?courseId=1
   ```

3. **Test in the mobile app**:
   - Navigate to the Learn tab
   - Browse available courses
   - Enroll in a course
   - View modules and content

## Troubleshooting

### Common Issues

1. **Foreign key constraint errors**:
   - Make sure to run seeders in order
   - Clear data before re-seeding if needed

2. **"Already exists" messages**:
   - Seeders skip if data exists
   - Use clear commands to reset data

3. **Database connection errors**:
   - Ensure your database is running
   - Check your DATABASE_URL environment variable

### Logs

The seeders provide detailed logging:

- ✅ Success messages with counts
- 📚 Progress indicators
- ❌ Error messages with details
- 📋 Lists of created items with IDs

## Development

### Adding New Content

To add new courses, modules, or content:

1. Edit the respective seeder file
2. Add your data to the data array
3. Run the seeder to populate the database

### Modifying Existing Content

1. Clear existing data: `npm run seed:education:clear`
2. Update the seeder files
3. Re-seed: `npm run seed:education`

This ensures a complete educational experience for testing and development! 🎓
