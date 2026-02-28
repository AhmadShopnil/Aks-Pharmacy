'use client';

import React, { useState } from "react";
import Image from "next/image";
import { ChevronDown, User } from "lucide-react";
import SearchSuggestions from "./SearchSuggestions";
import Container from "../Container";
import CartButton from "../CartButton";
import Link from "next/link";
import WishlistButton from "../WishlistButton";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/lib/redux/features/user/userSlice";
import { openAuthModal } from "@/lib/redux/features/ui/uiSlice";

export default function Navbar() {

  const dispatch = useDispatch();
  const { isAuthenticated, profile } = useSelector((state) => state.user);
  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50 py-2 md:py-4 overflow-visible">
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
              className="w-[110px] md:w-[130px] lg:w-[150px]"
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
          <SearchSuggestions />
        </div>

        {/* Right section */}
        <div className="flex items-center gap-6">
          {isAuthenticated ? (
            <div className="hidden md:flex items-center gap-4">
              <Link href="/dashboard" className="flex items-center gap-2 cursor-pointer text-base text-gray-700 font-semibold hover:text-blue-600 transition-colors">
                <User className="w-6 h-6 text-gray-500" />
                <div className="leading-tight">
                  <p><span className="text-gray-500">Hello,</span> {profile?.name || "User"}</p>
                  <p className="font-semibold">Account & Orders</p>
                </div>
              </Link>
              <button
                onClick={() => dispatch(logout())}
                className="text-sm text-red-600 font-semibold hover:text-red-800 transition-colors px-3 py-1 border border-red-200 rounded-md"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => dispatch(openAuthModal())}
              className="text-base text-gray-700 font-semibold hover:text-blue-600 transition-colors px-4 py-2 cursor-pointer"
            >
              Login
            </button>
          )}

          {/* Wishlist Button */}
          <WishlistButton />

          {/* Cart Button with Redux Integration */}
          <CartButton />
        </div>


      </Container>

      <div className="px-4  lg:hidden mt-2">
        <SearchSuggestions isMobile />
      </div>
    </header>
  );
}
