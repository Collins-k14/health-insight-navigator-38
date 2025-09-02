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
    console.log('🔄 Initiating payment for:', { planName, amount, user: user?.email });
    
    if (!user) {
      console.log('❌ No user found');
      toast({
        title: "Authentication Required",
        description: "Please sign in to subscribe to a premium plan.",
        variant: "destructive",
      });
      return;
    }

    console.log('✅ User authenticated:', user.email);

    // Check if Paystack script is already loaded
    if (typeof window !== 'undefined' && window.PaystackPop) {
      console.log('✅ Paystack already loaded');
      processPayment(planName, amount);
      return;
    }

    // Load Paystack script
    console.log('📦 Loading Paystack script...');
    
    return new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://js.paystack.co/v1/inline.js';
      script.async = true;
      
      script.onload = () => {
        console.log('✅ Paystack script loaded successfully');
        // Wait a bit for the script to initialize
        setTimeout(() => {
          if (window.PaystackPop) {
            processPayment(planName, amount);
            resolve();
          } else {
            console.error('❌ PaystackPop not available after script load');
            toast({
              title: "Payment Error",
              description: "Payment system failed to initialize. Please refresh and try again.",
              variant: "destructive",
            });
            reject(new Error('PaystackPop not available'));
          }
        }, 100);
      };
      
      script.onerror = (error) => {
        console.error('❌ Failed to load Paystack script:', error);
        toast({
          title: "Payment Error",
          description: "Failed to load payment system. Please check your internet connection and try again.",
          variant: "destructive",
        });
        reject(error);
      };
      
      document.head.appendChild(script);
    });
  };

  const processPayment = (planName: string, amount: number) => {
    console.log('💳 Processing payment with Paystack...');
    
    // Validate that PaystackPop is available
    if (!window.PaystackPop || typeof window.PaystackPop.setup !== 'function') {
      console.error('❌ PaystackPop is not properly loaded');
      toast({
        title: "Payment Setup Error",
        description: "Payment system is not ready. Please refresh the page and try again.",
        variant: "destructive",
      });
      return;
    }

    const reference = `PSK_${Date.now()}_${Math.floor(Math.random() * 1000000)}`;
    
    const config = {
      key: PAYSTACK_PUBLIC_KEY,
      email: user?.email || '',
      amount: amount * 100, // Paystack expects amount in kobo/cents
      currency: 'USD',
      ref: reference,
      metadata: {
        planName,
        userId: user?.id || '',
      },
      callback: (response: any) => {
        console.log('✅ Payment callback received:', response);
        // Handle payment success without async/await in callback
        handlePaymentSuccess(response, planName, amount);
      },
      onClose: () => {
        console.log('❌ Payment window closed');
        toast({
          title: "Payment Cancelled",
          description: "Payment window was closed before completion.",
        });
      }
    };

    console.log('🔧 Payment config:', { 
      email: config.email, 
      amount: config.amount, 
      currency: config.currency, 
      ref: config.ref,
      key: config.key.substring(0, 10) + '...' // Only show first 10 chars of key for security
    });

    try {
      const handler = window.PaystackPop.setup(config);
      
      if (!handler || typeof handler.openIframe !== 'function') {
        throw new Error('Invalid Paystack handler returned');
      }
      
      console.log('🚀 Opening Paystack iframe...');
      handler.openIframe();
    } catch (error) {
      console.error('❌ Error setting up Paystack:', error);
      toast({
        title: "Payment Setup Error",
        description: "Failed to initialize payment. Please try refreshing the page.",
        variant: "destructive",
      });
    }
  };

  const handlePaymentSuccess = (response: any, planName: string, amount: number) => {
    console.log('🎉 Processing successful payment:', response);
    
    // Use setTimeout to handle async operations outside the callback
    setTimeout(async () => {
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
          console.error('❌ Error storing payment:', error);
          toast({
            title: "Payment Processing Error",
            description: "Payment was successful but there was an issue storing the record. Please contact support.",
            variant: "destructive",
          });
          return;
        }

        console.log('✅ Payment record stored successfully');
        toast({
          title: "Payment Successful!",
          description: `You've successfully subscribed to the ${planName} plan. Welcome to premium!`,
        });

      } catch (error) {
        console.error('❌ Payment processing error:', error);
        toast({
          title: "Payment Processing Error",
          description: "There was an issue processing your payment. Please contact support.",
          variant: "destructive",
        });
      }
    }, 0);
  };

  return { initiatePayment };
};

// Extend window object to include PaystackPop
declare global {
  interface Window {
    PaystackPop: any;
  }
}