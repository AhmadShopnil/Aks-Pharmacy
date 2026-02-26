import React from 'react'
import ProductList from './ProductList'
import RightSidePromotionalImage from './RightSidePromotionalImage'
import { getProducts } from '@/lib/fetchApis';

export default async function WeaklyDeals() {
  const products = await getProducts();


    return (
        <div className='grid grid-cols-1 xl:grid-cols-4 w-full '>

            <div className='col-span-3 border border-gray-200 p-2 sm:p-4 md:p-6 rounded-lg'>
                <ProductList section_title={"WEEK DEALS"} products={products} />
            </div>
            <div className='xl:col-span-1 '>
                <RightSidePromotionalImage />
            </div>



        </div>
    )
}
