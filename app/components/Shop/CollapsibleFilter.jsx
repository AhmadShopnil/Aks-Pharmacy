"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function CollapsibleFilter({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border rounded-sm overflow-hidden">
      {/* Header */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 font-semibold bg-white"
      >
        {title}
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Content */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden px-4`}
      >
        <div className="pb-4">{children}</div>
      </div>
    </div>
  );
}
