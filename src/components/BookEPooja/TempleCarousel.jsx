import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TempleCarousel = ({ data }) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  console.log(data);

  return (
    <div className="w-full mx-auto mt-3  h-16 ">
      <Slider {...settings}>
        <div>
          <img
            src={data[0]?.imageurl}
            alt="Slide 1"
            width={100}
            className="h-16 rounded-md"
          />
        </div>
        <div>
          <img
            src={data[1]?.imageurl}
            alt="Slide 2"
            width={100}
            className="h-16 rounded-md"
          />
        </div>
        <div>
          <img
            src={data[2]?.imageurl}
            alt="Slide 3"
            width={100}
            className="h-16 rounded-md"
          />
        </div>
        <div>
          <img
            src={data[3]?.imageurl}
            alt="Slide 4"
            width={100}
            className="h-16 rounded-md"
          />
        </div>
      </Slider>
    </div>
  );
};

export default TempleCarousel;
