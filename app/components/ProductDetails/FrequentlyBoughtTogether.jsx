"use client"

import ProductSlider from "./ProductSlider"



export default function FrequentlyBoughtTogether() {
  const products = [
    { id: 1, name: "E-Cap 400", price: "৳500", image: "/images/items/15.jpg" },
    { id: 2, name: "Karboyna Joint Care", price: "৳650", image: "/images/items/4.jpg" },
    { id: 3, name: "Za-Marks 100", price: "৳700", image: "/images/items/5.jpg" },
    { id: 4, name: "Flax Reminder by Dr", price: "৳800", image: "/images/items/6.jpg" },
    { id: 5, name: "Unflavil Handmade Soaps", price: "৳450", image: "/images/items/7.jpg" },
    { id: 6, name: "BeauFul Soap Ultimate Care", price: "৳900", image: "/images/items/8.jpg" },
    { id: 7, name: "E-Cap 400", price: "৳500", image: "/images/items/15.jpg" },
    { id: 8, name: "Karboyna Joint Care", price: "৳650", image: "/images/items/4.jpg" },
    { id: 9, name: "Za-Marks 100", price: "৳700", image: "/images/items/5.jpg" },
    { id: 10, name: "Flax Reminder by Dr", price: "৳800", image: "/images/items/6.jpg" },
    { id: 11, name: "Unflavil Handmade Soaps", price: "৳450", image: "/images/items/7.jpg" },
    { id: 12, name: "BeauFul Soap Ultimate Care", price: "৳900", image: "/images/items/8.jpg" },
  ]

  return (
    <ProductSlider
      title="Frequently Bought Together"
      products={products}
      containerClass="bg-blue-100"
    />
  )
}
