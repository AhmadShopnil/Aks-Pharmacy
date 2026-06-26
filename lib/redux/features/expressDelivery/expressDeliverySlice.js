import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enabled: false,
  district: null,
  thana: null,
  area: null,
  outlets: [],
};

const expressDeliverySlice = createSlice({
  name: "expressDelivery",
  initialState,

  reducers: {
    setExpressLocation: (state, action) => {
      state.enabled = true;
      state.district = action.payload.district;
      state.thana = action.payload.thana;
      state.area = action.payload.area;
    },

    setExpressOutlets: (state, action) => {
      state.outlets = action.payload;
    },

    disableExpressDelivery: (state) => {
      state.enabled = false;
      state.district = null;
      state.thana = null;
      state.area = null;
      state.outlets = [];
    },
  },
});

export const {
  setExpressLocation,
  setExpressOutlets,
  disableExpressDelivery,
} = expressDeliverySlice.actions;

export default expressDeliverySlice.reducer;