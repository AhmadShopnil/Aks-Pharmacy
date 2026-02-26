// "use client";

// import React, { useState } from "react";
// import { ChevronRight, X, ChevronLeft, Menu } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import "swiper/css";
// import "swiper/css/pagination";
// import { megamenuFormat } from "@/helper/megamenuFormat";
// import Link from "next/link";
// import {
//     FaCapsules,
//     FaHeartbeat,
//     FaBaby,
//     FaPills,
//     FaHospital,
//     FaPumpSoap,
//     FaSeedling,
//     FaBroom,
// } from "react-icons/fa";

// /* ---------------- ICON MAP ---------------- */
// const menuIcons = {
//     Medicine: FaPills,
//     Healthcare: FaHospital,
//     Beauty: FaPumpSoap,
//     "Sexual Wellness": FaHeartbeat,
//     "Baby & Mom Care": FaBaby,
//     Herbal: FaSeedling,
//     "Home Care": FaBroom,
// };

// const menu = [
//     {
//         name: "Medicine",
//         children: [
//             {
//                 name: "Tablets",
//                 children: [
//                     {
//                         name: "Pain Relief",
//                         children: [{ name: "test 1" }, { name: "test 2" }],
//                     },
//                     { name: "Cold & Flu" },
//                     { name: "Antibiotics" },
//                     { name: "Diabetes Care" },
//                 ],
//             },
//             {
//                 name: "Syrups",
//                 children: [
//                     { name: "Cough Syrup" },
//                     { name: "Digestive Syrup" },
//                     { name: "Immune Booster" },
//                 ],
//             },
//         ],
//     },
//     {
//         name: "Healthcare",
//         children: [
//             {
//                 name: "Medical Devices",
//                 children: [
//                     { name: "BP Monitor" },
//                     { name: "Thermometer" },
//                     { name: "Nebulizer" },
//                 ],
//             },
//             {
//                 name: "Daily Essentials",
//                 children: [
//                     { name: "Face Mask" },
//                     { name: "Hand Sanitizer" },
//                     { name: "Gloves" },
//                 ],
//             },
//         ],
//     },
//     { name: "Beauty" },
//     { name: "Sexual Wellness" },
//     {
//         name: "Healthcare",
//         children: [
//             {
//                 name: "Medical Devices",
//                 children: [
//                     { name: "BP Monitor" },
//                     { name: "Thermometer" },
//                     { name: "Nebulizer" },
//                 ],
//             },
//             {
//                 name: "Daily Essentials",
//                 children: [
//                     { name: "Face Mask" },
//                     { name: "Hand Sanitizer" },
//                     { name: "Gloves" },
//                 ],
//             },
//         ],
//     },
//     { name: "Baby & Mom Care" },
//     { name: "Herbal" },
//     {
//         name: "Healthcare",
//         children: [
//             {
//                 name: "Medical Devices",
//                 children: [
//                     { name: "BP Monitor" },
//                     { name: "Thermometer" },
//                     { name: "Nebulizer" },
//                 ],
//             },
//             {
//                 name: "Daily Essentials",
//                 children: [
//                     { name: "Face Mask" },
//                     { name: "Hand Sanitizer" },
//                     { name: "Gloves" },
//                 ],
//             },
//         ],
//     },
//     { name: "Home Care" },
// ];

// /* ---------------- COMPONENT ---------------- */
// export default function MegaMenu({formattedCategories}) {
//     const [level1, setLevel1] = useState(null);
//     const [level2, setLevel2] = useState(null);

//     // Mobile Menu State
//     const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//     const [activeMobileCategory, setActiveMobileCategory] = useState(null);
//     const [activeMobileSubCategory, setActiveMobileSubCategory] = useState(null);

//     const formattedMenu = megamenuFormat(menu);

//     const drawerVariants = {
//         hidden: { width: 0, opacity: 0, x: -12 },
//         visible: {
//             width: 256,
//             opacity: 1,
//             x: 0,
//             transition: { duration: 0.3, ease: "easeOut" },
//         },
//         exit: {
//             width: 0,
//             opacity: 0,
//             x: -12,
//             transition: { duration: 0.2, ease: "easeIn" },
//         },
//     };

//     const mobileDrawerVariants = {
//         closed: { x: "-100%" },
//         open: { x: 0 },
//     };

//     return (
//         <>
//             {/* MOBILE TRIGGER BUTTON (Floating) */}
//             <div className="lg:hidden fixed bottom-6 right-6 z-[50]">
//                 <button
//                     onClick={() => setIsMobileMenuOpen(true)}
//                     className="w-14 h-14 bg-[#0784BB] text-white rounded-full shadow-lg flex items-center justify-center active:scale-90 transition-transform"
//                 >
//                     <Menu size={28} />
//                 </button>
//             </div>

