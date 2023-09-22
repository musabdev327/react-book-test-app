import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

export {};

interface BookState {
  searchQuery: string;
  searchResults: any[];
  loading: boolean;
  error: string | null;
}

const initialState: BookState = {
  searchQuery: '',
  searchResults: [],
  loading: false,
  error: null,
};

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSearchResults: (state, action: PayloadAction<any[]>) => {
      state.searchResults = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setSearchQuery, setSearchResults, setLoading, setError } = bookSlice.actions;

const store = configureStore({
  reducer: {
    book: bookSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
