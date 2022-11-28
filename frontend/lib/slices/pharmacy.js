import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

export const IDLE = "idle";
export const LOADING = "loading";

// For patient

//createPrescription
export const createPrescription = createAsyncThunk(
  "pharmacy/create",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`/api/pharmacy/prescription/`, { ...data });

      console.log(response, response.data);
    
      return { data: response.data };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  }
);



//createPrescriptionPic
export const createPrescriptionPic = createAsyncThunk(
  "pharmacy/createpic",
  async (data, thunkAPI) => {
    try {
      const fd = new FormData(); 
      // image,prescription from backend
      fd.append('image', data.pic);
      fd.append('prescription', data.pre);      
      const response = await axios.post(`/api/pharmacy/prescription-pic/`, fd);

      console.log(response, response.data);
    
      return { data: response.data };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  }
);


//listPrescriptionsPatient
export const listPrescriptionsPatient = createAsyncThunk(
  "pharmacy/list",
  async ({patient_id, ...data}, thunkAPI) => {
    try {
      const response = await axios.get(`/api/pharmacy/prescription/patient/${patient_id}/`, {params: data});

      console.log(response, response.data);
    
      return { data: response.data };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  }
);
//getPrescriptionsPatient
export const getPrescriptionPatient = createAsyncThunk(
  "pharmacy/get",
  async ({patient_id, id}, thunkAPI) => {
    try {
      const response = await axios.get(`/api/pharmacy/prescription/patient/${patient_id}/${id}/`, );

      console.log(response, response.data);
    
      return { data: response.data };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  }
);

// For pharmacy

//listPrescriptionsPharmacy
export const listPrescriptionsPharmacy = createAsyncThunk(
  "pharmacy/list-pharmacy",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.get(`/api/pharmacy/prescription-pharmacy/`, { params: payload});

      console.log(response, response.data);
    
      return { data: response.data };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  }
);

//getPrescriptionPharmacy
export const getPrescriptionPharmacy = createAsyncThunk(
  "pharmacy/get-pharmacy",
  async ({id}, thunkAPI) => {
    try {
      const response = await axios.get(`/api/pharmacy/prescription-pharmacy/${id}/`, );

      console.log(response, response.data);
    
      return { data: response.data };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  }
);

//updatePrescriptionPharmacy
export const updatePrescriptionPharmacy = createAsyncThunk(
  "pharmacy/update-pharmacy",
  async ({id,...data}, thunkAPI) => {
    try {
      const response = await axios.patch(`/api/pharmacy/prescription-pharmacy/${id}/`, {...data} );

      console.log(response, response.data);
    
      return { data: response.data };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  }
);
//createPrescriptionPicPharmacy
export const createPrescriptionPicPharmacy = createAsyncThunk(
  "pharmacy/createpic-pharmacy",
  async (data, thunkAPI) => {
    try {
      const fd = new FormData(); 
      // image,prescription from backend
      fd.append('image', data.pic);
      fd.append('prescription', data.pre);      
      const response = await axios.post(`/api/pharmacy/prescription-pic-pharmacy/`, fd);

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
  error: null,
  loading: IDLE, // false ,not busy
};

export const pharmacySlice = createSlice({
  name: "pharmacy",
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
      //total data => action.payload.data
      //up => {...respose.data } or response.data => action.payload
    
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
    // For pharmacy
    //listPrescriptionsPharmacy
    builder.addCase(listPrescriptionsPharmacy.pending, (state) => ({
      ...state,
      loading: LOADING,
    }));
    builder.addCase(listPrescriptionsPharmacy.rejected, (state, action) => ({
      ...state,
      loading: IDLE,
      error: action.payload.error,
    }));
    builder.addCase(listPrescriptionsPharmacy.fulfilled, (state, action) => {
      state.loading = IDLE;
      //total data => action.payload.data
      //up => {...respose.data } or response.data => action.payload
    
      state.prescriptions = action.payload.data;
      return state;
    });

    //getPrescriptionPharmacy
    builder.addCase(getPrescriptionPharmacy.pending, (state) => ({
      ...state,
      loading: LOADING,
    }));
    builder.addCase(getPrescriptionPharmacy.rejected, (state, action) => ({
      ...state,
      loading: IDLE,
      error: action.payload.error,
    }));
    builder.addCase(getPrescriptionPharmacy.fulfilled, (state, action) => {
      state.loading = IDLE;
      //total data => action.payload.data
      //up => {...respose.data } or response.data => action.payload
    
      state.prescription = action.payload.data;
      return state;
    });

    //updatePrescriptionPharmacy
    builder.addCase(updatePrescriptionPharmacy.pending, (state) => ({
      ...state,
      loading: LOADING,
    }));
    builder.addCase(updatePrescriptionPharmacy.rejected, (state, action) => ({
      ...state,
      loading: IDLE,
      error: action.payload.error,
    }));
    builder.addCase(updatePrescriptionPharmacy.fulfilled, (state, action) => {
      state.loading = IDLE;
      //total data => action.payload.data
      //up => {...respose.data } or response.data => action.payload
    
      state.prescription = action.payload.data;
      if (state.prescriptions.results) {
        state.prescriptions.results = [...state.prescriptions.results.filter(item => item.id != action.payload.data.id), action.payload.data]
      }
      return state;
    });

     //createPrescriptionPicPharmacy
     builder.addCase(createPrescriptionPicPharmacy.pending, (state) => ({
      ...state,
      loading: LOADING,
    }));
    builder.addCase(createPrescriptionPicPharmacy.rejected, (state, action) => ({
      ...state,
      loading: IDLE,
      error: action.payload.error,
    }));
    builder.addCase(createPrescriptionPicPharmacy.fulfilled, (state, action) => {
      state.loading = IDLE;
      //total data => action.payload.data
      //up => {...respose.data } or response.data => action.payload
    
      // state.prescription.images = [...state.prescription.images, action.payload.data];
      return state;
    });

  },

  
});

export const { reset } = pharmacySlice.actions;


