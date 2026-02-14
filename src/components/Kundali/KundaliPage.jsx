import React from "react";
import { Link } from "react-router-dom";
import image from "../../assets/image/kundalimatchimage.png";
import WhatweProvide from "../HomePage/WhatweProvide";
import AppLinks from "../HomePage/AppLinks";
const KundaliPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 bg-white text-gray-800">
      <div className="text-center mb-5">
        <h1 className="text-8xl md:text-6xl font-bold  mb-4">
          What is Kundli Matching — and Why It Still Matters?
        </h1>
        <p className="text-lg text-gray-800 max-w-2xl mx-auto">
          Love is chemistry. Marriage is compatibility. Your Kundli tells you if
          both can coexist.
        </p>
      </div>

      <p className="text-md text-gray-700 leading-relaxed mb-10 max-w-4xl mx-auto text-center">
        In the age of dating apps and #vibes, people often skip Kundli matching.
        Until… things fall apart for reasons no one can explain. Different
        emotional wavelengths. Draining arguments. Clashing goals. Unseen
        blocks. This is where Kundli Matching (Guna Milan) steps in — not as
        superstition, but as a spiritual science of compatibility.
      </p>

      <div className="flex flex-col lg:flex-row gap-12 items-center">
        {/* Left Content */}
        <div className="lg:w-1/2 space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold  mb-4">
            What is Kundli Matching?
          </h2>
          <p className="text-gray-700">
            Also known as Guna Milan or Horoscope Matching, it’s a Vedic method
            of analyzing the compatibility of two people — based on their birth
            details. It looks at:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Mental & emotional alignment</li>
            <li>Communication styles</li>
            <li>Health & fertility factors</li>
            <li>Family harmony</li>
            <li>Financial karma</li>
            <li>Sexual compatibility</li>
            <li>Longevity of the bond</li>
          </ul>
          <p className="italic text-gray-600">
            It’s not just about love. It’s about life after love — the real
            stuff.
          </p>
        </div>

        {/* Right Image */}
        <div className="lg:w-1/2">
          <img
            src={image}
            alt="Kundli Matching"
            className="rounded-2xl shadow-md w-full h-80 object-cover"
          />
        </div>
      </div>

      <h1 className="text-2xl md:text-3xl font-semibold  mb-4">
        Why is it Important in Marriage?
      </h1>
      <ul className="list-disc list-inside text-gray-700 space-y-1">
        <li>To Reduce Conflict</li>
        <p>
          Your Kundlis can reveal if both partners are emotionally in sync or
          prone to frequent misunderstandings.
        </p>
        <li>To Ensure Long-Term Stability</li>
        <p>
          Even deep love needs alignment in values, goals, and timing. Your
          charts show if you're built for the long haul.
        </p>
        <li>To Spot Red Flags Early</li>
        <p>
          Some charts carry intense karmic patterns — Manglik Dosha, weak Moon,
          or Ketu influences. These don’t mean “no marriage” — they mean “handle
          with awareness.”
        </p>
        <li>To Predict Relationship Flow</li>
        <p>
          Will your life together be peaceful? Adventurous? Full of growth or
          filled with healing past wounds? Your Kundli will tell.
        </p>
      </ul>

      <div className="max-w-6xl mx-auto px-4 py-8 font-sans">
        <h1 className="text-2xl md:text-3xl font-semibold  mb-4">
          Getting to know More about kundli Maching
        </h1>

        {/* 36-Point Match System Section */}
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-semibold mb-2">
            The 36-Point Match System (Guna Milan)
          </h2>

          <div className="bg-yellow-50 p-4 md:p-6 rounded-md flex flex-col md:flex-row items-start justify-between">
            <p className="text-gray-700 mb-4 md:mb-0 md:mr-4 max-w-3xl">
              This system checks 8 key compatibility aspects between the two
              charts: Kundli Matching evaluates 8 key aspects of compatibility
              between two individuals, assigning a total of 36 points.
            </p>
            <Link
              to={"/guna-milan"}
              className="text-yellow-600 italic hover:underline whitespace-nowrap self-end md:self-center"
            >
              Click here to read more...
            </Link>
          </div>
        </div>

        {/* What Do the Scores Mean Section */}
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-semibold  mb-2">
            What Do the Scores Mean?
          </h2>

          <div className="bg-yellow-50 p-4 md:p-6 rounded-md border border-gray-200 flex flex-col md:flex-row items-start justify-between">
            <div className="mb-4 md:mb-0 md:mr-4 max-w-3xl">
              <ul className="list-disc pl-5 text-gray-700">
                <li className="mb-2">
                  18 or above – Acceptable compatibility. 24 or above –
                  Excellent match. Below 18? – Not necessarily a deal-breaker.
                  Look deeper into individual gunas and consult an expert.
                  Context matters more than numbers.
                </li>
              </ul>
            </div>
            <Link
              to={"/score-meaning"}
              className="text-yellow-600 italic hover:underline whitespace-nowrap self-end md:self-center"
            >
              Click here to read more...
            </Link>
          </div>
        </div>

        {/* What Makes Astro Captain Different Section */}
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-semibold  mb-2">
            What Makes Astro Captain Different?
          </h2>

          <div className="bg-yellow-50 p-4 md:p-6 rounded-md flex flex-col md:flex-row items-start justify-between">
            <div className="mb-4 md:mb-0 md:mr-4 max-w-3xl">
              <ul className="list-disc pl-5 text-gray-700">
                <li className="mb-2">
                  While most apps give you a cold score, we give you a story. We
                  tell you everything about a relationship. Because your
                  marriage deserves more than a PDF and a "Sorry, you're not a
                  match."
                </li>
              </ul>
            </div>
            <Link
              to={"/why-astro"}
              className="text-yellow-600 italic hover:underline whitespace-nowrap self-end md:self-center"
            >
              Click here to read more...
            </Link>
          </div>
        </div>

        {/* Don't Trust Your Future With Part-Timers Section */}
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-semibold  mb-2">
            Don't Trust Your Future With Part-Timers
          </h2>

          <div className="bg-yellow-50 p-4 md:p-6 rounded-md border border-gray-200 flex flex-col md:flex-row items-start justify-between">
            <div className="mb-4 md:mb-0 md:mr-4 max-w-3xl">
              <ul className="list-disc pl-5 text-gray-700">
                <li className="mb-2">
                  At Astro Captain, Kundli Matching is handled by full-time
                  astrologers who decode soul patterns, not just zodiac math. We
                  help you choose with clarity, not fear.
                </li>
              </ul>
            </div>
            <Link
              to={"/trust-kundli"}
              className="text-yellow-600 italic hover:underline whitespace-nowrap self-end md:self-center"
            >
              Click here to read more...
            </Link>
          </div>
        </div>
      </div>
      {<WhatweProvide />}
      {<AppLinks />}
    </div>
  );
};

export default KundaliPage;
