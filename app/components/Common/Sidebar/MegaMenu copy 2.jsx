// "use client";

// import React, { useState } from "react";
// import { ChevronRight, X, ChevronLeft, Menu } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import "swiper/css";
// import "swiper/css/pagination";
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

// const menuIcons = {
//     Medicine: FaPills,
//     Healthcare: FaHospital,
//     Beauty: FaPumpSoap,
//     "Sexual Wellness": FaHeartbeat,
//     "Baby & Mom Care": FaBaby,
//     Herbal: FaSeedling,
//     "Home Care": FaBroom,
// };




// export default function MegaMenu({ formattedCategories }) {
//     const [level1, setLevel1] = useState(null);
//     const [level2, setLevel2] = useState(null);

//     // Mobile Menu State
//     const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//     const [activeMobileCategory, setActiveMobileCategory] = useState(null);
//     const [activeMobileSubCategory, setActiveMobileSubCategory] = useState(null);



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
//             <div className="lg:hidden fixed bottom-6 right-3 z-[50]">
//                 <button
//                     onClick={() => setIsMobileMenuOpen(true)}
//                     className="w-13 h-13 bg-[#0784BB] text-white rounded-full shadow-lg flex items-center justify-center active:scale-90 transition-transform"
//                 >
//                     <Menu size={25} />
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
//                             className="fixed top-0 left-0 h-full w-[85%] max-w-sm bg-gray-50 z-[70] shadow-sm lg:hidden flex flex-col uppercase"
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
//                             <div className="flex-1 overflow-y-auto p-2">
//                                 {!activeMobileCategory && (
//                                     <div className="grid grid-cols-1 ">
//                                         {formattedCategories?.map((item, i) => {
//                                             const Icon = menuIcons[item.name] || FaCapsules;
//                                             return (
//                                                 <div
//                                                     key={i}
//                                                     onClick={() => {
//                                                         if (item.child) setActiveMobileCategory(item);
//                                                         else setIsMobileMenuOpen(false);
//                                                     }}
//                                                     className="flex items-center justify-between p-2 bg-white rounded-sm  border border-gray-200 active:bg-blue-50 transition-colors relative"
//                                                 >
//                                                     <div className="flex items-center gap-4">
//                                                         <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-[#0784BB]">
//                                                             <Icon size={20} />
//                                                         </div>
//                                                         <span className="font-bold text-sm text-gray-700">{item.name}</span>
//                                                     </div>
//                                                     {item.child?.length > 0 ? (
//                                                         <ChevronRight size={18} className="text-gray-400" />
//                                                     ) : (
//                                                         <Link href={`/products/${item.name}`} onClick={() => setIsMobileMenuOpen(false)} className="absolute inset-0 z-0" />
//                                                     )}
//                                                 </div>
//                                             );
//                                         })}
//                                     </div>
//                                 )}

//                                 {activeMobileCategory && !activeMobileSubCategory && (
//                                     <div className="grid grid-cols-1">
//                                         <Link
//                                             href={`/products/${activeMobileCategory.name}`}
//                                             onClick={() => setIsMobileMenuOpen(false)}
//                                             className="flex items-center justify-between p-3 bg-[#0784BB] text-white rounded-sm  font-bold mb-2"
//                                         >
//                                             View All {activeMobileCategory.name}
//                                             <ChevronRight size={18} />
//                                         </Link>
//                                         {activeMobileCategory.child?.map((item, i) => (
//                                             <div
//                                                 key={i}
//                                                 onClick={() => {
//                                                     if (item.child?.length > 0) setActiveMobileSubCategory(item);
//                                                     else setIsMobileMenuOpen(false);
//                                                 }}
//                                                 className="flex items-center justify-between p-3 bg-white rounded-sm  border border-gray-200 active:bg-blue-50 transition-colors relative"
//                                             >
//                                                 <span className="font-semibold text-sm text-gray-700">{item.name}</span>
//                                                 {item.child?.length > 0 ? (
//                                                     <ChevronRight size={18} className="text-gray-400" />
//                                                 ) : (
//                                                     <Link href={`/products/${item.name}`} onClick={() => setIsMobileMenuOpen(false)} className="absolute inset-0 z-0" />
//                                                 )}
//                                             </div>
//                                         ))}
//                                     </div>
//                                 )}

