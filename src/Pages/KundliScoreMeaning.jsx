import React from "react";
import image from "../assets/image/scoreimage.png";

const KundliScoreMeaning = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 bg-white text-gray-800">
      <h1 className="text-3xl md:text-5xl font-bold w-full text-center mb-10">
        What Do the Scores Mean?
      </h1>

      <div className="flex flex-col-reverse lg:flex-row gap-10 items-center">
        {/* Left Section */}
        <div className="lg:w-2/3 space-y-6 text-lg leading-relaxed">
          <p>
            When it comes to matching horoscopes or Kundlis in Vedic astrology,
            the concept of Guna Milan plays a vital role in evaluating the
            compatibility between two individuals, especially in the context of
            marriage.
          </p>
          <p>
            This system scores compatibility based on a total of 36 points,
            divided across 8 different gunas, each representing a particular
            aspect of life and personality. But what do these scores really
            mean?
          </p>

          <h2 className="text-2xl font-semibold ">
            Score of 18 or Above – Acceptable Compatibility
          </h2>
          <p>
            A combined score of 18 or more out of 36 is generally considered
            acceptable. It reflects a decent understanding of personalities and
            life goals. With mutual effort, this foundation can evolve into a
            stable relationship.
          </p>

          <h2 className="text-2xl font-semibold ">
            Score of 24 or Above – Excellent Match
          </h2>
          <p>
            A score of 24+ implies high compatibility across values, emotions,
            and long-term goals. This is a very favorable sign for marriage,
            though challenges can still arise.
          </p>

          <h2 className="text-2xl font-semibold ">
            Score Below 18 – Not Necessarily a Deal-Breaker
          </h2>
          <p>
            A score under 18 might raise questions, but doesn’t mean the
            relationship won’t work. It’s important to assess individual gunas
            and consult an astrologer to understand the context.
          </p>

          <h2 className="text-2xl font-semibold ">
            The Importance of Consulting an Expert
          </h2>
          <p>
            An expert can read deeper into planetary alignments, doshas,
            strengths and weaknesses beyond the score. Guna Milan is a guiding
            tool, not a final verdict.
          </p>

          <h2 className="text-2xl font-semibold ">
            Context Matters More Than Numbers
          </h2>
          <p>
            Every couple is unique. High scores aren’t a guarantee, and low
            scores don’t spell doom. Open communication, emotional intelligence,
            and mutual respect are always key.
          </p>

          <h2 className="text-2xl font-semibold ">Final Thoughts</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>18 or above:</strong> A fair foundation worth exploring.
            </li>
            <li>
              <strong>24 or above:</strong> Highly compatible match.
            </li>
            <li>
              <strong>Below 18:</strong> Dive deeper, ask questions, and seek
              expert insight.
            </li>
          </ul>

          <p className="italic text-gray-600">
            In the end, love, understanding, and respect remain the most
            powerful forces in any relationship — far beyond just numbers.
          </p>
        </div>

        {/* Right Section - Image */}
        <div className="lg:w-1/3">
          <img
            src={image}
            alt="Kundli Score Meaning"
            className="rounded-xl shadow-lg w-full h-auto object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default KundliScoreMeaning;
