-- Enable RLS on profiles table and create policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Users can view their own profile
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = id);

-- Users can insert their own profile
CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = id);

-- Enable RLS on medical_history table and create policies
ALTER TABLE public.medical_history ENABLE ROW LEVEL SECURITY;

-- Users can view their own medical history
CREATE POLICY "Users can view their own medical history" 
ON public.medical_history 
FOR SELECT 
USING (auth.uid() = user_id);

-- Users can insert their own medical history
CREATE POLICY "Users can insert their own medical history" 
ON public.medical_history 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Users can update their own medical history
CREATE POLICY "Users can update their own medical history" 
ON public.medical_history 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Enable RLS on payments table and create policies
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Users can view their own payments
CREATE POLICY "Users can view their own payments" 
ON public.payments 
FOR SELECT 
USING (auth.uid() = user_id);

-- Users can insert their own payments
CREATE POLICY "Users can insert their own payments" 
ON public.payments 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signups
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();