import React from "react";
import { Link } from "react-router-dom"; // Import Link
import Home4 from "../../assets/image/home4.png";
import FortuneTeller from "../../assets/image/fortunetellerImage.png";
import vastu from "../../assets/image/Banner2.png";
import prasad from "../../assets/image/bookpandit.png";
import bgImage from "../../assets/image/BG Image.png";
import BlurText from "../BlurText";
import { motion, scale } from "framer-motion";
const AstrologyServices = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  const fadeInLeftFromRight = {
    hidden: { opacity: 0, scale: 0.6 },
    visible: {
      opacity: 1,
      scale: 1,

      // transition: { duration: 0.8, ease: "easeOut" },
    },
  };
  const services = [
    {
      id: 1,
      title: "Free Kundli",
      description:
        "Get your free kundli online and discover your personalized Vedic astrology chart, including planetary positions, life predictions, and dosha analysis. Start your journey with accurate insights into love, career, marriage, and health.",
      imageUrl:
        "https://media.vyaparify.com/vcards/blogs/100110/Lagna-Kundli.jpg",
      link: "/free-kundali",
    },
    {
      id: 2,
      title: "Compatibility Readings",
      description:
        "Discover your perfect match with our kundli matching for marriage and love compatibility astrology. Get personalized insights into relationship harmony, emotional bonding, and long-term potential based on your birth charts",
      imageUrl:
        "https://helloastro.in/wp-content/uploads/2023/07/horoscope.jpg",
      link: "/kundali-matching",
    },
    {
      id: 3,
      title: "Book-E-Pooja",
      description:
        "Schedule customized pooja services online for home, health, marriage, or business success. Get spiritual rituals performed with devotion by trusted priests, anywhere in India.",
      imageUrl:
        "data:image/jpeg;base64,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",
      link: "/book-e-pooja",
    },
    {
      id: 4,
      title: "Book-Pandit",
      description:
        "Easily book the experienced Vedic Pandits online for all rituals including Griha Pravesh, Navgraha Shanti, Satyanarayan Katha, and more. Verified Pandits for authentic and scripturally accurate pujas at your location.",
      imageUrl:
        "https://i.pinimg.com/1200x/1c/50/72/1c5072dbfd50ce766a31546193ea1f08.jpg",
      link: "/book-pandit",
    },
  ];

  return (
    <div
      id="services"
      className="min-h-screen py-12 px-4 md:px-8 flex flex-col items-center"
    >
      {/* Header Section */}
      <div className="w-full max-w-4xl text-center mb-12">
        <h2 className="mt-8 text-2xl sm:text-4xl font-semibold text-black">
          Discover your path in the stars with us
        </h2>

        <motion.p
          className="max-w-3xl text-center mx-auto text-gray-600 text-md mt-4 text-md"
          initial={fadeInUp.hidden}
          whileInView={fadeInUp.visible}
          viewport={{ once: true }}
        >
          Life's uncertainties can leave you overwhelmed—strained relationships,
          an uneasy home, or feeling out of sync with yourself. Get clarity,
          balance, and connection in written stars.
        </motion.p>
      </div>

      {/* Services Grid */}
      <div className="w-full max-w-7xl space-y-16">
        {services.map((service, index) => (
          <div
            key={service.id}
            className={`flex flex-col md:flex-row items-center justify-around gap-8 ${
              index % 2 === 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            <motion.div
              className="w-fit p-4 rounded-lg shadow-xl "
              initial={fadeInLeftFromRight.hidden}
              whileInView={fadeInLeftFromRight.visible}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 30,
                duration: 0.5,
              }}
            >
              <img
                src={service.imageUrl}
                alt={service.title}
                className="w-[300px] h-[300px] object-fit rounded-lg "
              />
            </motion.div>

            <div className="w-full md:w-1/2 text-center md:text-left space-y-4">
              <div className="flex items-center justify-center md:justify-start gap-4">
                <h3 className="text-4xl font-bold  transition">
                  {service.title}
                </h3>
              </div>
              <motion.p
                className="text-gray-700 mb-4 max-w-xl mx-auto md:mx-0"
                initial={fadeInUp.hidden}
                whileInView={fadeInUp.visible}
                viewport={{ once: true }}
              >
                {service.description}
              </motion.p>
              <Link to={service.link}>
                <motion.button
                  className="mt-4 px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg shadow transition"
                  initial={fadeInLeftFromRight.hidden}
                  whileInView={fadeInLeftFromRight.visible}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 80,
                    damping: 30,
                    duration: 0.5,
                  }}
                >
                  Explore {service.title}
                </motion.button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AstrologyServices;
