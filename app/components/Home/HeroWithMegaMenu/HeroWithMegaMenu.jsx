"use client";

import React, { useState } from "react";
import { ChevronRight, X, ChevronLeft, LayoutGrid } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import {
  FaCapsules,
  FaHeartbeat,
  FaBaby,
  FaPills,
  FaHospital,
  FaPumpSoap,
  FaSeedling,
  FaBroom,
} from "react-icons/fa";

import "swiper/css";
import "swiper/css/pagination";
import { formatCategories, megamenuFormat, } from "@/helper/megamenuFormat";
import Link from "next/link";


const menuIcons = {
  Medicine: FaPills,
  Healthcare: FaHospital,
  Beauty: FaPumpSoap,
  "Sexual Wellness": FaHeartbeat,
  "Baby & Mom Care": FaBaby,
  Herbal: FaSeedling,
  "Home Care": FaBroom,
};

export default function HeroWithMegaMenu({ heroSliders, productCategories }) {
  const [level1, setLevel1] = useState(null);
  const [level2, setLevel2] = useState(null);

  // Mobile Menu State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileCategory, setActiveMobileCategory] = useState(null); // Level 1
  const [activeMobileSubCategory, setActiveMobileSubCategory] = useState(null); // Level 2

  const formattedCategories = formatCategories(productCategories || []);
  console.log("formattedCategories", formattedCategories)

  const drawerVariants = {
    hidden: { width: 0, opacity: 0, x: -12 },
    visible: {
      width: 256,
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: {
      width: 0,
      opacity: 0,
      x: -12,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  const mobileDrawerVariants = {
    closed: { x: "-100%" },
    open: { x: 0 },
  };

  return (
    <section className="mt-4 grid grid-cols-12 gap-4 relative">
      {/* MOBILE CATEGORY STRIP */}
      <div className="lg:hidden col-span-12 mb-2 p-3 bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4 px-1">
          <div className="flex items-center gap-2">
            <LayoutGrid className="w-5 h-5 text-[#0784BB]" />
            <h3 className="font-bold text-gray-800 text-lg">Categories</h3>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="text-[#0784BB] text-sm font-bold bg-blue-50 px-3 py-1.5 rounded-full flex items-center gap-1 transition-all active:scale-95"
          >
            All <ChevronRight size={14} />
          </button>
        </div>
        <div className="flex gap-5 overflow-x-auto pb-2 scrollbar-hide px-1">
          {formattedCategories?.map((cat, i) => {
            const Icon = menuIcons[cat.name] || FaCapsules;
            return (
              <div
                key={i}
                onClick={() => {
                  setActiveMobileCategory(cat);
                  setIsMobileMenuOpen(true);
                }}
                className="flex flex-col items-center gap-2 min-w-[70px] cursor-pointer group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-white rounded-2xl flex items-center justify-center text-[#0784BB] shadow-sm border border-blue-50 group-active:scale-90 transition-all">
                  <Icon size={24} className="opacity-90" />
                </div>
                <span className="text-[11px] font-bold text-gray-600 text-center line-clamp-1 w-full">{cat.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] lg:hidden"
            />
            <motion.div
              variants={mobileDrawerVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-[85%] max-w-sm bg-gray-50 z-[70] shadow-2xl lg:hidden flex flex-col"
            >
              {/* Header */}
              <div className="bg-white p-4 border-b flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-3">
                  {(activeMobileCategory || activeMobileSubCategory) && (
                    <button
                      onClick={() => {
                        if (activeMobileSubCategory) setActiveMobileSubCategory(null);
                        else setActiveMobileCategory(null);
                      }}
                      className="p-1.5 bg-gray-100 rounded-full text-gray-600 active:scale-90 transition-all"
                    >
                      <ChevronLeft size={20} />
                    </button>
                  )}
                  <h2 className="font-bold text-lg text-gray-800">
                    {!activeMobileCategory ? "Browse Categories" : activeMobileSubCategory ? activeMobileSubCategory.name : activeMobileCategory.name}
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setActiveMobileCategory(null);
                    setActiveMobileSubCategory(null);
                  }}
                  className="p-1.5 bg-gray-100 rounded-full text-gray-600 active:scale-90 transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4">
                {/* Level 1 List */}
                {!activeMobileCategory && (
                  <div className="grid grid-cols-1 gap-3">
                    {formattedCategories?.map((item, i) => {
                      const Icon = menuIcons[item.name] || FaCapsules;
                      return (
                        <div
                          key={i}
                          onClick={() => setActiveMobileCategory(item)}
                          className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 active:bg-blue-50 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-[#0784BB]">
                              <Icon size={20} />
                            </div>
                            <span className="font-bold text-gray-700">{item.name}</span>
                          </div>
                          {item.child?.length > 0 && <ChevronRight size={18} className="text-gray-400" />}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Level 2 List */}
                {activeMobileCategory && !activeMobileSubCategory && (
                  <div className="grid grid-cols-1 gap-2">
                    <Link
                      href={`/shop/${activeMobileCategory.name}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between p-4 bg-[#0784BB] text-white rounded-xl shadow-sm font-bold mb-2"
                    >
                      View All {activeMobileCategory.name}
                      <ChevronRight size={18} />
                    </Link>
                    {activeMobileCategory.child?.map((item, i) => (
                      <div
                        key={i}
                        onClick={() => {
                          if (item.child?.length > 0) setActiveMobileSubCategory(item);
                          else setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 active:bg-blue-50 transition-colors"
                      >
                        <span className="font-semibold text-gray-700">{item.name}</span>
                        {item.child?.length > 0 ? (
                          <ChevronRight size={18} className="text-gray-400" />
                        ) : (
                          <Link href={`/shop/${item.name}`} onClick={() => setIsMobileMenuOpen(false)} className="absolute inset-0 z-0" />
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Level 3 List */}
                {activeMobileSubCategory && (
                  <div className="grid grid-cols-1 gap-2">
                    <Link
                      href={`/shop/${activeMobileSubCategory.name}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between p-4 bg-[#0784BB] text-white rounded-xl shadow-sm font-bold mb-2"
                    >
                      View All {activeMobileSubCategory.name}
                      <ChevronRight size={18} />
                    </Link>
                    {activeMobileSubCategory.child?.map((item, i) => (
                      <Link
                        key={i}
                        href={`/shop/${item.name}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 active:bg-blue-50 transition-colors"
                      >
                        <span className="font-medium text-gray-700">{item.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* left mega menu */}
      <div
        className="hidden lg:block col-span-3 bg-white relative h-[400px] text-gray-600
                   font-semibold text-[17px] rounded-l-xl shadow-sm"
        onMouseLeave={() => {
          setLevel1(null);
          setLevel2(null);
        }}
      >
        {/* LEVEL 1 */}
        <ul className="divide-y h-full overflow-y-auto">
          {formattedCategories?.map((item, i) => {
            const Icon = menuIcons[item?.name] || FaCapsules;

            return (
              <li
                key={i}
                onMouseEnter={() => {
                  setLevel1(item);
                  setLevel2(null);
                }}
                className={`flex items-center justify-between px-4 py-3
                           hover:text-[#0784BB] hover:bg-blue-50/30 cursor-pointer transition-all ${level1?.name === item.name ? 'text-[#0784BB] bg-blue-50/50' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="text-[22px] text-[#0784BB] opacity-90 shrink-0" />
                  <span>{item?.name}</span>
                </div>

                {item?.child?.length > 0 && <ChevronRight className="w-5 h-5 opacity-50" />}
              </li>
            );
          })}
        </ul>

        {/* LEVEL 2 DRAWER */}
        <AnimatePresence mode="wait">
          {level1?.child?.length > 0 && (
            <motion.div
              key={`l2-${level1.id || level1.name}`}
              className="absolute top-0 left-full h-full bg-white shadow-xl
                         border-l z-30 overflow-hidden min-w-[256px]"
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <ul className="py-2">
                {level1?.child?.map((item) => (
                  <li
                    key={item?.id || item?.name}
                    onMouseEnter={() => setLevel2(item)}
                    className={`flex items-center justify-between px-4 py-3
                               hover:bg-[#0784BB] hover:text-white
                               cursor-pointer transition-colors ${level2?.name === item.name ? 'bg-[#0784BB] text-white' : ''}`}
                  >
                    <span>{item?.name}</span>
                    {item?.child?.length > 0 && <ChevronRight className="w-5 h-5" />}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {/* LEVEL 3 DRAWER */}
        <AnimatePresence mode="wait">
          {level2?.child?.length > 0 && (
            <motion.div
              key={`l3-${level2.id || level2.name}`}
              className="absolute top-0 left-[calc(100%+16rem)] h-full
                         bg-white shadow-xl border-l z-40 overflow-hidden min-w-[256px]"
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <ul className="py-2">
                {level2?.child?.map((item) => (
                  <li
                    key={item?.id || item?.name}
                    className="px-4 py-3 hover:bg-[#0784BB]
                               hover:text-white cursor-pointer
                               transition-colors"
                  >
                    <Link
                      href={`/shop/${item?.name}`}
                      className="block w-full"
                    >
                      {item?.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* HERO SLIDER */}
      <div className="col-span-12 lg:col-span-9">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop
          className="overflow-hidden shadow-sm   h-[150px] lg:h-[400px]"
        >
          {heroSliders?.map((item, index) => (
            <SwiperSlide key={index}>
              <img
                src={item?.featured_image}
                alt="Hero Slide"
                className="w-full h-full object-fit lg:object-fill"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
