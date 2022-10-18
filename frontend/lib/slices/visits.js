import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios';

export const IDLE = 'idle';
export const LOADING = 'loading';

export const loadVisitsPatient = createAsyncThunk(
  'visits/list',
  async ({patient_id, ...data}, thunkAPI) => {

    try {
      const response = await axios.get(`/api/visits/visit/patient/${patient_id}/`, {params: data});

      console.log(response, response.data);

      return { data: response.data };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  },
);
export const createVisitPatient = createAsyncThunk(
  'visits/create',
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(`/api/visits/visit/`,payload);

      return { data: response.data};
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  },
);


const internalInitialState = {
  visits: [],
  visit:null,
  error: null,
  loading: IDLE, // false ,not busy
};

export const visitSlice = createSlice({
  name: 'visit',
  initialState: internalInitialState,
  reducers: {
  
    reset: () => internalInitialState,
  },
  extraReducers: (builder) => {
    // loadVisitsPatient
    builder.addCase(loadVisitsPatient.pending, (state) => ({
      ...state,
      loading: LOADING,
    }));
    builder.addCase(loadVisitsPatient.rejected, (state, action) => ({
      ...state,
      loading: IDLE,
      error: action.payload.error,
    }));
    builder.addCase(loadVisitsPatient.fulfilled, (state, action) => {
      state.loading = IDLE;
      //total data => action.payload.data
      //up => {...respose.data } or response.data => action.payload
      state.visits = action.payload.data;
      
      return state;
    });
// createVisitsPatient
    builder.addCase(createVisitPatient.pending, (state) => ({
      ...state,
      loading: LOADING,
    }));
    builder.addCase(createVisitPatient.rejected, (state, action) => ({
      ...state,
      loading: IDLE,
      error: action.payload.error,
    }));
    builder.addCase(createVisitPatient.fulfilled, (state, action) => {
      state.loading = IDLE;
      // state.visits = action.payload.data;
      
      return state;
    });



  },
});

export const { reset,} = visitSlice.actions;