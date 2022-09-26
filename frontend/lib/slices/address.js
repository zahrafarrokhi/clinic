/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios';

export const IDLE = 'idle';
export const LOADING = 'loading';

export const listAddress = createAsyncThunk(
  'addresses/getall',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/api/patients/address/');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  },
);

export const updateAddress = createAsyncThunk(
  'address/update',
  async (payload, thunkAPI) => {
    try {
      const response = await axios.put(`/api/patients/address/${payload.id}`,payload);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  },
);

const internalInitialState = {
  addresses: [],
  error: null,
  loading: IDLE,
};

export const addressSlice = createSlice({
  name: 'address',
  initialState: internalInitialState,
  reducers: {
    reset: () => internalInitialState,
  },
  extraReducers: (builder) => {
    // listAddress
    builder.addCase(listAddress.fulfilled, (state, action) => {
      state.addresses = action.payload;
      state.loading = IDLE;
    });
    builder.addCase(listAddress.rejected, (state, action) => {
      state.error = action.payload.error;
      state.loading = IDLE;
    });
    builder.addCase(listAddress.pending, (state, action) => {
      state.loading = LOADING;
    });
    // updateAddress
    builder.addCase(updateAddress.fulfilled, (state, action) => {
      state.addresses = [...state.addresses.filter(item=>item.id!==action.payload.id), action.payload].sort((a, b)=>a.id - b.id)
      state.loading = IDLE;
    });
    builder.addCase(updateAddress.rejected, (state, action) => {
      state.error = action.payload.error;
      state.loading = IDLE;
    });
    builder.addCase(updateAddress.pending, (state, action) => {
      state.loading = LOADING;
    });
   
  },
});

export const { reset } = addressSlice.actions;
