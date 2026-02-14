import React from "react";
// import video from "../../assets/image/vedioastro.mp4";
import video from "../../assets/image/Blogs-HeroSectionImage.png";
import ButtonAnimation from "../ButtonAnimation";
import { motion } from "framer-motion";
// import video from "../../assets/KundliMatching/video1.jpeg";
const Postcast = () => {
  const MotionButtonAnimation = motion(ButtonAnimation);
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
      <div className="m-4 px-4 overflow-x-hidden">
        <div className="flex justify-between items-center p-4">
          <div className="text-center flex-1">
            <p className=" text-2xl sm:text-4xl  font-semibold text-center flex-1">
              Latest Podcasts
            </p>
          </div>

          {/* <button className="text-yellow-600 hover:text-yellow-700 border-2 border-orange-400 py-2 px-4 rounded-md"> */}
          {/* View All */}
          {/* </button> */}
          <motion.span
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <MotionButtonAnimation
              className="relative overflow-hidden border-2 border-yellow-400 py-2 px-6 rounded-md text-black font-semibold group"
              onClick={() => navigate("/astrocouncelor-page")}
            >
              View All
            </MotionButtonAnimation>
          </motion.span>
        </div>

        <motion.p
          className="text-center mx-4 sm:mx-40 mb-4 mt-3 text-gray-600 text-lg font-semibold"
          initial={fadeInUp.hidden}
          whileInView={fadeInUp.visible}
          viewport={{ once: true }}
        >
          "We love Landingfolio! Our designers were using it for their projects,
          so clients already knew what Landingfolio was and how to use it."
        </motion.p>

        <div className="flex justify-center items-center">
          <div className="bg-[#FFF4BA]  border-2 border-dotted border-blue-500">
            {/* Inner div with video */}
            <div className="bg-white p-3y m-3 w-full md:w-[600px] lg:w-[800px] h-auto mx-auto">
              <div className="w-full h-auto">
                {/* <video className="w-full h-96 rounded-lg" controls>
                  <source
                    src={video}
                    type="video/mp4"
                    className="h-full w-full"
                  />
                </video> */}
                <img src={video} alt="video" className="h-full w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Postcast;
