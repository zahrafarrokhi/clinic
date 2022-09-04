import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios';

export const IDLE = 'idle';
export const LOADING = 'loading';

export const loginWithSms = createAsyncThunk(
  'auth/login-sms',
  async (cred, thunkAPI) => {
    try {
      const response = await axios.post('/api/auth/login/sms/', cred);

      console.log(response, response.data);

      return { data: response.data };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  },
);
// export const loginWithEmail = createAsyncThunk(
//   'auth/login-email',
//   // email => {email:username} 
//   async (email, thunkAPI) => {
//     try {
//       
//       const response = await axios.post('/api/auth/login/email/', email);

//       console.log(response, response.data);

//       return { data: response.data };
//     } catch (error) {
//       console.log(error);
//       return thunkAPI.rejectWithValue({ error: error.response.data });
//     }
//   },
// );

export const loginWithEmail = createAsyncThunk(
  'auth/login-email',
  // email => username
  async (email, thunkAPI) => {
    try {
      //backend :email => username
      const response = await axios.post('/api/auth/login/email/',{email:email} );

      console.log(response, response.data);

      return { data: response.data };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  },
);
//confirm
export const confirm = createAsyncThunk(
  'auth/confirm',
  
  async (cred, thunkAPI) => {
    try {
      
      const response = await axios.post('/api/auth/confirm/',cred );

      console.log(response, response.data);

      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  },
);


const internalInitialState = {
  username: null,
  method:null,
  user: null,
  access: null,
  refresh:null,
  error: null,
  loading: IDLE, // false ,not busy
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: internalInitialState,
  reducers: {
    // setUsername : (state,action) => {},
    reset: () => internalInitialState,
  },
  extraReducers: (builder) => {
    // loginWithSms
    builder.addCase(loginWithSms.pending, (state) => ({
      ...state,
      loading: LOADING,
    }));
    builder.addCase(loginWithSms.rejected, (state, action) => ({
      ...state,
      loading: IDLE,
      error: action.payload.error,
    }));
    builder.addCase(loginWithSms.fulfilled, (state, action) => {
      state.loading = IDLE;
      state.username = action.payload.data.phone_number;
      state.method = 'phone'
     
      return state;
    });

     // loginWithEmail
     builder.addCase(loginWithEmail.pending, (state) => ({
      ...state,
      loading: LOADING,
    }));
    builder.addCase(loginWithEmail.rejected, (state, action) => ({
      ...state,
      loading: IDLE,
      error: action.payload.error,
    }));
    builder.addCase(loginWithEmail.fulfilled, (state, action) => {
      state.username = action.payload.data.email;
      state.method = 'email'
      state.loading = IDLE;
     
      return state;
    });

  // confirm
  builder.addCase(confirm.pending, (state) => ({
    ...state,
    loading: LOADING,
  }));
  builder.addCase(confirm.rejected, (state, action) => ({
    ...state,
    loading: IDLE,
    error: action.payload.error,
  }));
  builder.addCase(confirm.fulfilled, (state, action) => {
    state.loading = IDLE;
    state.access = action.payload.access;
    state.refresh = action.payload.refresh;
    return state;
  });

 


  },
});

export const { reset } = authSlice.actions;