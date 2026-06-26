// // features/expressDelivery/expressDeliverySlice.js

// import { createSlice } from "@reduxjs/toolkit";

// // const initialState = {
// //   enabled: false,
// //   district: null,
// //   thana: null,
// //   area: null,
// // };
// const initialState = {
//   deliveryType: "normal", // normal | express
//   district: null,
//   thana: null,
//   area: null,
// };

// const expressDeliverySlice = createSlice({
//   name: "expressDelivery",
//   initialState,
//   reducers: {
//     setExpressLocation: (state, action) => {
//       state.enabled = true;
//       state.district = action.payload.district;
//       state.thana = action.payload.thana;
//       state.area = action.payload.area;
//     },

//     clearExpressLocation: (state) => {
//       state.enabled = false;
//       state.district = null;
//       state.thana = null;
//       state.area = null;
//     },
//   },
// });

// export const {
//  setDeliveryType,
// setExpressLocation,
// clearExpressLocation
// } = expressDeliverySlice.actions;

// export default expressDeliverySlice.reducer;