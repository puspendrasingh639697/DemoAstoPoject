import { useState, useRef } from "react";
const examTypes = ["UPSC", "SSC/Banking", "NEET", "JEE", "PCS", "Others"];

const motivationalQuotes = [
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "The future belongs to those who believe in the beauty of their dreams.",
  "Your limitation—it's only your imagination.",
  "Great things never come from comfort zones.",
  "Dream it. Wish it. Do it.",
];

export default function CareerProbabilityPredictor() {
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    timeOfBirth: "",
    placeOfBirth: "",
    examType: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [probability, setProbability] = useState(0);
  const [quote, setQuote] = useState("");
  const resultRef = useRef(null);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleExamTypeSelect = (examType) => {
    setFormData((prev) => ({ ...prev, examType }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setShowResult(false);

    await new Promise((resolve) => setTimeout(resolve, 3000));

    const randomProbability = Math.floor(Math.random() * 26) + 70;
    setProbability(randomProbability);

    const randomQuote =
      motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    setQuote(randomQuote);
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
    setIsLoading(false);
    setShowResult(true);
  };

  const resetForm = () => {
    setShowResult(false);
    setProbability(0);
    setFormData({
      fullName: "",
      dateOfBirth: "",
      timeOfBirth: "",
      placeOfBirth: "",
      examType: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#f4e4bf] relative overflow-hidden">
      {/* Enhanced Background Elements */}

      {/* Full Width Hero Section */}
      <div className="relative w-full animate-fade-in-up">
        <div className="backdrop-blur-xl bg-yellow-400 border-y border-white/50 overflow-hidden">
          {/* Hero Content Container */}
          <div className="relative z-10 max-w-6xl mx-auto py-2 text-center">
            {/* Main Title */}
            <h1 className="text-4xl md:text-4xl font-bold text-black m-3 drop-shadow-lg leading-tight">
              Career Predictor
            </h1>

            {/* Subtitle */}
            <p className="text-2xl md:text-3xl text-red-800 font-semibold mb-4">
              ✨ Unlock Your Future Success ✨
            </p>

            {/* Description */}
            <p className="text-xl text-red-700 max-w-4xl mx-auto leading-relaxed mb-4">
              Discover your probability of success in competitive exams through
              the ancient wisdom of astrology. Get personalized insights based
              on your birth details and chosen career path.
            </p>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
              <div className="flex flex-col items-center p-6 bg-yellow-100 rounded-2xl backdrop-blur-sm border border-yellow-500 hover:bg-orange-200 transition-all duration-300 transform hover:scale-105">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="font-bold text-amber-800 mb-2 text-lg">
                  Accurate Predictions
                </h3>
                <p className="text-amber-600 text-center">
                  Based on astrological calculations
                </p>
              </div>

              <div className="flex flex-col items-center p-6 bg-yellow-100 rounded-2xl backdrop-blur-sm border border-yellow-500 hover:bg-orange-200 transition-all duration-300 transform hover:scale-105">
                <div className="text-4xl mb-4">📚</div>
                <h3 className="font-bold text-amber-800 mb-2 text-lg">
                  Multiple Exams
                </h3>
                <p className="text-amber-600 text-center">
                  UPSC, NEET, JEE, SSC & more
                </p>
              </div>

              <div className="flex flex-col items-center p-6 bg-yellow-100 rounded-2xl backdrop-blur-sm border border-yellow-500 hover:bg-orange-200 transition-all duration-300 transform hover:scale-105">
                <div className="text-4xl mb-4">💫</div>
                <h3 className="font-bold text-amber-800 mb-2 text-lg">
                  Instant Results
                </h3>
                <p className="text-amber-600 text-center">
                  Get your prediction in seconds
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="inline-flex items-center space-x-2 bg-red-400 px-8 py-4 rounded-full border border-yellow-300/50 backdrop-blur-sm">
              <span className="text-black font-medium text-lg">
                👇 Start your journey below
              </span>
              <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section - Centered */}
      <div className="relative w-full flex items-center justify-center px-2 py-6">
        <div className="w-full max-w-5xl mx-auto space-y-8">
          {/* Enhanced Exam Type Selection */}
          <div className="animate-fade-in-up delay-100">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent mb-2">
                Select Your Exam Type
              </h2>
              <p className="text-black text-md">
                Choose the exam you want to predict
              </p>
            </div>
            <div className="grid grid-cols-3 gap-6 bg-yellow-400 rounded-2xl p-4">
              {examTypes.map((exam, index) => (
                <button
                  key={exam}
                  type="button"
                  onClick={() => handleExamTypeSelect(exam)}
                  className={`group relative px-6 py-5 rounded-2xl font-semibold text-sm transition-all duration-500 transform hover:scale-105 backdrop-blur-sm overflow-hidden ${
                    formData.examType === exam
                      ? "bg-gradient-to-r from-red-400 via-orange-400 to-red-400 text-white shadow-2xl scale-105 border-2 border-white/60"
                      : "bg-white/70 text-amber-800 border-2 border-amber-200 hover:bg-yellow-200 hover:shadow-xl hover:border-amber-300"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative z-10">
                    {exam}
                    {formData.examType === exam && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-pulse"></div>
                    )}
                  </div>
                  {formData.examType === exam && (
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-orange-400/20 to-red-400/20 animate-pulse"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Enhanced Form Card */}
          <div className="backdrop-blur-xl bg-white/80 rounded-3xl shadow-2xl border border-white/60 p-8 animate-fade-in-up delay-200 hover:shadow-3xl transition-all duration-700">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-amber-800 mb-2">
                Personal Details
              </h3>
              <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mx-auto"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="animate-fade-in-up delay-300">
                <label className="block text-amber-800 text-sm font-semibold mb-3 flex items-center">
                  <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-5 py-4 bg-white/60 border-2 border-amber-200 rounded-xl text-amber-900 placeholder-amber-500 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 hover:shadow-lg transition-all duration-300 font-medium"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="animate-fade-in-up delay-400">
                  <label className="block text-amber-800 text-sm font-semibold mb-3 flex items-center">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    required
                    className="w-full px-5 py-4 bg-white/60 border-2 border-amber-200 rounded-xl text-amber-900 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 hover:shadow-lg transition-all duration-300 font-medium"
                  />
                </div>

                <div className="animate-fade-in-up delay-500">
                  <label className="block text-amber-800 text-sm font-semibold mb-3 flex items-center">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
                    Time of Birth
                  </label>
                  <input
                    type="time"
                    name="timeOfBirth"
                    value={formData.timeOfBirth}
                    onChange={handleInputChange}
                    required
                    className="w-full px-5 py-4 bg-white/60 border-2 border-amber-200 rounded-xl text-amber-900 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 hover:shadow-lg transition-all duration-300 font-medium"
                  />
                </div>
              </div>

              <div className="animate-fade-in-up delay-600">
                <label className="block text-amber-800 text-sm font-semibold mb-3 flex items-center">
                  <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
                  Place of Birth
                </label>
                <input
                  type="text"
                  name="placeOfBirth"
                  value={formData.placeOfBirth}
                  onChange={handleInputChange}
                  required
                  className="w-full px-5 py-4 bg-white/60 border-2 border-amber-200 rounded-xl text-amber-900 placeholder-amber-500 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 hover:shadow-lg transition-all duration-300 font-medium"
                  placeholder="Enter your birth place"
                />
              </div>

              <div className="animate-fade-in-up delay-700">
                <button
                  type="submit"
                  disabled={isLoading || !formData.examType}
                  className="group relative w-full py-5 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 text-white font-bold text-lg rounded-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 focus:ring-4 focus:ring-orange-400/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden"
                >
                  <div className="relative z-10 flex items-center justify-center space-x-3">
                    {isLoading ? (
                      <>
                        <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Predicting Your Future...</span>
                      </>
                    ) : (
                      <>
                        <span> Predict Now</span>
                      </>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-red-500/20 group-hover:animate-pulse"></div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Full Width Results Section */}
      {showResult && (
        <div
          ref={resultRef}
          className="relative w-full py-16 px-4 animate-slide-up"
        >
          <div className="backdrop-blur-xl bg-gradient-to-br from-white/90 to-yellow-50/90 border-y border-white/60 overflow-hidden">
            {/* Decorative Elements for Results */}
            <div className="absolute top-8 left-8 w-12 h-12 bg-green-300/30 rounded-full animate-pulse"></div>
            <div className="absolute top-12 right-12 w-8 h-8 bg-emerald-300/40 rounded-full animate-pulse delay-500"></div>
            <div className="absolute bottom-10 left-12 w-6 h-6 bg-yellow-300/30 rounded-full animate-pulse delay-1000"></div>
            <div className="absolute bottom-8 right-8 w-14 h-14 bg-orange-200/20 rounded-full animate-pulse delay-700"></div>

            <div className="relative z-10 max-w-6xl mx-auto py-20 text-center space-y-12">
              {/* Celebration Header */}
              <div className="animate-bounce-in">
                <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
                  Your Prediction is Ready!
                </h2>
                <div className="w-32 h-2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full mx-auto"></div>
              </div>

              {/* Enhanced Circular Progress */}
              <div className="relative w-48 h-48 mx-auto animate-scale-in">
                <svg
                  className="w-48 h-48 transform -rotate-90"
                  viewBox="0 0 120 120"
                >
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="rgba(251, 191, 36, 0.2)"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="url(#gradient)"
                    strokeWidth="12"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${(probability / 100) * 314} 314`}
                    className="animate-draw-circle"
                  />
                  <defs>
                    <linearGradient
                      id="gradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#10B981" />
                      <stop offset="50%" stopColor="#F59E0B" />
                      <stop offset="100%" stopColor="#EF4444" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-600 bg-clip-text text-transparent animate-pulse">
                    {probability}%
                  </span>
                  <span className="text-sm text-amber-600 font-medium">
                    Success Rate
                  </span>
                </div>
              </div>

              {/* Result Text */}
              <div className="space-y-6 animate-fade-in-up delay-300">
                <h3 className="text-2xl md:text-3xl font-bold text-amber-800">
                  Your Probability to Clear{" "}
                  <span className="text-orange-600">{formData.examType}</span>{" "}
                  in{" "}
                  <span className="text-green-600">
                    {new Date().getFullYear()}
                  </span>{" "}
                  is:
                </h3>
                <div className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-yellow-500 via-yellow-500 to-orange-500 bg-clip-text text-transparent animate-pulse">
                  {probability}%
                </div>
                {probability >= 85 && (
                  <div className="text-4xl animate-bounce">
                    🌟 Excellent! 🌟
                  </div>
                )}
                {probability >= 75 && probability < 85 && (
                  <div className="text-4xl animate-bounce">
                    ⭐ Very Good! ⭐
                  </div>
                )}
                {probability < 75 && (
                  <div className="text-4xl animate-bounce">
                    💪 Keep Working! 💪
                  </div>
                )}
              </div>

              {/* Enhanced Content Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {/* Enhanced Motivational Quote */}
                <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-3xl p-8 border-2 border-yellow-200 animate-fade-in-up delay-400">
                  <div className="text-3xl mb-4">💭</div>
                  <h4 className="text-xl font-bold text-amber-800 mb-4">
                    Motivational Quote
                  </h4>
                  <p className="text-amber-800 italic text-lg leading-relaxed font-medium">
                    "{quote}"
                  </p>
                </div>

                {/* Enhanced Disclaimer */}
                <div className="bg-gradient-to-r from-amber-100 to-yellow-100 rounded-3xl p-8 border-2 border-amber-200 animate-fade-in-up delay-500">
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <span className="text-3xl">⚠️</span>
                    <span className="text-xl font-bold text-amber-800">
                      Important Note
                    </span>
                  </div>
                  <p className="text-amber-700 leading-relaxed">
                    Your actual success depends entirely on your dedication,
                    hard work, and preparation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes draw-circle {
          from {
            stroke-dasharray: 0 314;
          }
          to {
            stroke-dasharray: ${(probability / 100) * 314} 314;
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }

        .animate-bounce-in {
          animation: bounce-in 1s ease-out forwards;
        }

        .animate-scale-in {
          animation: scale-in 0.8s ease-out forwards;
        }

        .animate-draw-circle {
          animation: draw-circle 2s ease-in-out forwards;
        }

        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
        .delay-400 {
          animation-delay: 0.4s;
        }
        .delay-500 {
          animation-delay: 0.5s;
        }
        .delay-600 {
          animation-delay: 0.6s;
        }
        .delay-700 {
          animation-delay: 0.7s;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
}
