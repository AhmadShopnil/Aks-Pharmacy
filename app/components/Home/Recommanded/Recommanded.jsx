import React from 'react'
import ProductGridView from '../ProductSections/ProductGridView'
import ProductGridViewMain from '../ProductSections/ProductGridViewMain'
import { getProducts } from '@/lib/fetchApis';



export default async function Recommanded() {
  const products = await getProducts();
  return (
    <div>
       <ProductGridViewMain section_title={"Recommanded For You"} products={products} />
      {/* <ProductGridView section_title={"Recommanded For You"} /> */}
    </div>
  )
}
