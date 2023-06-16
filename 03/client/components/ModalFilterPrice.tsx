import { useState, Dispatch, SetStateAction } from 'react';
import { Button, RangeSlider } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { setSlicePrice } from '../slices/searchSlice';
import axios from 'axios';
import { IconBug } from '@tabler/icons';
import { showNotification } from '@mantine/notifications';

interface ModalFilterPriceProps {
  closeAllModals: (payload_0?: undefined) => void;
  setArtistsRecomendedFiltered: Dispatch<
    SetStateAction<
      {
        imagesDone: {
          avatar: string;
        };
        name: string;
        email: string;
        mode: string;
        price: number;
      }[]
    >
  >;
  setArtistListFiltered: Dispatch<
    SetStateAction<
      {
        imagesDone: {
          avatar: string;
        };
        name: string;
        email: string;
        mode: string;
        price: number;
      }[]
    >
  >;
}

export function ModalFilterPrice({
  setArtistsRecomendedFiltered,
  setArtistListFiltered,
  closeAllModals,
}: ModalFilterPriceProps) {
  const [rangeValue, setRangeValue] = useState<[number, number]>([10, 30]);
  const dispatch = useAppDispatch();
  const search = useAppSelector((state) => state.search);

  async function handleClick() {
    dispatch(setSlicePrice({ price: rangeValue }));
    closeAllModals();
    try {
      const resRecomended = await axios.get(
        `${
          process.env.NEXT_PUBLIC_HEROKU_BACKEND_URI
        }/api/users/filtered-artists?limit=5&page=1&city=${search.city}&genre=${
          search.genre
        }&price=${JSON.stringify(rangeValue)}&instrument=${search.instrument}`
      );
      if (resRecomended.data.data.docs.length > 0) {
        setArtistsRecomendedFiltered(resRecomended.data.data.docs);
      } else {
        throw new Error('There are not artist with this genre');
      }
      const resList = await axios.get(
        `${
          process.env.NEXT_PUBLIC_HEROKU_BACKEND_URI
        }/api/users/filtered-artists?limit=10&page=1&city=${
          search.city
        }&genre=${search.genre}&price=${JSON.stringify(
          rangeValue
        )}&instrument=${search.instrument}`
      );
      if (resList.data.data.docs.length > 0) {
        setArtistListFiltered(resList.data.data.docs);
      } else {
        throw new Error('There are not artist with this genre');
      }
    } catch {
      showNotification({
        id: 'load-data-user',
        color: 'red',
        title: 'There are not artist with this genre',
        message:
          'Notification will close in 4 seconds, you can close this notification now',
        icon: <IconBug size={16} />,
        autoClose: 4000,
      });
    }
  }

  return (
    <>
      <RangeSlider
        value={rangeValue}
        onChange={setRangeValue}
        mb={40}
        mr={20}
        marks={[
          { value: 10, label: '$10/hr' },
          { value: 30, label: '$30/hr' },
          { value: 50, label: '$50/hr' },
          { value: 70, label: '$70/hr' },
          { value: 100, label: '$100/hr' },
        ]}
      />
      <Button fullWidth onClick={handleClick} mt='md'>
        Submit
      </Button>
    </>
  );
}
