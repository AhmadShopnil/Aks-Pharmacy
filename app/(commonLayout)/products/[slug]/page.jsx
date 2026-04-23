
import Container from "@/app/components/Common/Container";
import FilterTabs from "@/app/components/Shop/FilterTabs";
import FilterSidebar from "@/app/components/Shop/FilterSidebar";
import ProductGrid from "@/app/components/Shop/ProductGrid";
import ShopBanner from "@/app/components/Shop/ShopBanner";
import Topsection from "@/app/components/Shop/Topsection";
import CategoryTabs from "@/app/components/Shop/CategoryTabs";
import { getSingleCategory } from "@/lib/fetchApis";



export default async function ShopPage({ params }) {
  const { slug } = await params
  const category = await getSingleCategory(slug)
  const childCategories = category?.child
  return (
    <div className=" pb-10">
      <Topsection slug={slug} />

      <Container className="mt-2 md:mt-4 space-y-3">
        {category?.image && <ShopBanner category={category} />}

        <CategoryTabs childCategories={childCategories} />

        <div className="grid grid-cols-12 gap-6 mt-6 ">
          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-2">
            <FilterSidebar categorySlug={slug} />
          </div>

          {/* Products */}
          <div className="col-span-12 lg:col-span-10">
            {/* <FilterTabs /> */}
            <ProductGrid categorySlug={slug} />
          </div>
        </div>

      </Container>
    </div>
  );
}
