import React, { useEffect, useRef } from 'react';

export default function StripeButtonOneTime() {
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
      buyButton.setAttribute('buy-button-id', 'buy_btn_1Qq5WD078p2tLrNyrkcbYgkc');
      buyButton.setAttribute(
        'publishable-key',
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
      );

      // Mount the button to a container div
      const container = document.getElementById('stripe-buy-button-container');
      if (container) {
        container.appendChild(buyButton);
      }
    };

    // Cleanup on component unmount
    return () => {
      document.body.removeChild(script);
      const container = document.getElementById('stripe-buy-button-container');
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return <div id="stripe-buy-button-container"></div>;
}