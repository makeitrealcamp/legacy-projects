import { GetServerSideProps } from 'next';
import Layout from '../components/Layout';
import { Text, SegmentedControl } from '@mantine/core';
import styles from '../styles/Pricing.module.scss';
import { useState } from 'react';
import { PricingCard } from '../components/PricingCard';

type Plan = {
  title: string;
  features: string[];
  billing: string;
  description: string;
  price: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
}[];

interface PricingProps {
  yearly: Plan;
  monthly: Plan;
}

const Pricing = ({ yearly, monthly }: PricingProps) => {
  const [billing, setBilling] = useState('monthly');

  const monthlyToRender = monthly.map((plan, i) => (
    <PricingCard key={`${plan._id}monthly${i}`} plan={plan} />
  ));
  const yearlyToRender = yearly.map((plan, i) => (
    <PricingCard key={`${plan._id}yearly${i + 1}`} plan={plan} />
  ));

  return (
    <Layout title='Sillevon | Pricing'>
      <div className={styles.pricing}>
        <div className={styles.title}>
          <Text
            component='span'
            align='center'
            variant='gradient'
            gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
            size={60}
            weight={700}
            style={{ fontFamily: 'Greycliff CF, sans-serif' }}
          >
            Pricing plans
          </Text>
        </div>
        <div className={styles.description}>
          <Text>
            If you have a bussines and you want live music in your place, those
            plans are for you!
          </Text>
        </div>
        <SegmentedControl
          className={styles.segmented}
          size='lg'
          value={billing}
          onChange={setBilling}
          data={[
            { label: 'Monthly billing', value: 'monthly' },
            { label: 'Yearly billing', value: 'yearly' },
          ]}
        />
        <div className={styles.cardsContainer}>
          {billing === 'monthly' ? monthlyToRender : yearlyToRender}
        </div>
      </div>
    </Layout>
  );
};

export default Pricing;

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${process.env.HEROKU_BACKEND_URI}/api/plans/all`, {
    method: 'GET',
  });
  const plans = await res.json();
  const yearly = plans.data
    .filter((plan: any) => plan.billing === 'yearly')
    .reverse();
  const monthly = plans.data
    .filter((plan: any) => plan.billing === 'monthly')
    .reverse();
  return {
    props: {
      yearly,
      monthly,
    },
  };
};
