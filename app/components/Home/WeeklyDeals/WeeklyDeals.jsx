import React from 'react'
import ProductList from './ProductList'
import RightSidePromotionalImage from './RightSidePromotionalImage'

export default function WeaklyDeals() {
    return (
        <div className='grid grid-cols-4 w-full '>

            <div className='col-span-3 border border-gray-200 p-6 rounded-lg'>
                <ProductList section_title={"WEEK DEALS"} />
            </div>
            <div className='col-span-1'>
                <RightSidePromotionalImage />
            </div>



        </div>
    )
}
