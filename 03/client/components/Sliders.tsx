import { Center, Slider, Text, TextInput, Select } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../hooks/redux';
import styles from '../styles/Sliders.module.scss';
import {
  setSkills,
  setPriceToSlice,
  setSliceGenre,
  setSliceInstrumentation,
} from '../slices/userSlice';

export default function Sliders() {
  const [improvisation, setImprovisation] = useState(30);
  const [show, setShow] = useState(30);
  const [repertoire, setRepertoire] = useState(30);
  const [versatility, setVersatility] = useState(30);
  const [instrumentation, setInstrumentation] = useState(30);
  const [price, setPrice] = useState(10);
  const [genre, setGenre] = useState<string>('');
  const [instrument, setInstrument] = useState<string>('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setPriceToSlice({ price }));
    dispatch(setSliceGenre({ genre }));
    dispatch(
      setSliceInstrumentation({ instrument: instrument?.toLowerCase() })
    );
    dispatch(
      setSkills({
        skills: {
          improvisation,
          show,
          repertoire,
          versatility,
          instrumentation,
        },
      })
    );
  }, [
    improvisation,
    show,
    repertoire,
    instrument,
    price,
    genre,
    versatility,
    instrumentation,
    dispatch,
  ]);

  return (
    <div className={styles.sliders}>
      <Center>
        <Text
          component='span'
          align='center'
          variant='gradient'
          gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
          size={60}
          weight={700}
          style={{ fontFamily: 'Greycliff CF, sans-serif' }}
        >
          Select your skills and price
        </Text>
      </Center>
      <div className={styles.genreAndInstrument}>
        <TextInput
          value={instrument}
          onChange={(e) => setInstrument(e.target.value)}
          placeholder='Type your instrument or band in case'
          label='Instument/Band'
          withAsterisk
          radius='xl'
        />
        <Select
          value={genre}
          withAsterisk
          onChange={(value) => setGenre(value as string)}
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
            { value: 'Classical music', label: 'Classical music' },
            { value: 'Floklore', label: 'Floklore' },
            { value: 'Flamenco', label: 'Flamenco' },
            { value: 'Merengue', label: 'Merengue' },
          ]}
        />
      </div>
      <div className={styles.eachOneSlider}>
        <p>Improvisation</p>
        <Slider
          value={improvisation}
          onChange={setImprovisation}
          labelTransition='skew-down'
          labelTransitionDuration={150}
          labelTransitionTimingFunction='ease'
          marks={[
            { value: 0, label: '0%' },
            { value: 50, label: '50%' },
            { value: 100, label: '100%' },
          ]}
        />
      </div>
      <div className={styles.eachOneSlider}>
        <p>Show</p>
        <Slider
          value={show}
          onChange={setShow}
          labelTransition='skew-down'
          labelTransitionDuration={150}
          labelTransitionTimingFunction='ease'
          marks={[
            { value: 0, label: '0%' },
            { value: 50, label: '50%' },
            { value: 100, label: '100%' },
          ]}
        />
      </div>
      <div className={styles.eachOneSlider}>
        <p>Repertorie</p>
        <Slider
          value={repertoire}
          onChange={setRepertoire}
          labelTransition='skew-down'
          labelTransitionDuration={150}
          labelTransitionTimingFunction='ease'
          marks={[
            { value: 0, label: '0%' },
            { value: 50, label: '50%' },
            { value: 100, label: '100%' },
          ]}
        />
      </div>
      <div className={styles.eachOneSlider}>
        <p>Versatility</p>
        <Slider
          value={versatility}
          onChange={setVersatility}
          labelTransition='skew-down'
          labelTransitionDuration={150}
          labelTransitionTimingFunction='ease'
          marks={[
            { value: 0, label: '0%' },
            { value: 50, label: '50%' },
            { value: 100, label: '100%' },
          ]}
        />
      </div>
      <div className={styles.eachOneSlider}>
        <p>Instrumentation</p>
        <Slider
          value={instrumentation}
          onChange={setInstrumentation}
          labelTransition='skew-down'
          labelTransitionDuration={150}
          labelTransitionTimingFunction='ease'
          marks={[
            { value: 0, label: '0%' },
            { value: 50, label: '50%' },
            { value: 100, label: '100%' },
          ]}
        />
      </div>
      <div className={styles.eachOneSlider}>
        <p>Set your price peer hour</p>
        <Slider
          value={price}
          onChange={setPrice}
          labelTransition='skew-down'
          labelTransitionDuration={150}
          labelTransitionTimingFunction='ease'
          marks={[
            { value: 10, label: '$10/hr' },
            { value: 30, label: '$30/hr' },
            { value: 50, label: '$50/hr' },
            { value: 70, label: '$70/hr' },
            { value: 100, label: '$100/hr' },
          ]}
        />
      </div>
    </div>
  );
}
