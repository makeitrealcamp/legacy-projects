import React, { useEffect, useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import styles from '../styles/CheckoutForm.module.scss';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      if (paymentIntent) {
        switch (paymentIntent.status) {
          case 'succeeded':
            setMessage('Payment succeeded!');
            break;
          case 'processing':
            setMessage('Your payment is processing.');
            break;
          case 'requires_payment_method':
            setMessage('Your payment was not successful, please try again.');
            break;
          default:
            setMessage('Something went wrong.');
            break;
        }
      }
    });
  }, [stripe]);

  const RETURN_URL = `${process.env.NEXT_PUBLIC_VERCEL_FRONTEND_URI}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: RETURN_URL,
      },
    });

    if (error.type === 'card_error' || error.type === 'validation_error') {
      if (typeof error.message === 'string') {
        setMessage(error.message);
      }
    } else {
      setMessage('An unexpected error occurred.');
    }
    setIsLoading(false);
  };

  return (
    <form
      id='payment-form'
      onSubmit={handleSubmit}
      className={styles.paymentForm}
    >
      <PaymentElement id='payment-element' className={styles.paymentElement} />
      <button
        disabled={isLoading || !stripe || !elements}
        id='submit'
        className={styles.button}
      >
        <span id='button-text'>
          {isLoading ? (
            <div className={styles.spinner} id='spinner'></div>
          ) : (
            'Pay now'
          )}
        </span>
      </button>
      {message && (
        <div id='payment-message' className={styles.paymentMessage}>
          {message}
        </div>
      )}
    </form>
  );
}
