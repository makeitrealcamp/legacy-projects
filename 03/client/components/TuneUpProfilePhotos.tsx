import { createStyles, Card, Avatar, Text, Button, Image } from '@mantine/core';
import { DropZone } from './DropZone';
import MapForRegister from './MapForRegister';
import { openModal, closeAllModals } from '@mantine/modals';
import { useAppSelector } from '../hooks/redux';
import { useLayoutEffect, useState } from 'react';
import { FileWithPath } from '@mantine/dropzone';
import { useTuneUpProfilePhotosStyles } from './ui/useTuneUpProfilePhotosStyles';

const useStyles = createStyles((theme) => ({
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
type ReaderState = string | ArrayBuffer | null;

export function TuneUpProfilePhotos() {
  const { classes } = useTuneUpProfilePhotosStyles();
  const [toRenderAvatar, setToRenderAvatar] = useState<ReaderState>(null);
  const [toRenderBackground, setToRenderBackground] =
    useState<ReaderState>(null);
  const { avatar, background, name } = useAppSelector((state) => state.user);

  const handleModals = () => {
    closeAllModals();
  };

  const readFileAvatar = (file: FileWithPath | null | undefined) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          setToRenderAvatar(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const readFileBackground = (file: FileWithPath | null | undefined) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          setToRenderBackground(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  useLayoutEffect(() => {
    readFileAvatar(avatar);
    readFileBackground(background);
  }, [avatar, background]);

  const backgroundPhotoPreview =
    toRenderBackground ||
    'https://res.cloudinary.com/dhrs1koll/image/upload/v1667578196/sillevon/zdlh0oo53lzzbvqoslyz.png';

  return (
    <div className={classes.TuneUpProfilePhotos}>
      <div>
        <Card withBorder p='xl' radius='md' className={classes.card}>
          <Image
            src={backgroundPhotoPreview as string}
            width={270}
            height={160}
            alt='background to set'
          />
          <Avatar
            src={toRenderAvatar as string}
            size={100}
            radius={80}
            mx='auto'
            mt={-30}
            className={classes.avatar}
          />
          <Text align='center' size='lg' weight={500} mt='sm'>
            {name || 'Your Name'}
          </Text>
          <div className={classes.buttons}>
            <Button
              onClick={() => {
                openModal({
                  title: 'Avatar image',
                  children: (
                    <>
                      <DropZone type='avatar' />
                      <Button fullWidth onClick={handleModals} mt='md'>
                        Submit
                      </Button>
                    </>
                  ),
                });
              }}
            >
              Avatar
            </Button>
            <Button
              onClick={() => {
                openModal({
                  title: 'Background image',
                  children: (
                    <>
                      <DropZone type='background' />
                      <Button fullWidth onClick={handleModals} mt='md'>
                        Submit
                      </Button>
                    </>
                  ),
                });
              }}
            >
              Background
            </Button>
          </div>
        </Card>
      </div>
      <div>
        <MapForRegister />
      </div>
    </div>
  );
}
