'use client';

import React from "react";
import Image from "next/image";
import { ChevronDown, Search, User } from "lucide-react";
import Container from "../Container";
import CartButton from "../CartButton";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50 py-4 ">
      <Container className=" flex items-center gap-6 justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link 
          href='/'
          className="flex items-center gap-2 cursor-pointer select-none">
            <Image
              src="/images/logos/aks.png"
              width={150}
              height={70}
              alt="logo"
            />
          </Link>

          {/* Delivery */}
          <div className="hidden md:flex flex-col leading-tight cursor-pointer text-black font-semibold">
            <span className="text-sm ">Delivery to</span>
            <div className="flex items-center gap-1 text-base  ">
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
          <div className="hidden md:flex items-center gap-2 cursor-pointer text-base text-gray-700 font-semibold">
            <User className="w-6 h-6 text-gray-500" />
            <div className="leading-tight">
              <p><span className="text-gray-500">Hello,</span> User</p>
              <p className="font-semibold">Account & Orders</p>
            </div>
          </div>

          {/* Cart Button with Redux Integration */}
          <CartButton />
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
