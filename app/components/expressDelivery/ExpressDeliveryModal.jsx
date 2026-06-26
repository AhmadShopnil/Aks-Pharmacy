"use client";

import { useState, useEffect } from "react";
import { X, Zap } from "lucide-react";
import { useDispatch } from "react-redux";
import axiosInstance from "@/helper/axiosInstance";

import {
  setExpressLocation,
  setExpressOutlets,
} from "@/lib/redux/features/expressDelivery/expressDeliverySlice";

export default function ExpressDeliveryModal({
  open,
  onClose,
}) {
  const dispatch = useDispatch();

  const [districts, setDistricts] = useState([]);
  const [thanas, setThanas] = useState([]);
  const [areas, setAreas] = useState([]);
  const [outlets, setOutlets] = useState([]);

  const [districtId, setDistrictId] = useState("");
  const [thanaId, setThanaId] = useState("");
  const [areaId, setAreaId] = useState("");

  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingThanas, setLoadingThanas] = useState(false);
  const [loadingAreas, setLoadingAreas] = useState(false);
  const [loadingOutlets, setLoadingOutlets] = useState(false);

  // Fetch districts on mount
  useEffect(() => {
    if (open) {
      setLoadingDistricts(true);
      axiosInstance.get("/proxy/api/v1/distribution/districts")
        .then((res) => setDistricts(res.data?.data || []))
        .catch((err) => console.error("Error fetching districts:", err))
        .finally(() => setLoadingDistricts(false));
    }
  }, [open]);

  // Fetch thanas when district changes
  useEffect(() => {
    if (districtId) {
      setLoadingThanas(true);
      axiosInstance.get(`/proxy/api/v1/distribution/thanas/${districtId}`)
        .then((res) => setThanas(res.data?.data || []))
        .catch((err) => console.error("Error fetching thanas:", err))
        .finally(() => setLoadingThanas(false));
    } else {
      setThanas([]);
    }
  }, [districtId]);

  // Fetch areas when thana changes
  useEffect(() => {
    if (thanaId) {
      setLoadingAreas(true);
      axiosInstance.get(`/proxy/api/v1/distribution/areas/${thanaId}`)
        .then((res) => setAreas(res.data?.data || []))
        .catch((err) => console.error("Error fetching areas:", err))
        .finally(() => setLoadingAreas(false));
    } else {
      setAreas([]);
    }
  }, [thanaId]);

  // Fetch outlets when area changes
  useEffect(() => {
    if (areaId) {
      setLoadingOutlets(true);
      axiosInstance.get(`/proxy/api/v1/distribution/outlets/?area_id=${areaId}`)
        .then((res) => setOutlets(res.data?.data || []))
        .catch((err) => console.error("Error fetching outlets:", err))
        .finally(() => setLoadingOutlets(false));
    } else {
      setOutlets([]);
    }
  }, [areaId]);

  if (!open) return null;

  const selectedDistrict = districts.find(d => d.id === Number(districtId));
  const selectedThana = thanas.find(t => t.id === Number(thanaId));
  const selectedArea = areas.find(a => a.id === Number(areaId));

  const handleSubmit = () => {
    dispatch(
      setExpressLocation({
        district: selectedDistrict,
        thana: selectedThana,
        area: selectedArea,
      })
    );
    dispatch(setExpressOutlets(outlets));

    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/50"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
        <div className="w-full rounded-t-3xl bg-white p-6 shadow-xl sm:max-w-md sm:rounded-3xl">
          {/* Header */}
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* <div className="rounded-full bg-yellow-100 p-2">
                <Zap
                  size={18}
                  className="text-yellow-600"
                />
              </div> */}

              <div>
                <h3 className="font-semibold text-lg">
                  Express Delivery
                </h3>

                <p className="text-xs text-gray-500">
                  Select delivery location
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="rounded-full p-1 hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="space-y-4">
            {/* District */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                District
              </label>

              <select
                value={districtId}
                disabled={loadingDistricts}
                onChange={(e) => {
                  setDistrictId(e.target.value);
                  setThanaId("");
                  setAreaId("");
                }}
                className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-black disabled:bg-gray-100"
              >
                <option value="">
                  {loadingDistricts ? "Loading..." : "Select District"}
                </option>

                {districts.map((item) => (
                  <option
                    key={item.id}
                    value={item.id}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Thana */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Thana
              </label>

              <select
                value={thanaId}
                disabled={!districtId || loadingThanas}
                onChange={(e) => {
                  setThanaId(e.target.value);
                  setAreaId("");
                }}
                className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-black disabled:bg-gray-100"
              >
                <option value="">
                  {loadingThanas ? "Loading..." : "Select Thana"}
                </option>

                {thanas.map((item) => (
                  <option
                    key={item.id}
                    value={item.id}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Area */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Area
              </label>

              <select
                value={areaId}
                disabled={!thanaId || loadingAreas}
                onChange={(e) =>
                  setAreaId(e.target.value)
                }
                className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-black disabled:bg-gray-100"
              >
                <option value="">
                  {loadingAreas ? "Loading..." : "Select Area"}
                </option>

                {areas.map((item) => (
                  <option
                    key={item.id}
                    value={item.id}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit */}
            <button
              disabled={
                !districtId ||
                !thanaId ||
                !areaId
              }
              onClick={handleSubmit}
              className="w-full rounded-xl bg-black py-3 font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Enable Express Delivery
            </button>
          </div>
        </div>
      </div>
    </>
  );
}