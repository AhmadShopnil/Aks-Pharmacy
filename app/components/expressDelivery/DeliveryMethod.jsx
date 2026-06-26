// // components/delivery/DeliveryMethod.jsx

// "use client";

// import { useState } from "react";

// import { Truck, Zap } from "lucide-react";

// import { useDispatch, useSelector } from "react-redux";

// import {
//   setDeliveryType,
// } from "@/lib/redux/features/expressDelivery/expressDeliverySlice";

// import DeliveryLocationSheet from "./DeliveryLocationSheet";

// export default function DeliveryMethod() {
//   const dispatch = useDispatch();

//   const delivery = useSelector(
//     (state) => state.delivery
//   );

//   const [open, setOpen] = useState(false);

//   return (
//     <>
//       <div className="rounded-2xl border bg-white p-4">
//         <h3 className="mb-4 font-semibold">
//           Delivery Method
//         </h3>

//         {/* Normal */}

//         <label className="mb-3 flex cursor-pointer gap-3 rounded-xl border p-4">
//           <input
//             type="radio"
//             checked={
//               delivery?.deliveryType === "normal"
//             }
//             onChange={() =>
//               dispatch(
//                 setDeliveryType("normal")
//               )
//             }
//           />

//           <div>
//             <h4 className="flex items-center gap-2 font-medium">
//               <Truck size={18} />
//               Standard Delivery
//             </h4>

//             <p className="text-sm text-gray-500">
//               Delivery within 2-4 days
//             </p>
//           </div>
//         </label>

//         {/* Express */}

//         <label className="flex cursor-pointer gap-3 rounded-xl border p-4">
//           <input
//             type="radio"
//             checked={
//               delivery.deliveryType === "express"
//             }
//             onChange={() => setOpen(true)}
//           />

//           <div className="flex-1">
//             <h4 className="flex items-center gap-2 font-medium">
//               <Zap size={18} />
//               Express Delivery
//             </h4>

//             <p className="text-sm text-gray-500">
//               Same day delivery
//             </p>

//             {delivery.area && (
//               <div className="mt-3 rounded-lg bg-gray-100 p-2 text-sm">
//                 {delivery.area.name},{" "}
//                 {delivery.thana.name}
//               </div>
//             )}
//           </div>

//           <button
//             type="button"
//             onClick={() => setOpen(true)}
//             className="text-sm font-medium"
//           >
//             Change
//           </button>
//         </label>
//       </div>

//       <DeliveryLocationSheet
//         open={open}
//         onClose={() => setOpen(false)}
//       />
//     </>
//   );
// }