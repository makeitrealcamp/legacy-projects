import { TextInput, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { setSliceInstrument } from '../slices/searchSlice';
import { IconBug } from '@tabler/icons';
import { showNotification } from '@mantine/notifications';
import { Dispatch, SetStateAction } from 'react';
import axios from 'axios';

interface ModalFilterInstrumentProps {
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

export default function ModalFilterInstrument({
  closeAllModals,
  setArtistsRecomendedFiltered,
  setArtistListFiltered,
}: ModalFilterInstrumentProps) {
  const dispatch = useAppDispatch();
  const search = useAppSelector((state) => state.search);
  const form = useForm({
    initialValues: {
      instrument: '',
    },
  });

  return (
    <form
      onSubmit={form.onSubmit(async (values) => {
        closeAllModals();
        dispatch(
          setSliceInstrument({ instrument: values.instrument.toLowerCase() })
        );
        try {
          const resRecomended = await axios.get(
            `${
              process.env.NEXT_PUBLIC_HEROKU_BACKEND_URI
            }/api/users/filtered-artists?limit=5&page=1&city=${
              search.city
            }&genre=${search.genre}&price=${JSON.stringify(
              search.price
            )}&instrument=${form.values.instrument}`
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
              search.price
            )}&instrument=${form.values.instrument}`
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
      })}
    >
      <TextInput
        value={form.values.instrument}
        onChange={(e) =>
          form.setFieldValue('instrument', e.currentTarget.value)
        }
        placeholder='Search by instruments'
        label='Instument'
        withAsterisk
        radius='xl'
      />
    </form>
  );
}
