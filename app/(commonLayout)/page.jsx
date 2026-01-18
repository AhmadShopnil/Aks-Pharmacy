import Container from "../components/Common/Container";
import BestSelling from "../components/Home/BestSelling/BestSelling";
import HeroWithMegaMenu from "../components/Home/HeroWithMegaMenu/HeroWithMegaMenu";
import OfferSlider from "../components/Home/OfferSlider/OfferSlider";
import Recommanded from "../components/Home/Recommanded/Recommanded";
import WeaklyDeals from "../components/Home/WeeklyDeals/WeeklyDeals";



export default function Home() {
  return (
    <div>


      <Container className="pb-10">
        <HeroWithMegaMenu />
        <OfferSlider />
        <BestSelling />
        <Recommanded />
        <WeaklyDeals />
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
