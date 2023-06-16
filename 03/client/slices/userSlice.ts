import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { FileWithPath } from '@mantine/dropzone';

export interface UserState {
  name?: string;
  email?: string;
  avatar?: FileWithPath | null;
  background?: FileWithPath | null;
  terms?: boolean;
  mode?: string;
  city?: string;
  price?: number;
  imagesDone?: {
    avatar: string;
    background: string;
  };
  location?: {
    lat: number;
    lng: number;
  };
  skills?: {
    improvisation: number;
    show: number;
    repertoire: number;
    versatility: number;
    instrumentation: number;
  };
  isLogged?: boolean;
  posts?: [];
  favoriteGenres?: {
    title: string;
    instrumentation: string[];
    _id: string;
    createdAt: string;
    updatedAt: string;
  }[];
  genre?: string;
  instrument?: string;
}

const initialState: UserState = {
  name: '',
  email: '',
  avatar: null,
  background: null,
  terms: false,
  mode: '',
  city: '',
  price: 0,
  imagesDone: {
    avatar: '',
    background: '',
  },
  location: {
    lat: 0,
    lng: 0,
  },
  skills: {
    improvisation: 0,
    versatility: 0,
    repertoire: 0,
    instrumentation: 0,
    show: 0,
  },
  isLogged: false,
  favoriteGenres: [],
  posts: [],
  genre: '',
  instrument: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUserData: (state, action: PayloadAction<UserState>) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.imagesDone = action.payload.imagesDone;
      state.mode = action.payload.mode;
    },
    setUserMode: (state, action: PayloadAction<UserState>) => {
      state.mode = action.payload.mode;
    },
    setSkills: (state, action: PayloadAction<UserState>) => {
      state.skills = action.payload.skills;
    },
    setCity: (state, action: PayloadAction<UserState>) => {
      state.city = action.payload.city;
    },
    setLocation: (state, action: PayloadAction<UserState>) => {
      state.location = action.payload.location;
    },
    setAvatar: (state, action: PayloadAction<UserState>) => {
      state.avatar = action.payload.avatar;
    },
    setBackground: (state, action: PayloadAction<UserState>) => {
      state.background = action.payload.background;
    },
    setImages: (state, action: PayloadAction<UserState>) => {
      state.imagesDone = action.payload.imagesDone;
    },
    setLogged: (state, action: PayloadAction<UserState>) => {
      state.isLogged = action.payload.isLogged;
    },
    setOtherData: (state, action: PayloadAction<UserState>) => {
      state.mode = action.payload.mode;
      state.city = action.payload.city;
      state.location = action.payload.location;
      state.skills = action.payload.skills;
      state.favoriteGenres = action.payload.favoriteGenres;
      state.genre = action.payload.genre;
      state.instrument = action.payload.instrument;
    },
    setFavoriteGenres: (state, action: PayloadAction<UserState>) => {
      state.favoriteGenres = action.payload.favoriteGenres;
    },
    setPriceToSlice: (state, action: PayloadAction<UserState>) => {
      state.price = action.payload.price;
    },
    setSliceGenre: (state, action: PayloadAction<UserState>) => {
      state.genre = action.payload.genre;
    },
    setSliceInstrumentation: (state, action: PayloadAction<UserState>) => {
      state.instrument = action.payload.instrument;
    },
  },
});

export const {
  addUserData,
  setUserMode,
  setSkills,
  setSliceInstrumentation,
  setSliceGenre,
  setCity,
  setLocation,
  setImages,
  setAvatar,
  setBackground,
  setLogged,
  setPriceToSlice,
  setOtherData,
  setFavoriteGenres,
} = userSlice.actions;

export default userSlice.reducer;
