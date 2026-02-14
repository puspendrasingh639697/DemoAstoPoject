import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext, Suspense, lazy } from "react";
import { astroContext } from "./context/astroContext";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import MainLoader from "./components/Loaders/MainLoader";
import TravelPopup from "./components/TravelPopup";
import CareerProbabilityPredictor from "./Pages/CareerProbabilityPredictor";
import ForeignTravelPrediction from "./Pages/ForeignTravelPrediction";
import PitriPakshaPage from "./Pages/PitriPakshaPage";
import ForeignTravel from "./Pages/ForeignTravel";

// Lazy-loaded Pages and Components
const HomePage = lazy(() => import("./Pages/HomePage"));
const PartnesComaptibility = lazy(() => import("./Pages/PartnesComaptibility"));
const NumerologyPersonandCompany = lazy(() =>
  import("./Pages/NumerologyPersonandCompany")
);
const NametoNameCompatibility = lazy(() =>
  import("./Pages/NametoNameCompatibility")
);
const BookPandit = lazy(() => import("./Pages/BookPandit"));
const BookPooja = lazy(() => import("./Pages/BookPooja"));
const AstrologerPage = lazy(() => import("./Pages/AstrologerPage"));
const KundaliMatching = lazy(() => import("./Pages/KundaliMatching"));
const FreeKundali = lazy(() => import("./Pages/FreeKundali"));
const VastuMaking = lazy(() => import("./Pages/VastuMaking"));
const AstrologerCouncellorPage = lazy(() => import("./Pages/AstroCouncellor"));
const AstrologerProfile = lazy(() => import("./Pages/IndividualProfile"));
const Prasaad = lazy(() => import("./Pages/Prasaad"));
const BlogPage = lazy(() => import("./Pages/BlogPage"));
const SIngleBlog = lazy(() => import("./Pages/SIngleBlog"));
const Login = lazy(() => import("./Pages/Login"));
const OtpVerification = lazy(() => import("./Pages/OtpVerification"));
const MatchReport = lazy(() =>
  import("./components/KundaliMatching/MatchReport")
);
const FreeKundaliPage = lazy(() =>
  import("./components/Kundali/FreeKundaliPage")
);
const Sidebar = lazy(() => import("./components/UserDashboardSection/Sidebar"));
const Profile = lazy(() => import("./components/UserDashboardSection/Profile"));
const Wallet = lazy(() => import("./components/UserDashboardSection/Wallet"));
const Transactions = lazy(() =>
  import("./components/UserDashboardSection/Transactions")
);
const Settings = lazy(() =>
  import("./components/UserDashboardSection/Settings")
);
const FeedbackSupport = lazy(() =>
  import("./components/UserDashboardSection/FeedbackSupport")
);
const Booking = lazy(() => import("./components/UserDashboardSection/Booking"));
const SingleBooking = lazy(() =>
  import("./components/UserDashboardSection/SingleBook")
);
const AddTOWallet = lazy(() =>
  import("./components/UserDashboardSection/AddTOWallet")
);
const TempleDetails = lazy(() =>
  import("./components/BookPooja/TempleDetails")
);
const PanditPackage = lazy(() =>
  import("./components/BookaPandit/PanditPackage")
);
const PanditProfile = lazy(() =>
  import("./components/BookaPandit/PanditProfile")
);
const PanditForm = lazy(() => import("./components/BookaPandit/PanditForm"));
const PoojaForm = lazy(() => import("./components/BookPooja/PoojaForm"));
const PoojaProfile = lazy(() => import("./components/BookPooja/PoojaProfile"));
const VastuForm = lazy(() => import("./components/Vastu/VastuForm"));
const KundaliPage = lazy(() => import("./Pages/kundaliInfo"));
const FreekundaliInfo = lazy(() => import("./Pages/kundaliInfo"));
const KundliGuide = lazy(() => import("./Pages/KundliGuide"));
const KundliInsight = lazy(() => import("./Pages/KundliInsight"));
const DailyKundliSection = lazy(() => import("./Pages/DailyKundliSection"));
const KundliDailyLifeSection = lazy(() =>
  import("./Pages/KundliDailyLifeSection")
);
const GunaMilanSection = lazy(() => import("./Pages/GunaMilanSection"));
const KundliScoreMeaning = lazy(() => import("./Pages/KundliScoreMeaning"));
const WhyAstroCaptain = lazy(() => import("./Pages/WhyAstroCaptain"));
const FullTimeAstrologersSection = lazy(() =>
  import("./Pages/FullTimeAstrologersSection")
);
const AstrologyDetails = lazy(() =>
  import("./components/KundaliReport.jsx/AstrologyDetails")
);
const Topbar = lazy(() => import("./components/KundaliReport.jsx/Topbar"));
const Kundali = lazy(() => import("./components/KundaliReport.jsx/Kundali"));
const KundaliPlanets = lazy(() =>
  import("./components/KundaliReport.jsx/KundaliPlanets")
);
const Ashtakvarga = lazy(() =>
  import("./components/KundaliReport.jsx/Ashtakvarga")
);
const Charts = lazy(() => import("./components/KundaliReport.jsx/Charts"));
const Dasha = lazy(() => import("./components/KundaliReport.jsx/Dasha"));
const FreeReport = lazy(() =>
  import("./components/KundaliReport.jsx/FreeReport")
);
const HorizontalNonLinearStepper = lazy(() =>
  import("./components/KundaliReport.jsx/Steppet")
);
const BookEPooja = lazy(() => import("./Pages/BookEPooja"));
const EPoojaBooking = lazy(() =>
  import("./components/BookEPooja/EPoojaBooking")
);
const BecomePanditform = lazy(() => import("./components/BecomePanditform"));
const PrashadForm = lazy(() => import("./components/prasad/PrashadForm"));
const BookingConfirmation = lazy(() =>
  import("./components/prasad/BookingConfirmation")
);
const Numerologydata = lazy(() => import("./Pages/NumerologyDashboard"));
const NumerologyCalculator = lazy(() => import("./Pages/NumerologyCalculator"));
const NumerologyReport = lazy(() =>
  import("./components/NumerologyDashboard/NumerologyReport")
);
const RamShalakaPage = lazy(() => import("./Pages/RamShalakaPage"));
const MaleFemaleReport = lazy(() =>
  import("./components/NumerologyDashboard/MaleFemaleReport")
);
const CompatibilityPartnersandCompany = lazy(() =>
  import("./Pages/CompatibilityPartnersandCompany")
);
function App() {
  const { loading, loadingText, setLoadingText } = useContext(astroContext);
  return (
    <Router>
      <ScrollToTop />
      <div className="font-poppins pt-[74px]">
        <Navbar />

        {loading && <MainLoader loadingText={loadingText} />}

        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* KundaliMatching */}
          <Route path="/kundali-matching" element={<KundaliMatching />} />
          <Route path="/join-us" element={<BecomePanditform />} />

          <Route path="/match-report" element={<MatchReport />} />

          {/* Book Pandit */}
          <Route path="/book-pandit" element={<BookPandit />} />
          <Route path="/pandit-profile/:slug" element={<PanditProfile />} />
          <Route path="/packages/:id" element={<PanditPackage />} />
          <Route path="/panditform" element={<PanditForm />} />

          {/* Book Pooja */}
          <Route path="/book-e-pooja" element={<BookEPooja />} />
          <Route path="/epooja-details/:id" element={<EPoojaBooking />} />

          <Route path="/book-pooja" element={<BookPooja />} />
          <Route path="/temple-details" element={<TempleDetails />} />

          <Route path="/astro-page" element={<AstrologerPage />} />
          <Route
            path="/astrocouncelor-page"
            element={<AstrologerCouncellorPage />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/otp-verification" element={<OtpVerification />} />
          <Route path="/free-kundali" element={<FreeKundali />} />
          <Route path="/vastu-making" element={<VastuMaking />} />
          <Route path="/astrologer/:id" element={<AstrologerProfile />} />

          <Route path="/prasad" element={<Prasaad />} />
          <Route path="/blogs" element={<BlogPage />} />

          <Route path="/single-blog" element={<SIngleBlog />} />
          <Route path="/poojaform" element={<PoojaForm />} />
          <Route path="/vastuform" element={<VastuForm />} />
          <Route path="/poojaprofile" element={<PoojaProfile />} />

          <Route path="/free-kundali-page" element={<FreeKundaliPage />} />
          {/* <Route path="/user-dashboard" element={<UserDashboard />} /> */}
          <Route path="/user-dashboard" element={<Sidebar />}>
            <Route index element={<Profile />} />
            <Route path="wallet">
              <Route index element={<Wallet />} />
              <Route path="add-money" element={<AddTOWallet />} />
            </Route>
            <Route path="Booking">
              <Route index element={<Booking />} />
              <Route path="single-booking" element={<SingleBooking />} />
            </Route>
            <Route path="wallet">
              <Route index element={<Wallet />} />
              <Route path="add-money" element={<AddTOWallet />} />
            </Route>
            <Route path="transaction" element={<Transactions />} />
            <Route path="feedback-support" element={<FeedbackSupport />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route path="/astrology-details" element={<Topbar />}>
            <Route index element={<AstrologyDetails />} />
            <Route path="kundali" element={<Kundali />} />
            <Route path="kp" element={<KundaliPlanets />} />
            <Route path="ashtakvarga" element={<Ashtakvarga />} />
            <Route path="charts" element={<Charts />} />
            <Route path="dasha" element={<Dasha />} />
            <Route path="free-report" element={<FreeReport />} />
          </Route>
          <Route path="/stepper" element={<HorizontalNonLinearStepper />} />
          <Route path="/prashad-form" element={<PrashadForm />} />
          <Route
            path="/booking-confirmation"
            element={<BookingConfirmation />}
          />
          <Route path="/kundali-info" element={<KundaliPage />} />
          <Route path="/Free-kundali-info" element={<FreekundaliInfo />} />
          <Route path="/daily-kundli" element={<DailyKundliSection />} />
          <Route path="/kundli-guide" element={<KundliGuide />} />
          <Route path="/kundli-insight" element={<KundliInsight />} />
          <Route path="/guna-milan" element={<GunaMilanSection />} />
          <Route path="/why-astro" element={<WhyAstroCaptain />} />
          <Route
            path="/trust-kundli"
            element={<FullTimeAstrologersSection />}
          />
          <Route path="/score-meaning" element={<KundliScoreMeaning />} />
          <Route
            path="/kundli-daily-life"
            element={<KundliDailyLifeSection />}
          />
          <Route path="/astrology-details" element={<AstrologyDetails />} />
          <Route
            path="/numerology-calculator"
            element={<NumerologyCalculator />}
          />
          <Route path="/numerology" element={<Numerologydata />} />
          <Route path="/numerologyreport" element={<NumerologyReport />} />
          <Route path="/ram-shalaka" element={<RamShalakaPage />} />
          <Route path="/male-female-report" element={<MaleFemaleReport />} />
          <Route
            path="/compatibility-person&company"
            element={<NumerologyPersonandCompany />}
          />
          <Route
            path="/compatibility-partner&company"
            element={<CompatibilityPartnersandCompany />}
          />
          <Route
            path="name-to-name-compatibility"
            element={<NametoNameCompatibility />}
          />
          <Route
            path="/partner-compatibility"
            element={<PartnesComaptibility />}
          />
          <Route
            path="/Competitive-Edge-prediction"
            element={<CareerProbabilityPredictor />}
          />
          <Route
            path="/foreign-travel-prediction"
            element={<ForeignTravelPrediction />}
          />
          <Route path="/pitri-paksha-pooja" element={<PitriPakshaPage />} />
          <Route path="/foreign-travel-detail" element={<ForeignTravel />} />
          
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
