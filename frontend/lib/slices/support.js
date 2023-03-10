import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

export const IDLE = "idle";
export const LOADING = "loading";

export const listTickets = createAsyncThunk(
  "support/list",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`/api/support/tickets/`, {
        params: data,
      });

      console.log(response, response.data);

      return { data: response.data };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  }
);
//createTicket
export const createTicket = createAsyncThunk(
  "support/create",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`/api/support/tickets/`, { ...data });

      console.log(response, response.data);
    
      return { data: response.data };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  }
);



//createMessage
export const createMessage = createAsyncThunk(
  "support/createMessage",
  async (data, thunkAPI) => {
    try {
      const fd = new FormData();       
      if(data.file) fd.append('file', data.file);
      if(data.text) fd.append('text', data.text);
      fd.append('ticket', data.ticket);
      const response = await axios.post(`/api/support/messages/`, fd);

      console.log(response, response.data);
    
      return { data: response.data };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  }
);

//createTicketWithFile
export const createTicketWithFile = createAsyncThunk(
  "support/createTicketWithFile",
  async (data, thunkAPI) => {
    try {
      const fd = new FormData();   
      for (let f of data.files)    
        fd.append(f.name, f);
      fd.append('text', data.text);
      fd.append('subject', data.subject);
      if(data.patient){fd.append('patient', data.patient);}
      const response = await axios.post(`/api/support/ticket-create/`, fd);

      console.log(response, response.data);
    
      return { data: response.data };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  }
);

export const getTicket = createAsyncThunk(
  "support/get",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`/api/support/tickets/${id}`)
      console.log(response, response.data);

      return { data: response.data };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  }
);

export const closeTicket = createAsyncThunk(
  "support/close",
  async (id, thunkAPI) => {
    try {
      const response = await axios.patch(`/api/support/close-ticket/${id}`)
      console.log(response, response.data);

      return { data: response.data };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  }
);

const internalInitialState = {
  tickets: [],
  ticket: null,
  error: null,
  loading: IDLE, // false ,not busy
};

export const ticketSlice = createSlice({
  name: "ticket",
  initialState: internalInitialState,
  reducers: {
    reset: () => internalInitialState,
  },
  extraReducers: (builder) => {
    //listTickets
    builder.addCase(listTickets.pending, (state) => ({
      ...state,
      loading: LOADING,
    }));
    builder.addCase(listTickets.rejected, (state, action) => ({
      ...state,
      loading: IDLE,
      error: action.payload.error,
    }));
    builder.addCase(listTickets.fulfilled, (state, action) => {
      state.loading = IDLE;
      //total data => action.payload.data
      //up => {...respose.data } or response.data => action.payload
      state.tickets = action.payload.data;

      return state;
    });

    //createTicket
    builder.addCase(createTicket.pending, (state) => ({
      ...state,
      loading: LOADING,
    }));
    builder.addCase(createTicket.rejected, (state, action) => ({
      ...state,
      loading: IDLE,
      error: action.payload.error,
    }));
    builder.addCase(createTicket.fulfilled, (state, action) => {
      state.loading = IDLE;
      //total data => action.payload.data
      //up => {...respose.data } or response.data => action.payload
      // state.ticket = action.payload.data;

      return state;
    });

     //createMessage
     builder.addCase(createMessage.pending, (state) => ({
      ...state,
      loading: LOADING,
    }));
    builder.addCase(createMessage.rejected, (state, action) => ({
      ...state,
      loading: IDLE,
      error: action.payload.error,
    }));
    builder.addCase(createMessage.fulfilled, (state, action) => {
      state.loading = IDLE;
      
      state.ticket.messages = [...state.ticket.messages, action.payload.data];

      return state;
    });

    //createTicketWithFile
    builder.addCase(createTicketWithFile.pending, (state) => ({
      ...state,
      loading: LOADING,
    }));
    builder.addCase(createTicketWithFile.rejected, (state, action) => ({
      ...state,
      loading: IDLE,
      error: action.payload.error,
    }));
    builder.addCase(createTicketWithFile.fulfilled, (state, action) => {
      state.loading = IDLE;
      //total data => action.payload.data
      //up => {...respose.data } or response.data => action.payload
      // state.tickets = action.payload.data;
  
      return state;
    }); 

     //getTicket
     builder.addCase(getTicket.pending, (state) => ({
      ...state,
      loading: LOADING,
    }));
    builder.addCase(getTicket.rejected, (state, action) => ({
      ...state,
      loading: IDLE,
      error: action.payload.error,
    }));
    builder.addCase(getTicket.fulfilled, (state, action) => {
      state.loading = IDLE;
      //total data => action.payload.data
      //up => {...respose.data } or response.data => action.payload
      state.ticket = action.payload.data;
  
      return state;
    }); 

    //closeTicket
    builder.addCase(closeTicket.pending, (state) => ({
      ...state,
      loading: LOADING,
    }));
    builder.addCase(closeTicket.rejected, (state, action) => ({
      ...state,
      loading: IDLE,
      error: action.payload.error,
    }));
    builder.addCase(closeTicket.fulfilled, (state, action) => {
      state.loading = IDLE;
      //total data => action.payload.data
      //up => {...respose.data } or response.data => action.payload
      state.ticket.status = action.payload.data.status;
  
      return state;
    }); 
  },
});

export const { reset } = ticketSlice.actions;


