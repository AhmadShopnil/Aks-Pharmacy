// // components/delivery/DeliveryLocationSheet.jsx

// "use client";

// import { useState } from "react";
// import { X, MapPin } from "lucide-react";
// import { useDispatch } from "react-redux";



// import {
//   setExpressLocation,
// } from "@/lib/redux/features/expressDelivery/expressDeliverySlice";


// // data/locations.js

// export const locations = [
//   {
//     id: 1,
//     name: "Dhaka",
//     thanas: [
//       {
//         id: 11,
//         name: "Mirpur",
//         areas: [
//           { id: 111, name: "Mirpur-1" },
//           { id: 112, name: "Mirpur-10" },
//           { id: 113, name: "Mirpur-12" },
//         ],
//       },
//       {
//         id: 12,
//         name: "Dhanmondi",
//         areas: [
//           { id: 121, name: "Dhanmondi 27" },
//           { id: 122, name: "Dhanmondi 32" },
//         ],
//       },
//     ],
//   },
// ];



// export default function DeliveryLocationSheet({
//   open,
//   onClose,
// }) {
//   const dispatch = useDispatch();

//   const [district, setDistrict] = useState(null);
//   const [thana, setThana] = useState(null);
//   const [area, setArea] = useState(null);

//   if (!open) return null;

//   const districtObj = locations.find(
//     (item) => item.id === Number(district)
//   );

//   const thanaObj = districtObj?.thanas.find(
//     (item) => item.id === Number(thana)
//   );

//   const handleConfirm = () => {
//     dispatch(
//       setExpressLocation({
//         district: districtObj,
//         thana: thanaObj,
//         area: thanaObj.areas.find(
//           (item) => item.id === Number(area)
//         ),
//       })
//     );

//     onClose();
//   };

//   return (
//     <>
//       <div
//         onClick={onClose}
//         className="fixed inset-0 z-50 bg-black/40"
//       />

//       <div className="fixed bottom-0 left-0 right-0 z-50 max-h-[90vh] rounded-t-3xl bg-white p-5 shadow-2xl">
//         <div className="mb-5 flex items-center justify-between">
//           <div>
//             <h3 className="font-semibold text-lg">
//               Express Delivery ⚡
//             </h3>

//             <p className="text-sm text-gray-500">
//               Select delivery location
//             </p>
//           </div>

//           <button onClick={onClose}>
//             <X size={22} />
//           </button>
//         </div>

//         <div className="mb-4 flex items-center gap-2 rounded-xl bg-yellow-50 p-3">
//           <MapPin size={18} />

//           <p className="text-sm">
//             Select district, thana and area.
//           </p>
//         </div>

//         <div className="space-y-4">
//           <select
//             className="w-full rounded-xl border p-3"
//             value={district || ""}
//             onChange={(e) => {
//               setDistrict(e.target.value);
//               setThana(null);
//               setArea(null);
//             }}
//           >
//             <option value="">
//               Select District
//             </option>

//             {locations.map((item) => (
//               <option
//                 key={item.id}
//                 value={item.id}
//               >
//                 {item.name}
//               </option>
//             ))}
//           </select>

//           <select
//             className="w-full rounded-xl border p-3"
//             disabled={!district}
//             value={thana || ""}
//             onChange={(e) => {
//               setThana(e.target.value);
//               setArea(null);
//             }}
//           >
//             <option value="">
//               Select Thana
//             </option>

//             {districtObj?.thanas?.map((item) => (
//               <option
//                 key={item.id}
//                 value={item.id}
//               >
//                 {item.name}
//               </option>
//             ))}
//           </select>

//           <select
//             className="w-full rounded-xl border p-3"
//             disabled={!thana}
//             value={area || ""}
//             onChange={(e) =>
//               setArea(e.target.value)
//             }
//           >
//             <option value="">
//               Select Area
//             </option>

//             {thanaObj?.areas?.map((item) => (
//               <option
//                 key={item.id}
//                 value={item.id}
//               >
//                 {item.name}
//               </option>
//             ))}
//           </select>

//           <button
//             onClick={handleConfirm}
//             disabled={!district || !thana || !area}
//             className="w-full rounded-xl bg-black py-3 text-white disabled:opacity-40"
//           >
//             Confirm Location
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }