import { getCategories } from "@/lib/fetchApis";

import Container from "@/app/components/Common/Container";
import MegaMenu from "@/app/components/Common/Sidebar/MegaMenu";
import Footer from "@/app/components/Common/Footer/Footer";
import { formatCategories } from "@/helper/megamenuFormat";
import Navbar from "@/app/components/Common/Header/Navbar";

export default async function ProductDetailsLayout({ children }) {


  const productCategories = await getCategories("product_categories") || [];
  const formattedCategories = formatCategories(productCategories || []);

  return (
    <div className=" min-h-screen bg-white">

      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full   z-40">
        <Navbar />
      </div>

      {/* Body */}
      <Container className=" pt-20">


        <div className="w-full flex  ">
          {/* Sidebar */}
          <div className="min-h-full lg:w-[20%] bg-[#f1f1f1]">
            <div 
            className="hidden lg:block border-r z-20 h-full"
            // className="hidden lg:block fixed h-full w-[18%] border-r z-20 "
            >
              <MegaMenu formattedCategories={formattedCategories} />
            </div>
            {/* On mobile, MegaMenu handles its own trigger */}
            {/* <div className="lg:hidden">
              <MegaMenu formattedCategories={formattedCategories} />
            </div> */}
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-[80%] min-h-screen overflow-y-auto  ">
            {children}
            {/* <Footer /> */}
          </div>
        </div>

      </Container>
      <div className="z-[60]">
        <Footer />
      </div>

    </div>
  );
}
