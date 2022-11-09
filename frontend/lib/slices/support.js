import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios';

export const IDLE = 'idle';
export const LOADING = 'loading';

export const listTickets = createAsyncThunk(
  'support/list',
  async (data, thunkAPI) => {

    try {
      const response = await axios.get(`/api/support/tickets/`, {params: data});

      console.log(response, response.data);

      return { data: response.data };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  },
);


const internalInitialState = {
  tickets: [],
  ticket:null,
  error: null,
  loading: IDLE, // false ,not busy
};

export const ticketSlice = createSlice({
  name: 'ticket',
  initialState: internalInitialState,
  reducers: {
  
    reset: () => internalInitialState,
  },
  extraReducers: (builder) => {
    //listTickets
    builder.addCase(listTickets.pending, (state) => ({
      ...state,
      loading: LOADING,
    }));
    builder.addCase(listTickets.rejected, (state, action) => ({
      ...state,
      loading: IDLE,
      error: action.payload.error,
    }));
    builder.addCase(listTickets.fulfilled, (state, action) => {
      state.loading = IDLE;
      //total data => action.payload.data
      //up => {...respose.data } or response.data => action.payload
      state.tickets = action.payload.data;
      
      return state;
    });



  },
});

export const { reset,} = ticketSlice.actions;