"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { setExpressLocation } from "@/lib/redux/features/expressDelivery/expressDeliverySlice";
// import { locationData } from "@/data/locationData";



// data/locationData.js

 export const locationData = [
  {
    district: "Dhaka",
    thanas: [
      {
        name: "Mirpur",
        areas: ["Mirpur-1", "Mirpur-2", "Mirpur-10"],
      },
      {
        name: "Dhanmondi",
        areas: ["Dhanmondi 27", "Dhanmondi 32"],
      },
    ],
  },
  {
    district: "Gazipur",
    thanas: [
      {
        name: "Tongi",
        areas: ["College Gate", "Station Road"],
      },
    ],
  },
];



export default function ExpressDeliveryModal({
  open,
  onClose,
}) {
  const dispatch = useDispatch();

  const [district, setDistrict] = useState("");
  const [thana, setThana] = useState("");
  const [area, setArea] = useState("");

  if (!open) return null;

  const selectedDistrict = locationData.find(
    (item) => item.district === district
  );

  const selectedThana = selectedDistrict?.thanas.find(
    (item) => item.name === thana
  );

  const handleSave = () => {
    dispatch(
      setExpressLocation({
        district,
        thana,
        area,
      })
    );

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            Express Delivery Location
          </h3>

          <button onClick={onClose}>✕</button>
        </div>

        <div className="space-y-4">
          {/* District */}
          <select
            value={district}
            onChange={(e) => {
              setDistrict(e.target.value);
              setThana("");
              setArea("");
            }}
            className="w-full rounded-lg border p-3"
          >
            <option value="">Select District</option>

            {locationData.map((item) => (
              <option
                key={item.district}
                value={item.district}
              >
                {item.district}
              </option>
            ))}
          </select>

          {/* Thana */}
          <select
            value={thana}
            disabled={!district}
            onChange={(e) => {
              setThana(e.target.value);
              setArea("");
            }}
            className="w-full rounded-lg border p-3"
          >
            <option value="">Select Thana</option>

            {selectedDistrict?.thanas.map((item) => (
              <option
                key={item.name}
                value={item.name}
              >
                {item.name}
              </option>
            ))}
          </select>

          {/* Area */}
          <select
            value={area}
            disabled={!thana}
            onChange={(e) => setArea(e.target.value)}
            className="w-full rounded-lg border p-3"
          >
            <option value="">Select Area</option>

            {selectedThana?.areas.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <button
            disabled={!district || !thana || !area}
            onClick={handleSave}
            className="w-full rounded-lg bg-black px-4 py-3 text-white disabled:opacity-50"
          >
            Confirm Location
          </button>
        </div>
      </div>
    </div>
  );
}