import React from 'react'
import Container from '../Common/Container'

export default function Topsection() {
    return (
       <div className='  py-2 border-b-2'>
         <Container className='flex justify-between'>
            <div>
                <span className='text-md '>Home</span> / <span className='text-md font-semibold'>Health Care</span> 
            </div>
            <div className='text-xl font-semibold w-1/2'>
                <span className=''>Health Care</span>
            </div>
        </Container>
       </div>
    )
}
