import Image from 'next/image'
import React from 'react'

export default function RightSidePromotionalImage() {
  return (
    <div className=' '>
        <Image
        src="/images/promotions/1.png"
        alt='week deals'
        width={400}
        height={500}
        className='w-full h-[400px] md:h-full'
        
        />
    </div>
  )
}
