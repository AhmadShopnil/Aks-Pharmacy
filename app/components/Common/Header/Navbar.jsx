import React from "react";
import Image from "next/image";
import { ChevronDown, Search, User, ShoppingCart } from "lucide-react";

export default function Navbar() {
  return (
    <header className="w-full bg-white shadow-sm">
      <div className="container mx-auto px-3 py-6 flex items-center gap-6 justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer select-none">
            {/* <Image
              src="/images/logo.png" // change logo
              width={120}
              height={40}
              alt="logo"
            /> */}
            <p className="font-extrabold text-4xl text-green-500 mr-4" >AKS</p>
            {/* <span className="text-xs text-gray-500 -ml-2">For better health</span> */}
          </div>

          {/* Delivery */}
          <div className="hidden md:flex flex-col leading-tight cursor-pointer">
            <span className="text-xs text-gray-500">Delivery to</span>
            <div className="flex items-center gap-1 text-sm font-semibold text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4 text-gray-800"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
              Bangladesh
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div className="flex-1 hidden lg:flex">
          <div className="w-full bg-teal-50 flex items-center rounded-md overflow-hidden h-12 border border-teal-100">
            {/* Category */}
            <div className="px-4 h-full flex items-center gap-1 border-r border-gray-200 bg-white text-sm text-gray-700 cursor-pointer select-none">
              All <ChevronDown className="w-4 h-4" />
            </div>

            {/* Input */}
            <input
              type="text"
              placeholder='Search for "healthcare products"'
              className="flex-1 px-4 bg-transparent outline-none text-sm text-gray-700"
            />

            {/* Search button */}
            <button className="bg-[#1d81b3] h-full px-5 flex items-center justify-center text-white">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-2 cursor-pointer text-sm text-gray-700">
            <User className="w-6 h-6 text-gray-500" />
            <div className="leading-tight">
              <p>Hello, User</p>
              <p className="font-semibold cursor-pointer">Account & Orders</p>
            </div>
          </div>

          {/* Cart */}
          <div className="relative cursor-pointer">
            <ShoppingCart className="w-6 h-6 text-gray-700" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">0</span>
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="px-4 pb-3 lg:hidden">
        <div className="bg-teal-50 flex items-center rounded-md overflow-hidden h-11 border border-teal-100">
          <input
            type="text"
            placeholder="Search medicine, products..."
            className="flex-1 px-4 bg-transparent outline-none text-sm text-gray-700"
          />
          <button className="bg-teal-700 h-full px-4 flex items-center justify-center text-white">
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
