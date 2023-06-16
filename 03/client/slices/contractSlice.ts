import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface ContractState {
  artists?: [];
  price?: number;
}

const initialState: ContractState = {
  artists: [],
  price: 0,
};

const contractSlice = createSlice({
  name: 'contract',
  initialState,
  reducers: {
    setSliceArtists: (state, action: PayloadAction<ContractState>) => {
      state.artists = action.payload.artists;
    },
    setSlicePrice: (state, action: PayloadAction<ContractState>) => {
      state.price = action.payload.price;
    },
  },
});

export const { setSliceArtists, setSlicePrice } = contractSlice.actions;

export default contractSlice.reducer;
