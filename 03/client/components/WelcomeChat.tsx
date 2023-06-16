import { Center, Text } from '@mantine/core';

export default function WelcomeChat() {
  return (
    <Center>
      <Text
        component='span'
        align='center'
        variant='gradient'
        gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
        size={60}
        weight={700}
        style={{ fontFamily: 'Greycliff CF, sans-serif' }}
      >
        Start chat with someone!
      </Text>
    </Center>
  );
}
