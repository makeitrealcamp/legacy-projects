import { Button, Select } from '@mantine/core';
import axios from 'axios';
import { useState, Dispatch, SetStateAction, useLayoutEffect } from 'react';
import { showNotification } from '@mantine/notifications';
import { IconBug } from '@tabler/icons';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { setSliceGenre } from '../slices/searchSlice';

interface ModalFilterGenreProps {
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

export default function ModalFilterGenre({
  closeAllModals,
  setArtistsRecomendedFiltered,
  setArtistListFiltered,
}: ModalFilterGenreProps) {
  const [genre, setGenre] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const search = useAppSelector((state) => state.search);

  useLayoutEffect(() => {
    dispatch(setSliceGenre({ genre }));
  }, [genre, dispatch]);

  async function handleClick() {
    closeAllModals();
    try {
      const resRecomended = await axios.get(
        `${
          process.env.NEXT_PUBLIC_HEROKU_BACKEND_URI
        }/api/users/filtered-artists?limit=5&page=1&city=${
          search.city
        }&genre=${genre}&price=${JSON.stringify(search.price)}&instrument=${
          search.instrument
        }`
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
        }&genre=${genre}&price=${JSON.stringify(search.price)}&instrument=${
          search.instrument
        }`
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
      <Select
        value={genre}
        withAsterisk
        onChange={(value) => setGenre(value)}
        label='Your favorite genre'
        placeholder='Pick one genre'
        searchable
        nothingFound='No options'
        radius='xl'
        clearable
        transition='pop-top-left'
        transitionDuration={80}
        transitionTimingFunction='ease'
        data={[
          { value: 'Rock', label: 'Rock' },
          { value: 'Pop music', label: 'Pop music' },
          { value: 'Popular music', label: 'Popular music' },
          { value: 'Jazz', label: 'Jazz' },
          { value: 'Blues', label: 'Blues' },
          { value: 'Reggaeton', label: 'Reggaeton' },
          { value: 'Cubana', label: 'Cubana' },
          { value: 'Reggae', label: 'Reggae' },
          { value: 'Vallenato', label: 'Vallenato' },
          { value: 'Salsa', label: 'Salsa' },
          { value: 'Cumbia', label: 'Cumbia' },
          {
            value: 'Classical music',
            label: 'Classical music',
          },
          { value: 'Floklore', label: 'Floklore' },
          { value: 'Flamenco', label: 'Flamenco' },
          { value: 'Merengue', label: 'Merengue' },
        ]}
      />
      <Button fullWidth onClick={handleClick} mt='md'>
        Submit
      </Button>
    </>
  );
}
