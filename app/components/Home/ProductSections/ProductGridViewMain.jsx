import ProductCard from "../../Common/Cards/ProductCard/ProductCard";
import ProductCardMain from "../../Common/Cards/ProductCard/ProductCardMain";

// ProductSection.jsx
export default function ProductGridViewMain({ section_title, products }) {




  return (
    <section className="py-2 md:py-4 lg:py-6 xl:py-8">
      <div className="">

        <h3 className="font-bold text-xl md:text-2xl lg:text-3xl text-[#8CC540]  mb-3 md: mb-4 uppercase">{section_title}</h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 ">
          {products?.map((item) => (
            <ProductCardMain key={item?.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
