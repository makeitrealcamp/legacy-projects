import React from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';
import styles from '../styles/Search.module.scss';
import '@reach/combobox/styles.css';
import { PanToCallback } from './MapForRegister';
import { useAppDispatch } from '../hooks/redux';
import { setCity } from '../slices/userSlice';

interface SearchProps {
  panTo: ({ lat, lng }: PanToCallback) => void;
}

export default function Search({ panTo }: SearchProps) {
  const dispatch = useAppDispatch();
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: new google.maps.LatLng(4.60688, -74.071838),
      radius: 200 * 1000,
    },
  });
  return (
    <div className={styles.search}>
      <Combobox
        onSelect={async (address) => {
          setValue(address, false);
          clearSuggestions();
          try {
            const results = await getGeocode({ address });
            dispatch(setCity({ city: results[0].formatted_address }));
            const { lat, lng } = await getLatLng(results[0]);
            panTo({ lat, lng });
          } catch (error) {
            console.log('error', error);
          }
        }}
      >
        <ComboboxInput
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={!ready}
          placeholder='Enter your location'
        />

        <ComboboxPopover>
          <ComboboxList>
            {status === 'OK' &&
              data.map(({ place_id, description }) => (
                <ComboboxOption key={place_id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}
