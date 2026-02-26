import { getCategories } from "@/lib/fetchApis";
import Container from "../components/Common/Container";
import Footer from "../components/Common/Footer/Footer";
import Navbar from "../components/Common/Header/Navbar";
import MegaMenu from "../components/Common/Sidebar/MegaMenu";
import { formatCategories } from "@/helper/megamenuFormat";

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
          <div className="min-h-full lg:w-[20%]">
            <div className="hidden lg:block fixed h-full w-[18%] border-r z-20 ">
              <MegaMenu formattedCategories={formattedCategories} />
            </div>
            {/* On mobile, MegaMenu handles its own trigger */}
            <div className="lg:hidden">
              <MegaMenu />
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-[80%] min-h-screen overflow-y-auto  ">
            {children}
            <Footer />
          </div>
        </div>

      </Container>
    </div>
  );
}
