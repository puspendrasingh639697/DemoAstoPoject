import React from "react";
import { FaGooglePlay, FaApple } from "react-icons/fa";
import AppLinksImg from "../../assets/image/AppLinksImg.png";
import { motion } from "framer-motion";
const AppLinks = () => {
  const fadeInLeftFromRight = {
    hidden: { opacity: 0, scale: 0.6 },
    visible: {
      opacity: 1,
      scale: 1,

      // transition: { duration: 0.8, ease: "easeOut" },
    },
  };
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  };
  return (
    <>
      <section
        className="px-12 py-4  md:p-10 lg:p-20  max-w-7xl mx-auto"
        id="app"
      >
        <div className="bg-[#fff3b5] rounded-2xl flex flex-col lg:flex-row justify-center items-center">
          <div className="w-full lg:w-1/2 p-6 lg:p-24">
            <motion.h1
              className="font-bold text-4xl md:text-5xl lg:text-6xl text-center lg:text-left"
              initial={fadeInUp.hidden}
              whileInView={fadeInUp.visible}
              viewport={{ once: true }}
            >
              Get Mobile App Today!
            </motion.h1>
            <p className="text-lg md:text-xl text-[#2D2D2D] mt-4 text-center lg:text-left">
              Get Mobile app.... Get Mobile app...... Get Mobile app.... Get
              Mobile app
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 mt-6 justify-center lg:justify-start">
              <button className="bg-black text-xl text-center text-white flex justify-center items-center gap-1 p-4 rounded-md hover:bg-yellow-400  hover:text-black transition duration-300">
                <FaGooglePlay size={26} />
                Play Store
              </button>
              <button className="bg-black text-2xl text-center text-white flex justify-center gap-1 hover:bg-yellow-400  hover:text-black transition duration-300 p-4 rounded-md">
                <FaApple size={30} />
                Appstore
              </button>
            </div>
          </div>
          <motion.div
            className="w-full lg:w-1/2 mt-6 lg:mt-0"
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
              src={AppLinksImg}
              alt="Mobile app download"
              className="w-full h-auto"
            />
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default AppLinks;
