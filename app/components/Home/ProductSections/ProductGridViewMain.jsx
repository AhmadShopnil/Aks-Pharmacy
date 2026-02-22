import ProductCard from "../../Common/Cards/ProductCard/ProductCard";
import ProductCardMain from "../../Common/Cards/ProductCard/ProductCardMain";

// ProductSection.jsx
export default function ProductGridViewMain({ section_title, products }) {

 
 

  return (
    <section className="py-10">
      <div className="">

        <h3 className="font-bold text-2xl md:text-3xl text-center mb-4">{section_title}</h3>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 ">
          {products?.map((item) => (
            <ProductCardMain key={item?.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
