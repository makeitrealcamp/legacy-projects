import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  city?: string;
  genre?: string | null;
  instrument?: string;
  price?: number[];
}

const initialState: SearchState = {
  city: '',
  genre: '',
  instrument: '',
  price: [0, 0],
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSliceCity: (state, action: PayloadAction<SearchState>) => {
      state.city = action.payload.city;
    },
    setSliceGenre: (state, action: PayloadAction<SearchState>) => {
      state.genre = action.payload.genre;
    },
    setSliceInstrument: (state, action: PayloadAction<SearchState>) => {
      state.instrument = action.payload.instrument;
    },
    setSlicePrice: (state, action: PayloadAction<SearchState>) => {
      state.price = action.payload.price;
    },
  },
});

export const {
  setSliceCity,
  setSliceGenre,
  setSliceInstrument,
  setSlicePrice,
} = searchSlice.actions;

export default searchSlice.reducer;
