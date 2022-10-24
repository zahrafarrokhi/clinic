import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios';

export const IDLE = 'idle';
export const LOADING = 'loading';

export const getToken = createAsyncThunk(
  'chat/token',
  async (at, thunkAPI) => {
    try {
      const response = await axios.post(`/api/chat/chat-token/${at ? `${at}/`: ''}`);

      console.log(response, response.data);

      return { data: response.data };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  },
);



const internalInitialState = {
  token:null,
  error: null,
  loading: IDLE, // false ,not busy
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState: internalInitialState,
  reducers: {
    
    reset: () => internalInitialState,
  },
  extraReducers: (builder) => {
    // getToken
    builder.addCase(getToken.pending, (state) => ({
      ...state,
      loading: LOADING,
    }));
    builder.addCase(getToken.rejected, (state, action) => ({
      ...state,
      loading: IDLE,
      error: action.payload.error,
    }));
    builder.addCase(getToken.fulfilled, (state, action) => {
      state.loading = IDLE; 
      state.token = action.payload.data;
      
      return state;
    });

 


  },
});

export const { reset} = chatSlice.actions;