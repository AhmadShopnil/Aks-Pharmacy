"use client";

import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import { megamenuFormat } from "@/helper/megamenuFormat";

/* ---------------- SAMPLE DATA (API SIMULATION) ---------------- */
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
  { name: "Baby & Mom Care" },
  { name: "Herbal" },
  { name: "Home Care" },
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
        className="hidden lg:block col-span-3 bg-white shadow-sm relative h-96
                   font-semibold text-[17px]"
        onMouseLeave={() => {
          setLevel1(null);
          setLevel2(null);
        }}
      >
        {/* LEVEL 1 (SCROLLABLE) */}
        <ul className="divide-y h-full overflow-y-auto">
          {formattedMenu?.map((item) => (
            <li
              key={item.name}
              onMouseEnter={() => {
                setLevel1(item);
                setLevel2(null);
              }}
              className="flex items-center justify-between px-4 py-3
                         hover:text-[#0784BB] cursor-pointer transition-colors"
            >
              <span>{item.name}</span>
              {item.children && <ChevronRight className="w-4 h-4" />}
            </li>
          ))}
        </ul>

        {/* LEVEL 2 DRAWER */}
        <AnimatePresence>
          {level1?.children && (
            <motion.div
              className="absolute top-0 left-full h-full bg-white shadow-sm
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
                    className="flex items-center justify-between px-4 py-3
                               hover:bg-[#0784BB] hover:text-white
                               cursor-pointer transition-colors"
                  >
                    <span>{item.name}</span>
                    {item.children && <ChevronRight className="w-4 h-4" />}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {/* LEVEL 3 DRAWER (MAX DEPTH) */}
        <AnimatePresence>
          {level2?.children && (
            <motion.div
              className="absolute top-0 left-[calc(100%+16rem)] h-full
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
                    className="px-4 py-3 hover:bg-[#0784BB]
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

      {/* RIGHT HERO SLIDER */}
      <div className="col-span-12 lg:col-span-9">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop
          className="rounded-xl overflow-hidden shadow-sm"
        >
          {slides.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt="Hero Slide"
                className="w-full h-64 lg:h-96 object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
