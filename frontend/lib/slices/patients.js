import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios';

export const IDLE = 'idle';
export const LOADING = 'loading';

export const loadPatients = createAsyncThunk(
  'patients/list',
  async (cred, thunkAPI) => {
    try {
      const response = await axios.get('/api/patients/patient/', cred);

      console.log(response, response.data);

      return { data: response.data };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  },
);
export const addPatient = createAsyncThunk(
  'patients/add',
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post('/api/patients/patient/', payload);

      console.log(response, response.data);

      return { data: response.data};
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  },
);
export const updatePatient = createAsyncThunk(
  'patients/update',
  async (payload, thunkAPI) => {
    try {
      const response = await axios.put(`/api/patients/patient/${payload.id}/`, payload);

      console.log(response, response.data);

      return { data: response.data};
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  },
);

const internalInitialState = {
  patients: [],
  patient:null,
  error: null,
  loading: IDLE, // false ,not busy
};

export const patientSlice = createSlice({
  name: 'patient',
  initialState: internalInitialState,
  reducers: {
    loginAsPatient: (state, action) => {
      return ({
        ...state,
        patient: state.patients.filter(item => item.id === action.payload)[0]
      })
    },
    reset: () => internalInitialState,
  },
  extraReducers: (builder) => {
    // loadPatients
    builder.addCase(loadPatients.pending, (state) => ({
      ...state,
      loading: LOADING,
    }));
    builder.addCase(loadPatients.rejected, (state, action) => ({
      ...state,
      loading: IDLE,
      error: action.payload.error,
    }));
    builder.addCase(loadPatients.fulfilled, (state, action) => {
      state.loading = IDLE;
      //total data => action.payload.data
      //up => {...respose.data } or response.data => action.payload
      state.patients = action.payload.data;
      
      return state;
    });
// addPatient
    builder.addCase(addPatient.pending, (state) => ({
      ...state,
      loading: LOADING,
    }));
    builder.addCase(addPatient.rejected, (state, action) => ({
      ...state,
      loading: IDLE,
      error: action.payload.error,
    }));
    builder.addCase(addPatient.fulfilled, (state, action) => {
      state.loading = IDLE;
      state.patient = action.payload.data;
      // previous list items => ...state.patients,
      // add item at the end list=> action.payload.data
      state.patients = [...state.patients, action.payload.data];
      return state;
    });

  // updatePatient
  builder.addCase(updatePatient.pending, (state) => ({
    ...state,
    loading: LOADING,
  }));
  builder.addCase(updatePatient.rejected, (state, action) => ({
    ...state,
    loading: IDLE,
    error: action.payload.error,
  }));
  builder.addCase(updatePatient.fulfilled, (state, action) => {
    state.loading = IDLE;
    state.patient = action.payload.data;
    //remove item => [...state.patients.filter(item=>item.id!==action.payload.data.id)]
    //update list => action.payload.data
    // sort =>.sort((a, b)=>a.id - b.id)
    state.patients = [...state.patients.filter(item=>item.id!==action.payload.data.id), action.payload.data].sort((a, b)=>a.id - b.id)
    return state;
  });


 


  },
});

export const { reset, loginAsPatient } = patientSlice.actions;