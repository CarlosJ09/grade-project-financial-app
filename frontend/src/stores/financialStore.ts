import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import api from '@/interceptor/core-api';
import type {
  Bank,
  Budget,
  Category,
  Currency,
  PaymentMethod,
  Transaction,
} from '@/types/financial';

interface FinancialState {
  // State
  banks: Bank[];
  transactions: Transaction[];
  budgets: Budget[];
  categories: Category[];
  paymentMethods: PaymentMethod[];
  currencies: Currency[];
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchBanks: () => Promise<void>;
  fetchTransactions: () => Promise<void>;
  fetchBudgets: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  fetchPaymentMethods: () => Promise<void>;

  createTransaction: (
    transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>
  ) => Promise<boolean>;
  updateTransaction: (
    id: string,
    transaction: Partial<Transaction>
  ) => Promise<boolean>;
  deleteTransaction: (id: string) => Promise<boolean>;

  createBudget: (
    budget: Omit<Budget, 'id' | 'createdAt' | 'updatedAt'>
  ) => Promise<boolean>;
  updateBudget: (id: string, budget: Partial<Budget>) => Promise<boolean>;
  deleteBudget: (id: string) => Promise<boolean>;

  clearError: () => void;
  setLoading: (loading: boolean) => void;
  clearAllData: () => void;
}

// Reuse the same secure storage implementation
const secureStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return await SecureStore.getItemAsync(name);
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await SecureStore.setItemAsync(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await SecureStore.deleteItemAsync(name);
  },
};

export const useFinancialStore = create<FinancialState>()(
  persist(
    (set, get) => ({
      // Initial state
      banks: [],
      transactions: [],
      budgets: [],
      categories: [],
      paymentMethods: [],
      currencies: [],
      isLoading: false,
      error: null,

      // Actions
      fetchBanks: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.get('/banks');
          set({ banks: response.data, isLoading: false });
        } catch (error: any) {
          set({
            error: error.response?.data?.message || 'Failed to fetch banks',
            isLoading: false,
          });
        }
      },

      fetchTransactions: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.get('/transactions');
          set({ transactions: response.data, isLoading: false });
        } catch (error: any) {
          set({
            error:
              error.response?.data?.message || 'Failed to fetch transactions',
            isLoading: false,
          });
        }
      },

      fetchBudgets: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.get('/budgets');
          set({ budgets: response.data, isLoading: false });
        } catch (error: any) {
          set({
            error: error.response?.data?.message || 'Failed to fetch budgets',
            isLoading: false,
          });
        }
      },

      fetchCategories: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.get('/categories');
          set({ categories: response.data, isLoading: false });
        } catch (error: any) {
          set({
            error:
              error.response?.data?.message || 'Failed to fetch categories',
            isLoading: false,
          });
        }
      },

      fetchPaymentMethods: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.get('/payment-methods');
          set({ paymentMethods: response.data, isLoading: false });
        } catch (error: any) {
          set({
            error:
              error.response?.data?.message ||
              'Failed to fetch payment methods',
            isLoading: false,
          });
        }
      },

      createTransaction: async transactionData => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post('/transactions', transactionData);
          const newTransaction = response.data;

          set(state => ({
            transactions: [...state.transactions, newTransaction],
            isLoading: false,
          }));

          return true;
        } catch (error: any) {
          set({
            error:
              error.response?.data?.message || 'Failed to create transaction',
            isLoading: false,
          });
          return false;
        }
      },

      updateTransaction: async (id, transactionData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.put(
            `/transactions/${id}`,
            transactionData
          );
          const updatedTransaction = response.data;

          set(state => ({
            transactions: state.transactions.map(t =>
              t.id === id ? updatedTransaction : t
            ),
            isLoading: false,
          }));

          return true;
        } catch (error: any) {
          set({
            error:
              error.response?.data?.message || 'Failed to update transaction',
            isLoading: false,
          });
          return false;
        }
      },

      deleteTransaction: async id => {
        set({ isLoading: true, error: null });
        try {
          await api.delete(`/transactions/${id}`);

          set(state => ({
            transactions: state.transactions.filter(t => t.id !== id),
            isLoading: false,
          }));

          return true;
        } catch (error: any) {
          set({
            error:
              error.response?.data?.message || 'Failed to delete transaction',
            isLoading: false,
          });
          return false;
        }
      },

      createBudget: async budgetData => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post('/budgets', budgetData);
          const newBudget = response.data;

          set(state => ({
            budgets: [...state.budgets, newBudget],
            isLoading: false,
          }));

          return true;
        } catch (error: any) {
          set({
            error: error.response?.data?.message || 'Failed to create budget',
            isLoading: false,
          });
          return false;
        }
      },

      updateBudget: async (id, budgetData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.put(`/budgets/${id}`, budgetData);
          const updatedBudget = response.data;

          set(state => ({
            budgets: state.budgets.map(b => (b.id === id ? updatedBudget : b)),
            isLoading: false,
          }));

          return true;
        } catch (error: any) {
          set({
            error: error.response?.data?.message || 'Failed to update budget',
            isLoading: false,
          });
          return false;
        }
      },

      deleteBudget: async id => {
        set({ isLoading: true, error: null });
        try {
          await api.delete(`/budgets/${id}`);

          set(state => ({
            budgets: state.budgets.filter(b => b.id !== id),
            isLoading: false,
          }));

          return true;
        } catch (error: any) {
          set({
            error: error.response?.data?.message || 'Failed to delete budget',
            isLoading: false,
          });
          return false;
        }
      },

      clearError: () => {
        set({ error: null });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      clearAllData: () => {
        set({
          banks: [],
          transactions: [],
          budgets: [],
          categories: [],
          paymentMethods: [],
          currencies: [],
          error: null,
        });
      },
    }),
    {
      name: 'financial-storage',
      storage: createJSONStorage(() => secureStorage),
      // Cache financial data securely for offline use
      partialize: state => ({
        banks: state.banks,
        transactions: state.transactions,
        budgets: state.budgets,
        categories: state.categories,
        paymentMethods: state.paymentMethods,
        currencies: state.currencies,
      }),
    }
  )
);
