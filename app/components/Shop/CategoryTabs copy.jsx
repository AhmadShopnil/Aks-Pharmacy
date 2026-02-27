// import Link from "next/link";
// import Image from "next/image";



// export default function CategoryTabs({ childCategories }) {



//   return (
//     <div className="flex flex-wrap gap-3 ">
//       {childCategories?.map((cat) => (
//         <Link
//           key={cat.id}
//           href={`/products/${cat?.slug}`}
//           className="border rounded-lg  hover:shadow-md transition w-[100px] h-auto md:w-[220px]  "
//         >
//           {cat?.icon && <Image
//             src={cat?.icon}
//             alt={cat.name}
//             width={220}
//             height={200}
//             className="w-full h-[85px] md:h-[200px]  rounded-t-lg"
//           />}


//           <p className="bg-[#0784BB] text-white py-1  text-center text-[11px] md:text-sm font-medium rounded-b-lg">
//             {cat.name}
//           </p>
//         </Link>
//       ))}
//     </div>
//   );
// }
