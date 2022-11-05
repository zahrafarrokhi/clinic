import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios';

export const IDLE = 'idle';
export const LOADING = 'loading';

export const loadPayments = createAsyncThunk(
  'payments/list',
  async ({limit,offset,ordering, ...filters}, thunkAPI) => {

    try {
      const response = await axios.get(`/api/payments/payments/`,{params:{limit,offset,ordering, ...filters}});

      console.log(response, response.data);

      return { data: response.data };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  },
);




const internalInitialState = {
  payments: [],
  payment:null,
  error: null,
  loading: IDLE, // false ,not busy
};

export const paymentSlice = createSlice({
  name: 'payment',
  initialState: internalInitialState,
  reducers: {
  
    reset: () => internalInitialState,
  },
  extraReducers: (builder) => {
    // loadPayments
    builder.addCase(loadPayments.pending, (state) => ({
      ...state,
      loading: LOADING,
    }));
    builder.addCase(loadPayments.rejected, (state, action) => ({
      ...state,
      loading: IDLE,
      error: action.payload.error,
    }));
    builder.addCase(loadPayments.fulfilled, (state, action) => {
      state.loading = IDLE;
      //total data => action.payload.data
      //up => {...respose.data } or response.data => action.payload
      state.payments= action.payload.data;
      
      return state;
    });

  },
});

export const { reset,} = paymentSlice.actions;