
import ProductCardMain from "../../Common/Cards/ProductCard/ProductCardMain";
import SmallProductCard from "../../Common/Cards/ProductCard/SmallProductCard";

// ProductSection.jsx
export default function ProductList({section_title,products}) {
//  const products = [
//     {
//       id: 1,
//       title: "Cosrx – Advanced Snail 92 All In One Cream",
//       img: "/images/medicine/23.webp",
//       price: "940 ৳",
//       oldPrice: "1,600 ৳",
//       discount: "-47%",
//       rating: 5,
//     },
//     {
//       id: 2,
//       title: "Essence – I Lo+ve Extreme Crazy Volume Mascara",
//      img: "/images/medicine/24.jpeg",
//       price: "550 ৳",
//       oldPrice: "900 ৳",
//       discount: "-39%",
//       rating: 5,
//     },
//     {
//       id: 3,
//       title: "Ordinary – Niacinamide 10% + Zinc 1% – 30ml",
//       img: "/images/medicine/13.jpeg",
//       price: "1,220 ৳",
//       oldPrice: "1,300 ৳",
//       discount: "-6%",
//       rating: 5,
//     },
//     {
//       id: 8,
//       title: "Aplb – Glutathione Niacinamide Beauty Tablet 30pcs",
//      img: "/images/medicine/15.webp",
//       price: "780 ৳",
//       oldPrice: "1,010 ৳",
//       discount: "-23%",
//       rating: 4,
//     },
//   ];


  return (
    <section className=" ">
      <div className="">
   
        <h3 className="font-bold text-2xl md:text-3xl  mb-4">{section_title}</h3>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
          {products?.map((item) => (
             <ProductCardMain key={item?.id} item={item} />
        //  <SmallProductCard key={item?.id} item={item}/>
          ))}
        </div>
      </div>
    </section>
  );
}
