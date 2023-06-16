import { createStyles } from '@mantine/core';

export const useTuneUpProfilePhotosStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    width: '20rem',
    height: '26rem',
  },

  avatar: {
    border: `2px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white
    }`,
  },
  TuneUpProfilePhotos: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  map: {
    width: '30rem',
    height: '25rem',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    height: '5rem',
    marginTop: '1rem',
  },
  imageCard: {
    height: 160,
    width: 320,
    objectFit: 'cover',
  },
}));
