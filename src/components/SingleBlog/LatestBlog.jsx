import React from "react";
import BlogHeroSectionImage from "../../assets/image/Blogs-HeroSectionImage.png";
import Image from "../../assets/image/Panditji.png";
import BlogImg2 from "../../assets/image/BlogImg2.png";
const LatestBlog = () => {
  return (
    <>
      <div className="px-36 py-8">
        {/* Heading and View All Button */}
        <div className="flex justify-between items-center mb-8 p-6">
          <h2 className="text-3xl font-semibold pl-5 text-gray-800">
            Our Latest Blogs
          </h2>
          <button className="text-yellow-500 border-2 border-yellow-500 font-semibold hover:underline">
            View All
          </button>
        </div>

        {/* 3 Divs with Images, Headings, and Paragraphs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* First Item */}
          <div className="bg-[#FCE20166]  rounded-lg shadow-md ">
            <img
              src={Image}
              alt="Image 1"
              className="w-full h-56 object-cover rounded-lg mb-2"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Vedic Yantras for all your Problems
            </h3>
            <div className="flex w-full">
              <div className="flex-1 justify-start">
                <p>Posted By: Admin</p>
              </div>
              <div className="flex-1 justify-end">
                <p>2024-10-18 13:10:20</p>
              </div>
            </div>
          </div>

          {/* Second Item */}
          <div className="bg-[#FCE20166]  rounded-lg shadow-md ">
            <img
              src={BlogImg2}
              alt="Image 1"
              className="w-full h-56 object-cover rounded-lg mb-2"
            />
            <h3 className="text-lg font-semibold text-gray-800 ">
              नक्षत्रों को जानें : अश्विन , भरणी , कृत्तिका | Nakshatras:Ashwani
            </h3>
            <div className="flex w-full">
              <div className="flex-1 justify-start">
                <p>Posted By: Admin</p>
              </div>
              <div className="flex-1 justify-end">
                <p>2024-10-18 13:10:20</p>
              </div>
            </div>
          </div>

          {/* Third Item */}
          <div className="bg-[#FCE20166]  rounded-lg shadow-md ">
            <img
              src={BlogHeroSectionImage}
              alt="Image 1"
              className="w-full h-56 object-cover rounded-lg mb-2"
            />
            <h3 className="text-lg font-semibold text-gray-800 ">
              नक्षत्रों को जानें : अश्विन , भरणी , कृत्तिका | Nakshatras:Ashwani
            </h3>
            <div className="flex w-full">
              <div className="flex-1 justify-start">
                <p>Posted By: Admin</p>
              </div>
              <div className="flex-1 justify-end">
                <p>2024-10-18 13:10:20</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LatestBlog;
