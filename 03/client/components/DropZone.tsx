import { Group, Text, useMantineTheme } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useAppDispatch } from '../hooks/redux';
import { setAvatar, setBackground } from '../slices/userSlice';
import { Dispatch, SetStateAction } from 'react';

interface DropZoneProps {
  type: string;
  setImage?: Dispatch<SetStateAction<null | FileWithPath>> | undefined;
}

export function DropZone({ type, setImage }: DropZoneProps) {
  const theme = useMantineTheme();
  const dispatch = useAppDispatch();
  return (
    <Dropzone
      onDrop={(files) => {
        if (type === 'avatar') {
          dispatch(setAvatar({ avatar: files[0] }));
        } else if (type === 'background') {
          dispatch(setBackground({ background: files[0] }));
        } else if (type === 'post' && setImage) {
          setImage(files[0]);
        }
      }}
      onReject={(files) => console.log('rejected files', files)}
      maxSize={3 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
    >
      <Group
        position='center'
        spacing='xl'
        style={{ minHeight: 220, pointerEvents: 'none' }}
      >
        <Dropzone.Accept>
          <IconUpload
            size={50}
            stroke={1.5}
            color={
              theme.colors[theme.primaryColor][
                theme.colorScheme === 'dark' ? 4 : 6
              ]
            }
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX
            size={50}
            stroke={1.5}
            color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
          />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconPhoto size={50} stroke={1.5} />
        </Dropzone.Idle>

        <div>
          <Text size='xl' inline>
            Drag your {type} image here or click to select file
          </Text>
          <Text size='sm' color='dimmed' inline mt={7}>
            Attached file should not exceed 5mb
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
}
