import React from "react";
import Container from "../Common/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { getBreadComeByCategorySlug, getBreadComeByProductSlug, getSingleCategory } from "@/lib/fetchApis";
import { ChevronRight, Home } from "lucide-react";

export default async function BreadCrumbs({ slug }) {

    const category = await getSingleCategory(slug)
    const breadCrumbs = await getBreadComeByProductSlug(slug)
    // console.log("breadCome from product", breadCrumbs)
    const filteredBreadCrumbs = breadCrumbs?.filter((item) => item?.type !== "term_type");

    return (
        <nav className="flex items-center gap-2 text-xs md:text-lg text-gray-500 mb-8 overflow-x-auto whitespace-nowrap scrollbar-hide">


            {
                filteredBreadCrumbs?.map((item, index) => (

                    <div key={index}
                        className="flex items-center gap-1 "
                    >
                        {index == 0 && <span className=""><Home size={16} /> </span>}

                        <Link href={`/products/${item?.slug}`} className="hover:text-[#0784BB] flex items-center gap-1 transition-colors ">
                            <span className="">{item?.label}</span>

                        </Link>
                        {index != filteredBreadCrumbs?.length - 1 && <span className="  mt-0.5"> <ChevronRight size={16} /> </span>}

                    </div>
                ))
            }
            {/* <span className="text-[#0784BB] font-semibold">{category?.name} </span> */}

        </nav>
    );
}
