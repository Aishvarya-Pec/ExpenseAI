// Type definitions for our expense tracker
export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  created_at: string;
}

export interface Expense {
  id: string;
  user_id: string;
  title: string;
  amount: number;
  category: string;
  description?: string;
  date: string;
  payment_method: 'cash' | 'card' | 'digital' | 'crypto';
  is_recurring: boolean;
  tags: string[];
  ai_category?: string;
  ai_confidence?: number;
  created_at: string;
  updated_at: string;
}

export interface Budget {
  id: string;
  user_id: string;
  category: string;
  amount: number;
  period: 'weekly' | 'monthly' | 'yearly';
  spent: number;
  created_at: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  target_amount: number;
  duration_days: number;
  difficulty: 'easy' | 'medium' | 'hard';
  reward_points: number;
  icon: string;
}

export type Theme = 'light' | 'dark';
export type Currency = 'USD' | 'EUR' | 'GBP' | 'INR';