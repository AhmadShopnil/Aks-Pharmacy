import Image from 'next/image'
import React from 'react'

export default function RightSidePromotionalImage({ singleOfferData }) {

  const image = singleOfferData?.image

  // console.log("singleOfferData", singleOfferData)
  return (
    <div className=' '>
      <Image
        src={image}
        alt='week deals'
        width={250}
        height={500}
        className='w-full h-full xl:h-[550px]  rounded-sm'

      />
    </div>
  )
}
