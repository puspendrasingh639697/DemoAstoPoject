import React, { useState } from "react";
import {
  BookOpen,
  Leaf,
  Sparkles,
  Droplet,
  Sun,
  Star,
  ArrowRight,
} from "lucide-react";

const PitriPakshaImportance = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-4">
      <section className="relative max-w-6xl mx-auto bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-amber-100 transform transition-all duration-700 hover:shadow-3xl">
        {/* Decorative top border */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
          <Sparkles
            className="w-10 h-10 text-white animate-spin"
            style={{ animationDuration: "3s" }}
          />
        </div>

        {/* Header with enhanced animation */}
        <div className="text-center mb-12 pt-6">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-amber-800 via-orange-700 to-amber-900 bg-clip-text text-transparent mb-4 transform transition-all duration-500 hover:scale-105">
            <BookOpen className="inline w-12 h-12 text-amber-700 mr-4 animate-pulse" />
            Scriptural Importance
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto rounded-full animate-pulse"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 text-lg text-gray-700">
          {/* Gaya Ji Card */}
          <div
            className="group relative overflow-hidden"
            onMouseEnter={() => setHoveredCard("gaya")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl shadow-lg border border-green-100 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:-translate-y-2">
              {/* Decorative corner elements */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-green-200 to-transparent rounded-bl-full opacity-30"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-emerald-200 to-transparent rounded-tr-full opacity-30"></div>

              <h3 className="text-3xl font-bold text-emerald-800 mb-6 flex items-center gap-3 group-hover:text-emerald-600 transition-colors duration-300">
                <Leaf
                  className={`w-8 h-8 text-emerald-600 transition-all duration-500 ${
                    hoveredCard === "gaya" ? "animate-bounce" : ""
                  }`}
                />
                Gaya Ji Significance
              </h3>

              <ul className="space-y-6">
                {[
                  {
                    text: "Mentioned in Puranas (like Vayu, Garuda, and Padma Purana): Performing Shradh in Gaya leads to salvation (moksha) for the departed soul, even if they committed grave sins.",
                  },
                  {
                    text: "Lord Vishnu himself is said to have granted this boon after killing demon Gayasura, whose body became the sacred land of Gaya.",
                  },
                  {
                    text: "Akshay Vat Tree & Vishnupad Temple: Performing Pind Daan under the Akshay Vat (Eternal Banyan Tree) grants eternal peace to ancestors. Vishnupad Temple is said to have Lord Vishnu's footprint — a cosmic mark where rituals take maximum spiritual effect.",
                    highlight: "Akshay Vat Tree & Vishnupad Temple:",
                  },
                  {
                    text: "Ancestral Link to Lord Rama: Lord Rama performed Pind Daan here for his father Dasharatha, setting the precedent for future generations.",
                    highlight: "Ancestral Link to Lord Rama:",
                  },
                ].map((item, index) => (
                  <li
                    key={index}
                    className="relative pl-6 pr-4 py-3 rounded-lg transition-all duration-300 hover:bg-white/60 hover:shadow-md hover:transform hover:translate-x-2 cursor-pointer group/item"
                  >
                    <div className="absolute left-0 top-4 w-3 h-3 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full transform transition-all duration-300 group-hover/item:scale-125 group-hover/item:animate-pulse"></div>
                    <span className="text-gray-700 leading-relaxed">
                      {item.highlight && (
                        <span className="font-bold text-emerald-700 transition-colors duration-300 group-hover/item:text-emerald-600">
                          {item.highlight}
                        </span>
                      )}
                      {item.text.replace(item.highlight || "", "")}
                    </span>
                    <ArrowRight className="absolute right-2 top-4 w-4 h-4 text-emerald-400 opacity-0 transform translate-x-2 transition-all duration-300 group-hover/item:opacity-100 group-hover/item:translate-x-0" />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Varanasi Card */}
          <div
            className="group relative overflow-hidden"
            onMouseEnter={() => setHoveredCard("varanasi")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl shadow-lg border border-blue-100 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:-translate-y-2">
              {/* Decorative corner elements */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-200 to-transparent rounded-bl-full opacity-30"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-cyan-200 to-transparent rounded-tr-full opacity-30"></div>

              <h3 className="text-3xl font-bold text-cyan-800 mb-6 flex items-center gap-3 group-hover:text-cyan-600 transition-colors duration-300">
                <Droplet
                  className={`w-8 h-8 text-cyan-600 transition-all duration-500 ${
                    hoveredCard === "varanasi" ? "animate-bounce" : ""
                  }`}
                />
                Why Varanasi (Kashi) is Equally Powerful
              </h3>

              <ul className="space-y-6">
                {[
                  {
                    text: "City of Liberation (Moksha Puri): It's believed that dying or performing rituals in Kashi grants instant moksha. Lord Shiva whispers Taraka Mantra into the ears of the dying — freeing them from the cycle of rebirth.",
                    highlight: "City of Liberation (Moksha Puri):",
                  },
                  {
                    text: "Manikarnika & Harishchandra Ghats: Performing Shradh or immersing ashes in the Ganga at these ghats ensures the highest spiritual liberation. The Ganga is considered the purest, and Shradh here washes off karmic burdens of generations.",
                    highlight: "Manikarnika & Harishchandra Ghats:",
                  },
                  {
                    text: "Spiritual Environment: Surrounded by constant Vedic chants, cremation fires, and sadhus, Kashi offers unmatched spiritual vibration during Pitri Paksha.",
                    highlight: "Spiritual Environment:",
                  },
                ].map((item, index) => (
                  <li
                    key={index}
                    className="relative pl-6 pr-4 py-3 rounded-lg transition-all duration-300 hover:bg-white/60 hover:shadow-md hover:transform hover:translate-x-2 cursor-pointer group/item"
                  >
                    <div className="absolute left-0 top-4 w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transform transition-all duration-300 group-hover/item:scale-125 group-hover/item:animate-pulse"></div>
                    <span className="text-gray-700 leading-relaxed">
                      {item.highlight && (
                        <span className="font-bold text-cyan-700 transition-colors duration-300 group-hover/item:text-cyan-600">
                          {item.highlight}
                        </span>
                      )}
                      {item.text.replace(item.highlight || "", "")}
                    </span>
                    <ArrowRight className="absolute right-2 top-4 w-4 h-4 text-cyan-400 opacity-0 transform translate-x-2 transition-all duration-300 group-hover/item:opacity-100 group-hover/item:translate-x-0" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Floating action elements */}
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
          <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full shadow-lg animate-pulse"></div>
          <div
            className="w-6 h-6 bg-gradient-to-r from-orange-400 to-red-500 rounded-full shadow-lg animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="w-4 h-4 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full shadow-lg animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>
      </section>

      {/* Additional floating decorative elements */}
      <div className="absolute top-20 right-10 opacity-30">
        <Star className="w-8 h-8 text-amber-400 animate-pulse" />
      </div>
      <div className="absolute bottom-32 left-16 opacity-20">
        <Sun
          className="w-10 h-10 text-orange-400 animate-spin"
          style={{ animationDuration: "8s" }}
        />
      </div>
    </div>
  );
};

export default PitriPakshaImportance;
