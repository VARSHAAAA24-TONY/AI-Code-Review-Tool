/**
 * AUDIT_HISTORY_SCHEMA
 * Logic containment ledger for the AI Code Review Tool.
 */

-- 1. Create the table
CREATE TABLE IF NOT EXISTS public.audit_history (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE DEFAULT auth.uid(),
    code_input TEXT NOT NULL,
    repo_url TEXT DEFAULT 'Direct Input',
    analysis_result JSONB NOT NULL,
    score DECIMAL(3,1) DEFAULT 0.0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.audit_history ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Users can only view their own audits
CREATE POLICY "Users can view own audits" ON public.audit_history
    FOR SELECT USING (auth.uid() = user_id);

-- 4. Policy: Users can only insert their own audits
CREATE POLICY "Users can insert own audits" ON public.audit_history
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 5. Create index for faster forensic retrieval
CREATE INDEX IF NOT EXISTS idx_audit_user_id ON public.audit_history(user_id);
