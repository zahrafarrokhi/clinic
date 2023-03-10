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
  async ({id, patient_id}, thunkAPI) => {
    try {
      const response = await axios.get(`/api/laboratory/patient/${patient_id}/prescriptions/${id}/`, );

      console.log(response, response.data);
    
      return { data: response.data };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  }
);


//getPrescriptionPaymentPatient
export const getPrescriptionPaymentPatient = createAsyncThunk(
  "laboratory/payment",
  async ({id, patient_id, ...data}, thunkAPI) => {
    try {
      const response = await axios.put(`/api/laboratory/patient/${patient_id}/prescription-payment/${id}/`, {...data});

      console.log(response, response.data);
    
      return { data: response.data };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  }
);

// Laboratory

//listPrescriptionsLaboratory
export const listPrescriptionsLaboratory = createAsyncThunk(
  "laboratory/list-laboratory",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`/api/laboratory/laboratory-prescription/`, { params: data });

      console.log(response, response.data);
    
      return { data: response.data };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  }
);

//getPrescriptionLaboratory
export const getPrescriptionLaboratory = createAsyncThunk(
  "laboratory/get-laboratory",
  async ({id}, thunkAPI) => {
    try {
      const response = await axios.get(`/api/laboratory/laboratory-prescription/${id}/`, );

      console.log(response, response.data);
    
      return { data: response.data };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  }
);


//updatePrescriptionLaboratory
export const updatePrescriptionLaboratory = createAsyncThunk(
  "laboratory/update-laboratory",
  async ({id, ...data}, thunkAPI) => {
    try {
      const response = await axios.patch(`/api/laboratory/laboratory-prescription/${id}/`, {...data});

      console.log(response, response.data);
    
      return { data: response.data };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  }
);

//updatePrescriptionStatus
export const updatePrescriptionStatus = createAsyncThunk(
  "laboratory/update-status",
  async ({id, ...data}, thunkAPI) => {
    try {
      const response = await axios.patch(`/api/laboratory/laboratory-status/${id}/`, {...data});

      console.log(response, response.data);
    
      return { data: response.data };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  }
);

// uploadPrescriptionResult
export const uploadPrescriptionResult = createAsyncThunk(
  "laboratory/upload-result",
  async ({id, image}, thunkAPI) => {
    try {
      const fd = new FormData();
      fd.append('prescription', id)
      fd.append('image', image)
      const response = await axios.post(`/api/laboratory/laboratory-result-image/`, fd);

      console.log(response, response.data);
    
      return { data: response.data };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  }
);

//updatePrescriptionStatusResult
export const updatePrescriptionStatusResult = createAsyncThunk(
  "laboratory/update-status-result",
  async ({id, ...data}, thunkAPI) => {
    try {
      const response = await axios.patch(`/api/laboratory/laboratory-status-result/${id}/`, {...data});

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

    //getPrescriptionPaymentPatient
    builder.addCase(getPrescriptionPaymentPatient.pending, (state) => ({
      ...state,
      loading: LOADING,
    }));
    builder.addCase(getPrescriptionPaymentPatient.rejected, (state, action) => ({
      ...state,
      loading: IDLE,
      error: action.payload.error,
    }));
    builder.addCase(getPrescriptionPaymentPatient.fulfilled, (state, action) => {
      state.loading = IDLE;
      //total data => action.payload.data
      //up => {...respose.data } or response.data => action.payload
    
      state.prescription = action.payload.data;
      return state;
    });

    //listPrescriptionsLaboratory
    builder.addCase(listPrescriptionsLaboratory.pending, (state) => ({
      ...state,
      loading: LOADING,
    }));
    builder.addCase(listPrescriptionsLaboratory.rejected, (state, action) => ({
      ...state,
      loading: IDLE,
      error: action.payload.error,
    }));
    builder.addCase(listPrescriptionsLaboratory.fulfilled, (state, action) => {
      state.loading = IDLE;
    
      state.prescriptions = action.payload.data;
      return state;
    });

    //getPrescriptionLaboratory
    builder.addCase(getPrescriptionLaboratory.pending, (state) => ({
      ...state,
      loading: LOADING,
    }));
    builder.addCase(getPrescriptionLaboratory.rejected, (state, action) => ({
      ...state,
      loading: IDLE,
      error: action.payload.error,
    }));
    builder.addCase(getPrescriptionLaboratory.fulfilled, (state, action) => {
      state.loading = IDLE;
      //total data => action.payload.data
      //up => {...respose.data } or response.data => action.payload
    
      state.prescription = action.payload.data;
      return state;
    });
  


    //updatePrescriptionLaboratory
    builder.addCase(updatePrescriptionLaboratory.pending, (state) => ({
      ...state,
      loading: LOADING,
    }));
    builder.addCase(updatePrescriptionLaboratory.rejected, (state, action) => ({
      ...state,
      loading: IDLE,
      error: action.payload.error,
    }));
    builder.addCase(updatePrescriptionLaboratory.fulfilled, (state, action) => {
      state.loading = IDLE;
      //total data => action.payload.data
      //up => {...respose.data } or response.data => action.payload
    
      state.prescription = action.payload.data;
      return state;
    });


    //updatePrescriptionStatus
    builder.addCase(updatePrescriptionStatus.pending, (state) => ({
      ...state,
      loading: LOADING,
    }));
    builder.addCase(updatePrescriptionStatus.rejected, (state, action) => ({
      ...state,
      loading: IDLE,
      error: action.payload.error,
    }));
    builder.addCase(updatePrescriptionStatus.fulfilled, (state, action) => {
      state.loading = IDLE;
      state.prescription.status = action.payload.data.status;
      // or
      // state.prescription = {...state.prescription, ...action.payload.data};
      return state;
    });


    //uploadPrescriptionResult
    builder.addCase(uploadPrescriptionResult.pending, (state) => ({
      ...state,
      loading: LOADING,
    }));
    builder.addCase(uploadPrescriptionResult.rejected, (state, action) => ({
      ...state,
      loading: IDLE,
      error: action.payload.error,
    }));
    builder.addCase(uploadPrescriptionResult.fulfilled, (state, action) => {
      state.loading = IDLE;
      state.prescription.results = [...state.prescription.results, action.payload.data]
      // state.prescription.status = action.payload.data.status;
      // or
      // state.prescription = {...state.prescription, ...action.payload.data};
      return state;
    });

    //updatePrescriptionStatusResult
    builder.addCase(updatePrescriptionStatusResult.pending, (state) => ({
      ...state,
      loading: LOADING,
    }));
    builder.addCase(updatePrescriptionStatusResult.rejected, (state, action) => ({
      ...state,
      loading: IDLE,
      error: action.payload.error,
    }));
    builder.addCase(updatePrescriptionStatusResult.fulfilled, (state, action) => {
      state.loading = IDLE;
      state.prescription.status = action.payload.data.status;
      // or
      // state.prescription = {...state.prescription, ...action.payload.data};
      return state;
    });
  
  },

  
});

export const { reset } = laboratorySlice.actions;


