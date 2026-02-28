
import "../globals.css";
import Navbar from "../components/Common/Header/Navbar";
import Footer from "../components/Common/Footer/Footer";
import MegaMenu from "../components/Common/Sidebar/MegaMenu";


export const metadata = {
  title: "Aks Pharmacy",
  description: " Online pharmacy store",
};

export default function CommonLayout({ children }) {
  return (

    <div>
      <div className="sticky top-0 z-40">
        <Navbar />
      </div>
      {children}
      {/* <div className="lg:hidden">
            <MegaMenu />
          </div> */}
      <Footer />
    </div>


  );
}
