import { Category, Currency } from '@/types/financial/shared';

export interface Budget {
  id: string;
  userId: string;
  name: string;
  description: string;
  currentAmount: number;
  goalAmount: number;
  currencyId: number;
  categoryId: number;
  statusId: number;
  startDate: Date;
  finishedDate: Date;
  createdAt: Date;
  updatedAt: Date;
  status?: BudgetState;
  category?: Category;
  currency?: Currency;
  deletedAt?: Date;
}

export interface BudgetState {
  id: number;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface BudgetLineMovement {
  id: number;
  budgetId: string;
  transactionId: string;
  movementType: string; // allocation, actual
  amount: number;
  dateMovement: Date;
}
