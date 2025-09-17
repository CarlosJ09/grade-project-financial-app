# Education Module Seed Data

To test the education module, you can create some sample data in your database. Here are some SQL scripts to get you started:

## Sample Courses

```sql
INSERT INTO courses (name, description) VALUES
('Financial Literacy Basics', 'Learn the fundamentals of personal finance, budgeting, and money management'),
('Investment Fundamentals', 'Understand different investment types, risk management, and building a portfolio'),
('Budgeting Mastery', 'Master the art of creating and maintaining effective budgets for your financial goals');
```

## Sample Modules

```sql
-- Modules for Financial Literacy Basics (assuming course id = 1)
INSERT INTO modules (course_id, content_item, sequence, summary, estimated_minutes, release_at) VALUES
(1, 'Introduction to Personal Finance', 1, 'Understanding the basics of money management and financial planning', 15, NOW()),
(1, 'Understanding Income and Expenses', 2, 'Learn to track and categorize your money flow', 20, NOW()),
(1, 'Building Your First Budget', 3, 'Step-by-step guide to creating a personal budget', 25, NOW());

-- Modules for Investment Fundamentals (assuming course id = 2)
INSERT INTO modules (course_id, content_item, sequence, summary, estimated_minutes, release_at) VALUES
(2, 'What is Investing?', 1, 'Basic concepts and principles of investing', 18, NOW()),
(2, 'Types of Investments', 2, 'Stocks, bonds, mutual funds, and other investment vehicles', 22, NOW()),
(2, 'Risk and Return', 3, 'Understanding the relationship between risk and potential returns', 20, NOW());
```

## Sample Content Items

```sql
-- Content for Module 1 (Introduction to Personal Finance)
INSERT INTO content_items (section_id, module_id, sequence, title, file_url, markdown_body) VALUES
('intro-1', 1, 1, 'What is Personal Finance?', '', '# What is Personal Finance?

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
- Prepare for emergencies'),

('intro-2', 1, 2, 'Setting Financial Goals', '', '# Setting Financial Goals

Financial goals give direction to your money decisions. They can be:

## Short-term Goals (1 year or less)
- Emergency fund
- Vacation savings
- Paying off credit card debt

## Medium-term Goals (1-5 years)
- Down payment for a house
- Car purchase
- Professional development

## Long-term Goals (5+ years)
- Retirement savings
- Children''s education
- Financial independence

## SMART Goals
Make your goals:
- **Specific**: Clear and well-defined
- **Measurable**: You can track progress
- **Achievable**: Realistic given your situation
- **Relevant**: Important to your life
- **Time-bound**: Has a deadline');
```

## Sample Quiz Questions

```sql
-- Quiz questions for the first content item
INSERT INTO quiz_questions (content_item_id, question_text, question_type, explanation) VALUES
(1, 'What are the main components of personal finance?', 'multiple_choice', 'Personal finance includes budgeting, saving, investing, and debt management.'),
(1, 'Why is personal finance important?', 'multiple_choice', 'Good personal finance habits help achieve goals, reduce stress, and build wealth.');

-- Quiz options for first question
INSERT INTO quiz_options (quiz_question_id, option_text, is_correct) VALUES
(1, 'Budgeting, saving, investing, and debt management', true),
(1, 'Only saving and investing', false),
(1, 'Just earning more money', false),
(1, 'Spending and shopping', false);

-- Quiz options for second question
INSERT INTO quiz_options (quiz_question_id, option_text, is_correct) VALUES
(2, 'It helps achieve financial goals and reduces stress', true),
(2, 'It''s only for wealthy people', false),
(2, 'It''s too complicated to matter', false),
(2, 'It only helps with taxes', false);
```

## Test User Enrollment

```sql
-- Enroll a test user in courses (replace 'user-uuid' with actual user ID)
INSERT INTO course_enrollments (user_id, course_id, enrolled_at) VALUES
('user-uuid', 1, NOW()),
('user-uuid', 2, NOW());
```

## API Testing

You can test the API endpoints using tools like Postman or curl:

### Get All Courses

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:3000/courses
```

### Get Course by ID

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:3000/courses/1
```

### Enroll in Course

```bash
curl -X POST -H "Authorization: Bearer YOUR_TOKEN" -H "Content-Type: application/json" \
  -d '{"courseId": 1, "enrolledAt": "2024-01-01T00:00:00Z"}' \
  http://localhost:3000/course-enrollments
```

### Get Modules for Course

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:3000/modules?courseId=1
```

This seed data will give you a complete educational experience to test with your React Native app!
