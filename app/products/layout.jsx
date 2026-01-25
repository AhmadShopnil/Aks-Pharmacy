import Container from "../components/Common/Container";
import Footer from "../components/Common/Footer/Footer";
import Navbar from "../components/Common/Header/Navbar";
import MegaMenu from "../components/Common/Sidebar/MegaMenu";

export default function ProductDetailsLayout({ children }) {
  return (
    <div className=" min-h-screen bg-white">

      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      {/* Body */}
      <Container className=" pt-20">


        <div className="w-full flex  ">
          {/* Sidebar */}
          <div className="hidden lg:block min-h-full  w-[20%]  ">
            <div className="fixed   h-full  w-[18%] border-r z-40 ">
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
