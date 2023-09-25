import { configureStore, createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // Import Axios
import thunk from "redux-thunk";
import { useDispatch } from 'react-redux';
import { AnyAction, combineReducers } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export {};


const API_URL = 'https://my-json-server.typicode.com/dmitrijt9/book-api-mock/books';

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

export const fetchBooks = createAsyncThunk('bookSlice/fetchBooks', async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}`);
      console.log(response.data)
      return response.data;
    } catch (error: any) {
        return rejectWithValue(error.message)
    }
});

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
    extraReducers: (builder) => {
        builder
          .addCase(fetchBooks.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchBooks.fulfilled, (state, action) => {
            state.loading = false;
            state.searchResults = action.payload;
          })
          .addCase(fetchBooks.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'An error occurred.';
          });
    }
});

export const { setSearchQuery, setSearchResults, setLoading, setError } = bookSlice.actions;

const store = configureStore({
  reducer: {
    book: bookSlice.reducer,
  },
  middleware: [thunk]
});


export type RootState = ReturnType<typeof store.getState>;

type TypedDispatch<T> = ThunkDispatch<T, any, AnyAction>;
export const useAppDispatch = () => useDispatch<TypedDispatch<RootState>>();

export default store;
