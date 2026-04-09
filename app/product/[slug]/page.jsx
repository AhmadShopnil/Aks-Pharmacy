import ProductDetailsClient from "@/app/components/product/ProductDetailsClient"
import { ChevronRight, Home } from 'lucide-react'
import SimilarProducts from "@/app/components/ProductDetails/SimilarProducts"
import Link from "next/link"
import { getSingleProduct, getSingleProductBreadCrumb } from "@/lib/fetchApis"
import { getMetaValueFromExtra_Fields } from "@/helper/metaHelpers"



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


  // RICH DEMO PRODUCT DATA
  const product = {
    id: "prod_01J8Y",
    name: "Ceevit",
    slug: slug || "ceevit-250mg-tablet",
    brand: "Square Pharmaceuticals PLC.",
    form: "Tablet",
    strength: "250mg",
    price: 18.50,
    mrp: 19.10,
    discount: 3,
    type: "medicine",

    images: [
      "/images/items/13.jpg",
      "/images/items/14.jpg",
      "/images/items/15.jpg",
      "/images/items/16.jpg",
    ],

    attributes: {
      genericName: "Vitamin C (Ascorbic Acid)",
      dosageForm: "Tablet",
      packSize: "10 Tablets (1 Strip)",
      prescriptionRequired: false,
      manufacturer: "Square Pharmaceuticals PLC.",
      storage: "Store below 30°C",
      shelfLife: "2 Years"
    },

    categorySchema: [
      { key: "genericName", label: "Generic Name" },
      { key: "dosageForm", label: "Dosage Form" },
      { key: "packSize", label: "Pack Size" },
      { key: "storage", label: "Storage" },
    ],

    alternatives: [
      { name: "Vasco 250", manufacturer: "Optonin Pharma Limited", price: 1.73, save: 7, image: "/images/items/17.jpg" },
      { name: "Nutrivit C 250", manufacturer: "ACI Limited", price: 1.73, save: 7, image: "/images/items/18.jpg" },
      { name: "Vitamin C 250", manufacturer: "Albian Laboratories Ltd.", price: 1.40, save: 19, image: "/images/items/19.jpg" },
      { name: "Cecon", manufacturer: "The ACMF Laboratories Ltd.", price: 1.73, save: 7, image: "/images/items/20.jpg" },
    ],
    descriptionHtml: {
      en: `
      <h3>Indication</h3>
      <p>
        Ceevit (Vitamin C) is used for the treatment and prevention of Vitamin C deficiency.
        It is effective in conditions such as scurvy, infection, trauma, burns, cold exposure,
        post-surgical recovery, fever, and stress.
      </p>

      <h3>Dosage & Administration</h3>
      <p>
        Adults: 250–500 mg daily in divided doses.<br/>
        Children: Dose varies by age and should be given as advised by a physician.
      </p>

      <h3>Mode of Action</h3>
      <p>
        Vitamin C is essential for collagen synthesis, wound healing, and immune system support.
        It also acts as a powerful antioxidant.
      </p>

      <h3>Side Effects</h3>
      <p>
        Generally well tolerated. High doses may cause nausea, diarrhea, abdominal cramps,
        or headache.
      </p>

      <h3>Precautions</h3>
      <p>
        Use with caution in patients with kidney stones or iron overload disorders.
      </p>
    `,

      bn: `
      <h3>ব্যবহার</h3>
      <p>
        সিভিট (ভিটামিন সি) শরীরে ভিটামিন সি এর অভাব পূরণে ব্যবহৃত হয়।
        এটি স্কার্ভি, সংক্রমণ, জ্বর, অপারেশনের পর দুর্বলতা এবং রোগ প্রতিরোধ ক্ষমতা বৃদ্ধিতে সহায়ক।
      </p>

      <h3>মাত্রা ও সেবনবিধি</h3>
      <p>
        প্রাপ্তবয়স্কদের জন্য: দিনে ২৫০–৫০০ মি.গ্রা. ভাগ করে গ্রহণ করতে হয়।<br/>
        শিশুদের জন্য: বয়স অনুযায়ী ডোজ চিকিৎসকের পরামর্শ অনুযায়ী।
      </p>

      <h3>কাজ করার পদ্ধতি</h3>
      <p>
        ভিটামিন সি কোলাজেন তৈরিতে সহায়তা করে, ক্ষত সারাতে সাহায্য করে
        এবং শরীরের রোগ প্রতিরোধ ক্ষমতা বাড়ায়।
      </p>

      <h3>পার্শ্বপ্রতিক্রিয়া</h3>
      <p>
        সাধারণত নিরাপদ। অতিরিক্ত মাত্রায় বমি ভাব, ডায়রিয়া বা পেট ব্যথা হতে পারে।
      </p>

      <h3>সতর্কতা</h3>
      <p>
        কিডনিতে পাথর বা অতিরিক্ত আয়রনের সমস্যা থাকলে সতর্কতার সাথে ব্যবহার করুন।
      </p>
    `,
    },

    overview: {
      indication: {
        en: "Treatment or prevention of Vitamin C deficiency, Scurvy, Infection, Trauma, Burns, Cold exposure, Following Surgery, common cold, Fever, scurvy, Stress, Cancer, Methaemoglobinaemia and Children receiving unfortified formulas. Also indicated in, Hematuria, Dental Caries, Gum Diseases, Pyorrhea, Acne, Infertility, Atherosclerosis, Fractures, Leg ulcers, Hay fever, Vascular thrombosis prevention, Levodopa toxicity, Arsenic toxicity.",
        bn: "ভিটামিন সি এর অভাবজনিত রোগের চিকিৎসায় এবং প্রতিরোধে ব্যবহৃত হয় যেমন- স্কার্ভি, ইনফেকশন, ট্রমা, পুড়ে যাওয়া, ঠান্ডার সমস্যা, অপারেশনের পর, জ্বর ইত্যাদি।"
      },
      administration: {
        en: "May be taken with or without food. IV Preparation: Dilute with large volume of compatible fluid to minimize adverse reactions. Compatible with most common diluents (dextrose solns, NS, LR, Ringer's, 1/NS, dextrose-saline, dextrose-LR etc). Avoid rapid infusion.",
        bn: "খাবারের সাথে বা খাবার ছাড়া গ্রহণ করা যেতে পারে। শিরার মাধ্যমে দেওয়ার ক্ষেত্রে উপযুক্ত তরলের সাথে মিশিয়ে দিতে হবে।"
      },
      adultDose: {
        en: "Oral Scurvy Adult: Prevention: 25-75 mg daily. 4 tablets 2 to 3 times daily. Treatment: >250 mg daily, given in divided doses. May also be given via IM/IV/SC admin. 250-500mg IV qDay/BID for at least 2 weeks.",
        bn: "প্রাপ্তবয়স্কদের স্কার্ভি প্রতিরোধে: দিনে ২৫-৭৫ মি.গ্রা.। চিকিৎসায়: প্রতিদিন ২৫০ মি.গ্রা. এর বেশি বিভক্ত মাত্রায়।"
      },
      childDose: {
        en: "Children: 1 mth-4 yr: 125-250 mg daily; 4-12 yr: 250-500 mg daily; 12-18 yr: 500 mg-1 g daily. Doses to be given in 1-2 divided doses.",
        bn: "শিশুদের জন্য: ১ মাস-৪ বছর: দিনে ১২৫-২৫০ মি.গ্রা.; ৪-১২ বছর: দিনে ২৫০-৫০০ মি.গ্রা.; ১২-১৮ বছর: দিনে ৫০০ মি.গ্রা.-১ গ্রাম।"
      },
      modeOfAction: {
        en: "Vitamin C: Necessary for collagen formation and tissue repair; plays a role in oxidation/reduction reactions as well as other metabolic pathways including synthesis of catecholamines, carnitine, and steroids.",
        bn: "ভিটামিন সি কোলাজেন গঠন এবং টিস্যু মেরামতের জন্য প্রয়োজনীয়; এটি জারন-বিজারন বিক্রিয়া এবং অন্যান্য বিপাকীয় প্রক্রিয়ায় ভূমিকা রাখে।"
      },
      sideEffect: {
        en: "Flushing, flank pain, dizziness, fatigue, headache, diarrhea, nausea, vomiting, hyperoxaluria (large doses).",
        bn: "মুখ লাল হওয়া, মাথা ঘোরা, ক্লান্তি, মাথাবেদনা, ডায়রিয়া, বমি বমি ভাব, বমি ইত্যাদি।"
      }
    }
  }

  const generic_name = getMetaValueFromExtra_Fields(productDetails, "generic_name");


  return (
    <div className="min-h-screen bg-gray-50/50 pb-20 selection:bg-blue-100 selection:text-blue-900">
      <div className="px-2 md:px-4 py-8">
        {/* Breadcrumb */}

        <nav className="flex items-center gap-2 text-xs md:text-lg text-gray-500 mb-8 overflow-x-auto whitespace-nowrap scrollbar-hide">
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

        </nav>
        {/* <nav className="flex items-center gap-2 text-xs md:text-lg text-gray-500 mb-8 overflow-x-auto whitespace-nowrap scrollbar-hide">
          <Link href="/" className="hover:text-[#0784BB] flex items-center gap-1 transition-colors ">
            <span className=""><Home size={16} /> </span>
            <span className="-mt-0.5">Home</span>
          </Link>
          <ChevronRight size={12} />
          {
            productDetails?.categories?.map((category, index) => (
              <Link key={index} href={`/category/${category.slug}`} className="hover:text-[#0784BB] flex items-center gap-1 transition-colors ">
                <span className="">{category.name}</span>
                <ChevronRight size={12} />
              </Link>
            ))
          }
          <span className="text-gray-900 font-semibold">{productDetails?.name} </span>
        </nav> */}


        {/* Main Grid Layout — state managed inside ProductDetailsClient */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <ProductDetailsClient
            product={product}
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
