import { useState } from "react";
import { Plane, Train, Car, Church, Sparkles, Star } from "lucide-react";

const PitriPakshaJourney = () => {
  const [showFull, setShowFull] = useState(false);

  return (
    <section className="bg-orange-50 p-8 rounded-xl shadow-lg">
      <h2 className="text-4xl font-bold text-amber-900 mb-8 text-center flex items-center justify-center gap-3">
        <Plane className="w-9 h-9 text-amber-700" /> Pitri Paksha Spiritual
        Journey: Roadmap
      </h2>
      <p className="text-center text-lg text-gray-700 mb-10">
        "Following the footsteps of Lord Rama, from Gaya Ji to Kashi (Varanasi)"
      </p>

      <div className="relative border-l-4 border-amber-300 pl-8 space-y-12">
        {/* Start Point */}
        <div className="relative mb-12">
          <h3 className="text-2xl font-bold text-amber-900 mb-2">
            📍 START POINT: Arrival & Pickup
          </h3>
          <p className="text-lg text-gray-700 mb-4">
            Pickup Options Available From:
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-700">
            <li className="flex items-center gap-2 hover:text-amber-700 hover:scale-[1.01] transition">
              <Plane className="w-5 h-5 text-amber-600" />
              Gaya Airport / Patna Airport
            </li>
            <li className="flex items-center gap-2 hover:text-amber-700 hover:scale-[1.01] transition">
              <Train className="w-5 h-5 text-amber-600" />
              Gaya / Patna Railway Station
            </li>
            <li className="flex items-center gap-2 hover:text-amber-700 hover:scale-[1.01] transition">
              <Car className="w-5 h-5 text-amber-600" />
              On-road pickup from Varanasi, Ranchi, Bodhgaya, etc.
            </li>
          </ul>
          <p className="mt-4 text-gray-700 font-medium">
            ✅ Welcome Kit Includes: Tulsi mala, schedule card, water bottle,
            pandit contact
          </p>
        </div>
        {showFull && (
          <>
            {/* Day 1 */}
            <div className="relative mb-12">
              <h3 className="text-2xl font-bold text-amber-900 mb-2">
                🛏️ Day 1: Check-in & Rest in Gaya
              </h3>
              <ul className="list-disc list-inside ml-4 text-lg text-gray-700 space-y-2">
                <li className="hover:text-amber-700 hover:scale-[1.01] transition">
                  Comfortable AC/Non-AC accommodation
                </li>
                <li className="hover:text-amber-700 hover:scale-[1.01] transition">
                  Walking distance or cab facility to major temples
                </li>
                <li className="hover:text-amber-700 hover:scale-[1.01] transition">
                  Freshen up with Satvik welcome drink and lunch
                </li>
              </ul>
            </div>


            {/* Day 2 */}
            <div className="relative mb-12">
              <h3 className="text-2xl font-bold text-amber-900 mb-2">
                🙏 Day 2: Gaya Ji Rituals — Shradh Begins
              </h3>
              <div className="space-y-4 text-lg text-gray-700">
                <p className="font-semibold flex items-center gap-2 hover:text-amber-700 hover:scale-[1.01] transition">
                  <Church className="w-5 h-5 text-amber-600" />
                  1. Vishnupad Mandir Darshan
                </p>
                <ul className="list-disc list-inside ml-8 space-y-1">
                  <li>Darshan of Lord Vishnu's footprint</li>
                  <li>Pandit briefing about Pitru Tarpan procedure</li>
                  <li>Offer deepdaan for peace of ancestors</li>
                </ul>

                <p className="font-semibold flex items-center gap-2 hover:text-amber-700 hover:scale-[1.01] transition">
                  <Sparkles className="w-5 h-5 text-amber-600" />
                  2. Pind Daan Rituals at Key Points
                </p>
                <ul className="list-disc list-inside ml-8 space-y-1">
                  <li>Akshay Vat Tree</li>
                  <li>Falgu River</li>
                  <li>Sita Kund</li>
                  <li>Ram Shila</li>
                  <li>Gaya Shradh Bhoomi</li>
                </ul>

                <p className="mt-4 font-medium">
                  🛕 Priest Arranged with Gotra, Samagri, and Slokas
                </p>
                <p className="font-medium">
                  🍛 Satvik Bhojan prepared by Brahmins
                </p>
              </div>
            </div>

            {/* Day 3 */}
            <div className="relative mb-12">
              <h3 className="text-2xl font-bold text-amber-900 mb-2">
                🚌 Day 3: Travel from Gaya to Varanasi (Kashi)
              </h3>
              <ul className="list-disc list-inside ml-4 text-lg text-gray-700 space-y-2">
                <li>~250 km | Travel Time: 5–6 hours</li>
                <li>AC vehicle, Satvik lunch & tea on arrival</li>
                <li>Check-in at Ganga-facing guesthouse</li>
              </ul>
            </div>

            {/* Day 4 */}
            <div className="relative mb-12">
              <h3 className="text-2xl font-bold text-amber-900 mb-2">
                🌊 Day 4: Varanasi Shradh & Darshan
              </h3>
              <div className="space-y-4 text-lg text-gray-700">
                <p className="font-semibold flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-600" />
                  1. Pind Daan at Pisach Mochan Kund
                </p>
                <ul className="list-disc list-inside ml-8 space-y-1">
                  <li>Sacred for soul liberation</li>
                  <li>Linked to Lord Vishnu</li>
                  <li>Moksha mantras & Tarpan</li>
                </ul>

                <p className="font-semibold flex items-center gap-2">
                  <Church className="w-5 h-5 text-amber-600" />
                  2. Darshan & Closing Blessings
                </p>
                <ul className="list-disc list-inside ml-8 space-y-1">
                  <li>Kashi Vishwanath Temple</li>
                  <li>Annapurna Devi Mandir</li>
                </ul>

                <p className="mt-4 font-medium">🚣 Ganga Aarti (Optional)</p>
                <p className="font-medium">🎁 Yatra Samapan</p>
              </div>
            </div>
          </>
        )}

        {/* Toggle Button */}
        <div className="text-center">
          <button
            onClick={() => setShowFull(!showFull)}
            className="mt-4 inline-block px-6 py-2 bg-yellow-400 text-white rounded-md shadow hover:bg-yellow-300 transition"
          >
            {showFull ? "Show Less ▲" : "Show More ▼"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default PitriPakshaJourney;
