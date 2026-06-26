"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Zap, MapPin } from "lucide-react";

import {
  disableExpressDelivery,
} from "@/lib/redux/features/expressDelivery/expressDeliverySlice";

import ExpressDeliveryModal from "./ExpressDeliveryModal";

export default function ExpressDeliveryButton() {
  const dispatch = useDispatch();

  const expressDelivery = useSelector(
    (state) => state.expressDelivery
  );

  const [open, setOpen] = useState(false);

  return (
    <>
      <div className=" text-white ">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              {/* <Zap
                size={18}
                className="text-yellow-500"
              /> */}

              <h4 className="font-semibold text-lg">
                Express Delivery
              </h4>
            </div>

           
          </div>

          {!expressDelivery.enabled ? (
            <button
              onClick={() => setOpen(true)}
              className="rounded-sm bg-[#8CC540] px-4 py-1.5 text-sm font-medium text-white cursor-pointer"
            >
              Enable
            </button>
          ) : (
            <span className="rounded-xs bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
              Enabled
            </span>
          )}
        </div>

        {expressDelivery.enabled && (
          <>
            <div className="mt-2  bg-gray-50 px-3 py-1.5 text-gray-700">
            
                
                  <p className="font-medium">
                    {expressDelivery.area?.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    {expressDelivery.thana?.name},{" "}
                    {
                      expressDelivery.district
                        ?.name
                    }
                  </p>
              
            
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setOpen(true)}
                className="rounded-sm border px-3 py-1.5  text-xs"
              >
                Change
              </button>

              <button
                onClick={() =>
                  dispatch(
                    disableExpressDelivery()
                  )
                }
                className="rounded-sm border border-red-600 px-3 py-1.5  text-xs bg-red-600"
              >
                Disable
              </button>
            </div>
          </>
        )}
      </div>

      <ExpressDeliveryModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}