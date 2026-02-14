import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BigTempleCarousel = ({ data }) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="w-full mx-auto mt-3  h-64 ">
      <Slider {...settings}>
        <div>
          <img
            src={data[0]?.imageurl}
            alt="Slide 1"
            className="h-64 w-full rounded-md object-cover "
          />
        </div>
        <div>
          <img
            src={data[1]?.imageurl}
            alt="Slide 2"
            className="h-64 w-full rounded-md object-cover"
          />
        </div>
        <div>
          <img
            src={data[2]?.imageurl}
            alt="Slide 3"
            className="h-64 w-full rounded-md object-cover"
          />
        </div>
        <div>
          <img
            src={data[3]?.imageurl}
            alt="Slide 3"
            className="h-64 w-full rounded-md object-cover"
          />
        </div>
      </Slider>
    </div>
  );
};

export default BigTempleCarousel;
