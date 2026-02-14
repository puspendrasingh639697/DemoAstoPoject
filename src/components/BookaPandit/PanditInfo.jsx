import React from "react";
import Panditji from "../../assets/image/Panditji.png";
import { motion } from "framer-motion";

const ExperiencePoojas = () => {
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
    },
  };

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Heading */}
      <motion.h1
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-6 leading-tight text-center lg:text-left"
        initial={fadeInUp.hidden}
        whileInView={fadeInUp.visible}
        viewport={{ once: true }}
      >
        Experience Traditional Poojas from the Comfort of Your Home
      </motion.h1>

      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
        {/* Text content */}
        <motion.div
          className="w-full lg:w-1/2"
          initial={fadeInUp.hidden}
          whileInView={fadeInUp.visible}
          viewport={{ once: true }}
        >
          <p className="text-gray-700 text-base sm:text-lg text-justify leading-relaxed">
            In today’s fast-paced world, finding time to visit temples for
            traditional rituals can be challenging. Our “Book a Pandit” service
            brings the spiritual experience to you, allowing you to partake in
            sacred ceremonies from the convenience of your home. Whether it’s
            for personal solace, family events, or special occasions, you can
            now connect with experienced pandits who will guide you through
            authentic poojas.
            <br />
            <br />
            Choose your desired ritual, select a convenient time, and our
            pandits will perform the ceremonies live, ensuring you receive
            blessings and spiritual fulfillment. Embrace the tranquility and
            divine connection that comes with traditional rituals — all without
            the need for travel.
            <br />
            <br />
            Start your spiritual journey with us today and bring the divine
            blessings to your doorstep.
          </p>
        </motion.div>

        {/* Image */}
        <motion.div
          className="w-full lg:w-1/2 flex justify-center items-center"
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
            src={Panditji}
            alt="pandit performing pooja"
            className="w-full max-w-md sm:max-w-lg h-auto rounded-xl shadow-lg"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ExperiencePoojas;
