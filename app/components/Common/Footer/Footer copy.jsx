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



export default function Footer() {
  return (
    <footer className="bg-[#0B5F66] text-white ">
      <Container className=" py-12">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 ">

          {/* Logo & Info */}
          <div>
            <Image
              src="/images/logos/aks.png"
              alt="AKS Pharmacy"
              width={150}
              height={50}
              className="mb-4 filter invert brightness-0"
            />
            <ul className="space-y-2 text-base">
              <li><Link href="#">Our Story</Link></li>
              <li><Link href="/our-team">Join Our Team</Link></li>
              <li><Link href="#">Authenticity</Link></li>
            </ul>

            <div className="mt-6">
              <p className="font-semibold mb-3">SHARE YOUR LOVE</p>

              <div className="flex items-center gap-4 text-xl">
                <Link
                  href="https://www.facebook.com"
                  target="_blank"
                  className="hover:text-[#1877F2] text-white transition"
                >
                  <FontAwesomeIcon icon={faFacebook} />
                </Link>

                <Link
                  href="https://www.instagram.com"
                  target="_blank"
                  className="hover:text-[#E4405F] transition"
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </Link>

                <Link
                  href="https://www.youtube.com"
                  target="_blank"
                  className="hover:text-[#FF0000] transition"
                >
                  <FontAwesomeIcon icon={faYoutube} />
                </Link>

                <Link
                  href="https://www.twitter.com"
                  target="_blank"
                  className="hover:text-[#1DA1F2] transition"
                >
                  <FontAwesomeIcon icon={faTwitter} />
                </Link>

                <Link
                  href="https://www.pinterest.com"
                  target="_blank"
                  className="hover:text-[#BD081C] transition"
                >
                  <FontAwesomeIcon icon={faPinterest} />
                </Link>
              </div>
            </div>


          </div>

          {/* Top Categories */}
          <div>
            <h4 className="font-semibold mb-4 text-yellow-600 ">TOP CATEGORIES</h4>
            <ul className="space-y-2 text-base">
              <li>Makeup</li>
              <li>Skin</li>
              <li>Eye Care</li>
              <li>Hair</li>
              <li>Personal Care</li>
              <li>Natural</li>
              <li>Mom & Baby</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-yellow-600">QUICK LINKS</h4>
            <ul className="space-y-2 text-base">
              <li>Offers</li>
              <li>Men’s Products</li>
              <li>Skin Concerns</li>
              <li><Link href="/new-arrivals">New Arrival</Link></li>
              <li>Makeup</li>
            </ul>
          </div>

          {/* All About Beauty */}
          <div>
            <h4 className="font-semibold mb-4 text-yellow-600">ALL ABOUT BEAUTY</h4>
            <ul className="space-y-2 text-base">
              <li>Know Your Routine</li>
              <li>Hair Care 101</li>
              <li>Skin Care 101</li>
              <li>Makeup 101</li>
            </ul>

            <div className="mt-2">
              <p className="font-semibold mb-2 ">Download Our App</p>
              <div className="flex gap-3 -ml-2.5">
                <Image src="/images/footer/2.png" alt="Google Play" width={150} height={40} />
                {/* <Image src="/app-store.png" alt="App Store" width={120} height={40} /> */}
              </div>
            </div>
          </div>

          {/* Help */}
          <div className="">
            <h4 className="font-semibold mb-4 text-yellow-600">HELP</h4>
            <ul className="space-y-2 text-base">
              <li><Link href="/contact-us">Contact Us</Link></li>
              <li>Points</li>
              <li><Link href="/faq">FAQs</Link></li>
              <li>Shipping & Delivery</li>
              <li>
                <Link
                  href="/terms-and-conditions"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/return-and-refund"
                >Refund & Return Policy</Link>
              </li>
              <li>Trade License</li>
              <li>Privacy Policy</li>
            </ul>

            {/* <div className="mt-6">
              <p className="font-semibold mb-2">PAYMENTS ACCEPTED</p>
              <Image
                src="/images/payments/ssl_payments.png"
                alt="Payments"
                width={500}
                height={40}
              />
            </div> */}
          </div>

        </div>

        <div className=" w-full h-30 flex justify-end ">
          <div className="">
            <p className="font-semibold mb-1 ml-8">PAYMENTS ACCEPTED</p>
            <Image
              src="/images/payments/ssl_payments.png"
              alt="Payments"
              width={360}
              height={40}
            />
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-white/30 my-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between text-base xl:text-lg text-white/80 gap-4">
          <div className="flex gap-4">
            <Link href="#">Authenticity</Link>
            <Link href="#">Terms & Conditions</Link>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Refund & Return Policy</Link>
            <Link href="/faq">FAQs</Link>
          </div>

          <p>Copyright © 2026 AKS Pharmacy. All Rights Reserved</p>
        </div>

      </Container>
    </footer>
  );
}
