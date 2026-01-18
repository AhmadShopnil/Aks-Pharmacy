"use client";

import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import {
  FaCapsules,
  FaHeartbeat,
  FaSpa,
  FaBaby,
  FaLeaf,
  FaHome,
  FaPills,
  FaHospital,
  FaPumpSoap,

  FaSeedling,
  FaBroom,
} from "react-icons/fa";

import "swiper/css";
import "swiper/css/pagination";
import { megamenuFormat } from "@/helper/megamenuFormat";

/* ---------------- ICON MAP ---------------- */
const menuIcons = {
  Medicine: FaPills,
  Healthcare: FaHospital,
  Beauty: FaPumpSoap,
  "Sexual Wellness": FaHeartbeat,
  "Baby & Mom Care": FaBaby,
  Herbal: FaSeedling,
  "Home Care": FaBroom,
};

// const menuIcons = {
//   Medicine: FaCapsules,
//   Healthcare: FaHeartbeat,
//   Beauty: FaSpa,
//   "Sexual Wellness": FaHeartbeat,
//   "Baby & Mom Care": FaBaby,
//   Herbal: FaLeaf,
//   "Home Care": FaHome,
// };

/* ---------------- SAMPLE DATA ---------------- */
const menu = [
  {
    name: "Medicine",
    children: [
      {
        name: "Tablets",
        children: [
          {
            name: "Pain Relief",
            children: [{ name: "test 1" }, { name: "test 2" }],
          },
          { name: "Cold & Flu" },
          { name: "Antibiotics" },
          { name: "Diabetes Care" },
        ],
      },
      {
        name: "Syrups",
        children: [
          { name: "Cough Syrup" },
          { name: "Digestive Syrup" },
          { name: "Immune Booster" },
        ],
      },
    ],
  },
  {
    name: "Healthcare",
    children: [
      {
        name: "Medical Devices",
        children: [
          { name: "BP Monitor" },
          { name: "Thermometer" },
          { name: "Nebulizer" },
        ],
      },
      {
        name: "Daily Essentials",
        children: [
          { name: "Face Mask" },
          { name: "Hand Sanitizer" },
          { name: "Gloves" },
        ],
      },
    ],
  },
  { name: "Beauty" },
  { name: "Sexual Wellness" },
    {
    name: "Healthcare",
    children: [
      {
        name: "Medical Devices",
        children: [
          { name: "BP Monitor" },
          { name: "Thermometer" },
          { name: "Nebulizer" },
        ],
      },
      {
        name: "Daily Essentials",
        children: [
          { name: "Face Mask" },
          { name: "Hand Sanitizer" },
          { name: "Gloves" },
        ],
      },
    ],
  },
  { name: "Baby & Mom Care" },
  { name: "Herbal" },
    {
    name: "Healthcare",
    children: [
      {
        name: "Medical Devices",
        children: [
          { name: "BP Monitor" },
          { name: "Thermometer" },
          { name: "Nebulizer" },
        ],
      },
      {
        name: "Daily Essentials",
        children: [
          { name: "Face Mask" },
          { name: "Hand Sanitizer" },
          { name: "Gloves" },
        ],
      },
    ],
  },
  { name: "Home Care" },
];

/* ---------------- COMPONENT ---------------- */
export default function HeroWithMegaMenu() {
  const [level1, setLevel1] = useState(null);
  const [level2, setLevel2] = useState(null);

  const formattedMenu = megamenuFormat(menu);

  const slides = [
    "/images/medicine/1.jpg",
    "/images/medicine/2.jpg",
    "/images/medicine/3.jpg",
  ];

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

  return (
    <section className="mt-4 grid grid-cols-12 gap-4 relative">
      {/* LEFT MEGA MENU */}
      <div
        className="hidden lg:block col-span-3 bg-white  relative h-[400px] text-gray-600
                   font-semibold text-[17px] "
        onMouseLeave={() => {
          setLevel1(null);
          setLevel2(null);
        }}
      >
          {/* Flash Sale */}
      <div className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer o">
        <div className="flex items-center gap-3 text-black font-semibold text-base italic">
          <span className="text-yellow-500 text-xl">⚡</span> FLASH SALE
        </div>
        <span className="bg-[#1d81b3cc] text-white text-xs px-2 py-1 rounded-sm">1000+</span>
      </div>
        {/* LEVEL 1 */}
        <ul className="divide-y h-full overflow-y-auto">
          {formattedMenu.map((item,i) => {
            const Icon = menuIcons[item.name] || FaCapsules;

            return (
              <li
                key={i}
                onMouseEnter={() => {
                  setLevel1(item);
                  setLevel2(null);
                }}
                className="flex items-center justify-between px-4 py-3
                           hover:text-[#0784BB] cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  {/* <li className="group ...">
                    <Icon className="transition-transform duration-200 group-hover:scale-110" />
                  </li> */}
                  <Icon className="text-[22px] text-[#0784BB] opacity-90 shrink-0" />
                  <span>{item.name}</span>
                </div>

                {item.children && <ChevronRight className="w-5 h-5" />}
              </li>
            );
          })}
        </ul>

        {/* LEVEL 2 DRAWER */}
        <AnimatePresence>
          {level1?.children && (
            <motion.div
              className="absolute top-12 left-full h-full bg-white shadow-sm
                         border-l z-30 overflow-hidden"
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <ul>
                {level1.children.map((item) => (
                  <li
                    key={item.name}
                    onMouseEnter={() => setLevel2(item)}
                    className="flex items-center justify-between px-4 py-2
                               hover:bg-[#0784BB] hover:text-white
                               cursor-pointer transition-colors"
                  >
                    <span>{item.name}</span>
                    {item.children && <ChevronRight className="w-5 h-5" />}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {/* LEVEL 3 DRAWER */}
        <AnimatePresence>
          {level2?.children && (
            <motion.div
              className="absolute top-12 left-[calc(100%+16rem)] h-full
                         bg-white shadow-sm border-l z-40 overflow-hidden"
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <ul>
                {level2.children.map((item) => (
                  <li
                    key={item.name}
                    className="px-4 py-2 hover:bg-[#0784BB]
                               hover:text-white cursor-pointer
                               transition-colors"
                  >
                    {item.name}
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
          className="overflow-hidden shadow-sm"
        >
          {slides.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt="Hero Slide"
                className="w-full h-64 lg:h-[400px] object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
