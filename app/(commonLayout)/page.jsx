import { getCategories, getSliders } from "@/lib/fetchApis";
import Container from "../components/Common/Container";
import BestSelling from "../components/Home/BestSelling/BestSelling";
import HeroWithMegaMenu from "../components/Home/HeroWithMegaMenu/HeroWithMegaMenu";
import OfferSlider from "../components/Home/OfferSlider/OfferSlider";
import Recommanded from "../components/Home/Recommanded/Recommanded";
import WeaklyDeals from "../components/Home/WeeklyDeals/WeeklyDeals";
import BrandSlider from "../components/Home/BrandsSlider/BrandSlider";



export default async function Home() {


  const heroSliders = await getSliders();
  const productCategories = await getCategories("product_categories") || [];


  // console.log("heroSliders", heroSliders)



  return (
    <div>


      <Container className="pb-10">
        <HeroWithMegaMenu heroSliders={heroSliders} productCategories={productCategories} />
        <OfferSlider />
        <BestSelling />
        <Recommanded />
        <WeaklyDeals />
        <BrandSlider />
      </Container>


      {/* <div className="container mx-auto px-3 pb-10">
        <OfferSlider />
        <BestSelling />
        <Recommanded />
        <WeaklyDeals/>
      </div> */}


    </div>
  );
}
