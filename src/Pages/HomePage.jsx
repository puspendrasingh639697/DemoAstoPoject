import React, { useEffect, useState } from "react";
import LandingPage from "../components/HomePage/LandingPage";
import HoroScopeCorousel from "../components/HomePage/HoroScopeCorousel";
import ServicesSection from "../components/HomePage/ServicesSection";
import AstrlogerSection from "../components/HomePage/AstrlogerSection";
import PanditSection from "../components/HomePage/PanditSection";
import AstroCouncellor from "../components/HomePage/AstroCouncellorSection";
import StatsCounter from "../components/HomePage/AstroStats";
import WhatweProvide from "../components/HomePage/WhatweProvide";
import MultidisciplinaryTeam from "../components/HomePage/AstroTeams";
import AppLinks from "../components/HomePage/AppLinks";
import FAQ from "../components/HomePage/Faq";
import HomeTestimonial from "../components/HomePage/HomeTestimonial";
import Blogs from "../components/HomePage/Blog";
import Podcast from "../components/HomePage/Postcast";
import logoSquare from "../assets/image/logoSquare.png";
import ClaudeServices from "../components/ClaudeServices";
import TravelPopup from "../components/TravelPopup";
import OtherServices from "../components/HomePage/Other-Services";
const HomePage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => {
      clearTimeout();
    };
  }, []);

  return (
    <div>
      <TravelPopup />
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white backdrop-blur-md slide-down">
          <div className="flex flex-col items-center space-y-6 slide-up">
            {/* Spinner */}
             <div className="relative w-[110px] h-[110px]">
                     <div className="absolute inset-0 rounded-full border-[8px] border-yellow-400 border-t-transparent border-b-transparent animate-spin" />
                     <div className="absolute inset-[-15px] rounded-full border-[8px] border-yellow-200 border-t-transparent border-b-transparent reverseSpin" />
                   
                     <div className="absolute inset-2 rounded-full bg-white flex items-center justify-center animate-scaleIn">
                       <img
                         className="w-4/5 h-4/5 object-contain z-30 bg-white rounded-full"
                         src={logoSquare}
                         alt="logo"
                       />
                     </div>
                   </div>

            {/* Text */}
            <p className="text-xl text-yellow-700 font-medium animate-pulse">
              Welcome to Astro Captian
            </p>
          </div>
        </div>
      )}
      <LandingPage />
      <HoroScopeCorousel />
      {/* <ClaudeServices /> */}
      <ServicesSection />
      <OtherServices />
      <AstrlogerSection />
      <PanditSection />
      <AstroCouncellor />
      <StatsCounter />
      <Podcast />
      <HomeTestimonial />
      <Blogs />
      <WhatweProvide />
      {/* <MultidisciplinaryTeam /> */}
      <AppLinks />
      <FAQ />
    </div>
  );
};

export default HomePage;
