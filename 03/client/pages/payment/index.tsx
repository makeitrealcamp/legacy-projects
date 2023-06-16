import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../../components/CheckoutForm';
import styles from '../../styles/Payment.module.scss';
import { GetServerSideProps } from 'next';
import Cookies from 'js-cookie';

const stipeSecretKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string;
const stripePromise = loadStripe(stipeSecretKey);

type Appearance = { theme: 'stripe' | 'flat' };

export default function Payment({ contracts }: any) {
  const [clientSecret, setClientSecret] = useState('');
  const token = Cookies.get('sillusr');

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_HEROKU_BACKEND_URI}/api/contracts/create-payment-intent`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ contracts }),
      }
    )
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const appearance: Appearance = {
    theme: 'flat',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className={styles.paymentContainer}>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies['sillusr'];
  const { name } = context.query;
  let contracts;
  try {
    const res = await fetch(
      `${process.env.HEROKU_BACKEND_URI}/api/contracts/by-name/${name}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
      }
    );
    contracts = await res.json();
  } catch (e) {
    contracts = { data: 'There are not contracts' };
  }
  return {
    props: {
      contracts: contracts.data,
    },
  };
};
