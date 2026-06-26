// features/delivery/selectors.js

export const selectDelivery = (state) => state.delivery;

export const selectDeliveryType = (state) =>
  state.delivery.deliveryType;

export const selectDeliveryLocation = (state) => ({
  district: state.delivery.district,
  thana: state.delivery.thana,
  area: state.delivery.area,
});