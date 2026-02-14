import PanditBanner from "../components/BookaPandit/PanditBanner";
import PanditInfo from "../components/BookaPandit/PanditInfo";
import UpcomingEvents from "../components/BookaPandit/UpcomingEvents";
import PanditsStats from "../components/BookaPandit/PanditsStats";
import Testimonials from "../components/BookaPandit/Testimonials";
import HowItWorks from "../components/BookPooja/HowitWorksPandit";
import AvailablePandits from "../components/BookaPandit/AvailablePandits";
import { useRef } from "react";

const BookPandit = () => {
  const panditsRef = useRef(null);

  return (
    <div>
      <PanditBanner panditsRef={panditsRef} />
      <AvailablePandits panditsRef={panditsRef} />
      <PanditInfo />
      <UpcomingEvents />
      <HowItWorks />
      <PanditsStats />
      <Testimonials />
    </div>
  );
};

export default BookPandit;
