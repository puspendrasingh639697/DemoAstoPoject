import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Using placeholder image since we don't have access to the original
const placeholderImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23e5e7eb'/%3E%3Ctext x='50' y='50' text-anchor='middle' dy='0.3em' font-family='Arial' font-size='14' fill='%23374151'%3EProfile%3C/text%3E%3C/svg%3E";

const testimonials = [
  {
    id: 1,
    name: "Maxin Will",
    role: "Product Manager",
    image: placeholderImage,
    rating: 4,
    review:
      "The team took time to understand our vision and delivered a sleek, professional site that not only looks great but also improved our conversion rates.",
  },
  {
    id: 2,
    name: "Sarah Smith",
    role: "UX Designer",
    image: placeholderImage,
    rating: 5,
    review:
      "The team took time to understand our vision and delivered a sleek, professional site that not only looks great but also improved our conversion rates.",
  },
  {
    id: 3,
    name: "David Lee",
    role: "CTO",
    image: placeholderImage,
    rating: 4,
    review:
      "The team took time to understand our vision and delivered a sleek, professional site that not only looks great but also improved our conversion rates.",
  },
  {
    id: 4,
    name: "Emily Zhang",
    role: "Marketing Lead",
    image: placeholderImage,
    rating: 5,
    review:
      "The team took time to understand our vision and delivered a sleek, professional site that not only looks great but also improved our conversion rates.",
  },
  {
    id: 5,
    name: "James Park",
    role: "Business Analyst",
    image: placeholderImage,
    rating: 4,
    review:
      "The team took time to understand our vision and delivered a sleek, professional site that not only looks great but also improved our conversion rates.",
  },
];

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);

  // Calculate how many testimonials to show based on screen size
  const getVisibleCount = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width >= 1024) return 3; // lg screens
      if (width >= 768) return 2;  // md screens
      return 1; // sm screens
    }
    return 1;
  };

  // Update visible count on window resize
  useEffect(() => {
    const handleResize = () => {
      const newVisibleCount = getVisibleCount();
      setVisibleCount(newVisibleCount);
      // Reset current index if it's out of bounds
      setCurrentIndex(0);
    };

    // Set initial visible count
    setVisibleCount(getVisibleCount());

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalSlides = Math.ceil(testimonials.length / visibleCount);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="max-w-7xl mx-auto my-12 px-4">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">
        Customer Reviews
      </h1>
      
      <div className="relative">
        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-2 rounded-full shadow-lg bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 transition-all duration-200"
          aria-label="Previous testimonials"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-2 rounded-full shadow-lg bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 transition-all duration-200"
          aria-label="Next testimonials"
        >
          <ChevronRight size={24} />
        </button>

        {/* Testimonials Container */}
        <div className="overflow-hidden mx-8">
          <div 
            className="flex transition-transform duration-300 ease-in-out"
            style={{ 
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
              <div 
                key={slideIndex}
                className="w-full flex-shrink-0 grid gap-4 md:gap-6"
                style={{
                  gridTemplateColumns: `repeat(${visibleCount}, 1fr)`
                }}
              >
                {testimonials
                  .slice(slideIndex * visibleCount, (slideIndex + 1) * visibleCount)
                  .map((item) => (
                    <div key={item.id} className="w-full max-w-sm mx-auto">
                      <div className="overflow-hidden rounded-2xl bg-white shadow-lg m-2">
                        {/* Rating Section */}
                        <div className="mb-2 flex items-center gap-1 px-6 pt-4">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`h-4 w-4 md:h-5 md:w-5 fill-current ${
                                  i < item.rating ? "text-yellow-400" : "text-gray-300"
                                }`}
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="ml-2 text-base md:text-lg font-semibold text-gray-900">
                            {item.rating}/5
                          </span>
                        </div>

                        {/* Review Section */}
                        <div className="bg-yellow-400">
                          <p className="text-gray-700 rounded-br-[40px] bg-white p-3 md:p-4 text-xs md:text-sm leading-relaxed">
                            {item.review}
                          </p>
                        </div>

                        {/* Profile Section */}
                        <div className="relative overflow-hidden rounded-tl-[40px] bg-yellow-400 p-4 md:p-6">
                          <div className="relative z-10 flex items-center">
                            <div className="mr-3 md:mr-4 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-black text-lg font-bold text-white overflow-hidden">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="rounded-full aspect-square w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <h3 className="text-base md:text-lg font-bold text-black">
                                {item.name}
                              </h3>
                              <p className="text-xs md:text-sm text-black opacity-80">
                                {item.role}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                currentIndex === index
                  ? 'bg-yellow-400 w-6'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}