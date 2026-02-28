import { getAllOffers, getCategories, getSliders } from "@/lib/fetchApis";
import Container from "../components/Common/Container";
import BestSelling from "../components/Home/BestSelling/BestSelling";
import HeroWithMegaMenu from "../components/Home/HeroWithMegaMenu/HeroWithMegaMenu";
import OfferSlider from "../components/Home/OfferSlider/OfferSlider";
import Recommanded from "../components/Home/Recommanded/Recommanded";
import WeaklyDeals from "../components/Home/WeeklyDeals/WeeklyDeals";
import BrandSlider from "../components/Home/BrandsSlider/BrandSlider";
import FeaturedProducts from "../components/Home/FeaturedProducts/FeaturedProducts";



export default async function Home() {

  const heroSliders = await getSliders();
  const productCategories = await getCategories("product_categories") || [];
  const offersSlider = await getAllOffers()


  // console.log("offersSlider", offersSlider)
  const filteredOffers = offersSlider?.filter((item) => item?.is_special === true);




  return (
    <div>
      <Container className="pb-10">
        <HeroWithMegaMenu heroSliders={heroSliders} productCategories={productCategories} />
        {filteredOffers?.length > 0 && <OfferSlider offersSlider={filteredOffers} />}
        <FeaturedProducts />
        {/* <Recommanded />
        <WeaklyDeals />
        <BrandSlider /> */}
      </Container>
    </div>
  );
}
