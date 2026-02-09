import ProductSlider from "./ProductSlider"


export default function MoreProducts() {
 const products = [
        { id: 1, name: "X Gold Black Maca", price: "৳1200", image: "/images/items/9.jpg" },
        { id: 2, name: "X Gold Ashwagandha Extract", price: "৳1500", image: "/images/items/10.jpg" },
        { id: 3, name: "X Gold Tongkat Ali 100:1", price: "৳1800", image: "/images/items/11.jpg" },
        { id: 4, name: "X Gold Ginseng Premium", price: "৳2000", image: "/images/items/12.jpg" },
        { id: 7, name: "E-Cap 400", price: "৳500", image: "/images/items/15.jpg" },
        { id: 8, name: "Karboyna Joint Care", price: "৳650", image: "/images/items/4.jpg" },
        { id: 9, name: "Za-Marks 100", price: "৳700", image: "/images/items/5.jpg" },
        { id: 10, name: "Flax Reminder by Dr", price: "৳800", image: "/images/items/6.jpg" },
        { id: 11, name: "Unflavil Handmade Soaps", price: "৳450", image: "/images/items/7.jpg" },
        { id: 12, name: "BeauFul Soap Ultimate Care", price: "৳900", image: "/images/items/8.jpg" },
    ]

  return (
    <ProductSlider
      title="More from X Gold"
      products={products}
      containerClass="bg-white border border-gray-200"
    />
  )
}
