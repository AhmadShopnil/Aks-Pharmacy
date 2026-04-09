import React from 'react'

import RightSidePromotionalImage from './RightSidePromotionalImage'
import { getProducts, getSingleOfferData, getWeeklyDealsProducts } from '@/lib/fetchApis';
import WeeklyDealsProductSlider from './ProductList';

export default async function WeaklyDeals() {
    const data = await getWeeklyDealsProducts();
    const singleOfferData = await getSingleOfferData("weekend-special");
    const products = data?.data || []

    // console.log("data", data?.offer?.is_active)

    if (!data?.offer?.is_active || !data?.offer?.show_on_homepage) {
        return null
    }

    return (
        <div className='grid grid-cols-1 xl:grid-cols-4 w-full gap-2 '>

            <div className='col-span-3 border border-gray-200 p-2 sm:p-4 md:p-6 rounded-lg'>
                <WeeklyDealsProductSlider section_title={"WEEK DEALS"} products={products} />
            </div>
            <div className='xl:col-span-1 '>
                <RightSidePromotionalImage singleOfferData={singleOfferData} />
            </div>



        </div>
    )
}
