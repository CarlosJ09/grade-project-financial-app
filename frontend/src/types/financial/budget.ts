import { Currency } from '@/types/financial/shared';

export interface Budget {
  id: string;
  userId: string;
  name: string;
  description: string;
  currentAmount: number;
  goalAmount: number;
  currencyId: number;
  statusId: number;
  categoryId: number;
  budgetAllocationId: number;
  budgetExecutionId: number;
  budgetTypeId: number;
  startedDate: Date;
  finishedDate: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  currency?: Currency;
  status?: BudgetStatus;
  category?: BudgetCategory;
  budgetType?: BudgetType;
}

export interface BudgetStatus {
  id: number;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BudgetCategory {
  id: number;
  name: string;
  budgetTypeId: number;
  createdAt: Date;
  updatedAt: Date;
  budgetType?: BudgetType;
}

export interface BudgetType {
  id: number;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BudgetAllocation {
  id: number;
  budgetId: string;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface BudgetExecution {
  id: number;
  budgetId: string;
  transactionId: string;
  createdAt: Date;
  updatedAt: Date;
}
