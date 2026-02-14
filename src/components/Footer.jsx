import React from "react";

import Facebooklogo from "../icons/Facebooklogo.png";
import Youtubelogo from "../icons/Youtubelogo.png";
import Instalogo from "../icons/Instagramlogo.png";
import Linkedinlogo from "../icons/Linkedinlogo.png";
import Twitterlogo from "../icons/Twitterlogo.png";
import PlayStore from "../assets/image/Playstore.webp";
import AppStore from "../assets/image/AppleStore.webp";
import { Link } from "react-router-dom";
import { FiPhoneCall } from "react-icons/fi";
import { PiMapPinAreaLight } from "react-icons/pi";
import { SlEnvolopeLetter } from "react-icons/sl";
import Home1 from "../assets/image/Footer@2x.png";

const Footer = () => {
  return (
    <footer className="relative bg-[#facc15] text-white overflow-hidden">
      {/* Bottom Decorative Shape */}
      <div className="absolute top-0 left-0 w-full h-20">
        <svg
          viewBox="0 0 1200 120"
          fill="none"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path d="M0,120 C300,0 900,0 1200,120 L1200,0 L0,0 Z" fill="white" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 mt-[100px] px-6 lg:px-20  space-y-7">
        {" "}
        {/* Top Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 py-3 border-b border-gray-600 ">
          {/* Left Column */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-4 text-white">
              Astro<span className="text-black">Captain</span>
            </h1>
            <p className="text-xs md:text-base text-black mb-6 leading-relaxed">
              AstroCaptain is your trusted platform for online astrology
              predictions. Connect with expert astrologers over a call and
              receive personalized guidance. Get accurate Kundli predictions and
              make informed decisions with AstroCaptain.
            </p>

            {/* App Buttons */}
            <div className="flex flex-wrap gap-3">
              <a
                href="#"
                className="bg-black text-white py-2 px-4 rounded flex items-center text-sm hover:bg-white hover:text-black
                 transition"
              >
                <img src={PlayStore} alt="Play Store" className="h-4 mr-2" />
                Playstore
              </a>
              <a
                href="#"
                className="bg-black text-white py-2 px-4 rounded flex items-center text-sm hover:bg-white  hover:text-black transition"
              >
                <img src={AppStore} alt="App Store" className="h-4 mr-2" />
                Appstore
              </a>
            </div>
          </div>

          {/* Right Column */}
          <div>
            {/* Contact Info */}
            <h2 className="text-lg font-bold mb-3 text-black">Contact Us</h2>
            <div className="flex flex-col gap-2 text-sm text-black mb-6">
              <div className="flex items-center">
                <PiMapPinAreaLight className="size-5 mr-2" />
                <span>Sector-7, Noida, UP-201301</span>
              </div>
              <div className="flex items-center">
                <SlEnvolopeLetter className="size-4 mr-2" />
                <span>info@astrocaptain.com</span>
              </div>
              <div className="flex items-center">
                <FiPhoneCall className="size-4 mr-2" />
                <span>+91 1234567890</span> 
              </div>
            </div>

            {/* Services */}
            <h2 className="text-lg font-bold mb-3 text-black">Our Services</h2>
            <ul className="grid grid-cols-2 gap-2 text-sm text-black">
              {[
                ["Book Pandit", "/book-pandit"],
                ["Book Pooja", "/book-e-pooja"],
                ["Kundali Making", "/free-kundali"],
                ["Call Astrologer", "/astro-page"],
                ["Chat Astrologer", "/astro-page"],
                ["Call AstroCounselor", "/astrocouncelor-page"],
                ["Chat AstroCounselor", "/astrocouncelor-page"],
                ["Vastu Making", "/vastu-making"],
                ["Blogs", "/blogs"],
                ["Numerology", "/numerology-calculator"],
                ["Ram Shalaka", "/ram-shalaka"],
              ].map(([label, link]) => (
                <li
                  key={label}
                  className="hover:text-white transition duration-300"
                >
                  <Link to={link}>→ {label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Bottom Footer Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-black ">
          {/* Social Media Icons */}
          <div className="flex gap-5">
            <img src={Facebooklogo} alt="Facebook" className="h-5 w-5" />
            <img src={Twitterlogo} alt="Twitter" className="h-5 w-5" />
            <img src={Youtubelogo} alt="YouTube" className="h-5 w-5" />
            <img src={Linkedinlogo} alt="LinkedIn" className="h-5 w-5" />
            <img src={Instalogo} alt="Instagram" className="h-5 w-5" />
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p>
              © {new Date().getFullYear()} Sedulous Softtech, All Rights
              Reserved.
            </p>
            <p className="mt-1">
              <span className="hover:text-[#000000] cursor-pointer">
                Terms & Conditions
              </span>{" "}
              |{" "}
              <span className="hover:text-[#020201] cursor-pointer">
                Privacy Policy
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
