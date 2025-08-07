# Setup Guide

## Authentication Setup

The app now includes a **mock authentication system** that works without Supabase for development. However, for production use, you'll need to set up Supabase.

### Option 1: Use Mock Authentication (Development)

The app will automatically use mock authentication if Supabase is not configured. You can:
- Sign up with any email/password
- Sign in with any email/password
- All authentication will work locally

### Option 2: Set Up Supabase (Production)

1. **Create a Supabase Project:**
   - Go to [https://supabase.com](https://supabase.com)
   - Sign up and create a new project
   - Wait for the project to be ready

2. **Get Your Credentials:**
   - Go to Settings > API in your Supabase dashboard
   - Copy the "Project URL" (looks like: `https://xyz.supabase.co`)
   - Copy the "anon public" key (starts with `eyJ...`)

3. **Create Environment File:**
   - Create a `.env` file in the project root
   - Add your credentials:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

4. **Set Up Database Tables:**
   - Go to SQL Editor in Supabase
   - Run the following SQL to create the required tables:

```sql
-- Create expenses table
CREATE TABLE expenses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  payment_method TEXT NOT NULL,
  is_recurring BOOLEAN DEFAULT FALSE,
  tags TEXT[] DEFAULT '{}',
  ai_category TEXT,
  ai_confidence DECIMAL(3,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create budgets table
CREATE TABLE budgets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  period TEXT NOT NULL,
  spent DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE budgets ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own expenses" ON expenses
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own expenses" ON expenses
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own expenses" ON expenses
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own expenses" ON expenses
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own budgets" ON budgets
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own budgets" ON budgets
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own budgets" ON budgets
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own budgets" ON budgets
  FOR DELETE USING (auth.uid() = user_id);
```

5. **Restart Development Server:**
   ```bash
   npm run dev
   ```

## Current Status

✅ **Mock Authentication:** Working for development  
✅ **Navigation Fix:** Users will be redirected to dashboard after login  
✅ **All Components:** Error-free and functional  
✅ **Development Server:** Running on http://localhost:5173

The app is now fully functional with mock authentication. You can test all features without setting up Supabase! 