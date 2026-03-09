import Image from "next/image";
import Link from "next/link";
import Container from "../Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faYoutube,
  faTwitter,
  faPinterest,
} from "@fortawesome/free-brands-svg-icons";
import { getCategories, getSettings } from "@/lib/fetchApis";
import { getMediaLinkByMetaName, getMetaValueByMetaName } from "@/helper/metaHelpers";

const footerData = [
  // {
  //   title: "TOP CATEGORIES",
  //   links: [
  //     { label: "Makeup", href: "#" },
  //     { label: "Skin", href: "#" },
  //     { label: "Eye Care", href: "#" },
  //     { label: "Hair", href: "#" },
  //     { label: "Personal Care", href: "#" },
  //     { label: "Natural", href: "#" },
  //     { label: "Mom & Baby", href: "#" },
  //   ]
  // },
  {
    title: "QUICK LINKS",
    links: [
      { label: "Contact Us", href: "/contact-us" },

      { label: "New Arrival", href: "/new-arrivals" },

    ],
    extraContent: (
      <div className="mt-6">
        <p className="font-semibold mb-2 text-sm text-[#a6e451]">Download Our App</p>
        <div className="flex gap-3">
          <Image src="/images/footer/2.png" alt="Google Play" width={140} height={42} className="w-32 h-auto" />
        </div>
      </div>
    )
  },

  {
    title: "HELP",
    links: [
      { label: "Contact Us", href: "/contact-us" },
      // { label: "Points", href: "#" },
      { label: "FAQs", href: "/faq" },
      // { label: "Shipping & Delivery", href: "#" },
      { label: "Terms & Conditions", href: "/terms-and-conditions" },
      { label: "Refund & Return Policy", href: "/return-and-refund" },
      { label: "Trade License", href: "#" },
      { label: "Privacy Policy", href: "#" },
    ]
  }
];



export default async function Footer() {
  const settings = await getSettings()

    const logo = getMediaLinkByMetaName(settings, "site_logoimg_id");
    const email = getMetaValueByMetaName(settings, "company_email") || "nfo@banglastar.com";
    const phone = getMetaValueByMetaName(settings, "company_phone");
    const phone_2 = getMetaValueByMetaName(settings, "phone_2");
    const facebook_url = getMetaValueByMetaName(settings, "facebook_url") || "#";
    const instagram_url = getMetaValueByMetaName(settings, "instagram_url") || "#";
    const twitter_url = getMetaValueByMetaName(settings, "twitter_url") || "#";
    const youtube_url = getMetaValueByMetaName(settings, "youtube_url") || "#";
    const footer_content = getMetaValueByMetaName(settings, "footer_content") || "#"
    const bottom_footer_content = getMetaValueByMetaName(settings, "bottom_footer_content");



  const productCategories = await getCategories("product_categories") || [];

const socialLinks = [
  { icon: faFacebook, color: "hover:text-[#1877F2]", href: facebook_url },
  { icon: faInstagram, color: "hover:text-[#E4405F]", href: instagram_url },
  { icon: faYoutube, color: "hover:text-[#FF0000]", href: youtube_url },
  { icon: faTwitter, color: "hover:text-[#1DA1F2]", href: twitter_url},
  // { icon: faPinterest, color: "hover:text-[#BD081C]", href: "https://www.pinterest.com" },
];

  return (
    <footer className="bg-[#0882BB] text-white px-2 md:px-0">
      <Container className="py-12">

        {/* Top Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-4">

          {/* Logo & Info - Spans 2 cols on mobile */}
          <div className="col-span-2 lg:col-span-1 space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logos/aks.png"
                alt="AKS Pharmacy"
                width={150}
                height={50}
                className="w-32 md:w-[150px] filter invert brightness-0"
              />
            </Link>

            <ul className="space-y-2 text-sm md:text-base text-white">
              <li><Link href="#" className="hover:text-yellow-400 transition-colors">Our Story</Link></li>
              <li><Link href="/our-team" className="hover:text-yellow-400 transition-colors">Join Our Team</Link></li>
              <li><Link href="#" className="hover:text-yellow-400 transition-colors">Authenticity</Link></li>
            </ul>

            <div className="pt-4">
              <p className="font-semibold mb-3 text-sm tracking-wide text-[#a6e451]">SHARE YOUR LOVE</p>
              <div className="flex items-center gap-4 text-xl">
                {socialLinks.map((social, idx) => (
                  <Link
                    key={idx}
                    href={social.href}
                    target="_blank"
                    className={` text-white transition`}
                  >
                    <FontAwesomeIcon icon={social.icon} />
                  </Link>
                ))}
              </div>
            </div>

          </div>


          <div className="mt-0.5">
            <h4 className="font-bold mb-4 text-[#a6e451] text-sm md:text-base tracking-wide">
              TOP CATEGORIES
            </h4>
            <div className="space-y-2 text-sm md:text-base text-white ">
              {
                productCategories?.slice(0, 5)?.map(
                  (category, idx) => (
                    <p key={idx}>
                      <Link href={`/products/${category?.slug}`} className="hover:text-white transition-colors">
                        {category?.name}
                      </Link>
                    </p>
                  )
                )
              }
            </div>
          </div>
          <div className="mt-0.5">
            <h4 className="font-bold mb-4 text-[#a6e451] text-sm md:text-base tracking-wide">
              MORE CATEGORIES
            </h4>
            <div className="space-y-2 text-sm md:text-base text-white ">
              {
                productCategories?.slice(5, 10)?.map(
                  (category, idx) => (
                    <p key={idx}>
                      <Link href={`/products/${category?.slug}`} className="hover:text-white transition-colors">
                        {category?.name}
                      </Link>
                    </p>
                  )
                )
              }
            </div>
          </div>





          {/* Dynamic Footer Sections */}
          {footerData.map((section, idx) => (
            <div key={idx} className="col-span-1">
              <h4 className="font-bold mb-4 text-[#a6e451] text-sm md:text-base tracking-wide">
                {section.title}
              </h4>
              <ul className="space-y-2 text-sm md:text-base text-white">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link href={link.href} className="hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              {section.extraContent}
            </div>
          ))}

        </div>

        <div className="w-full mt-10 mb-6 flex justify-center md:justify-end">
          <div className="text-center md:text-right">
            <p className="font-semibold mb-2 text-sm text-[#a6e451]">PAYMENTS ACCEPTED</p>
            <Image
              src="/images/payments/ssl_payments.png"
              alt="Payments"
              width={360}
              height={40}
              className="h-8 md:h-10 w-auto"
            />
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 mb-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-between text-sm text-white gap-4 text-center md:text-left">
          <p>© 2026 AKS Pharmacy. All Rights Reserved</p>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link href="#" className="hover:text-white transition-colors">Authenticity</Link>
            <Link href="/terms-and-conditions" className="hover:text-white transition-colors">Terms & Conditions</Link>
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/return-and-refund" className="hover:text-white transition-colors">Refund & Return Policy</Link>
            <Link href="/faq" className="hover:text-white transition-colors">FAQs</Link>
          </div>
        </div>

      </Container>
    </footer>
  );
}
