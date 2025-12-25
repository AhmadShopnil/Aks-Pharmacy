"use client"

import React, { useState } from "react";
import { ChevronRight } from "lucide-react";

export default function LeftSidebarMegaMenu() {
  const [activeMenu, setActiveMenu] = useState(null);

  const menu = [
    {
      name: "Medicine",
      children: [
        {
          name: "Tablets",
          children: [
            { name: "Pain Relief" },
            { name: "Cold & Flu" }
          ],
        },
        { name: "Syrups" },
      ],
    },
    { name: "Healthcare" },
    { name: "Beauty" },
    { name: "Sexual Wellness" },
    { name: "Baby & Mom Care" },
    { name: "Herbal" },
    { name: "Home Care" },
  ];

  const renderMenu = (items, level = 0) => (
    <ul>
      {items.map((item, index) => {
        const key = `${item.name}-${level}-${index}`;
        const isOpen = activeMenu === key;

        return (
          <li key={key} className="">
            <div
              onClick={(e) => {
                e.stopPropagation();

                if (item.children) {
                  setActiveMenu(isOpen ? null : key);
                } else {
                  // navigate if no children
                  console.log("Navigate to:", item.name);
                }
              }}
              className="flex items-center justify-between border-none px-4 py-3 hover:bg-gray-50 cursor-pointer"
            >
              <span className="text-gray-700 text-sm">{item.name}</span>

              {item.children && (
                <ChevronRight
                  className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-90" : ""
                    }`}
                />
              )}
            </div>

            {/* DROPDOWN BELOW PARENT */}
            {item.children && isOpen && (
              <div className="bg-white pl-6 pb-2 animate-fade-down">
                {renderMenu(item.children, level + 1)}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );




  return (


    <div className="hidden lg:block col-span-3 bg-white rounded-lg shadow-sm overflow-y-auto  h-full">
      {/* Flash Sale */}
      <div className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer">
        <div className="flex items-center gap-3 text-red-600 font-semibold text-sm">
          <span className="text-yellow-500 text-xl">⚡</span> FLASH SALE
        </div>
        <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-md">1000+</span>
      </div>

      {renderMenu(menu)}
    </div>


  );
}
