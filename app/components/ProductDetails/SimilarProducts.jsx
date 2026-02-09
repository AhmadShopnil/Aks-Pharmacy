import ProductSlider from "./ProductSlider"


export default function SimilarProducts() {
  const products = [
    { id: 1, name: "FitX-4", price: "৳500", image: "/images/items/17.jpg" },
    { id: 2, name: "Himalaya Lasuna", price: "৳600", image: "/images/items/18.jpg" },
    { id: 3, name: "Neurozest NAC Supplement", price: "৳700", image: "/images/items/19.jpg" },
    { id: 4, name: "Zatura Vitl D Ginseng Capsule", price: "৳800", image: "/images/items/20.jpg" },
    { id: 5, name: "NOW Supplements Fenugreek", price: "৳900", image: "/images/items/21.jpg" },
    { id: 6, name: "Bronson Milk Thistle Organic", price: "৳1000", image: "/images/items/22.jpg" },
  ] 

  return (
    <ProductSlider
      title="Similar Products"
      products={products}
      // showSeeAll
      seeAllHref="/products"
      containerClass="bg-[#8ac74038]"
    />
  )
}
