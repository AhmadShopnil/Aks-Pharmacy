// import ProductCard from "./ProductCard";


import ProductCardShop from "./ProductCardShop";

const products = [

    {
      id: 4,
      title: "Aplb – Glutathione Niacinamide Beauty Tablet 30pcs",
      img: "/images/medicine/13.jpeg",
      price: "780 ৳",
      oldPrice: "1,010 ৳",
      discount: "-23%",
      rating: 4,
    },
    {
      id: 5,
      title: "Cosrx – Advanced Snail 92 All In One Cream",
      img: "/images/medicine/14.webp",
      price: "940 ৳",
      oldPrice: "1,600 ৳",
      discount: "-47%",
      rating: 5,
    },
    {
      id: 6,
      title: "Essence – I Lo+ve Extreme Crazy Volume Mascara",
      img: "/images/medicine/15.webp",
      price: "550 ৳",
      oldPrice: "900 ৳",
      discount: "-39%",
      rating: 5,
    },
    {
      id: 7,
      title: "Ordinary – Niacinamide 10% + Zinc 1% – 30ml",
      img: "/images/medicine/16.jpeg",
      price: "1,220 ৳",
      oldPrice: "1,300 ৳",
      discount: "-6%",
      rating: 5,
    },
    {
      id: 1,
      title: "Cosrx – Advanced Snail 92 All In One Cream",
      img: "/images/medicine/17.jpeg",
      price: "940 ৳",
      oldPrice: "1,600 ৳",
      discount: "-47%",
      rating: 5,
    },
    {
      id: 2,
      title: "Essence – I Lo+ve Extreme Crazy Volume Mascara",
      img: "/images/medicine/18.webp",
      price: "550 ৳",
      oldPrice: "900 ৳",
      discount: "-39%",
      rating: 5,
    },
    {
      id: 3,
      title: "Ordinary – Niacinamide 10% + Zinc 1% – 30ml",
      img: "/images/medicine/19.webp",
      price: "1,220 ৳",
      oldPrice: "1,300 ৳",
      discount: "-6%",
      rating: 5,
    },
    {
      id: 8,
      title: "Aplb – Glutathione Niacinamide Beauty Tablet 30pcs",
      img: "/images/medicine/20.webp",
      price: "780 ৳",
      oldPrice: "1,010 ৳",
      discount: "-23%",
      rating: 4,
    },
    {
      id: 10,
      title: "Essence – I Lo+ve Extreme Crazy Volume Mascara",
      img: "/images/medicine/21.webp",
      price: "550 ৳",
      oldPrice: "900 ৳",
      discount: "-39%",
      rating: 5,
    },
    {
      id: 9,
      title: "Ordinary – Niacinamide 10% + Zinc 1% – 30ml",
      img: "/images/medicine/22.webp",
      price: "1,220 ৳",
      oldPrice: "1,300 ৳",
      discount: "-6%",
      rating: 5,
    },
  ];





export default function ProductGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {products.map((item) => (
             <ProductCardShop key={item?.id} item={item}/>
              ))}
    </div>
  );
}
