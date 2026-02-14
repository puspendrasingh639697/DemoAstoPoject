import React from "react";
import PanditBanner from "../components/BookPooja/PanditBanner";
import ExperiencePoojas from "../components/BookPooja/PanditInfo";
import UpcomingEvents from "../components/BookPooja/UpcomingEvents";
import HowItWorks from "../components/BookPooja/HowitWorksPandit";
import StatsShowcase from "../components/BookPooja/PanditsStats";
import Testimonials from "../components/BookPooja/Testimonials";
import PoojaSlider from "../components/BookPooja/PoojaSlider";
import Pooja from "../components/BookPooja/Pooja";

const BookPooja = () => {
  return (
    <div>
      <div className="relative">
        <PanditBanner />
        <div className="absolute bottom-0 left-0 w-full">
          <PoojaSlider />
        </div>
      </div>
      <UpcomingEvents />
      <Pooja />
      <Testimonials />
    </div>
  );
};

export default BookPooja;
