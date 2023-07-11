import { Input } from '@mantine/core';
import { IconMapPin } from '@tabler/icons';
import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';
import { locate, coordinates } from '../store/reducer/headerReducer';
const ModalLocationSearch = () => {
  const dispatch = useDispatch();
  const homeLocation = useRef('');
  const center = { lat: 4.650176467537301, lng: -74.08958383984998 };
  const libraries = ['places'];

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_API_GOOGLE,
    libraries,
  });

  const [map, setMap] = useState(null);

  if (!isLoaded) {
    return <div>Loading</div>;
  }
  const defaultBounds = {
    north: center.lat + 1,
    south: center.lat - 1,
    east: center.lng + 1,
    west: center.lng - 1,
  };
  const options = {
    bounds: defaultBounds,
    componentRestrictions: { country: 'co' },
    // fields: ["address_components", "geometry", "icon", "name"],
    strictBounds: false,
  };

  // eslint-disable-next-line
  const autocomplete = new google.maps.places.Autocomplete(
    homeLocation.current,
    options,
  );
  // eslint-disable-next-line
  google.maps.event.addListener(autocomplete, 'place_changed', function () {
    testo_geo();
  });

  async function testo_geo() {
    //  console.log('ahlgo');
    // eslint-disable-next-line
    const geocoder = new google.maps.Geocoder();
    // eslint-disable-next-line
    const bounds = new google.maps.LatLngBounds(center);
    const place = autocomplete.getPlace();
    //console.log(place.formatted_address);
    const GeocoderRequest = {
      address: place.formatted_address,
      bounds: bounds,
    };

    const { results } = await geocoder.geocode(GeocoderRequest);
    map.setCenter(results[0].geometry.location);
    // eslint-disable-next-line
    new google.maps.Marker({
      map: map,
      position: results[0].geometry.location,
    });

    dispatch(
      coordinates([
        results[0].geometry.location.lat(),
        results[0].geometry.location.lng(),
      ]),
    );
    dispatch(locate(place.formatted_address));
  }

  return (
    <div className="hostform__mapcontainer__control">
      <Input
        ref={homeLocation}
        type="text"
        // onClick={test()}
        placeholder="Ingresa tu ubicacion"
        icon={<IconMapPin size={16} />}
      />

      <GoogleMap
        center={center}
        zoom={15}
        mapContainerStyle={{ width: '0', height: '0' }}
        onLoad={(map) => setMap(map)}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
        }}
      >
        <Marker position={center} />
      </GoogleMap>
    </div>
  );
};

export default ModalLocationSearch;
