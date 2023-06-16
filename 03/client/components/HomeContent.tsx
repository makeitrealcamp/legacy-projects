import {
  Badge,
  Group,
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
} from '@mantine/core';
import { IconGauge, IconUser, IconCookie } from '@tabler/icons';
import { NextPage } from 'next';
import { useHomeContentStyles } from './ui/useHomeContentStyles';

const mockdata = [
  {
    title: 'Extreme performance',
    description:
      'This is a powerful tool for make your bussiness more visited with live music.',
    icon: IconGauge,
  },
  {
    title: 'Privacy focused',
    description: 'People can feel theyself secure when contract a musician.',
    icon: IconUser,
  },
  {
    title: 'No third parties',
    description:
      'The importance is contract musician without third parties means you do not pay comisions.',
    icon: IconCookie,
  },
];

const HomeContent: NextPage = () => {
  const { classes, theme } = useHomeContentStyles();
  const features = mockdata.map((feature) => (
    <Card
      key={feature.title}
      shadow='md'
      radius='md'
      className={classes.card}
      p='xl'
    >
      <feature.icon size={50} stroke={2} color={theme.fn.primaryColor()} />
      <Text size='lg' weight={500} className={classes.cardTitle} mt='md'>
        {feature.title}
      </Text>
      <Text size='sm' color='dimmed' mt='sm'>
        {feature.description}
      </Text>
    </Card>
  ));

  return (
    <Container size='lg' py='xl'>
      <Group position='center'>
        <Badge variant='filled' size='lg'>
          Why you need us
        </Badge>
      </Group>

      <Title order={2} className={classes.title} align='center' mt='sm'>
        Hire a musician or a band efforlessly according to your needs
      </Title>

      <Text
        color='dimmed'
        className={classes.description}
        align='center'
        mt='md'
      >
        To contact a musician or a band could be too dificult whether you do not
        have contacts, this web allows you to contract a musician without
        intermediaries.
      </Text>

      <SimpleGrid
        cols={3}
        spacing='xl'
        mt={50}
        breakpoints={[{ maxWidth: 'md', cols: 1 }]}
      >
        {features}
      </SimpleGrid>
    </Container>
  );
};
export default HomeContent;
