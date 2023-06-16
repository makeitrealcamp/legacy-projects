import { ActionIcon, Autocomplete, useMantineTheme } from '@mantine/core';
import { IconSearch, IconArrowRight, IconArrowLeft } from '@tabler/icons';
import { Dispatch, SetStateAction } from 'react';
import { colombiaCities } from '../utils/cities';

interface SearcherBarProps {
  iconLoading: boolean;
  filteredArtist: () => Promise<void>;
  city: string;
  setCity: Dispatch<SetStateAction<string>>;
}

export function SearcherBar({
  iconLoading,
  city,
  setCity,
  filteredArtist,
}: SearcherBarProps) {
  const theme = useMantineTheme();

  return (
    <Autocomplete
      data={colombiaCities}
      value={city}
      onChange={(value) => setCity(value)}
      icon={<IconSearch size={18} stroke={1.5} />}
      radius='xl'
      size='lg'
      rightSection={
        <ActionIcon
          onClick={() => filteredArtist()}
          size={32}
          radius='xl'
          color={theme.primaryColor}
          variant='filled'
          loading={iconLoading}
        >
          {theme.dir === 'ltr' ? (
            <IconArrowRight size={18} stroke={1.5} />
          ) : (
            <IconArrowLeft size={18} stroke={1.5} />
          )}
        </ActionIcon>
      }
      placeholder='Search your artists by location'
      rightSectionWidth={42}
    />
  );
}