//             {/* MOBILE DRAWER */}
//             <AnimatePresence>
//                 {isMobileMenuOpen && (
//                     <>
//                         <motion.div
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             exit={{ opacity: 0 }}
//                             onClick={() => setIsMobileMenuOpen(false)}
//                             className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] lg:hidden"
//                         />
//                         <motion.div
//                             variants={mobileDrawerVariants}
//                             initial="closed"
//                             animate="open"
//                             exit="closed"
//                             transition={{ type: "spring", damping: 25, stiffness: 200 }}
//                             className="fixed top-0 left-0 h-full w-[85%] max-w-sm bg-gray-50 z-[70] shadow-2xl lg:hidden flex flex-col uppercase"
//                         >
//                             {/* Header */}
//                             <div className="bg-white p-4 border-b flex items-center justify-between sticky top-0 z-10">
//                                 <div className="flex items-center gap-3">
//                                     {(activeMobileCategory || activeMobileSubCategory) && (
//                                         <button
//                                             onClick={() => {
//                                                 if (activeMobileSubCategory) setActiveMobileSubCategory(null);
//                                                 else setActiveMobileCategory(null);
//                                             }}
//                                             className="p-1.5 bg-gray-100 rounded-full text-gray-600 active:scale-90 transition-all font-bold"
//                                         >
//                                             <ChevronLeft size={20} />
//                                         </button>
//                                     )}
//                                     <h2 className="font-bold text-gray-800">
//                                         {!activeMobileCategory ? "Categories" : activeMobileSubCategory ? activeMobileSubCategory.name : activeMobileCategory.name}
//                                     </h2>
//                                 </div>
//                                 <button
//                                     onClick={() => {
//                                         setIsMobileMenuOpen(false);
//                                         setActiveMobileCategory(null);
//                                         setActiveMobileSubCategory(null);
//                                     }}
//                                     className="p-1.5 bg-gray-100 rounded-full text-gray-600 active:scale-90 transition-all"
//                                 >
//                                     <X size={20} />
//                                 </button>
//                             </div>

//                             {/* Content */}
//                             <div className="flex-1 overflow-y-auto p-4">
//                                 {!activeMobileCategory && (
//                                     <div className="grid grid-cols-1 gap-3">
//                                         {formattedMenu.map((item, i) => {
//                                             const Icon = menuIcons[item.name] || FaCapsules;
//                                             return (
//                                                 <div
//                                                     key={i}
//                                                     onClick={() => {
//                                                         if (item.children) setActiveMobileCategory(item);
//                                                         else setIsMobileMenuOpen(false);
//                                                     }}
//                                                     className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 active:bg-blue-50 transition-colors relative"
//                                                 >
//                                                     <div className="flex items-center gap-4">
//                                                         <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-[#0784BB]">
//                                                             <Icon size={20} />
//                                                         </div>
//                                                         <span className="font-bold text-sm text-gray-700">{item.name}</span>
//                                                     </div>
//                                                     {item.children?.length > 0 ? (
//                                                         <ChevronRight size={18} className="text-gray-400" />
//                                                     ) : (
//                                                         <Link href={`/shop/${item.name}`} onClick={() => setIsMobileMenuOpen(false)} className="absolute inset-0 z-0" />
//                                                     )}
//                                                 </div>
//                                             );
//                                         })}
//                                     </div>
//                                 )}

//                                 {activeMobileCategory && !activeMobileSubCategory && (
//                                     <div className="grid grid-cols-1 gap-2">
//                                         <Link
//                                             href={`/shop/${activeMobileCategory.name}`}
//                                             onClick={() => setIsMobileMenuOpen(false)}
//                                             className="flex items-center justify-between p-4 bg-[#0784BB] text-white rounded-xl shadow-sm font-bold mb-2"
//                                         >
//                                             View All {activeMobileCategory.name}
//                                             <ChevronRight size={18} />
//                                         </Link>
//                                         {activeMobileCategory.children?.map((item, i) => (
//                                             <div
//                                                 key={i}
//                                                 onClick={() => {
//                                                     if (item.children?.length > 0) setActiveMobileSubCategory(item);
//                                                     else setIsMobileMenuOpen(false);
//                                                 }}
//                                                 className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 active:bg-blue-50 transition-colors relative"
//                                             >
//                                                 <span className="font-semibold text-sm text-gray-700">{item.name}</span>
//                                                 {item.children?.length > 0 ? (
//                                                     <ChevronRight size={18} className="text-gray-400" />
//                                                 ) : (
//                                                     <Link href={`/shop/${item.name}`} onClick={() => setIsMobileMenuOpen(false)} className="absolute inset-0 z-0" />
//                                                 )}
//                                             </div>
//                                         ))}
//                                     </div>
//                                 )}

