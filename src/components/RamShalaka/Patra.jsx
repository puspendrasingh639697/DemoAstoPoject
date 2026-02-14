import React from "react";
import patra from "../../assets/image/patra.png";

export default function Patra() {
  return (
    <section className="py-2 px-6 md:px-16 lg:px-24 bg-white text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
        Answer From BalKand #9126
      </h2>

      <img
        src={patra}
        alt="Numerology Illustration"
        className="w-full max-w-4xl mx-auto rounded-xl"
      />
    </section>
  );
}
