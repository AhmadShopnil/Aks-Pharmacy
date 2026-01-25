// "use client"
// import { useState } from 'react'
// import { FileText, ChevronDown, ChevronUp } from 'lucide-react'

// export default function ProductOverview({ product }) {
//   const [lang, setLang] = useState('en')
//   const [expandedSection, setExpandedSection] = useState(null)

//   const overviewData = product.overview || {};

//   const sections = [
//     { id: 'indication', label: 'Indication' },
//     { id: 'administration', label: 'Administration' },
//     { id: 'adultDose', label: 'Adult Dose' },
//     { id: 'childDose', label: 'Child Dose' },
//     { id: 'modeOfAction', label: 'Mode of Action' },
//     { id: 'precaution', label: 'Precaution' },
//     { id: 'sideEffect', label: 'Side Effect' },
//     { id: 'interaction', label: 'Interaction' },
//   ];

//   const toggleSection = (id) => {
//     setExpandedSection(expandedSection === id ? null : id)
//   }

//   return (
//     <div className="bg-white rounded-md border border-gray-100 shadow-sm overflow-hidden">
//       <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-50/30">
//         <div className="flex items-center gap-4">
//           <div className="bg-[#0784BB] p-3 rounded-md text-white shadow-md">
//             <FileText size={24} />
//           </div>
//           <div>
//             <h2 className="text-2xl font-black text-gray-900 tracking-tight">
//               Medicine Overview of {product?.name}
//             </h2>
//           </div>
//         </div>

//         {/* Language Toggle */}
//         <div className="flex items-center bg-white p-1 rounded-md border border-gray-100 shadow-sm">
//           <button
//             onClick={() => setLang('bn')}
//             className={`px-5 py-2 rounded-md text-xs font-black transition-all ${lang === 'bn' ? 'bg-[#0784BB] text-white shadow-sm' : 'text-gray-400 hover:text-gray-800'}`}
//           >
//             বাংলা
//           </button>
//           <button
//             onClick={() => setLang('en')}
//             className={`px-5 py-2 rounded-md text-xs font-black transition-all ${lang === 'en' ? 'bg-[#0784BB] text-white shadow-sm' : 'text-gray-400 hover:text-gray-800'}`}
//           >
//             ENGLISH
//           </button>
//         </div>
//       </div>

//       <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
//         {sections?.map((section) => {
//           const content = overviewData[section.id]?.[lang];
//           if (!content) return null;

//           const isExpanded = expandedSection === section.id;

//           return (
//             <div key={section.id} className="group flex flex-col gap-3">
//               <h3 className="text-[#0784BB] font-black text-base tracking-tight flex items-center gap-2">
//                 <span className="w-1.5 h-5 bg-[#8CC540] rounded-full"></span>
//                 {section.label.toUpperCase()}
//               </h3>
//               <div className="relative">
//                 <p className={`text-base text-gray-600 leading-relaxed font-medium ${isExpanded ? '' : 'line-clamp-4'}`}>
//                   {content}
//                 </p>
//                 {content.length > 200 && (
//                   <button
//                     onClick={() => toggleSection(section?.id)}
//                     className="mt-3 text-[#0784BB] font-black text-xs tracking-widest uppercase flex items-center gap-1 hover:underline"
//                   >
//                     {isExpanded ? (
//                       <>SHOW LESS <ChevronUp size={14} /></>
//                     ) : (
//                       <>READ MORE <ChevronDown size={14} /></>
//                     )}
//                   </button>
//                 )}
//               </div>
//             </div>
//           )
//         })}
//       </div>

//       <div className="m-6 p-4 bg-amber-50 rounded-md border border-amber-100 flex items-start gap-4">
//         <p className="text-[10px] text-amber-900 leading-relaxed font-bold italic opacity-80">
//           DISCLAIMER: The information provided above is for informational purposes only and is not intended as medical advice. Always consult a licensed healthcare professional before starting any new medication.
//         </p>
//       </div>
//     </div>
//   )
// }