//                                 {activeMobileSubCategory && (
//                                     <div className="grid grid-cols-1 gap-2">
//                                         <Link
//                                             href={`/shop/${activeMobileSubCategory.name}`}
//                                             onClick={() => setIsMobileMenuOpen(false)}
//                                             className="flex items-center justify-between p-4 bg-[#0784BB] text-white rounded-xl shadow-sm font-bold mb-2"
//                                         >
//                                             View All {activeMobileSubCategory.name}
//                                             <ChevronRight size={18} />
//                                         </Link>
//                                         {activeMobileSubCategory.children?.map((item, i) => (
//                                             <Link
//                                                 key={i}
//                                                 href={`/shop/${item.name}`}
//                                                 onClick={() => setIsMobileMenuOpen(false)}
//                                                 className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 active:bg-blue-50 transition-colors"
//                                             >
//                                                 <span className="font-medium text-sm text-gray-700">{item.name}</span>
//                                             </Link>
//                                         ))}
//                                     </div>
//                                 )}
//                             </div>
//                         </motion.div>
//                     </>
//                 )}
//             </AnimatePresence>

//             <section className="relative">
//                 {/* LEFT MEGA MENU */}
//                 <div
//                     className="hidden lg:block col-span-3 bg-white relative text-gray-600
//                    font-semibold text-[17px]"
//                     onMouseLeave={() => {
//                         setLevel1(null);
//                         setLevel2(null);
//                     }}
//                 >
//                     {/* Flash Sale */}
//                     {/* <div className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer">
//                         <div className="flex items-center gap-3 text-black font-extrabold italic">
//                             <span className="text-yellow-500 text-2xl">⚡</span> FLASH SALE
//                         </div>
//                         <span className="border border-[#1d81b3cc] text-[#1d81b3cc] text-sm px-2 py-1 rounded-sm font-semibold">1000+</span>
//                     </div> */}

//                     {/* LEVEL 1 */}
//                     <ul className="divide-y h-full overflow-y-auto">
//                         {formattedMenu.map((item, i) => {
//                             const Icon = menuIcons[item.name] || FaCapsules;

//                             return (
//                                 <li
//                                     key={i}
//                                     onMouseEnter={() => {
//                                         setLevel1(item);
//                                         setLevel2(null);
//                                     }}
//                                     className={`flex items-center justify-between px-4 py-3
//                                hover:text-[#0784BB] cursor-pointer transition-colors ${level1?.name === item.name ? 'text-[#0784BB] bg-blue-50/50' : ''}`}
//                                 >
//                                     <div className="flex items-center gap-3">
//                                         <Icon className="text-[22px] text-[#0784BB] opacity-90 shrink-0" />
//                                         <span>{item.name}</span>
//                                     </div>
//                                     {item.children && <ChevronRight className="w-5 h-5 opacity-50" />}
//                                 </li>
//                             );
//                         })}
//                     </ul>

//                     {/* LEVEL 2 DRAWER */}
//                     <AnimatePresence>
//                         {level1?.children && (
//                             <motion.div
//                                 className="absolute top-0 left-full h-full bg-white shadow-xl
//                              border-l z-30 overflow-hidden min-w-[256px]"
//                                 variants={drawerVariants}
//                                 initial="hidden"
//                                 animate="visible"
//                                 exit="exit"
//                             >
//                                 <ul className="py-2">
//                                     {level1.children.map((item) => (
//                                         <li
//                                             key={item.name}
//                                             onMouseEnter={() => setLevel2(item)}
//                                             className={`flex items-center justify-between px-4 py-3
//                                    hover:bg-[#0784BB] hover:text-white
//                                    cursor-pointer transition-colors ${level2?.name === item.name ? 'bg-[#0784BB] text-white' : ''}`}
//                                         >
//                                             <span>{item.name}</span>
//                                             {item.children && <ChevronRight className="w-5 h-5" />}
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </motion.div>
//                         )}
//                     </AnimatePresence>

//                     {/* LEVEL 3 DRAWER */}
//                     <AnimatePresence>
//                         {level2?.children && (
//                             <motion.div
//                                 className="absolute top-0 left-[calc(100%+16rem)] h-full
//                              bg-white shadow-xl border-l z-40 overflow-hidden min-w-[256px]"
//                                 variants={drawerVariants}
//                                 initial="hidden"
//                                 animate="visible"
//                                 exit="exit"
//                             >
//                                 <ul className="py-2">
//                                     {level2.children.map((item) => (
//                                         <li
//                                             key={item.name}
//                                             className="px-4 py-3 hover:bg-[#0784BB]
//                                    hover:text-white cursor-pointer
//                                    transition-colors"
//                                         >
//                                             <Link href={`/shop/${item?.name}`} className="block w-full">
//                                                 {item.name}
//                                             </Link>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </motion.div>
//                         )}
//                     </AnimatePresence>
//                 </div>
//             </section>
//         </>
//     );
// }
