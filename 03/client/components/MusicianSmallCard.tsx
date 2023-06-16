import { useMusicianSmallCardStyles } from './ui/useMusicianSmallCardStyles';
import {
  UnstyledButton,
  UnstyledButtonProps,
  Group,
  Avatar,
  Text,
} from '@mantine/core';
import { IconChevronRight } from '@tabler/icons';

interface MusicianSmallCardProps extends UnstyledButtonProps {
  image: string;
  name: string;
  email: string;
  icon?: React.ReactNode;
}

export function MusicianSmallCard({
  image,
  name,
  email,
  icon,
  ...others
}: MusicianSmallCardProps) {
  const { classes } = useMusicianSmallCardStyles();

  return (
    <UnstyledButton className={classes.user} {...others}>
      <Group>
        <Avatar src={image} radius='xl' />

        <div style={{ flex: 1 }}>
          <Text size='sm' weight={500}>
            {name}
          </Text>

          <Text color='dimmed' size='xs'>
            {email}
          </Text>
        </div>

        {icon || <IconChevronRight size={14} stroke={1.5} />}
      </Group>
    </UnstyledButton>
  );
}
