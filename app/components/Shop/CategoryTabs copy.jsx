// import Link from "next/link";
// import Image from "next/image";
// import { ImageIcon } from "lucide-react";

// export default function CategoryTabs({ childCategories }) {
//   return (
//     <div className="flex flex-wrap gap-3">
//       {childCategories?.map((cat) => (
//         <Link
//           key={cat.id}
//           href={`/products/${cat?.slug}`}
//           className="border rounded-lg hover:shadow-md transition
//                      w-[100px] md:w-[220px] overflow-hidden bg-white"
//         >
//           {/* Image Wrapper (Always Fixed Height) */}
//           <div className="w-[100px] xl:w-full h-[85px] md:h-[150px] xl:h-[200px] relative bg-gray-100 flex items-center justify-center">
//             {cat?.icon ? (
//               <Image
//                 src={cat.icon}
//                 alt={cat.name}
//                 fill
//                 className="object-fit"
//               />
//             ) : (
//               <div className="flex flex-col items-center text-gray-400">
//                 <ImageIcon size={28} />
//                 <span className="text-[10px] md:text-xs mt-1">
//                   No Image
//                 </span>
//               </div>
//             )}
//           </div>

//           {/* Title */}
//           <p className="bg-[#0784BB] text-white py-1 text-center text-[11px] md:text-sm font-medium">
//             {cat.name}
//           </p>
//         </Link>
//       ))}
//     </div>
//   );
// }