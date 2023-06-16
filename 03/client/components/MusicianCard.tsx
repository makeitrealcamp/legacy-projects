import { Avatar, Text, Button, Paper } from '@mantine/core';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

interface MusicianCardProps {
  avatar: string;
  name: string;
  instrument?: string | undefined;
  price: number;
  email: string;
  genre?: string;
}

const MusicianCard: NextPage<MusicianCardProps> = ({
  avatar,
  name,
  instrument,
  price,
  email,
}) => {
  const router = useRouter();
  return (
    <Paper
      radius='md'
      withBorder
      p='lg'
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
      })}
    >
      <Avatar src={avatar} size={120} radius={120} mx='auto' />
      <Text align='center' size='lg' weight={500} mt='md'>
        {name}
      </Text>
      <Text align='center' color='dimmed' size='sm'>
        {instrument} • $ {price.toFixed(2)} /hr
      </Text>
      <Button
        variant='default'
        fullWidth
        mt='md'
        radius='md'
        onClick={() => router.push(`/artists/${email}`)}
      >
        Go to profile
      </Button>
    </Paper>
  );
};

export default MusicianCard;
