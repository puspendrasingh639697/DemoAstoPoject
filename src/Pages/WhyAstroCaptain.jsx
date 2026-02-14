import React from "react";
import Image from "../assets/image/gunaimage.png";

const WhyAstroCaptain = () => {
  return (
    <section className="w-full py-16 px-4 md:px-8">
      <h2 className="text-4xl flex justify-center items-center md:text-5xl font-bold leading-tight mb-5">
        What Makes Astro Captain Different?
      </h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div className="space-y-8">
          <p className="text-lg md:text-xl text-gray-700 mt-11">
            In a world full of astrology apps, compatibility calculators, and
            vague PDF reports, Astro Captain stands apart. Why? Because we
            believe love, relationships, and especially marriage deserve more
            than just a number or a one-line verdict.
          </p>
          <ul className="space-y-6 text-gray-700 text-base md:text-lg">
            <li>
              <strong className="text-[#D97706]">
                1. We Don’t Judge. We Guide.
              </strong>
              <br />
              Most platforms might tell you "not compatible" and leave it at
              that. We help you understand the why and how—with clarity and
              compassion.
            </li>
            <li>
              <strong className="text-[#D97706]">
                2. From Score to Story.
              </strong>
              <br />
              Your report isn’t just a number. It’s a narrative—your strengths,
              your challenges, your timeline. It’s astrology that speaks to your
              soul.
            </li>
            <li>
              <strong className="text-[#D97706]">
                3. We Highlight Strengths (Even When the Score Is Low).
              </strong>
              <br />
              Low score? No panic. We help you uncover hidden emotional
              strengths and unique patterns worth exploring.
            </li>
            <li>
              <strong className="text-[#D97706]">
                4. Practical Timing Insights.
              </strong>
              <br />
              Emotional phases, communication peaks, closeness windows—timing
              matters. And we make it visible.
            </li>
            <li>
              <strong className="text-[#D97706]">5. No Panic. No Doom.</strong>
              <br />
              No fear-based language. Just balanced insights with supportive,
              actionable advice.
            </li>
            <li>
              <strong className="text-[#D97706]">
                6. Marriage Deserves More Than a PDF.
              </strong>
              <br />
              Your relationship evolves. Our experience evolves with
              you—interactive, update-ready, never one-and-done.
            </li>
            <li>
              <strong className="text-[#D97706]">
                7. Real Astrology. Real People.
              </strong>
              <br />
              Crafted by humans. Not just AI. Compassionate astrologers honoring
              your story and your culture.
            </li>
            <li>
              <strong className="text-[#D97706]">8. For Every Couple.</strong>
              <br />
              Whether you're dating, married, or figuring it out—we help you
              deepen connection and navigate with insight.
            </li>
          </ul>
        </div>

        {/* Image Section */}
        <div className="w-full flex justify-center">
          <img
            src={Image}
            alt="Astro Captain Couple"
            width={600}
            height={600}
            className="rounded-3xl shadow-lg object-cover"
          />
        </div>
      </div>
      <div className="mt-6 text-xl font-semibold text-yellow-500 px-10">
        ⚠️ Because your marriage deserves more than a PDF and a "Sorry, you're
        not a match."
        <br />
        It deserves honesty. It deserves compassion. <br />
        It deserves{" "}
        <span className="text-[#D97706] font-bold">Astro Captain</span>.
      </div>
    </section>
  );
};

export default WhyAstroCaptain;
