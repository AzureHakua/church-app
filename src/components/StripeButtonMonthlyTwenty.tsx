import React, { useEffect, useRef } from 'react';

export default function StripeButtonMonthlyTwenty() {
  // Use a ref to track if the button has been mounted
  const isMounted = useRef(false);

  useEffect(() => {
    // Only proceed if not already mounted
    if (isMounted.current) return;
    isMounted.current = true;
    
    // Load Stripe script
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/buy-button.js';
    script.async = true;
    document.body.appendChild(script);

    // Create and mount the buy button after script loads
    script.onload = () => {
      const buyButton = document.createElement('stripe-buy-button');
      buyButton.setAttribute('buy-button-id', 'buy_btn_1Qq6WN078p2tLrNyHmnpAYAQ');
      buyButton.setAttribute(
        'publishable-key',
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
      );
      
      // Mount the button to a container div
      const container = document.getElementById('stripe-buy-button-container-m20');
      if (container) {
        container.appendChild(buyButton);
      }
    };

    // Cleanup on component unmount
    return () => {
      document.body.removeChild(script);
      const container = document.getElementById('stripe-buy-button-container-m20');
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return <div id="stripe-buy-button-container-m20"></div>;
}