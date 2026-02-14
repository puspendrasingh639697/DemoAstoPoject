import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import paperTeaxture from "../../assets/image/paperTexture.webp";

import woodTexture from '../../assets/image/woodTexture.jpg';
import { kundaliContext } from '../../context/KundaliContext';

export default function PatraAnimation({ data }) {
    const [open, setOpen] = useState(false);
    const {language } = useContext(kundaliContext)

    // Variants for the middle section animation
    const midVariants = {
        closed: { width: 0, opacity: 0 },
        open: { width: '100%', opacity: 1, transition: { duration: 1 } },
    };

    // Variants for the side sections (left and right) animation
    const sideVariants = {
        closed: (custom) => ({ x: custom === 'left' ? '-0%' : '0%', transition: { duration: 1 } }),
        open: { x: 0, transition: { duration: 1 } },
    };

    useEffect(() => {
        // Open the Patra when the component mounts
        setTimeout(() => {
            setOpen(true);
        }, 1000)
    }, []);

    return (
        // Main container for centering the animation with a very light background
        <section className="w-full min-h-[600px] flex items-center justify-center flex-col">
            <h1 className='text-3xl font-bold text-amber-900 my-10'>Answer from Ram Shalaka</h1>
            {/* Outer wrapper for the Patra, with a soft, multi-color scripture-like gradient and rounded corners */}
            <div className="min-h-[400px] h-[600px] sm:h-[400px] relative flex  items-center justify-center w-full max-w-6xl overflow-hidden">
                {/* Left 'scroll' section with a slightly different shade */}
                <motion.div
                    custom="left" // Custom prop for variant
                    variants={sideVariants} // Animation variants
                    animate={open ? 'open' : 'closed'} // Animation state
                    initial="closed" // Initial animation state
                    className="h-full w-10 sm:w-20 overflow-hidden bg-[#341a09] backdrop-blur-sm rounded-l-xl sm:rounded-l-3xl flex items-center justify-center text-amber-900 font-bold text-lg z-10 shadow-md"
                >
                    <img src={woodTexture} className='h-full' alt="" />
                </motion.div>

                {/* Middle content section - the 'unrolled' scripture, with a paper-like background */}
                <motion.div
                    variants={midVariants} // Animation variants for width and opacity
                    animate={open ? 'open' : 'closed'} // Animation state
                    initial="closed" // Initial animation state
                    style={{ backgroundImage: `url(${paperTeaxture})` }}
                    className="h-full overflow-auto font-serif text-xl leading-relaxed z-0  flex flex-col items-center justify-center font-bold"
                >
                    <div className="space-y-6  px-4 md:px-8 lg:px-12">
                        {/* Chaupai Text */}
                        <div className="text-center text-xl sm:text-3xl font-bold text-orange-900">
                            {data.Chaupai}
                        </div>

                        {/* Location - Support for Hindi and English based on language variable */}
                        <div className="text-sm sm:text-lg italic text-yellow-800">
                            <strong className="text-gray-800">
                                {language === 'hi' ? 'स्थान :' : 'Location :'}
                            </strong>
                            {data.Where_in_Maanas}
                        </div>

                        {/* Meaning - Support for Hindi and English based on language variable */}
                        <div className="text-sm sm:text-md  text-orange-700">
                            <strong className="text-gray-800">
                                {language === 'hi' ? 'भावार्थ :' : 'Meaning :'}
                            </strong>
                            {data.Meaning}
                        </div>

                        {/* Result - Dynamic color based on Result_Color */}
                        <div className={`text-xl sm:text-2xl animate-pulse bg-yellow-400 w-fit p-2 rounded-lg mx-auto font-semibold text-${data.Result_Color}-800`}>
                            🔮 <span>{data.Result}</span>
                        </div>
                    </div>

                </motion.div>


                <motion.div
                    custom="right"
                    variants={sideVariants}
                    animate={open ? 'open' : 'closed'}
                    initial="closed"
                    className=" h-full w-10 sm:w-20 overflow-hidden bg-[#341a09] backdrop-blur-sm rounded-r-xl sm:rounded-r-3xl flex items-center justify-center text-amber-900 font-bold text-lg z-10 shadow-md "
                >
                    <img src={woodTexture} className='h-full' alt="" />
                </motion.div>

            </div>
        </section>
    );
}
