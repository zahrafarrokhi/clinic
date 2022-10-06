import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios';

export const IDLE = 'idle';
export const LOADING = 'loading';

//loadDoctors
export const loadDoctors = createAsyncThunk(
  'doctors/list',
  async (cred, thunkAPI) => {
    try {
      const response = await axios.get('/api/doctors/doctor/', cred);

      console.log(response, response.data);

      return { data: response.data };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  },
);
//loadDepartments
export const loadDepartments = createAsyncThunk(
  'departments/list',
  async (cred, thunkAPI) => {
    try {
      const response = await axios.get('/api/doctors/department/', cred);

      console.log(response, response.data);

      return { data: response.data };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  },
);

const internalInitialState = {
  doctors: [],
  doctor:null,
  error: null,
  loading: IDLE, // false ,not busy
};

export const doctorSlice = createSlice({
  name: 'doctor',
  initialState: internalInitialState,
  reducers: {
   
    reset: () => internalInitialState,
  },
  extraReducers: (builder) => {
    // loadDoctors
    builder.addCase(loadDoctors.pending, (state) => ({
      ...state,
      loading: LOADING,
    }));
    builder.addCase(loadDoctors.rejected, (state, action) => ({
      ...state,
      loading: IDLE,
      error: action.payload.error,
    }));
    builder.addCase(loadDoctors.fulfilled, (state, action) => {
      state.loading = IDLE;
      //total data => action.payload.data
      //up => {...respose.data } or response.data => action.payload
      state.doctors = action.payload.data;
      
      return state;
    });

 // loadDepartments
 builder.addCase(loadDepartments.pending, (state) => ({
  ...state,
  loading: LOADING,
}));
builder.addCase(loadDepartments.rejected, (state, action) => ({
  ...state,
  loading: IDLE,
  error: action.payload.error,
}));
builder.addCase(loadDepartments.fulfilled, (state, action) => {
  state.loading = IDLE;
  //total data => action.payload.data
  //up => {...respose.data } or response.data => action.payload
  state.departments = action.payload.data;
  
  return state;
});
  

 


  },
});

export const { reset} = doctorSlice.actions;