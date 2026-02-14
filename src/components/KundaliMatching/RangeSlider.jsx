import React, { useState } from "react";
import "./RangeSlider.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaRegThumbsDown } from "react-icons/fa";

const RangeSlider = ({ min, max, step, score }) => {
  const [value, setValue] = useState(min);

  const handleChange = (event) => {
    setValue(Number(event.target.value));
  };

  const getLabelPosition = (value) => {
    return `${((value - min) / (max - min)) * 100}%`;
  };

  return (
    <div className=" slider-container  relative  ">
      <div
        className="arrow"
        style={{ left: getLabelPosition(score) }}
      >
        <FaMapMarkerAlt />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={score}
        onChange={handleChange}
        className="slider  appearance-none h-3 rounded-lg  "
      />
      {/* <div className="text-sm md:text-base absolute top-4 right-6 md:right-0 text-black font-semibold "> Score: { kundli && kundli.response.score}</div> */}
      <div
        className={`${score < 20 && "text-red-600"} ${score > 20 && score < 25 && "text-yellow-500"
          } ${score > 25 && "text-green-600"
          }  absolute top-14  w-full   font-semibold`}
      >
        {score && (
          <div>
            {score < 20 && (
              <p className="flex items-center justify-center gap-3">
                {" "}
                {score}, OOps , It's a Poor Match{" "}
                <FaRegThumbsDown />
              </p>
            )}
            {score > 20 && score < 25 && (
              <p className="flex items-center justify-center gap-3">
                {" "}
                {score} This is an Average Match{" "}
              </p>
            )}
            {score > 25 && (
              <p className="flex items-center justify-center gap-3 ">
                {" "}
                {score}, Wow! It's a Great Match{" "}
                <FaRegThumbsUp />
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RangeSlider;
