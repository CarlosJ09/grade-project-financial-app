# Financial Education App Frontend

A React Native app built with Expo for financial education powered by AI.

## Features

- 🔐 **Secure Authentication** with persistent sessions
- 💰 **Financial Management** - budgets, transactions, banking
- 📚 **Educational Content** - courses, modules, quizzes
- 🎨 **Modern UI** with NativeWind (Tailwind CSS)
- 📱 **Cross-platform** - iOS, Android, Web

## State Management

This app uses **Zustand** for state management with the following stores:

### Auth Store (`useAuthStore`)

- User authentication and session management
- Secure token storage with auto-refresh
- Protected routing

```tsx
import { useAuthStore } from '@/stores';

const { user, login, logout, isAuthenticated } = useAuthStore();
```

### Financial Store (`useFinancialStore`)

- Banking, transactions, budgets management
- Secure data persistence
- Optimistic updates

```tsx
import { useFinancialStore } from '@/stores';

const { transactions, createTransaction, fetchBudgets } = useFinancialStore();
```

### Education Store (`useEducationStore`)

- Course enrollment and progress tracking
- Quiz attempts and scoring
- Module completion

```tsx
import { useEducationStore } from '@/stores';

const { courses, enrollInCourse, updateProgress } = useEducationStore();
```

## Custom Hooks

### `useAuthGuard(requireAuth: boolean)`

Protects routes and handles automatic navigation:

```tsx
import { useAuthGuard } from '@/hooks/useAuthGuard';

// Require authentication
const { isLoading } = useAuthGuard(true);

// Redirect if authenticated (for auth pages)
useAuthGuard(false);
```

### `useAuthUser()`

Quick access to current user data:

```tsx
import { useAuthUser } from '@/hooks/useAuthGuard';

const { user, isAuthenticated } = useAuthUser();
```

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the development server:**

   ```bash
   npm start
   ```

3. **Run on specific platform:**
   ```bash
   npm run ios     # iOS
   npm run android # Android
   npm run web     # Web
   ```

## Environment Variables

Create a `.env` file with:

```env
EXPO_PUBLIC_BACKEND_HOST=http://localhost:3000
```

## Architecture

```
src/
├── stores/           # Zustand stores
├── types/           # TypeScript types
├── hooks/           # Custom hooks
├── components/      # Reusable components
├── app/            # Expo Router pages
├── interceptor/    # API configuration
└── utils/          # Utility functions
```

## Development

- **Linting:** `npm run lint`
- **Formatting:** `npm run format`
- **Type checking:** Built into your editor with TypeScript

## Technologies

- **React Native** with Expo
- **Zustand** for state management
- **TypeScript** for type safety
- **NativeWind** for styling
- **Expo Router** for navigation
- **Expo SecureStore** for secure data storage
