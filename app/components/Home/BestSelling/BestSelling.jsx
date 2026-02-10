import React from 'react'
import ProductGridView from '../ProductSections/ProductGridView'
import { getProducts } from '@/lib/fetchApis'
import ProductGridViewMain from '../ProductSections/ProductGridViewMain';


export default async function BestSelling() {
  const products = await getProducts();



  return (
    <div className=''>
      <ProductGridViewMain section_title={"Featured Products"} products={products} />
    </div>
  )
}
