import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface User {
  id: string;
  name: string;
  email: string;
  profile_picture_path?: string;
  created_at: string;
}

export interface Transaction {
  id: string;
  user_id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description?: string;
  date: string;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
  icon: string;
  color: string;
}

export const defaultCategories: Omit<Category, 'id'>[] = [
  { name: 'Food & Dining', type: 'expense', icon: '🍽️', color: '#ef4444' },
  { name: 'Transportation', type: 'expense', icon: '🚗', color: '#3b82f6' },
  { name: 'Shopping', type: 'expense', icon: '🛍️', color: '#8b5cf6' },
  { name: 'Entertainment', type: 'expense', icon: '🎬', color: '#06b6d4' },
  { name: 'Bills & Utilities', type: 'expense', icon: '📱', color: '#f59e0b' },
  { name: 'Healthcare', type: 'expense', icon: '🏥', color: '#10b981' },
  { name: 'Education', type: 'expense', icon: '📚', color: '#6366f1' },
  { name: 'Travel', type: 'expense', icon: '✈️', color: '#ec4899' },
  { name: 'Salary', type: 'income', icon: '💰', color: '#10b981' },
  { name: 'Freelance', type: 'income', icon: '💻', color: '#3b82f6' },
  { name: 'Investment', type: 'income', icon: '📈', color: '#8b5cf6' },
  { name: 'Gift', type: 'income', icon: '🎁', color: '#f59e0b' },
];