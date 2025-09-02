import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface PaystackConfig {
  key: string;
  email: string;
  amount: number;
  currency: string;
  ref: string;
  metadata: {
    planName: string;
    userId: string;
  };
  callback: (response: any) => void;
  onClose: () => void;
}

export const usePaystack = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const PAYSTACK_PUBLIC_KEY = 'pk_live_4169f4ca6c899dd89ab47bbb79694e29258ce855';

  const initiatePayment = async (planName: string, amount: number) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to subscribe to a premium plan.",
        variant: "destructive",
      });
      return;
    }

    // Load Paystack script dynamically if not already loaded
    if (!window.PaystackPop) {
      const script = document.createElement('script');
      script.src = 'https://js.paystack.co/v1/inline.js';
      script.async = true;
      document.head.appendChild(script);
      
      script.onload = () => {
        processPayment(planName, amount);
      };
    } else {
      processPayment(planName, amount);
    }
  };

  const processPayment = (planName: string, amount: number) => {
    const reference = `PSK_${Date.now()}_${Math.floor(Math.random() * 1000000)}`;
    
    const config: PaystackConfig = {
      key: PAYSTACK_PUBLIC_KEY,
      email: user?.email || '',
      amount: amount * 100, // Paystack expects amount in kobo/cents
      currency: 'USD',
      ref: reference,
      metadata: {
        planName,
        userId: user?.id || '',
      },
      callback: async (response) => {
        await handlePaymentSuccess(response, planName, amount);
      },
      onClose: () => {
        toast({
          title: "Payment Cancelled",
          description: "Payment window was closed before completion.",
        });
      }
    };

    const handler = window.PaystackPop.setup(config);
    handler.openIframe();
  };

  const handlePaymentSuccess = async (response: any, planName: string, amount: number) => {
    try {
      // Store payment record in database
      const { error } = await supabase
        .from('payments')
        .insert({
          user_id: user?.id,
          amount: amount,
          currency: 'USD',
          status: 'success',
          payment_ref: response.reference,
        });

      if (error) {
        console.error('Error storing payment:', error);
        toast({
          title: "Payment Processing Error",
          description: "Payment was successful but there was an issue storing the record. Please contact support.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Payment Successful!",
        description: `You've successfully subscribed to the ${planName} plan. Welcome to premium!`,
      });

    } catch (error) {
      console.error('Payment processing error:', error);
      toast({
        title: "Payment Processing Error",
        description: "There was an issue processing your payment. Please contact support.",
        variant: "destructive",
      });
    }
  };

  return { initiatePayment };
};

// Extend window object to include PaystackPop
declare global {
  interface Window {
    PaystackPop: any;
  }
}