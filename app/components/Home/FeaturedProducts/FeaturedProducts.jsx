import React from 'react'
import ProductGridView from '../ProductSections/ProductGridView'
import { getFeaturedProducts, getProducts } from '@/lib/fetchApis'
import ProductGridViewMain from '../ProductSections/ProductGridViewMain';


export default async function FeaturedProducts() {

  const per_page=18
  const products = await getFeaturedProducts(per_page);



  return (
    <div className=''>
      <ProductGridViewMain section_title={"Featured Products"} products={products} />
    </div>
  )
}
