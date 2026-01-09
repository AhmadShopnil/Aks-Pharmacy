import Container from "../components/Common/Container";
import Navbar from "../components/Common/Header/Navbar";
import LeftSidebarMegaMenu from "../components/Common/Sidebar/LeftSidebarMegaMenu";

export default function ProductDetailsLayout({ children }) {
  return (
    <div className=" min-h-screen bg-white">

      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      {/* Body */}
      <Container className=" pt-20"> 
     

     <div className="w-full flex gap-4 ">
         {/* Sidebar */}
       <div className="min-h-full  w-[20%] ">
         <div className="fixed   h-full  w-[17%] border-r z-40 ">
          <LeftSidebarMegaMenu />
        </div>
       </div>

        {/* Main Content */}
        <div className=" w-[80%] min-h-screen overflow-y-auto  ">
          {children}
        </div>
     </div>

      </Container>
    </div>
  );
}
