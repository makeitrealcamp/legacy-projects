import { Overlay, Container, Title, Button, Text } from '@mantine/core';
import { NextPage } from 'next';
import { useHeroStyles } from './ui/useHeroStyles';
import { useRouter } from 'next/router';

const Hero: NextPage = () => {
  const { classes } = useHeroStyles();
  const router = useRouter();
  return (
    <div className={classes.hero}>
      <Overlay
        gradient='linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)'
        opacity={1}
        zIndex={0}
      />
      <Container className={classes.container}>
        <Title className={classes.title}>
          Music has never been so close to you
        </Title>
        <Text className={classes.description} size='xl' mt='xl'>
          We tranforms the way music has been brings to the scenaries. Choose
          your own band for any type of events. Have a bundle of profesional
          artists for any music purposal. If you are a musician, you can make so
          many contacts and enhace your visibility.
        </Text>
        <Button
          onClick={() => router.push('/pricing')}
          variant='gradient'
          size='xl'
          radius='xl'
          className={classes.control}
        >
          Get started
        </Button>
      </Container>
    </div>
  );
};

export default Hero;
