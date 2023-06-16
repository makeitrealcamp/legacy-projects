import { SegmentedControl, Box, Center } from '@mantine/core';
import { IconEar, IconMusic } from '@tabler/icons';
import { Dispatch, useEffect, useState, SetStateAction } from 'react';
import { useAppDispatch } from '../hooks/redux';
import { setUserMode } from '../slices/userSlice';

interface UserModeProps {
  setIsCustomer: Dispatch<SetStateAction<boolean>>;
}

export default function UserMode({ setIsCustomer }: UserModeProps) {
  const [mode, setMode] = useState('customer');
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setUserMode({ mode }));
  }, [mode, dispatch]);

  return (
    <SegmentedControl
      value={mode}
      onChange={(value) => {
        setIsCustomer((prev) => !prev);

        setMode(value);
      }}
      fullWidth
      size='xl'
      radius='xl'
      transitionDuration={500}
      transitionTimingFunction='linear'
      color='blue'
      data={[
        {
          label: (
            <Center>
              <IconEar size={16} />
              <Box ml={10}>Customer</Box>
            </Center>
          ),
          value: 'customer',
        },
        {
          label: (
            <Center>
              <IconMusic size={16} />
              <Box ml={10}>Artist/Band</Box>
            </Center>
          ),
          value: 'artist/band',
        },
      ]}
    />
  );
}