//                                 {activeMobileSubCategory && (
//                                     <div className="grid grid-cols-1 ">
//                                         <Link
//                                             href={`/products/${activeMobileSubCategory.name}`}
//                                             onClick={() => setIsMobileMenuOpen(false)}
//                                             className="flex items-center justify-between p-3 bg-[#0784BB] text-white rounded-sm shadow-sm font-bold mb-2"
//                                         >
//                                             View All {activeMobileSubCategory.name}
//                                             <ChevronRight size={18} />
//                                         </Link>
//                                         {activeMobileSubCategory.child?.map((item, i) => (
//                                             <Link
//                                                 key={i}
//                                                 href={`/products/${item.name}`}
//                                                 onClick={() => setIsMobileMenuOpen(false)}
//                                                 className="flex items-center justify-between p-3 bg-white rounded-sm  border border-gray-200 active:bg-blue-50 transition-colors"
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
//                     className="hidden lg:block col-span-3 bg-white relative text-gray-600 font-semibold text-[17px] h-screen"
//                     onMouseLeave={() => {
//                         setLevel1(null);
//                         setLevel2(null);
//                     }}
//                 >


//                     {/* LEVEL 1 */}
//                     <ul className="divide-y h-full overflow-y-auto bg-[#f1f1f1]">
//                         {formattedCategories?.map((item, i) => {
//                             const Icon = menuIcons[item.name] || FaCapsules;

//                             return (
//                                 <li
//                                     key={i}
//                                     onMouseEnter={() => {
//                                         setLevel1(item);
//                                         setLevel2(null);
//                                     }}
//                                     className={`
//                                hover:text-[#0784BB] cursor-pointer transition-colors ${level1?.name === item.name ? 'text-[#0784BB] bg-blue-50/50' : ''}`}
//                                 >

//                                     <Link href={`/products/${item?.slug}`} className="flex items-center justify-between px-4 py-2.5">
//                                         <div className="flex items-center gap-3">
//                                             <Icon className="text-[22px] text-[#0784BB] opacity-90 shrink-0" />
//                                             <span>{item.name}</span>
//                                         </div>

//                                         {item?.child?.length > 0 && <ChevronRight className="w-5 h-5 opacity-50" />}
//                                     </Link>

//                                 </li>
//                             );
//                         })}
//                     </ul>

//                     {/* LEVEL 2 DRAWER */}
//                     <AnimatePresence>
//                         {level1?.child?.length > 0 && (
//                             <motion.div
//                                 className="absolute top-0 left-full h-full bg-white shadow-2xl
//                                     border-l  z-30 min-w-[256px] flex flex-col"
//                                 variants={drawerVariants}
//                                 initial="hidden"
//                                 animate="visible"
//                                 exit="exit"
//                             >
//                                 <ul className="py-2 h-full overflow-y-auto">
//                                     {level1.child.map((item) => (
//                                         <li
//                                             key={item.name}
//                                             onMouseEnter={() => setLevel2(item)}
//                                             className={`flex items-center justify-between px-4 py-2
//                                    hover:bg-[#0784BB] hover:text-white
//                                    cursor-pointer transition-colors ${level2?.name === item.name ? 'bg-[#0784BB] text-white' : ''}`}
//                                         >
//                                             <Link href={`/products/${item?.slug}`} className="flex gap-2 items-center w-full">
//                                                 <span>{item.name}</span>
//                                                 {item?.child?.length > 0 && <span className="mt-1">

//                                                     <ChevronRight className="w-5 h-5 opacity-50" /></span>}
//                                             </Link>


//                                         </li>
//                                     ))}
//                                 </ul>
//                             </motion.div>
//                         )}
//                     </AnimatePresence>

//                     {/* LEVEL 3 DRAWER */}
//                     <AnimatePresence>
//                         {level2?.child?.length > 0 && (
//                             <motion.div
//                                 className="absolute top-0 left-[calc(100%+16rem)] h-full
//                               bg-white shadow-sm border-r z-40 min-w-[256px] flex flex-col"
//                                 variants={drawerVariants}
//                                 initial="hidden"
//                                 animate="visible"
//                                 exit="exit"
//                             >
//                                 <ul className="py-2 h-full overflow-y-auto">
//                                     {level2.child.map((item) => (
//                                         <li
//                                             key={item.name}
//                                             className="px-4 py-2 hover:bg-[#0784BB]
//                                    hover:text-white cursor-pointer
//                                    transition-colors"
//                                         >
//                                             <Link href={`/products/${item?.slug}`} className="block w-full">
//                                                 {item?.name}
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
