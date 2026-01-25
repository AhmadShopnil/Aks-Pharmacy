import ProductCard from "../../Common/Cards/ProductCard/ProductCard";

// ProductSection.jsx
export default function ProductGridView({ section_title }) {
  const products = [

    {
      id: 4,
      title: "Aplb – Glutathione Niacinamide Beauty Tablet 30pcs",
      img: "/images/medicine/4.jpg",
      price: "780 ৳",
      oldPrice: "1,010 ৳",
      discount: "-23%",
      rating: 4,
    },
    {
      id: 5,
      title: "Cosrx – Advanced Snail 92 All In One Cream",
      img: "/images/medicine/5.jpg",
      price: "940 ৳",
      oldPrice: "1,600 ৳",
      discount: "-47%",
      rating: 5,
    },
    {
      id: 6,
      title: "Essence – I Lo+ve Extreme Crazy Volume Mascara",
      img: "/images/medicine/6.jpg",
      price: "550 ৳",
      oldPrice: "900 ৳",
      discount: "-39%",
      rating: 5,
    },
    {
      id: 7,
      title: "Ordinary – Niacinamide 10% + Zinc 1% – 30ml",
      img: "/images/medicine/7.jpg",
      price: "1,220 ৳",
      oldPrice: "1,300 ৳",
      discount: "-6%",
      rating: 5,
    },
    {
      id: 1,
      title: "Cosrx – Advanced Snail 92 All In One Cream",
      img: "/images/medicine/1.jpg",
      price: "940 ৳",
      oldPrice: "1,600 ৳",
      discount: "-47%",
      rating: 5,
    },
    {
      id: 2,
      title: "Essence – I Lo+ve Extreme Crazy Volume Mascara",
      img: "/images/medicine/2.jpg",
      price: "550 ৳",
      oldPrice: "900 ৳",
      discount: "-39%",
      rating: 5,
    },
    {
      id: 3,
      title: "Ordinary – Niacinamide 10% + Zinc 1% – 30ml",
      img: "/images/medicine/3.jpg",
      price: "1,220 ৳",
      oldPrice: "1,300 ৳",
      discount: "-6%",
      rating: 5,
    },
    {
      id: 8,
      title: "Aplb – Glutathione Niacinamide Beauty Tablet 30pcs",
      img: "/images/medicine/8.jpg",
      price: "780 ৳",
      oldPrice: "1,010 ৳",
      discount: "-23%",
      rating: 4,
    },
    {
      id: 10,
      title: "Essence – I Lo+ve Extreme Crazy Volume Mascara",
      img: "/images/medicine/6.jpg",
      price: "550 ৳",
      oldPrice: "900 ৳",
      discount: "-39%",
      rating: 5,
    },
    {
      id: 9,
      title: "Ordinary – Niacinamide 10% + Zinc 1% – 30ml",
      img: "/images/medicine/7.jpg",
      price: "1,220 ৳",
      oldPrice: "1,300 ৳",
      discount: "-6%",
      rating: 5,
    },
  ];


  return (
    <section className="py-10">
      <div className="">

        <h3 className="font-bold text-2xl md:text-3xl text-center mb-4">{section_title}</h3>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 ">
          {products?.map((item) => (
            <ProductCard key={item?.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
