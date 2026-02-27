import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;

import { ReduxProvider } from "@/lib/redux/ReduxProvider";
import CartDrawer from "./components/Common/CartDrawer";
import MegaMenu from "./components/Common/Sidebar/MegaMenu";
import { getCategories } from "@/lib/fetchApis";
import { formatCategories } from "@/helper/megamenuFormat";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Aks Pharmacy",
  description: "online pharmacy store ",
};

export default async function RootLayout({ children }) {

  const productCategories = await getCategories("product_categories") || [];
  const formattedCategories = formatCategories(productCategories || []);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <CartDrawer />
          <div>
            {children}
            {/* <Footer /> */}
            <div className="lg:hidden">
              <MegaMenu formattedCategories={formattedCategories} />
            </div>
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
