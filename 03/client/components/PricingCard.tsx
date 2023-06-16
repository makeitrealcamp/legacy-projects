import { Card, Text, Group, Button } from '@mantine/core';
import { usePricingCardStyles } from './ui/usePricingCardStyles';
import Login from './Login';
import { openModal, closeAllModals } from '@mantine/modals';
import { IconPlayerPlay } from '@tabler/icons';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

interface PricingCardProps {
  plan: {
    title: string;
    features: string[];
    billing: string;
    description: string;
    price: number;
    _id: string;
    createdAt: string;
    updatedAt: string;
  };
}

export function PricingCard({ plan }: PricingCardProps) {
  const { classes } = usePricingCardStyles();
  const router = useRouter();
  const features = plan.features.map((feature) => (
    <Group key={`${feature}${plan._id}`}>
      <IconPlayerPlay size={18} className={classes.icon} stroke={1.5} />
      <Text size='xs'>{feature}</Text>
    </Group>
  ));

  const token = Cookies.get('sillusr');

  function handleClick() {
    if (plan.title === 'single' && !token) {
      openModal({
        title: 'Stay with us',
        children: <Login closeAllModals={closeAllModals} />,
      });
    } else if (plan.title === 'single' && token) {
      router.push('/profile/client');
    }
    if (plan.title === 'light' && !token) {
      openModal({
        title: 'Stay with us',
        children: <Login closeAllModals={closeAllModals} />,
      });
    } else if (plan.title === 'light' && token) {
      openModal({
        title: 'Stay with us',
        children: (
          <>
            <Text>Functionality in delepment...</Text>
            <Button variant='outline' onClick={() => closeAllModals()}>
              Close
            </Button>
          </>
        ),
      });
    }
    if (plan.title === 'plus' && !token) {
      openModal({
        title: 'Stay with us',
        children: <Login closeAllModals={closeAllModals} />,
      });
    } else if (plan.title === 'plus' && token) {
      openModal({
        title: 'Stay with us',
        children: (
          <>
            <Text>Functionality in delepment...</Text>
            <Button variant='outline' onClick={() => closeAllModals()}>
              Close
            </Button>
          </>
        ),
      });
    }
  }

  return (
    <Card withBorder radius='md' className={classes.card}>
      <Text
        component='span'
        align='center'
        variant='gradient'
        gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
        size={50}
        weight={500}
        style={{ fontFamily: 'Greycliff CF, sans-serif' }}
      >
        {plan.title.toUpperCase()}
      </Text>

      <Group position='apart' mt='md'>
        <Text align='center' weight={400}>
          {plan.description}
        </Text>
      </Group>

      <Card.Section className={classes.section} mt='md'>
        <Text size='sm' color='dimmed' className={classes.label}>
          Basic configuration
        </Text>
        <Group spacing={8} mb={-8} className={classes.features}>
          {features}
        </Group>
      </Card.Section>
      <Card.Section className={classes.section}>
        <Group spacing={30}>
          {plan.title === 'single' ? null : (
            <Text size='xl' weight={700} sx={{ lineHeight: 1 }}>
              $ {plan.price.toFixed(2)}
            </Text>
          )}
          <Button radius='xl' style={{ flex: 1 }} onClick={handleClick}>
            {plan.title === 'single' ? 'Go to profile' : 'Subscribe'}
          </Button>
        </Group>
      </Card.Section>
    </Card>
  );
}
