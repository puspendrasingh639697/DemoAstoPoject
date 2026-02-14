import React from "react";

const NumerologyData = () => {
  return (
    <div>
      {" "}
      <div className="max-w-6xl mx-auto p-6 space-y-10 text-gray-800">
        <h1 className="text-3xl font-bold text-center text-black">
          How Your Name Number Influences Your Life
        </h1>
        <p className="text-lg text-center text-gray-600">
          Every area of your life, from your career choices to your love
          relationships is affected by your name number. Here's how:
        </p>

        {/* Career and Talents */}
        <div className="bg-yellow-50 rounded-xl p-6 shadow-md">
          <h2 className="text-2xl font-semibold text-black mb-4">
            Career and Talents
          </h2>
          <p className="mb-4">
            Using a numerology name calculator, you can match your name number
            to ideal career fields and unlock professional strengths. Let’s find
            out which resonates with you!
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm md:text-base">
            <li>
              <strong>Number 1:</strong> Leadership, innovation, independence
            </li>
            <li>
              <strong>Number 2:</strong> Cooperation, diplomacy, supportiveness
            </li>
            <li>
              <strong>Number 3:</strong> Communication, creativity,
              self-expression
            </li>
            <li>
              <strong>Number 4:</strong> Organization, reliability, practicality
            </li>
            <li>
              <strong>Number 5:</strong> Adaptability, freedom, versatility
            </li>
            <li>
              <strong>Number 6:</strong> Nurturing, responsibility, artistic
              ability
            </li>
            <li>
              <strong>Number 7:</strong> Analysis, research, spirituality
            </li>
            <li>
              <strong>Number 8:</strong> Management, finance, achievement
            </li>
            <li>
              <strong>Number 9:</strong> Humanitarianism, compassion, healing
            </li>
          </ul>
        </div>

        {/* Relationships and Compatibility */}
        <div className="bg-pink-50 rounded-xl p-6 shadow-md">
          <h2 className="text-2xl font-semibold text-black mb-4">
            Relationships and Compatibility
          </h2>
          <p className="mb-3">
            Your name number can help you understand why you're drawn to certain
            people and clash with others. Some numbers naturally work well
            together, while others may create challenges. A free numerology
            calculator can quickly help you understand which numbers vibe well
            together in love, friendship, or business.
          </p>
          <p className="font-medium">
            For instance, people with name number <strong>2</strong> often get
            along beautifully with those who have name number <strong>6</strong>
            , as both value harmony and emotional connection.
          </p>
        </div>

        {/* Personal Challenges */}
        <div className="bg-blue-50 rounded-xl p-6 shadow-md">
          <h2 className="text-2xl font-semibold text-back mb-4">
            Personal Challenges
          </h2>
          <p className="mb-3">
            Each number also comes with potential challenges. With tools like
            the best numerology calculator, you can get detailed advice on how
            to manage your challenges while amplifying your strengths.
          </p>
          <p className="italic">
            Kavita has seen this with her own name number <strong>5</strong>.
            She’s naturally restless and craves variety, which can sometimes
            make it hard for her to stick with long-term projects. Once she
            understood this about herself, she learnt to build more flexibility
            into her work and life. This made a{" "}
            <span className="font-semibold text-indigo-700">
              HUGE difference
            </span>{" "}
            in her work life!
          </p>
        </div>
      </div>
    </div>
  );
};

export default NumerologyData;
