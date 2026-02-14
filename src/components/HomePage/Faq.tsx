"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import ButtonAnimation from "../ButtonAnimation";

const initialFaqs = [
  {
    id: 1,
    question:
      "How accurate are your astrological predictions and consultations?",
    answer:
      "Our predictions are based on authentic Vedic astrology principles practiced for over 5000 years, combined with modern analytical techniques...",
  },
  {
    id: 2,
    question: "What information do I need to provide for an accurate reading?",
    answer:
      "For the most precise consultation, you'll need your complete birth details: exact date, time (preferably to the minute), and place of birth...",
  },
  {
    id: 3,
    question: "Can I get consultations in my preferred language?",
    answer:
      "Yes, our platform connects you with astrologers who speak multiple Indian languages including Hindi, English, and various regional languages...",
  },
];

const additionalFaqs = [
  {
    id: 4,
    question:
      "How does your online consultation platform ensure privacy and security?",
    answer:
      "We implement bank-grade security measures to protect your personal information and consultation details...",
  },
  {
    id: 5,
    question:
      "How do you ensure the authenticity and qualification of your astrologers?",
    answer:
      "All our astrologers undergo rigorous verification processes including credential checks, practical assessments...",
  },
  {
    id: 6,
    question: "What if I'm not satisfied with my consultation?",
    answer:
      "We stand behind the quality of our services with customer satisfaction guarantees...",
  },
  {
    id: 7,
    question: "What are your consultation charges and payment options?",
    answer:
      "We offer flexible pricing options with transparent rates clearly displayed for each astrologer...",
  },
  {
    id: 8,
    question: "What's the difference between chat and call consultations?",
    answer:
      "Both options provide equally effective consultations with our expert astrologers...",
  },
  {
    id: 9,
    question: "Do you offer any free services or trial consultations?",
    answer:
      "Yes, we provide several complimentary features including free Kundli generation, daily horoscope readings...",
  },
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState([]);
  const [closingItem, setClosingItem] = useState(null);
  const [showMore, setShowMore] = useState(false);

  const toggleItem = (id) => {
    if (openItems.includes(id)) {
      setClosingItem(id);
      setTimeout(() => {
        setOpenItems((prev) => prev.filter((item) => item !== id));
        setClosingItem(null);
      }, 300);
    } else {
      setOpenItems((prev) => [...prev, id]);
    }
  };

  const currentFaqs = showMore
    ? [...initialFaqs, ...additionalFaqs]
    : initialFaqs;

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <style>
        {`
          @keyframes scale-in-ver-top {
            0% {
              transform: scaleY(0);
              opacity: 0;
              transform-origin: top;
            }
            100% {
              transform: scaleY(1);
              opacity: 1;
              transform-origin: top;
            }
          }

          @keyframes scale-out-ver-bottom {
            0% {
              transform: scaleY(1);
              opacity: 1;
              transform-origin: top;
            }
            100% {
              transform: scaleY(0);
              opacity: 0;
              transform-origin: top;
            }
          }

          .scale-in-ver-top {
            animation: scale-in-ver-top 0.3s ease-out forwards;
          }

          .scale-out-ver-bottom {
            animation: scale-out-ver-bottom 0.3s ease-out forwards;
          }
        `}
      </style>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
        </div>

        <div className="space-y-4 mb-8">
          {currentFaqs.map((faq) => {
            const isOpen = openItems.includes(faq.id);
            const isClosing = closingItem === faq.id;

            return (
              <div
                key={faq.id}
                className="bg-white rounded-lg shadow-sm border-b border-yellow-500"
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-yellow-50 transition-colors duration-200"
                >
                  <h3 className="text-lg font-medium text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    {isOpen && !isClosing ? (
                      <Minus className="w-5 h-5 text-yellow-600" />
                    ) : (
                      <Plus className="w-5 h-5 text-yellow-600" />
                    )}
                  </div>
                </button>

                {(isOpen || isClosing) && (
                  <div className="px-6 pb-3 overflow-hidden">
                    <div
                      className={`border-t border-yellow-500 pt-4 ${
                        isClosing ? "scale-out-ver-bottom" : "scale-in-ver-top"
                      }`}
                    >
                      <p className="text-gray-900 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center">
          {!showMore ? (
            <ButtonAnimation
              onClick={() => setShowMore(true)}
              className="inline-flex items-center px-8 py-3 bg-white border-2 border-yellow-400 text-black font-semibold rounded-full transition-colors duration-200 shadow-lg"
            >
              Read More
            </ButtonAnimation>
          ) : (
            <ButtonAnimation
              onClick={() => setShowMore(false)}
              className="inline-flex items-center px-8 py-3 bg-white border-2 border-yellow-400 text-black font-semibold rounded-full transition-colors duration-200 shadow-lg"
            >
              Show Less
            </ButtonAnimation>
          )}
        </div>
      </div>
    </div>
  );
}
