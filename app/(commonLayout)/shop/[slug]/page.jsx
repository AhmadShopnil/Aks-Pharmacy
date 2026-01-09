
import Container from "@/app/components/Common/Container";
import FilterTabs from "@/app/components/Shop/FilterTabs";
import FilterSidebar from "@/app/components/Shop/FilterSidebar";
import ProductGrid from "@/app/components/Shop/ProductGrid";
import ShopBanner from "@/app/components/Shop/ShopBanner";
import Topsection from "@/app/components/Shop/Topsection";
import CategoryTabs from "@/app/components/Shop/CategoryTabs";



export default function ShopPage() {
  return (
    <div className="">
      <Topsection />


      <Container className=" space-y-3">
        <ShopBanner />
        <CategoryTabs/>
        <FilterTabs />

        <div className="grid grid-cols-12 gap-6 mt-6 ">
          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-2">
            <FilterSidebar />
          </div>

          {/* Products */}
          <div className="col-span-12 lg:col-span-10">
            <ProductGrid />
          </div>
        </div>

      </Container>
    </div>
  );
}
