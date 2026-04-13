// 'use client';

// import ProductCardMain from "../Common/Cards/ProductCard/ProductCardMain";
// import { useGetProductsByCategoryQuery } from "@/lib/redux/services/productsApi";

// export default function ProductGrid({ categorySlug }) {
//   // const { data, isLoading, isError } = useGetProductsByCategoryQuery(categorySlug?.toLowerCase());
//   // const { data, isLoading, isError } = useGetProductsByCategoryQuery({categorySlug?.toLowerCase()});
//   const { data, isLoading, isError } = useGetProductsByCategoryQuery({
//     category: categorySlug?.toLowerCase(),
//     perPage: 10, 
//     page: 1,
//   });

//   if (isLoading) {
//     return (
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
//         {[...Array(10)].map((_, i) => (
//           <div key={i} className="h-[400px] bg-gray-100 animate-pulse rounded-lg"></div>
//         ))}
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="text-center py-10 text-red-500">
//         Failed to load products. Please try again later.
//       </div>
//     );
//   }

//   const products = data?.data || [];

//   if (products.length === 0) {
//     return (
//       <div className="text-center py-10 text-gray-500">
//         No products found in this category.
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
//       {products.map((item) => (
//         <ProductCardMain key={item?.id} item={item} />
//       ))}
//     </div>
//   );
// }
