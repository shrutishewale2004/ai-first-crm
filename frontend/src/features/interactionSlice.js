import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/interactions/";

export const fetchInteractions = createAsyncThunk(
  "interactions/fetchInteractions",
  async () => {
    const response = await axios.get(API_URL);
    return response.data;
  }
);

const interactionSlice = createSlice({
  name: "interactions",

  initialState: {
    interactions: [],
    loading: false,
    error: null,
  },

  reducers: {
    removeInteraction: (state, action) => {
      state.interactions = state.interactions.filter(
        (interaction) => interaction.id !== action.payload
      );
    },

    updateInteractionInStore: (state, action) => {
      const index = state.interactions.findIndex(
        (interaction) => interaction.id === action.payload.id
      );

      if (index !== -1) {
        state.interactions[index] = action.payload;
      }
    },

    addInteraction: (state, action) => {
      state.interactions.push(action.payload);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchInteractions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchInteractions.fulfilled, (state, action) => {
        state.loading = false;
        state.interactions = action.payload;
      })

      .addCase(fetchInteractions.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load interactions.";
      });
  },
});

export const {
  removeInteraction,
  updateInteractionInStore,
  addInteraction,
} = interactionSlice.actions;

export default interactionSlice.reducer;