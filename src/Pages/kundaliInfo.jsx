import React from "react";
import { Link } from "react-router-dom";
import image from "../assets/image/kundalifreeimage.png";

const FreekundaliInfo = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 bg-white text-gray-800">
      {/* Intro Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-6xl font-bold  mb-4">
          What is a Kundli?
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-4">
          Your Birth Chart Isn’t Just a Piece of Paper. It’s Your Cosmic
          Blueprint.
        </p>
        <p className="text-gray-700 max-w-3xl mx-auto">
          A Kundli (or Janam Kundli) is the astrological map of the sky at your
          exact birth time and location — like a snapshot of the universe. It’s
          unique to you and can help guide your career, relationships, health,
          and life path. At Astro Captain, we don’t just generate a chart — we
          decode it with cosmic precision.
        </p>
      </div>

      {/* Content Section */}
      <div className="flex flex-col lg:flex-row gap-10 items-center">
        {/* Left Content */}
        <div className="lg:w-1/2 space-y-6">
          <h2 className="text-2xl font-bold">
            So... What Does a Kundli Actually Contain?
          </h2>

          <p className="text-gray-700">
            Your Kundli is made up of three major elements:
          </p>

          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li>
              <strong>The Twelve Houses (Bhavas):</strong> Each house reflects a
              life area — career, love, health, family, etc.
            </li>
            <li>
              <strong>The Nine Planets (Navagraha):</strong> Real planetary
              placements (not just memes) influence your mindset, habits, and
              growth.
            </li>
            <li>
              <strong>The Zodiac Signs (Rashis):</strong> These 12 signs (Aries
              to Pisces) define how planets express themselves in your life.
            </li>
          </ul>

          <p className="italic text-gray-600">Why is it so important?</p>
          <p className="text-gray-700">
            Your decisions, desires, and delays often have cosmic roots. Your
            Kundli can reveal:
          </p>

          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li>Your strengths and hidden challenges</li>
            <li>Ideal career paths and timing</li>
            <li>Health and fertility patterns</li>
            <li>Compatibility with partners</li>
            <li>Relationship cycles and insights</li>
          </ul>
        </div>

        {/* Right Image */}
        <div className="lg:w-1/2 w-full">
          <img
            src="https://media.vyaparify.com/vcards/blogs/100110/Lagna-Kundli.jpg"
            alt="Kundli Chart"
            className="rounded-2xl shadow-md w-full h-80 object-fit"
          />
        </div>
      </div>

      {/* Why Not Google */}
      <div className="mt-16 space-y-6">
        <h2 className="text-2xl md:text-3xl font-semibold ">
          Why Not Just Google It?
        </h2>
        <p className="text-gray-700">
          Astrology is trending — but generic auto-generated PDFs won't give you
          deep insights. Astro Captain is different:
        </p>
        <ul className="list-disc pl-5 text-gray-700 space-y-2">
          <li>No copy-paste reports</li>
          <li>No guesswork based on sun signs</li>
          <li>
            No half-time hobbyists trying to interpret Saturn while multitasking
            their 9-to-5
          </li>
        </ul>
      </div>

      {/* Learning Sections */}
      <div className="mt-16 space-y-12">
        {/* Section: How to Read Your Kundli */}
        <SectionCard
          title="How to Read Your Kundli (Step-by-Step)"
          text="Your birth chart isn’t written in stone — it’s written in stars. It may look like an alien circuit board at first, but we teach you how to listen and understand it."
          link="/kundli-guide"
        />

        {/* Section: Score Meaning */}
        <SectionCard
          title="What Can Your Kundli Reveal About You?"
          text="At Astro Captain, we believe your chart isn’t a prediction machine. It’s a cosmic compass that reveals what you’re made of, where you shine, and what’s holding you back."
          link="/kundli-insight"
        />

        {/* Section: What Makes Astro Captain Different */}
        <SectionCard
          title="Kundli in Daily Life — More Than Just Predictions"
          text="your Kundli isn’t just a “fix-it tool”. It’s a lifestyle map — a daily guide to better decisions, aligned timing, and smarter choices."
          link="/kundli-daily-life"
        />

        {/* Section: Full-Time Experts */}
        <SectionCard
          title="So, Why Don’t More People Use Their Kundli Daily?"
          text="Most platforms make it too complex, too generic, or too fear-based. At Astro Captain, we keep it realclarity, not confusion."
          link="/daily-kundli"
        />
      </div>
    </div>
  );
};

// Reusable Section Card Component
const SectionCard = ({ title, text, link }) => (
  <div className="bg-yellow-50 p-6 md:p-8 rounded-xl border border-gray-200 shadow-sm">
    <h3 className="text-xl md:text-2xl font-semibold  mb-3">{title}</h3>
    <div className="flex flex-col md:flex-row items-start justify-between gap-4">
      <p className="text-gray-700 max-w-3xl">{text}</p>
      <Link
        to={link}
        className="text-yellow-600 italic hover:underline whitespace-nowrap self-end md:self-center"
      >
        Click here to read more...
      </Link>
    </div>
  </div>
);

export default FreekundaliInfo;
