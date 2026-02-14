import React from "react";
import Image from "../assets/image/kundliInsightimage.png";

const KundliInsight = () => {
  return (
    <div className="px-4 py-10 max-w-7xl mx-auto text-gray-800">
      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl font-bold  text-center mb-6">
        What Can Your Kundli Reveal About You?
      </h1>
      <p className="text-center text-lg mb-12 max-w-3xl mx-auto">
        Your life isn’t random. It’s either aligned — or misaligned — with the
        cosmos. Your Kundli is more than a prediction tool; it’s a personal
        blueprint for transformation.
      </p>

      {/* Content and Image */}
      <div className="flex flex-col lg:flex-row gap-10 items-start">
        {/* Left Content */}
        <div className="w-full lg:w-2/3 space-y-10">
          {/* Intro Block */}
          <div className="space-y-4">
            <p className="text-base leading-relaxed">Ever wonder why you:</p>
            <ul className="list-disc list-inside space-y-2 text-base">
              <li>Feel stuck in a job while others seem to rise with ease?</li>
              <li>Keep attracting the same relationship patterns?</li>
              <li>Have big dreams but can't find the right moment to move?</li>
            </ul>
            <p className="text-base leading-relaxed">
              The answers are often hidden in plain sight — inside your Kundli.
              At <strong>Astro Captain</strong>, we don’t treat charts like fate
              maps. We treat them as{" "}
              <span className="italic">cosmic compasses</span> that reveal your
              gifts, your challenges, and your timing.
            </p>
          </div>

          {/* Breakdown */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-2">Career & Purpose</h2>
              <p className="text-sm text-gray-600 mb-1">
                <strong>(10th House + Saturn + Sun + Mercury)</strong>
              </p>
              <ul className="list-disc list-inside text-base space-y-1">
                <li>Are you wired to lead, serve, build, or innovate?</li>
                <li>
                  Are you stuck in a “safe” job or aligned with your passion?
                </li>
              </ul>
              <p className="mt-2 text-base">
                Your chart can guide you toward work that feels like a mission,
                not a burden.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2 ">
                Love, Marriage & Compatibility
              </h2>
              <p className="text-sm text-gray-600 mb-1">
                <strong>(7th House + Venus + Jupiter)</strong>
              </p>
              <ul className="list-disc list-inside text-base space-y-1">
                <li>Who matches your emotional wavelength?</li>
                <li>When is the right time for serious commitment?</li>
                <li>
                  What kind of partnership supports your soul’s evolution?
                </li>
              </ul>
              <p className="mt-2 text-base">
                Your Kundli reveals what you attract and how to break old cycles
                in love.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2 ">Health & Energy</h2>
              <p className="text-sm text-yellow-500 mb-1">
                <strong>(6th, 8th & 12th Houses)</strong>
              </p>
              <ul className="list-disc list-inside text-base space-y-1">
                <li>Do you carry stress, anxiety, or chronic patterns?</li>
                <li>When are you most prone to burnout or illness?</li>
              </ul>
              <p className="mt-2 text-base">
                Learn how to align your habits and healing with your personal
                energy cycles.
              </p>
            </div>

            <div>
              <h2 className="text-xl  font-semibold mb-2">
                Wealth & Financial Destiny
              </h2>
              <p className="text-sm text-gray-600 mb-1">
                <strong>(2nd House + 11th House + Jupiter)</strong>
              </p>
              <ul className="list-disc list-inside text-base space-y-1">
                <li>Are you built for stable income or bold risk?</li>
                <li>What’s your natural money mindset?</li>
              </ul>
              <p className="mt-2 text-base">
                Discover when you’re aligned to grow, save, or transform wealth.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2 ">
                Inner Blocks & Karma
              </h2>
              <p className="text-sm text-gray-600 mb-1">
                <strong>(Rahu-Ketu Axis + 8th House)</strong>
              </p>
              <ul className="list-disc list-inside text-base space-y-1">
                <li>Feel stuck for no reason?</li>
                <li>Fear things that don’t logically make sense?</li>
              </ul>
              <p className="mt-2 text-base">
                These often trace back to karmic imprints. Your chart reveals
                patterns inherited from past lives and how to transcend them.
              </p>
            </div>
          </div>

          {/* Closing Section */}
          <div className="bg-yellow-50 border-l-4 border-yellow-600 p-5 rounded-md space-y-4">
            <h3 className="text-lg font-semibold ">
              Your Kundli Doesn’t Judge. It Guides.
            </h3>
            <p className="text-base">
              It won’t say “you can’t.” It’ll show you{" "}
              <strong>how you can</strong>. This isn’t about prediction — it’s
              about empowerment.
            </p>
            <p className="text-base">
              While other platforms give you copy-paste reports,{" "}
              <strong>Astro Captain</strong> gives you:
            </p>
            <ul className="list-disc list-inside text-base space-y-1">
              <li>Real insight — not generic fluff</li>
              <li>Clear, digestible breakdowns</li>
              <li>Actionable guidance for real life</li>
              <li>Personal attention, not a PDF factory</li>
            </ul>
          </div>
        </div>

        {/* Right Image */}
        <div className="hidden lg:block w-full lg:w-1/3">
          <img
            src={Image}
            alt="Kundli Insight Illustration"
            className="w-full h-auto object-cover rounded-xl shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default KundliInsight;
