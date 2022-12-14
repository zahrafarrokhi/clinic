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

export const getVisitPatient = createAsyncThunk(
  'visits/get',
  async ({patient_id,pk}, thunkAPI) => {
    try {
      // const response = await axios.get(`/visit/patient/${thunkAPI.getState().patientReducer?.patient?.id}/<int:pk>`,payload);
      const response = await axios.get(`/api/visits/visit/patient/${patient_id}/${pk}/`);

      return { data: response.data};
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  },
);

// Doctor
export const loadVisitsDoctor = createAsyncThunk(
  'visits/list-doctor',
  async ({patient_id, ...data}, thunkAPI) => {

    try {
      const response = await axios.get(`/api/visits/visit/`, {params: data});

      console.log(response, response.data);

      return { data: response.data };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  },
);

export const getVisitDoctor = createAsyncThunk(
  'visits/get-doctor',
  async ({pk}, thunkAPI) => {
    try {
      // const response = await axios.get(`/visit/patient/${thunkAPI.getState().patientReducer?.patient?.id}/<int:pk>`,payload);
      const response = await axios.get(`/api/visits/visit/${pk}/`);

      return { data: response.data};
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  },
);


export const getPatientProfile = createAsyncThunk(
  'visits/patient-profile',
  async ({pk}, thunkAPI) => {
    try {
      // const response = await axios.get(`/visit/patient/${thunkAPI.getState().patientReducer?.patient?.id}/<int:pk>`,payload);
      const response = await axios.get(`/api/visits/profile/${pk}/`);

      return { data: response.data};
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  },
);


export const createPrescrptionDoctor = createAsyncThunk(
  'visits/create-pres-doci',
  async (data, thunkAPI) => {
    try {
 
      const response = await axios.post(`/api/visits/doctor-prescription/`,{...data});

      return { data: response.data};
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  },
);




// createPrescrptionDoctorPic
export const createPrescrptionDoctorPic = createAsyncThunk(
  'visits/create-pres-doci-pic',
  async ({id, image}, thunkAPI) => {
    try {
      const fd = new FormData();
      fd.append('prescription', id)
      fd.append('image', image)
      const response = await axios.post(`/api/visits/doctor-prescription-pic/`,fd);


      console.log(response, response.data);
    
      return { data: response.data };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  }
);

export const loadPatientPrescriptions = createAsyncThunk(
  'visits/load-patient-prescriptions',
  async ({patient_id, queryparams}, thunkAPI) => {
    try {
      const response = await axios.get(`/api/visits/visit/patient/${patient_id}/prescription/`, { params: {...queryparams}});
      console.log(response, response.data);
    
      return { data: response.data };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  }
);

const internalInitialState = {
  visits: [],
  prescriptions: [],
  patient_profile: null,
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

// getVisitPatient
builder.addCase(getVisitPatient.pending, (state) => ({
  ...state,
  loading: LOADING,
}));
builder.addCase(getVisitPatient.rejected, (state, action) => ({
  ...state,
  loading: IDLE,
  error: action.payload.error,
}));
builder.addCase(getVisitPatient.fulfilled, (state, action) => {
  state.loading = IDLE;
  state.visit = action.payload.data;
  
  return state;
});



    builder.addCase(loadVisitsDoctor.pending, (state) => ({
      ...state,
      loading: LOADING,
    }));
    builder.addCase(loadVisitsDoctor.rejected, (state, action) => ({
      ...state,
      loading: IDLE,
      error: action.payload.error,
    }));
    builder.addCase(loadVisitsDoctor.fulfilled, (state, action) => {
      state.loading = IDLE;
      //total data => action.payload.data
      //up => {...respose.data } or response.data => action.payload
      state.visits = action.payload.data;
      
      return state;
    });

    // getVisitDoctor
    builder.addCase(getVisitDoctor.pending, (state) => ({
      ...state,
      loading: LOADING,
    }));
    builder.addCase(getVisitDoctor.rejected, (state, action) => ({
      ...state,
      loading: IDLE,
      error: action.payload.error,
    }));
    builder.addCase(getVisitDoctor.fulfilled, (state, action) => {
      state.loading = IDLE;
      state.visit = action.payload.data;
      
      return state;
    });

    // getPatientProfile
    builder.addCase(getPatientProfile.pending, (state) => ({
      ...state,
      loading: LOADING,
    }));
    builder.addCase(getPatientProfile.rejected, (state, action) => ({
      ...state,
      loading: IDLE,
      error: action.payload.error,
    }));
    builder.addCase(getPatientProfile.fulfilled, (state, action) => {
      state.loading = IDLE;
      state.patient_profile = action.payload.data;
      
      return state;
    });

    // createPrescrptionDoctor
    builder.addCase(createPrescrptionDoctor.pending, (state) => ({
      ...state,
      loading: LOADING,
    }));
    builder.addCase(createPrescrptionDoctor.rejected, (state, action) => ({
      ...state,
      loading: IDLE,
      error: action.payload.error,
    }));
    builder.addCase(createPrescrptionDoctor.fulfilled, (state, action) => {
      state.loading = IDLE; 
      
      return state;
    });


     // createPrescrptionDoctorPic
     builder.addCase(createPrescrptionDoctorPic.pending, (state) => ({
      ...state,
      loading: LOADING,
    }));
    builder.addCase(createPrescrptionDoctorPic.rejected, (state, action) => ({
      ...state,
      loading: IDLE,
      error: action.payload.error,
    }));
    builder.addCase(createPrescrptionDoctorPic.fulfilled, (state, action) => {
      state.loading = IDLE; 
      
      return state;
    });

      // loadPatientPrescriptions
      builder.addCase(loadPatientPrescriptions.pending, (state) => ({
        ...state,
        loading: LOADING,
      }));
      builder.addCase(loadPatientPrescriptions.rejected, (state, action) => ({
        ...state,
        loading: IDLE,
        error: action.payload.error,
      }));
      builder.addCase(loadPatientPrescriptions.fulfilled, (state, action) => {
        state.loading = IDLE; 
        state.prescriptions = action.payload.data;
        
        return state;
      });



  },
});

export const { reset,} = visitSlice.actions;