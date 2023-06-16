import { useMemo } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { IconPlayerPlay } from '@tabler/icons';
import styles from '../styles/Map.module.scss';

interface MapProps {
  zoom: number;
  center: {
    lat: number;
    lng: number;
  };
  className: string;
  position: {
    lat: number;
    lng: number;
  };
}
const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

export default function Map({ zoom, center, className, position }: MapProps) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });
  const fixedCenter = useMemo(() => center, [center]);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className={styles.mapContainer}>
      <div className={styles.sillevonLogoforMap}>
        <IconPlayerPlay />
        <h2>Sillevon</h2>
      </div>
      <GoogleMap
        zoom={zoom}
        center={fixedCenter}
        mapContainerClassName={className}
        options={options}
      >
        <Marker position={position} />
      </GoogleMap>
    </div>
  );
}
