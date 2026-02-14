import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CustomerImage from "../../assets/image/CustomerImage.png";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Ramesh K.",
      role: "Engineer",
      review:
        "You won't regret it. I would like to personally thank you for your outstanding service. Absolutely wonderful!",
      image: CustomerImage,
    },
    {
      name: "Megen W.",
      role: "Designer",
      review:
        "Just what I was looking for. Your service managed to exceed my expectations at all times.",
      image: CustomerImage,
    },
    {
      name: "Anita P.",
      role: "Teacher",
      review:
        "Amazing! I can't imagine a better experience. The level of detail is remarkable.",
      image: CustomerImage,
    },
  ];

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-screen-lg mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-4">
          This Is What Our Customers Say
        </h2>
        <p className="text-gray-600 mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          dui.
        </p>
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="p-6 bg-yellow-200 rounded-lg shadow-lg">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full mx-auto mb-4"
              />
              <p className="text-gray-700 italic mb-4">
                "{testimonial.review}"
              </p>
              <h3 className="text-lg font-bold">{testimonial.name}</h3>
              <p className="text-gray-500 text-sm">{testimonial.role}</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Testimonials;
