import React from "react";
import image from "../assets/image/lagnakundliimage.png";

const KundliGuide = () => {
  return (
    <div className="text-gray-800">
      {/* Full-width Heading */}
      <div className="w-full  px-4 py-10">
        <div className="">
          <h1 className="text-4xl flex justify-center items-center  sm:text-4xl font-bold text-center lg:text-left mb-6">
            How to Read Your Kundli (Step-by-Step)
          </h1>
          <p className="text-lg text-center lg:text-left flex justify-center items-center">
            Your birth chart isn’t written in stone — it’s written in stars. And
            it speaks. Let’s teach you how to listen.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="px-4 py-10 max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
        {/* Left Content */}
        <div className="w-full lg:w-2/3 space-y-10">
          {/* Step 1 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              Step 1: Locate the Lagna (Ascendant)
            </h2>
            <p className="text-base leading-relaxed">
              This is the starting point of your Kundli — the 1st house, marked
              as Lagna. It tells you how you appear to the world, your
              personality traits, energy, and the lens through which you see
              life. Think of it as your “astrological mask” — what people see
              first, before getting to know the real you.
            </p>
          </section>

          {/* 12 Houses */}
          <section>
            <h2 className="text-2xl  font-semibold mb-4">
              Understand the 12 Houses
            </h2>
            <p className="text-base mb-4">
              Your Kundli has 12 boxes — each representing a house (Bhava).
              These houses cover every part of your life:
            </p>
            <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 list-disc list-inside text-sm sm:text-base">
              <li>Self & Body</li>
              <li>Wealth & Family</li>
              <li>Communication</li>
              <li>Home & Emotions</li>
              <li>Creativity & Children</li>
              <li>Health & Enemies</li>
              <li>Marriage & Partnerships</li>
              <li>Transformation & Secrets</li>
              <li>Luck & Higher Learning</li>
              <li>Career & Social Status</li>
              <li>Gains & Dreams</li>
              <li>Moksha & Isolation</li>
            </ul>
            <p className="mt-4 text-base">
              The house a planet sits in activates that area of your life.
            </p>
          </section>

          {/* Planets */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              Decode the Planets (Grahas)
            </h2>
            <p className="text-base mb-4">
              The 9 Vedic planets include: Sun, Moon, Mercury, Venus, Mars,
              Jupiter, Saturn, Rahu, Ketu. Each has a role to play:
            </p>
            <div className="bg-yellow-100 p-4 rounded-lg space-y-2 text-sm sm:text-base">
              <p>
                <strong>Mars in Aries:</strong> Bold, confident
              </p>
              <p>
                <strong>Mars in Cancer:</strong> Defensive, passive-aggressive
              </p>
              <p>
                <strong>Venus in Taurus:</strong> Sensual, stable in love
              </p>
              <p>
                <strong>Venus in Aquarius:</strong> Quirky, unconventional
              </p>
            </div>
            <p className="mt-4 text-base">
              The zodiac is like the costume the planet wears.
            </p>
          </section>

          {/* Dasha System */}
          <section>
            <h2 className="text-2xl  font-semibold mb-4">
              Timing is Everything — The Dasha System
            </h2>
            <p className="text-base mb-4">
              Your Kundli isn’t just a static chart. It changes as time flows.
              Mahadasha and Antardasha are planetary periods that shape major
              phases of your life — think of them as “cosmic seasons.” Knowing
              what Dasha you’re in right now can explain:
            </p>
            <ul className="list-disc list-inside text-sm sm:text-base space-y-1">
              <li>Why things feel smooth or stuck</li>
              <li>Why relationships or finances fluctuate</li>
              <li>Why your purpose feels clearer in certain years</li>
            </ul>
          </section>

          {/* Pro Tip */}
          <section>
            <h2 className="text-2xl  font-semibold mb-4">
              Astro Captain Pro Tip:
            </h2>
            <p className="text-base italic">
              Don’t just look at what’s there in your Kundli. Look at how
              everything talks to each other. That’s where the real magic lives.
            </p>
          </section>
        </div>

        {/* Right Image */}
        <div className="w-full lg:w-1/3 flex justify-center items-start mt-6 lg:mt-20">
          <img
            src={image}
            alt="Kundli Illustration"
            className="rounded-2xl shadow-lg w-full max-w-sm xl:max-w-md object-cover"
          />
        </div>
      </div>

      {/* Full-Width Bonus Section */}
      <div className="w-full bg-yellow-50 border-t border-yellow-200 px-4 py-10">
        <div className="max-w-7xl mx-auto">
          <section className="border-l-4 border-yellow-500 p-5 rounded-md">
            <h3 className="text-xl font-semibold mb-2">
              Bonus: What Makes Astro Captain Different?
            </h3>
            <p className="text-base">
              Most free platforms just throw you a PDF full of Sanskrit
              gibberish and generic advice. At <strong>Astro Captain</strong>,
              we simplify your chart without dumbing it down — so you’re
              empowered to understand and evolve with it.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default KundliGuide;
