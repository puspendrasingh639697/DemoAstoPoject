import React from "react";
import Image from "../assets/image/lagnakundliimage.png";

const DailyKundliSection = () => {
  return (
    <div className="px-4 py-10 max-w-7xl mx-auto text-gray-800">
      {/* Full-width Heading */}
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6">
        So, Why Don’t More People Use Their Kundli Daily?
      </h1>

      {/* Content Layout */}
      <div className="flex flex-col lg:flex-row gap-10 items-start">
        {/* Left Content */}
        <div className="w-full lg:w-2/3 space-y-6">
          {/* Section 1 */}
          <div className="space-y-4">
            <p className="text-base leading-relaxed">
              Despite the ancient wisdom and deep personal insights it offers,
              most people don’t engage with their Kundli (birth chart) on a
              daily basis. But the real question is — why not?
            </p>
            <p className="text-base leading-relaxed">
              The answer is simple: the way Kundli-based astrology is presented
              today often feels too complex, too generic, or too fear-driven to
              be useful in everyday life.
            </p>
            <p className="text-base leading-relaxed">
              Think about it. Most astrology platforms throw a mix of Sanskrit
              terms, planetary jargon, and one-size-fits-all advice at you.
              Instead of clarity, they create confusion. Instead of empowerment,
              they instill fear.
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold ">
              We’re Changing That at Astro Captain
            </h2>
            <p className="text-base leading-relaxed">
              We believe your Kundli is a powerful, living tool — one that can
              guide your decisions, boost your self-awareness, and help you
              navigate life with confidence.
            </p>
            <p className="text-base leading-relaxed">
              But only when it’s made simple, personalized, and practical.
              That’s why we’ve stripped away the noise:
            </p>
            <ul className="list-disc list-inside text-base space-y-1">
              <li>No black magic nonsense</li>
              <li>No fear-mongering predictions</li>
              <li>No vague, generic astrology</li>
            </ul>
            <p className="text-base leading-relaxed">
              Just real, honest insights — tailored to you.
            </p>
          </div>

          {/* Section 3 */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold ">
              Rooted in Vedic Wisdom. Refined for Real Life.
            </h2>
            <p className="text-base leading-relaxed">
              Every interpretation we offer is grounded in authentic Vedic
              astrology, refined through a modern, common-sense lens. You won’t
              get lost in abstract planetary influences.
            </p>
            <p className="text-base leading-relaxed">
              Instead, you’ll get clear, actionable guidance — things you can
              actually apply to your:
            </p>
            <ul className="list-disc list-inside text-base space-y-1">
              <li>Career</li>
              <li>Relationships</li>
              <li>Health</li>
              <li>Personal growth</li>
            </ul>
            <p className="text-base leading-relaxed">
              Our goal isn’t to make you dependent on astrology. Our goal is to
              empower you with it.
            </p>
          </div>

          {/* Section 4 */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold ">
              Real Professionals. Real Guidance.
            </h2>
            <p className="text-base leading-relaxed">
              What truly sets us apart? Our team is made up of full-time
              professionals — not weekend hobbyists.
            </p>
            <p className="text-base leading-relaxed">
              Each Astro Captain astrologer is trained, experienced, and
              committed to helping people with insight and integrity.
            </p>
            <p className="text-base leading-relaxed">
              We’re not here to impress you with buzzwords. We’re here to help
              you connect with your own chart — in a way that feels real,
              relevant, and reassuring.
            </p>
          </div>

          {/* Final Statement */}
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-5 rounded-md space-y-3">
            <h3 className="text-lg font-semibold ">
              Your Kundli Isn’t Just a Chart. It’s a Mirror. A Map. A Guide.
            </h3>
            <p className="text-base">
              With Astro Captain, you’ll finally understand what your Kundli is
              trying to tell you — without the fluff, fear, or fog.
            </p>
            <p className="text-base">
              Let’s make it part of your daily life. Because when used right, it
              can be one of your greatest tools for clarity, confidence, and
              personal growth.
            </p>
          </div>
        </div>

        {/* Right Image */}
        <div className="hidden lg:block w-full lg:w-1/3">
          <img
            src={Image}
            alt="Kundli as a daily tool"
            className="w-full h-auto object-cover rounded-xl shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default DailyKundliSection;
