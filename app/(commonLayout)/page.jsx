import Container from "../components/Common/Container";
import BestSelling from "../components/Home/BestSelling/BestSelling";
import HeroWithMegaMenu from "../components/Home/HeroWithMegaMenu/HeroWithMegaMenu";
import OfferSlider from "../components/Home/OfferSlider/OfferSlider";
import Recommanded from "../components/Home/Recommanded/Recommanded";



export default function Home() {
  return (
    <div>
     

      <Container className="">
         <HeroWithMegaMenu />
        <OfferSlider />
        <BestSelling />
        <Recommanded />
      </Container>


      <div className="container mx-auto px-3">
        <OfferSlider />
        <BestSelling />
        <Recommanded />
      </div>


    </div>
  );
}
