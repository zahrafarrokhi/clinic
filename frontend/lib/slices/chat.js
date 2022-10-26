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


export const sendVisitMessage = createAsyncThunk(
  'chat/send',
  async ({visit_id,p_id, ...cred}, thunkAPI) => {
    try {
      const response = await axios.post(`/api/chat/send-message/${visit_id }/${p_id?`${p_id}/`:''}`,cred);

      return { data: response.data};
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  },
);

export const listMessages = createAsyncThunk(
  'chat/list-messages',
  async ({visit_id,p_id,}, thunkAPI) => {
    try {
      const response = await axios.get(`/api/chat/list-messages/${visit_id }/${p_id?`${p_id}/`:''}`);

      return { data: response.data};
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  },
);

const internalInitialState = {
  token:null,
  messages: { messages: [], offset: 0, count: 0, total: 0},
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
  
   // sendVisitMessage 
   builder.addCase(sendVisitMessage .pending, (state) => ({
    ...state,
    loading: LOADING,
  }));
  builder.addCase(sendVisitMessage .rejected, (state, action) => ({
    ...state,
    loading: IDLE,
    error: action.payload.error,
  }));
  builder.addCase(sendVisitMessage .fulfilled, (state, action) => {
    state.loading = IDLE; 
    
    
    return state;
  });

// listMessages
builder.addCase(listMessages .pending, (state) => ({
  ...state,
  loading: LOADING,
}));
builder.addCase(listMessages .rejected, (state, action) => ({
  ...state,
  loading: IDLE,
  error: action.payload.error,
}));
builder.addCase(listMessages .fulfilled, (state, action) => {
  state.loading = IDLE; 
  state.messages = action.payload.data
  
  return state;
});


 


  },
});

export const { reset} = chatSlice.actions;