import { PanToCallback } from './MapForRegister';
import { IconCompass } from '@tabler/icons';
import styles from '../styles/Locate.module.scss';

interface LocateProps {
  panTo: ({ lat, lng }: PanToCallback) => void;
}

export default function Locate({ panTo }: LocateProps) {
  return (
    <button
      className={styles.locateBtn}
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
    >
      <IconCompass size={27} />
    </button>
  );
}
