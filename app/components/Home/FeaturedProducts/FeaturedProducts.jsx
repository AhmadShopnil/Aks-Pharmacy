import React from 'react'
import ProductGridView from '../ProductSections/ProductGridView'
import { getFeaturedProducts, getProducts } from '@/lib/fetchApis'
import ProductGridViewMain from '../ProductSections/ProductGridViewMain';


export default async function FeaturedProducts() {
  const products = await getFeaturedProducts();



  return (
    <div className=''>
      <ProductGridViewMain section_title={"Featured Products"} products={products} />
    </div>
  )
}
