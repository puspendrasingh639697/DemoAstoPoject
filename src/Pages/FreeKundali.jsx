import React from "react";
import LandingPage from "../components/Kundali/LandingPage";
import KundaliForm from "../components/Kundali/KundaliForm";
import SeoPage from "../components/Kundali/SeoPage";
import image from "../assets/image/circleimage.png";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/image/BlogImg.png";
import { motion } from "framer-motion";

const FreeKundali = () => {
  const navigate = useNavigate();
  return (
    <div>
      <LandingPage />
      <KundaliForm />
      {/* <div
        className="py-4  px-12 max-w-7xl mx-auto mt-8  shadow-xl  my-10"
        style={{
          backgroundImage: `url(${"https://img.freepik.com/free-photo/mystical-numerology-scene_52683-107762.jpg"})`,
          backgroundRepeat: "no-repeat",
          width: "100%",
          backgroundSize: "cover",
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center py-8 ">
          <div className="flex   mx-auto ">
            <div className="  p-4">
              <p className="text-3xl font-semibold text-white">
                Discover your ideal partner with our match making service
              </p>
              <button
                onClick={() => navigate("/Free-kundali-info")}
                className=" flex justify-center items-center gap-2 bg-yellow-400 text-black px-8 py-4 rounded-md mx-auto mt-4 hover:bg-yellow-500 transition-colors duration-300"
              >
                Discover here
              </button>
            </div>
          </div>
          <div>
              <img src={image} alt="image" className=" h-40 w-40 rounded-full" />
            </div> 

        </div>
      </div> */}
      <motion.div
        className="py-4 px-12 max-w-7xl mx-auto mt-8 shadow-xl my-10"
        style={{
          backgroundImage: `url(${"https://img.freepik.com/free-photo/mystical-numerology-scene_52683-107762.jpg"})`,
          backgroundRepeat: "no-repeat",
          width: "100%",
          backgroundSize: "cover",
        }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center py-8 ">
          <div className="flex mx-auto">
            <div className="p-4">
              <motion.p
                className="text-3xl font-semibold text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              >
                Discover your ideal partner with our match making service
              </motion.p>

              <motion.button
                onClick={() => navigate("/kundali-matching")}
                className="flex justify-center items-center gap-2 bg-yellow-400 text-black px-8 py-4 rounded-md mx-auto mt-4 hover:bg-yellow-500 transition-colors duration-300"
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Discover here
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      <SeoPage />
    </div>
  );
};

export default FreeKundali;
