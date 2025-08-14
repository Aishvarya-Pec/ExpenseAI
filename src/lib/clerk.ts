// Clerk configuration and helper functions
// Clerk configuration
export const clerkConfig = {
  publishableKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || 'pk_test_your-clerk-key',
};
// Database helper functions (these would need to be updated to work with your backend)
// For now, we'll keep the interface but implement with localStorage or your preferred backend
export const getExpenses = async (userId: string) => {
  // This would typically call your backend API
  const stored = localStorage.getItem(`expenses_${userId}`);
  return stored ? JSON.parse(stored) : [];
};
export const addExpense = async (expense: Omit<import('../types').Expense, 'id' | 'created_at' | 'updated_at'>) => {
  const newExpense = {
    ...expense,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  
  const expenses = await getExpenses(expense.user_id);
  expenses.unshift(newExpense);
  localStorage.setItem(`expenses_${expense.user_id}`, JSON.stringify(expenses));
  
  return newExpense;
};
export const deleteExpense = async (id: string) => {
  // This would typically call your backend API
  // For now, we'll need the userId to remove from localStorage
  // This is a simplified implementation

  // Delete expense functionality
  return id; // Return the id to satisfy TypeScript
};
export const getBudgets = async (userId: string) => {
  // This would typically call your backend API
  const stored = localStorage.getItem(`budgets_${userId}`);
  return stored ? JSON.parse(stored) : [];
};