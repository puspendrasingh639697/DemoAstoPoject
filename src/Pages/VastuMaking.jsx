import React from "react";
import LandingPage from "../components/Vastu/LandingPage";
import SubinfoPage from "../components/Vastu/SubinfoPage";
import VastuServices from "../components/Vastu/VastuServices";
import Stats from "../components/Vastu/Stats";
import VastuAbout from "../components/Vastu/VastuAbout";
import SpecialistVastu from "../components/Vastu/SpecialistVastu";
import HomeVastu from "../components/Vastu/HomeVastu";

const VastuMaking = () => {
  return (
    <div>
      <LandingPage />
      <SubinfoPage />
      <VastuServices />
      {/* <Stats /> */}
      <VastuAbout />
      {/* <SpecialistVastu /> */}
      <HomeVastu />
    </div>
  );
};

export default VastuMaking;
