import Image from 'next/image'
import React from 'react'

export default function RightSidePromotionalImage() {
  return (
    <div className=' '>
        <Image
        src="/images/promotions/1.png"
        alt='week deals'
        width={400}
        height={600}
        className='w-full'
        
        />
    </div>
  )
}
