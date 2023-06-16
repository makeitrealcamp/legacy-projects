import {
  UnstyledButton,
  UnstyledButtonProps,
  Group,
  Avatar,
  Text,
} from '@mantine/core';
import { useUserStyles } from './ui/useUserStyles';
import { IconChevronRight } from '@tabler/icons';
import { Dispatch, SetStateAction } from 'react';
import { ChatProps } from '../pages/profile/client/chat';

interface UserButtonProps extends UnstyledButtonProps {
  index: number;
  setIsSelected: Dispatch<SetStateAction<number | null>>;
  setCurrentChat: Dispatch<SetStateAction<ChatProps | null>>;
  user: any;
}

export function User({
  index,
  setCurrentChat,
  user,
  setIsSelected,
}: UserButtonProps) {
  const { classes } = useUserStyles();

  return (
    <UnstyledButton
      className={classes.user}
      onClick={() => {
        setCurrentChat(user);
        setIsSelected(index + 1);
      }}
    >
      <Group>
        <Avatar src={user.imagesDone.avatar} radius='xl' />
        <div style={{ flex: 1 }}>
          <Text size='sm' weight={500}>
            {user.name}
          </Text>
          <Text color='dimmed' size='xs'>
            {user.instrument}
          </Text>
        </div>
        <IconChevronRight size={14} stroke={1.5} />
      </Group>
    </UnstyledButton>
  );
}
