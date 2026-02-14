import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Check, Users, MapPin, Sparkles } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const PitriPakshaDetail = () => {
  return (
    <div className="bg-gradient-to-br from-yellow-50 via-white to-yellow-100 py-12 px-6 md:px-16 space-y-16">
      {/* Section 1: What is Pitri Paksha */}
      <motion.section
        {...fadeInUp}
        viewport={{ once: true }}
        className="grid md:grid-cols-2 gap-12 items-center p-8 rounded-2xl shadow-xl border border-yellow-200 bg-white/40 backdrop-blur-xl"
      >
        <div className="space-y-5">
          <h2 className="text-4xl font-bold text-amber-900 flex items-center gap-3">
            <BookOpen className="w-9 h-9 text-amber-700" />
            What is Pitri Paksha?
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Pitri Paksha is a sacred 16-day period dedicated to honoring one's
            ancestors through Shradh rituals. Performing Shradh during this time
            is believed to provide peace to departed souls and bring blessings
            to the family.
          </p>
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="rounded-xl overflow-hidden shadow-lg"
        >
          <img
            src="data:image/jpeg;base64,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"
            alt="Pitri Paksha"
            className="w-full h-80 object-cover"
          />
        </motion.div>
      </motion.section>

      {/* Section 2: Benefits & Who Can Perform */}
      <motion.div
        {...fadeInUp}
        viewport={{ once: true }}
        className="grid md:grid-cols-2 gap-10"
      >
        {/* Benefits */}
        <div className="bg-white/60 border border-yellow-200 rounded-2xl p-6 shadow-xl backdrop-blur-md">
          <h3 className="text-3xl font-bold text-yellow-600 mb-4 flex items-center gap-3">
            <Sparkles className="w-7 h-7 text-amber-700" />
            Benefits of Shradh
          </h3>
          <ul className="space-y-3">
            {[
              "Brings peace to ancestral souls",
              "Clears ancestral karma (Pitru Dosh)",
              "Ensures family harmony and prosperity",
              "Aids spiritual upliftment and moksha",
              "Helps solve family or financial issues",
            ].map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-3 hover:bg-yellow-100 transition p-3 rounded-lg"
              >
                <Check className="text-green-600 mt-1 w-5 h-5" />
                <span className="text-gray-800">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Who Can Perform */}
        <div className="bg-white/60 border border-yellow-200 rounded-2xl p-6 shadow-xl backdrop-blur-md">
          <h3 className="text-3xl font-bold text-yellow-600 mb-4 flex items-center gap-3">
            <Users className="w-7 h-7 text-amber-700" />
            Who Can Perform Shradh?
          </h3>
          <ul className="space-y-3">
            {[
              "Any family member (preferably eldest son)",
              "Women (if they are the only descendants)",
              "If no family, a qualified Pandit can perform on your behalf",
            ].map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-3 hover:bg-yellow-100 transition p-3 rounded-lg"
              >
                <Check className="text-green-600 mt-1 w-5 h-5" />
                <span className="text-gray-800">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Section 3: Where You Can Perform Shradh */}
      <motion.section
        {...fadeInUp}
        viewport={{ once: true }}
        className="bg-white/60 p-6 md:p-10 rounded-2xl border border-yellow-200 shadow-xl backdrop-blur-md"
      >
        <h2 className="text-4xl font-bold text-amber-900 mb-6 text-center flex items-center justify-center gap-3">
          <MapPin className="w-8 h-8 text-amber-700" />
          Where You Can Perform Shradh
        </h2>
        <p className="text-center text-gray-700 mb-10 text-lg">
          We offer guided Shradh services in the most spiritually potent places:
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Gaya Ji */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="transition rounded-xl overflow-hidden shadow-lg bg-yellow-50 hover:bg-yellow-100"
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_Ju-cpb1zsCS2jA8NvxQ8OAfrhiNjMINhpi92ge5_w9PxvZoEWvXuLSYINDc2R4t2h7M&usqp=CAU"
              alt="Gaya"
              className="w-full h-48 object-cover"
            />
            <div className="p-5 space-y-2">
              <h4 className="text-xl font-semibold text-yellow-700">
                Gaya Ji (Bihar)
              </h4>
              <p className="text-sm text-gray-700">
                Sacred for Pind Daan; performing Shradh here grants moksha.
              </p>
              <p className="font-semibold text-sm text-gray-800">Key Sites:</p>
              <ul className="list-disc list-inside ml-4 text-sm text-gray-700">
                <li>Vishnupad Temple</li>
                <li>Akshay Vat Tree</li>
                <li>Falgu River</li>
              </ul>
            </div>
          </motion.div>

          {/* Varanasi */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="transition rounded-xl overflow-hidden shadow-lg bg-yellow-50 hover:bg-yellow-100"
          >
            <img
              src="https://www.krishnayangauraksha.org/new-assets/images/shradh/1.webp"
              alt="Varanasi"
              className="w-full h-48 object-cover"
            />
            <div className="p-5 space-y-2">
              <h4 className="text-xl font-semibold text-yellow-700">
                Varanasi (Kashi)
              </h4>
              <p className="text-sm text-gray-700">
                Moksha Bhoomi – Ganga Shradh & Brahmin Bhoj are especially
                powerful.
              </p>
              <p className="font-semibold text-sm text-gray-800">Key Sites:</p>
              <ul className="list-disc list-inside ml-4 text-sm text-gray-700">
                <li>Manikarnika & Harishchandra Ghats</li>
                <li>Kashi Vishwanath Temple</li>
                <li>Pisach Mochan Kund</li>
              </ul>
            </div>
          </motion.div>
        </div>

        <p className="text-center text-lg text-gray-800 mt-10">
          🛕 You can also opt for combined pilgrim routes from Gaya to Kashi for
          enhanced ritual benefits.
        </p>
      </motion.section>
    </div>
  );
};

export default PitriPakshaDetail;
