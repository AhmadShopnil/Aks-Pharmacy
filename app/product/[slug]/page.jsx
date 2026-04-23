import ProductDetailsClient from "@/app/components/product/ProductDetailsClient"
import { ChevronRight, Home } from 'lucide-react'
import SimilarProducts from "@/app/components/ProductDetails/SimilarProducts"
import Link from "next/link"
import { getSingleProduct, getSingleProductBreadCrumb } from "@/lib/fetchApis"
import { getMetaValueFromExtra_Fields } from "@/helper/metaHelpers"
import BreadCrumbs from "@/app/components/Shop/BreadCrumbs"



// export async function generateMetadata({ params }) {
//   const { slug } = await params;

//   // Normally: fetch product by slug
//   const product = {
//     name: "Ceevit",
//     strength: "250mg",
//     brand: "Square Pharmaceuticals PLC.",
//     price: 18.5,
//     images: ["/images/items/13.jpg"],
//     description:
//       "Ceevit (Vitamin C) is used for treatment and prevention of Vitamin C deficiency, scurvy, infection, fever and immune support."
//   }

//   const title = `${product?.name} ${product?.strength} | Buy Online in Bangladesh`
//   const description = product?.description
//   const url = `https://yourdomain.com/product/${slug}`

//   return {
//     title,
//     description,

//     keywords: [
//       product.name,
//       `${product?.name} ${product?.strength}`,
//       "Vitamin C Tablet",
//       "Buy Medicine Online",
//       "Online Pharmacy Bangladesh"
//     ],

//     alternates: {
//       canonical: url
//     },

//     openGraph: {
//       title,
//       description,
//       url,
//       siteName: "Your Pharmacy Name",
//       images: [
//         {
//           url: product.images[0],
//           width: 800,
//           height: 800,
//           alt: `${product.name} ${product.strength}`
//         }
//       ],
//       locale: "en_US",
//       type: "product"
//     },

//     twitter: {
//       card: "summary_large_image",
//       title,
//       description,
//       images: [product.images[0]]
//     },

//     robots: {
//       index: true,
//       follow: true
//     }
//   }
// }


export default async function ProductDetailsPage({ params }) {
  const { slug } = await params;
  const productDetails = await getSingleProduct(slug);
  const productBreadCrumb = await getSingleProductBreadCrumb(slug);
  const filterBreadCrumb = productBreadCrumb?.filter((item) => item?.type == "category");



  const generic_name = getMetaValueFromExtra_Fields(productDetails, "generic_name");


  return (
    <div className="min-h-screen bg-gray-50/50  selection:bg-blue-100 selection:text-blue-900">
      <div className="px-2 md:px-4 py-8">
        {/* Breadcrumb */}
        <BreadCrumbs slug={slug} />
        {/* <nav className="flex items-center gap-2 text-xs md:text-lg text-gray-500 mb-8 overflow-x-auto whitespace-nowrap scrollbar-hide">
          <Link href="/" className="hover:text-[#0784BB] flex items-center gap-1 transition-colors ">
            <span className=""><Home size={16} /> </span>
            <span className="-mt-0.5">Home</span>
          </Link>
          <ChevronRight size={12} />
          {
            filterBreadCrumb?.map((item, index) => (
              <Link key={index} href={`/products/${item?.slug}`} className="hover:text-[#0784BB] flex items-center gap-1 transition-colors ">
                <span className="">{item?.label}</span>
                <ChevronRight size={12} />
              </Link>
            ))
          }
          <span className="text-[#0784BB] font-semibold">{productDetails?.name} </span>

        </nav> */}



        {/* Main Grid Layout — state managed inside ProductDetailsClient */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <ProductDetailsClient
            // product={product}
            productDetails={productDetails}
            generic_name={generic_name}
          />
        </div>

        <div className="pt-0  lg:pt-4 space-y-3 md:space-y-4  ">
          {/* Rating & Reviews */}
          {/* <RatingAndReviews /> */}

          {/* Product Q&A */}
          {/* <ProductQA /> */}


          {/* Similar Products */}
          <SimilarProducts productDetails={productDetails} />



        </div>

      </div>
    </div>
  )
}
