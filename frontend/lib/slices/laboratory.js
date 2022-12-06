import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

export const IDLE = "idle";
export const LOADING = "loading";

// For patient

//createPrescription
export const createPrescription = createAsyncThunk(
  "laboratory/create",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`/api/laboratory/patient/${data.patient}/prescriptions/`, { ...data });

      console.log(response, response.data);
    
      return { data: response.data };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  }
);



//createPrescriptionPic
export const createPrescriptionPic = createAsyncThunk(
  "laboratory/createpic",
  async (data, thunkAPI) => {
    try {
      console.log("DATA", data)
      const fd = new FormData(); 
      // image,prescription from backend
      fd.append('image', data.image);
      fd.append('prescription', data.prescription);      
      const response = await axios.post(`/api/laboratory/prescription-pic/`, fd);

      console.log(response, response.data);
    
      return { data: response.data };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  }
);


//listPrescriptionsPatient
export const listPrescriptionsPatient = createAsyncThunk(
  "laboratory/list",
  async ({patient_id, ...data}, thunkAPI) => {
    try {
      const response = await axios.get(`/api/laboratory/patient/${patient_id}/prescriptions/`, {params: data});

      console.log(response, response.data);
    
      return { data: response.data };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  }
);

//getPrescriptionsPatient
export const getPrescriptionPatient = createAsyncThunk(
  "laboratory/get",
  async ({patient_id, id}, thunkAPI) => {
    try {
      const response = await axios.get(`/api/laboratory/patient/${patient_id}/prescription/${id}/`, );

      console.log(response, response.data);
    
      return { data: response.data };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  }
);


const internalInitialState = {
  prescriptions: [],
  prescription: null,
  chart: [],
  fields: [],
  error: null,
  loading: IDLE, // false ,not busy
};

export const laboratorySlice = createSlice({
  name: "laboratory",
  initialState: internalInitialState,
  reducers: {
    reset: () => internalInitialState,
  },
  extraReducers: (builder) => {
    // For patient
    //createPrescription
    builder.addCase(createPrescription.pending, (state) => ({
      ...state,
      loading: LOADING,
    }));
    builder.addCase(createPrescription.rejected, (state, action) => ({
      ...state,
      loading: IDLE,
      error: action.payload.error,
    }));
    builder.addCase(createPrescription.fulfilled, (state, action) => {
      state.loading = IDLE;
      //total data => action.payload.data
      //up => {...respose.data } or response.data => action.payload
      state.prescription = action.payload.data;

      return state;
    });

    //createPrescriptionPic
    builder.addCase(createPrescriptionPic.pending, (state) => ({
      ...state,
      loading: LOADING,
    }));
    builder.addCase(createPrescriptionPic.rejected, (state, action) => ({
      ...state,
      loading: IDLE,
      error: action.payload.error,
    }));
    builder.addCase(createPrescriptionPic.fulfilled, (state, action) => {
      state.loading = IDLE;
      //total data => action.payload.data
      //up => {...respose.data } or response.data => action.payload
    
      // state.prescription.images = [...state.prescription.images, action.payload.data];
      return state;
    });


     //listPrescriptionsPatient
     builder.addCase(listPrescriptionsPatient.pending, (state) => ({
      ...state,
      loading: LOADING,
    }));
    builder.addCase(listPrescriptionsPatient.rejected, (state, action) => ({
      ...state,
      loading: IDLE,
      error: action.payload.error,
    }));
    builder.addCase(listPrescriptionsPatient.fulfilled, (state, action) => {
      state.loading = IDLE;
    
      state.prescriptions = action.payload.data;
      return state;
    });

    //getPrescriptionPatient
    builder.addCase(getPrescriptionPatient.pending, (state) => ({
      ...state,
      loading: LOADING,
    }));
    builder.addCase(getPrescriptionPatient.rejected, (state, action) => ({
      ...state,
      loading: IDLE,
      error: action.payload.error,
    }));
    builder.addCase(getPrescriptionPatient.fulfilled, (state, action) => {
      state.loading = IDLE;
      //total data => action.payload.data
      //up => {...respose.data } or response.data => action.payload
    
      state.prescription = action.payload.data;
      return state;
    });
  
  },

  
});

export const { reset } = laboratorySlice.actions;


