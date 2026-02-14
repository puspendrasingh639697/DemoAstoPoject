import React from "react";
import Image from "../assets/image/kundlidailylifeimage.png";

const KundliDailyLifeSection = () => {
  return (
    <div className="px-4 py-10 max-w-7xl mx-auto text-gray-800">
      {/* Full-width Heading */}
      <h1 className="text-3xl sm:text-4xl font-bold text-center  mb-6">
        Kundli in Daily Life — More Than Just Predictions
      </h1>

      {/* Subheading */}
      <h2 className="text-lg sm:text-xl font-semibold text-center text-gray-700 mb-10">
        Your Kundli Isn’t Just for Big Life Moments. It’s a Daily Compass.
      </h2>

      {/* Content Layout */}
      <div className="flex flex-col lg:flex-row gap-10 items-start">
        {/* Left Content */}
        <div className="w-full lg:w-2/3 space-y-6">
          {/* Intro */}
          <div className="space-y-4">
            <p className="text-base leading-relaxed">
              Most people open their chart only when there’s a crisis:
            </p>
            <ul className="list-disc list-inside text-base space-y-1">
              <li>Job not working out?</li>
              <li>Relationship going downhill?</li>
              <li>Feeling stuck and directionless?</li>
            </ul>
            <p className="text-base leading-relaxed">
              But your Kundli isn’t just a “fix-it tool.” It’s a lifestyle map —
              a daily guide to better decisions, aligned timing, and smarter
              choices.
            </p>
            <p className="text-base leading-relaxed font-medium text-yellow-500">
              Let’s break down how your birth chart can serve you every single
              day.
            </p>
          </div>

          {/* Section: Better Decisions */}
          <div className="space-y-3">
            <h2 className="text-xl font-semibold ">Make Better Decisions</h2>
            <p className="text-base">
              Your Kundli reveals your default patterns — the ones you repeat
              unconsciously. Knowing your planetary strengths and weak spots
              helps you:
            </p>
            <ul className="list-disc list-inside text-base space-y-1">
              <li>Make faster, more confident decisions</li>
              <li>Say yes to aligned opportunities</li>
              <li>
                Say no without guilt (especially if your Moon or Venus gets too
                accommodating)
              </li>
            </ul>
            <p className="text-sm italic">
              Example: If you have a strong Mars, you’re a natural initiator.
              But if Mars is weak or in the 12th, hasty moves may backfire. Your
              chart shows when to act — and when to wait.
            </p>
          </div>

          {/* Section: Dasha Timing */}
          <div className="space-y-3">
            <h2 className="text-xl font-semibold ">
              Align with the Right Timing (The Dasha Factor)
            </h2>
            <p className="text-base">
              Your Mahadasha (major planetary period) and Antardasha
              (sub-period) define the mood of the moment in your life.
            </p>
            <ul className="list-disc list-inside text-base space-y-1">
              <li>Want to start a new venture?</li>
              <li>Considering a job switch?</li>
              <li>Thinking of getting married?</li>
            </ul>
            <p className="text-base">
              Timing is everything. With your current Dasha in mind, you’ll know
              what the universe is supporting — and what it’s warning you
              against.
            </p>
            <p className="text-sm italic">
              No more shooting in the dark. Start acting when your stars are
              aligned.
            </p>
          </div>

          {/* Section: Emotional Waves */}
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">
              Understand Your Emotional Waves
            </h2>
            <p className="text-base">
              Your Moon sign and house tell you how your emotional energy works.
              Are you intense and reactive? Detached and analytical? Sensitive
              and introverted?
            </p>
            <ul className="list-disc list-inside text-base space-y-1">
              <li>Manage stress better</li>
              <li>Spot emotional patterns (and not repeat them)</li>
              <li>Build stronger self-awareness</li>
            </ul>
            <p className="text-sm italic">
              When you understand your Moon, you stop taking every mood
              personally.
            </p>
          </div>

          {/* Section: Relationships */}
          <div className="space-y-3">
            <h2 className="text-xl font-semibold ">Improve Relationships</h2>
            <p className="text-base">
              Whether it’s romantic love, business partnerships, or family
              dynamics — your Kundli shows how you relate to others.
            </p>
            <ul className="list-disc list-inside text-base space-y-1">
              <li>Do you need space or constant connection?</li>
              <li>Do you give too much or pull away too fast?</li>
              <li>
                Are you attracting partners that reflect your unresolved karma?
              </li>
            </ul>
            <p className="text-sm italic">
              Once you see the why behind your relationship patterns, you stop
              blaming fate — and start healing.
            </p>
          </div>

          {/* Section: Career */}
          <div className="space-y-3">
            <h2 className="text-xl font-semibold ">
              Navigate Career with Clarity
            </h2>
            <p className="text-base">
              If you’re stuck in a job that drains you, your Kundli can offer a
              wake-up call — or a green signal. Use it to:
            </p>
            <ul className="list-disc list-inside text-base space-y-1">
              <li>Explore roles that suit your natural planetary strengths</li>
              <li>Pick industries aligned with your Lagna and 10th house</li>
              <li>Time transitions when the stars are on your side</li>
            </ul>
            <p className="text-sm italic">
              Working hard is great. Working aligned is smarter.
            </p>
          </div>
        </div>

        {/* Right Image */}
        <div className="hidden lg:block w-full lg:w-1/3">
          <img
            src={Image}
            alt="Kundli used daily"
            className="w-full h-auto object-cover rounded-xl shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default KundliDailyLifeSection;
