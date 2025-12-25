import React from "react";
import Image from "next/image";
import { ChevronDown, Search, User, ShoppingCart } from "lucide-react";
import Container from "../Container";

export default function Navbar() {
  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <Container className=" flex items-center gap-6 justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer select-none">
            <p className="font-extrabold text-4xl text-green-500 mr-4">AKS</p>
          </div>

          {/* Delivery */}
          <div className="hidden md:flex flex-col leading-tight cursor-pointer">
            <span className="text-xs text-gray-500">Delivery to</span>
            <div className="flex items-center gap-1 text-sm font-semibold text-gray-700">
              Bangladesh
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div className="flex-1 hidden lg:flex">
          <div className="w-full bg-teal-50 flex items-center rounded-md overflow-hidden h-12 border border-teal-100">
            <div className="px-4 h-full flex items-center gap-1 border-r border-gray-200 bg-white text-sm text-gray-700">
              All <ChevronDown className="w-4 h-4" />
            </div>

            <input
              type="text"
              placeholder='Search for "healthcare products"'
              className="flex-1 px-4 bg-transparent outline-none text-sm text-gray-700"
            />

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
              <p className="font-semibold">Account & Orders</p>
            </div>
          </div>

          <div className="relative cursor-pointer">
            <ShoppingCart className="w-6 h-6 text-gray-700" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              0
            </span>
          </div>
        </div>
      </Container>

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
