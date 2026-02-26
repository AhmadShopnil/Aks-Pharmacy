import React from 'react'

import RightSidePromotionalImage from './RightSidePromotionalImage'
import { getProducts } from '@/lib/fetchApis';
import WeeklyDealsProductSlider from './ProductList';

export default async function WeaklyDeals() {
  const products = await getProducts();


    return (
        <div className='grid grid-cols-1 xl:grid-cols-4 w-full '>

            <div className='col-span-3 border border-gray-200 p-2 sm:p-4 md:p-6 rounded-lg'>
                <WeeklyDealsProductSlider section_title={"WEEK DEALS"} products={products} />
            </div>
            <div className='xl:col-span-1 '>
                <RightSidePromotionalImage />
            </div>



        </div>
    )
}
