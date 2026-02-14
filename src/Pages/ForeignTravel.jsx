import React, { useState, useEffect } from "react";
import {
  Plane,
  MapPin,
  Calendar,
  Clock,
  User,
  Star,
  Sparkles,
  Globe,
  Compass,
  Phone,
  Download,
  Sun,
  Moon,
  Zap,
  ArrowRight,
  CheckCircle,
  XCircle,
  Heart,
  Home,
  Crown,
} from "lucide-react";

const ForeignTravel = () => {
  const [currentStep, setCurrentStep] = useState("form");
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    timeOfBirth: "",
    placeOfBirth: "",
    preferredLanguage: "hindi",
  });
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const cities = [
    // Punjab Cities
    "Chandigarh, Punjab",
    "Ludhiana, Punjab",
    "Amritsar, Punjab",
    "Jalandhar, Punjab",
    "Patiala, Punjab",
    "Bathinda, Punjab",
    "Mohali, Punjab",
    // Maharashtra Cities
    "Mumbai, Maharashtra",
    "Pune, Maharashtra",
    "Nagpur, Maharashtra",
    "Nashik, Maharashtra",
    "Aurangabad, Maharashtra",
    "Solapur, Maharashtra",
    "Kolhapur, Maharashtra",
    // South India Cities
    "Bangalore, Karnataka",
    "Chennai, Tamil Nadu",
    "Hyderabad, Telangana",
    "Kochi, Kerala",
    "Coimbatore, Tamil Nadu",
    "Mysore, Karnataka",
    "Vijayawada, Andhra Pradesh",
    "Madurai, Tamil Nadu",
    "Thiruvananthapuram, Kerala",
    "Mangalore, Karnataka",
  ];

  const culturalGreetings = {
    punjabi: {
      greeting: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ",
      text: "Sat Sri Akal",
      meaning: "Divine truth is eternal",
    },
    marathi: {
      greeting: "नमस्कार",
      text: "Namaskar",
      meaning: "I bow to the divine in you",
    },
    tamil: { greeting: "வணக்கம்", text: "Vanakkam", meaning: "I honor you" },
    telugu: {
      greeting: "నమస్తే",
      text: "Namaste",
      meaning: "The divine in me honors the divine in you",
    },
    kannada: {
      greeting: "ನಮಸ್ಕಾರ",
      text: "Namaskara",
      meaning: "I salute the divine within you",
    },
    malayalam: {
      greeting: "നമസ്തേ",
      text: "Namaste",
      meaning: "Greetings to your soul",
    },
  };

  const getRegionalContext = (city) => {
    if (city.includes("Punjab")) return "punjabi";
    if (city.includes("Maharashtra")) return "marathi";
    if (city.includes("Tamil Nadu")) return "tamil";
    if (city.includes("Telangana") || city.includes("Andhra Pradesh"))
      return "telugu";
    if (city.includes("Karnataka")) return "kannada";
    if (city.includes("Kerala")) return "malayalam";
    return "hindi";
  };

  const generateCulturalResults = (name, birthPlace) => {
    const firstName = name.split(" ")[0];
    const region = getRegionalContext(birthPlace);

    const regionalInsights = {
      punjabi: {
        canTravel: true,
        insight:
          "ਵਾਹਿਗੁਰੂ ਜੀ ਦੀ ਕਿਰਪਾ ਨਾਲ, your Jupiter in 9th house shows Guru Nanak Dev Ji's blessings for foreign lands. Like our Sikh pioneers who spread across the world, you have the warrior spirit for international success. Your Rahu placement indicates strong connections with Canada, UK, and Australia - places where Punjabi community thrives.",
        timing:
          "Foreign settlement strongly indicated after age 28, especially during Guru Purnima periods",
        reason:
          "Mars in 10th house gives you the Punjabi fighting spirit for overseas ventures. Your ancestors' blessings (pitru shakti) support international journey",
        countries: ["Canada 🇨🇦", "Australia 🇦🇺", "UK 🇬🇧", "USA 🇺🇸"],
        deity: "Guru Nanak Dev Ji and Maa Durga",
        remedy: "Visit Golden Temple before departure, offer Kada Prasad",
      },
      marathi: {
        canTravel: true,
        insight:
          "गणपति बाप्पा मोरया! Your birth chart shows Lord Ganesha's blessings for removing obstacles in foreign ventures. Like Chatrapati Shivaji's vision of expansion, your Mercury-Venus conjunction indicates success through international business and cultural exchange. Your connection to Pune's IT heritage shows technology-based foreign opportunities.",
        timing:
          "Major breakthrough expected during Ganesh Chaturthi season, around age 30-35",
        reason:
          "Strong Moon in 4th house initially creates attachment to Maharashtra, but Jupiter's transit will eventually favor foreign settlement",
        countries: ["USA 🇺🇸", "Germany 🇩🇪", "Singapore 🇸🇬", "Dubai 🇦🇪"],
        deity: "Lord Ganesha and Maa Tulja Bhavani",
        remedy:
          "Offer modak to Ganesha, visit Siddhivinayak Temple before travel",
      },
      tamil: {
        canTravel: true,
        insight:
          "கடவுள் அருள்! Your horoscope reveals Lord Murugan's divine guidance for foreign success. Like the ancient Tamil traders who sailed to Southeast Asia, your birth chart shows natural inclination for international commerce. Your Ketu placement suggests spiritual growth through foreign experiences, following the path of Tamil saints.",
        timing:
          "Auspicious period for foreign settlement between ages 32-38, especially during Thai month",
        reason:
          "Venus in 12th house creates strong foreign connections. Your Tamil cultural wisdom will be your strength abroad",
        countries: ["Singapore 🇸🇬", "Malaysia 🇲🇾", "Australia 🇦🇺", "USA 🇺🇸"],
        deity: "Lord Murugan and Goddess Meenakshi",
        remedy:
          "Visit Palani Temple, offer vel to Lord Murugan for safe journey",
      },
      telugu: {
        canTravel: false,
        insight:
          "Sri Venkateswara Swamy's blessings show your prosperity lies in serving your motherland. Like the great Telugu kings who built empires at home, your Saturn placement indicates success through local ventures and family business. Your strong 4th house suggests building your kingdom in your homeland brings maximum fulfillment.",
        timing:
          "Short business trips abroad likely, but permanent settlement not in destiny",
        reason:
          "Powerful Moon-Jupiter conjunction in 4th house creates unbreakable bond with Telugu soil and family traditions",
        countries: ["Business trips to: USA 🇺🇸", "Singapore 🇸🇬"],
        deity: "Lord Venkateswara and Goddess Kanaka Durga",
        remedy:
          "Offer hair at Tirupati, light deepam at home for family prosperity",
      },
      kannada: {
        canTravel: true,
        insight:
          "ಶ್ರೀ ಚಾಮುಂಡೇಶ್ವರಿ ದೇವಿಯ ಆಶೀರ್ವಾದ! Your birth chart shows Goddess Chamundeshwari's blessings for international achievements. Like Bangalore's global IT reputation, your Mercury placement shows technology and innovation will be your gateway to foreign success. Your cultural values will make you a bridge between East and West.",
        timing:
          "Foreign opportunities peak during Dussehra season, ideal age 29-34",
        reason:
          "Rahu in 6th house removes foreign travel obstacles, Jupiter aspects show guru's guidance in foreign land",
        countries: ["USA 🇺🇸", "Canada 🇨🇦", "Australia 🇦🇺", "Germany 🇩🇪"],
        deity: "Goddess Chamundeshwari and Sri Krishna",
        remedy: "Visit Chamundi Hills, offer coconut to Devi before journey",
      },
      malayalam: {
        canTravel: true,
        insight:
          "ഓം നമഃ ശിവായ! Lord Ayyappa's divine protection guides your foreign journey. Like Kerala's historic spice traders who connected with the world, your birth chart reveals natural ability for international business. Your spiritual depth and Kerala's global connections through Gulf countries show promising overseas prospects.",
        timing:
          "Sabarimala season brings foreign opportunities, best between ages 31-36",
        reason:
          "Jupiter in 9th house with Moon's blessing creates favorable conditions for Gulf countries and Western nations",
        countries: ["UAE 🇦🇪", "Saudi Arabia 🇸🇦", "USA 🇺🇸", "Australia 🇦🇺"],
        deity: "Lord Ayyappa and Goddess Bhagavathy",
        remedy:
          "Complete Sabarimala pilgrimage, light lamp at Devi temple for safe travels",
      },
    };

    return regionalInsights[region] || regionalInsights["hindi"];
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (
      !formData.fullName ||
      !formData.dateOfBirth ||
      !formData.timeOfBirth ||
      !formData.placeOfBirth
    ) {
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const result = generateCulturalResults(
        formData.fullName,
        formData.placeOfBirth
      );
      const region = getRegionalContext(formData.placeOfBirth);
      const greeting = culturalGreetings[region];

      setResults({
        ...result,
        firstName: formData.fullName.split(" ")[0],
        region: region,
        greeting: greeting,
      });
      setCurrentStep("results");
      setLoading(false);
    }, 3500);
  };

  const resetForm = () => {
    setCurrentStep("form");
    setFormData({
      fullName: "",
      dateOfBirth: "",
      timeOfBirth: "",
      placeOfBirth: "",
      preferredLanguage: "hindi",
    });
    setResults(null);
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Cultural Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Om symbols and cultural patterns */}
        <div className="absolute top-10 left-10 text-6xl text-orange-600  font-bold">
          ॐ
        </div>

        {/* Constellation Stars with Indian touch */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-pulse opacity-70"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {currentStep === "form" && (
          <div className="max-w-2xl mx-auto">
            {/* Enhanced Cultural Header */}
            <div className="text-center mt-8 mb-12">
              <div className="relative inline-block mb-6">
                <h1 className="text-xl md:text-xl font-bold bg-gradient-to-r from-orange-700 via-yellow-400 to-red-400 bg-clip-text text-transparent mb-2">
                  विदेश यात्रा
                </h1>
                <h2 className="text-2xl md:text-3xl font-semibold text-yellow-600 mb-4">
                  Foreign Travel Destiny Checker
                </h2>
                <div className="absolute -top-2 -right-2">
                  <Sparkles className="w-8 h-8 text-yellow-500 animate-spin" />
                </div>
              </div>
              <p className="text-xl text-orange-600 mb-2">
                “Some souls are born to wander beyond borders — written in
                stars, destined in numbers.”{" "}
              </p>

              <p className="text-yellow-600 font-semibold mt-4">
                आपका विदेश भाग्य भी जानिए पुराने ज्योतिष शास्त्र से!
              </p>

              {/* Cultural decorative elements */}
              <div className="flex justify-center items-center gap-4 mt-6">
                <div className="w-12 h-px bg-gradient-to-r from-transparent to-orange-400"></div>
                <span className="text-2xl">🙏</span>
                <Plane className="w-6 h-6 text-yellow-400 animate-bounce" />
                <span className="text-2xl">🕉️</span>
                <div className="w-12 h-px bg-gradient-to-r from-orange-400 to-transparent"></div>
              </div>
            </div>

            {/* Enhanced Cultural Form */}
            <div className="bg-gradient-to-br from-yellow-300 to-red-300 backdrop-blur-lg rounded-3xl p-8 border-2 border-yellow-400 shadow-2xl">
              <div className="space-y-6">
                {/* Full Name with cultural context */}
                <div className="group">
                  <label className=" text-black text-sm font-semibold mb-2 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    पूरा नाम / Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) =>
                      handleInputChange("fullName", e.target.value)
                    }
                    className="w-full px-4 py-4 bg-yellow-200 border-2 border-orange-400 rounded-2xl text-black placeholder-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300 backdrop-blur-sm"
                    placeholder="name"
                    required
                  />
                </div>

                {/* Date of Birth */}
                <div className="group">
                  <label className=" text-black text-sm font-semibold mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    जन्म तिथि / Date of Birth
                  </label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) =>
                      handleInputChange("dateOfBirth", e.target.value)
                    }
                    className="w-full px-4 py-4 bg-yellow-200 border-2 border-orange-400 rounded-2xl text-black placeholder-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300 backdrop-blur-sm"
                    required
                  />
                </div>

                {/* Time of Birth */}
                <div className="group">
                  <label className=" text-balck text-sm font-semibold mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    जन्म समय / Time of Birth
                  </label>
                  <input
                    type="time"
                    value={formData.timeOfBirth}
                    onChange={(e) =>
                      handleInputChange("timeOfBirth", e.target.value)
                    }
                    className="w-full px-4 py-4 bg-yellow-200 border-2 border-orange-400 rounded-2xl text-black placeholder-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300 backdrop-blur-sm"
                    required
                  />
                </div>

                {/* Place of Birth with regional cities */}
                <div className="group">
                  <label className=" text-balck text-sm font-semibold mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    जन्म स्थान / Place of Birth
                  </label>
                  <select
                    value={formData.placeOfBirth}
                    onChange={(e) =>
                      handleInputChange("placeOfBirth", e.target.value)
                    }
                    className="w-full px-4 py-4 bg-yellow-200 border-2 border-orange-400 rounded-2xl text-black placeholder-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300 backdrop-blur-sm"
                    required
                  >
                    <option value="" className="bg-orange-900">
                      Select your city
                    </option>
                    <optgroup
                      label="🇮🇳 Punjab - ਪੰਜਾਬ"
                      className="bg-orange-900"
                    >
                      {cities
                        .filter((city) => city.includes("Punjab"))
                        .map((city) => (
                          <option
                            key={city}
                            value={city}
                            className="bg-orange-900"
                          >
                            {city}
                          </option>
                        ))}
                    </optgroup>
                    <optgroup
                      label="🇮🇳 Maharashtra - महाराष्ट्र"
                      className="bg-orange-900"
                    >
                      {cities
                        .filter((city) => city.includes("Maharashtra"))
                        .map((city) => (
                          <option
                            key={city}
                            value={city}
                            className="bg-orange-900"
                          >
                            {city}
                          </option>
                        ))}
                    </optgroup>
                    <optgroup
                      label="🇮🇳 South India - दक्षिण भारत"
                      className="bg-orange-900"
                    >
                      {cities
                        .filter(
                          (city) =>
                            !city.includes("Punjab") &&
                            !city.includes("Maharashtra")
                        )
                        .map((city) => (
                          <option
                            key={city}
                            value={city}
                            className="bg-orange-900"
                          >
                            {city}
                          </option>
                        ))}
                    </optgroup>
                  </select>
                </div>

                {/* Cultural Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 text-white font-bold py-4 px-8 rounded-2xl hover:from-orange-600 hover:via-red-600 hover:to-yellow-600 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-2xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-yellow-400/50"
                >
                  {loading ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Consulting Ancient Wisdom...
                    </>
                  ) : (
                    <>
                      <span className="text-2xl">🙏</span>
                      Decode My Destiny
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {currentStep === "results" && results && (
          <div className="max-w-5xl mx-auto">
            {/* Cultural Results Header */}
            <div className="text-center mb-12">
              <div className="text-3xl mb-4">{results.greeting?.greeting}</div>
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
                {results.firstName} जी, {results.greeting?.meaning}! ✨
              </h1>
              <p className="text-orange-600 text-lg">
                आपकी जन्म कुंडली का रहस्य खुल गया है...
              </p>
              <p className="text-yellow-500 text-lg">
                Your cosmic blueprint has been revealed...
              </p>
            </div>
            {/* Main Cultural Result Card */}
            <div className="bg-yellow-100 backdrop-blur-lg rounded-3xl p-8 border-2 border-yellow-400 shadow-2xl mb-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-6 mb-6">
                  {results.canTravel ? (
                    <CheckCircle className="w-20 h-20 text-green-400" />
                  ) : (
                    <Home className="w-20 h-20 text-orange-800" />
                  )}
                  <div>
                    <h2 className="text-3xl font-bold text-black mb-2">
                      {results.canTravel
                        ? "हाँ! विदेश यात्रा लिखी है भाग्य में"
                        : "स्वदेश में ही मिलेगी सफलता"}
                    </h2>
                    <h3 className="text-2xl font-semibold text-yellow-300">
                      {results.canTravel
                        ? "YES! Foreign Journey Awaits"
                        : "Success Lies in Motherland"}
                    </h3>
                    <p className="text-orange-800 mt-2">
                      {results.deity} का आशीर्वाद आप पर है
                    </p>
                  </div>
                </div>
              </div>

              {/* Cultural Detailed Insights */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-orange-300 rounded-2xl p-6 border border-yellow-400/20">
                    <h3 className="text-xl font-semibold text-black mb-3 flex items-center gap-2">
                      <Sun className="w-5 h-5" />
                      Astrological Analysis
                    </h3>
                    <p className="text-black leading-relaxed">
                      {results.insight}
                    </p>
                  </div>

                  <div className="bg-orange-300 rounded-2xl p-6 border border-yellow-400/20">
                    <h3 className="text-xl font-semibold text-pink-700 mb-3 flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      शुभ समय / Divine Timing
                    </h3>
                    <p className="text-orange-100">{results.timing}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-orange-300 rounded-2xl p-6 border border-yellow-400/20">
                    <h3 className="text-xl font-semibold text-blue-400 mb-3 flex items-center gap-2">
                      <Zap className="w-5 h-5" />
                      कारण / Astrological Reason
                    </h3>
                    <p className="text-balck">{results.reason}</p>
                  </div>

                  <div className="bg-orange-300 rounded-2xl p-6 border border-yellow-400/20">
                    <h3 className="text-xl font-semibold text-green-400 mb-3 flex items-center gap-2">
                      <Globe className="w-5 h-5" />
                      अनुकूल देश / Favorable Countries
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {results.countries.map((country) => (
                        <span
                          key={country}
                          className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold border border-yellow-400/30"
                        >
                          {country}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-orange-300 rounded-2xl p-6 border border-yellow-400/20">
                    <h3 className="text-xl font-semibold text-purple-400 mb-3 flex items-center gap-2">
                      <Crown className="w-5 h-5" />
                      उपाय / Remedies
                    </h3>
                    <p className="text-balck">{results.remedy}</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Cultural Call to Actions */}
            <div className="grid md:grid-cols-1 gap-6 mb-8">
              <button className="bg-gradient-to-r from-green-600 to-emerald-700 text-white font-bold py-4 px-8 rounded-2xl hover:from-green-700 hover:to-emerald-800 transform hover:scale-[1.02] transition-all duration-300 shadow-lg flex items-center justify-center gap-3 border-2 border-green-400/30">
                <Phone className="w-5 h-5" />
                <span>
                  <div>पंडित जी से बात करें</div>
                  <div className="text-sm opacity-90">
                    Talk to Expert Astrologer
                  </div>
                </span>
              </button>
            </div>
            \{" "}
            <div className="text-center">
              <button
                onClick={resetForm}
                className="bg-yellow-300 text-black font-semibold py-3 px-6 rounded-2xl hover:bg-orange-500 transition-all duration-300 border-2 border-orange-400/30"
              >
                Back to form
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForeignTravel;
