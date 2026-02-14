import React from "react";
import { Link } from "react-router-dom"; // Importing Link component
import Room from "../../assets/image/Room.png";
import PanditPackage from "../../assets/image/PanditPackageImg.jpeg";

const cardData = [
  {
    id: 0,
    image: PanditPackage,
    category: "Digital marketing",
    title: "On-Page SEO: Factors to Optimize for Organic Success",
    route: "/single-blog",
  },
  {
    id: 2,
    image: Room,
    category: "Digital marketing",
    title: "Sitecore Symposium 2024: Key Highlights and Innovations",
    route: "/single-blog",
  },
  {
    id: 3,
    image: PanditPackage,
    category: "Digital marketing",
    title: "On-Page SEO: Factors to Optimize for Organic Success",
    route: "/single-blog",
  },
  {
    id: 4,
    image: Room,
    category: "Digital marketing",
    title: "Sitecore Symposium 2024: Key Highlights and Innovations",
    route: "/single-blog",
  },
  {
    id: 5,
    image: PanditPackage,
    category: "Digital marketing",
    title: "On-Page SEO: Factors to Optimize for Organic Success",
    route: "/single-blog",
  },
  {
    id: 6,
    image: Room,
    category: "Digital marketing",
    title: "Sitecore Symposium 2024: Key Highlights and Innovations",
    route: "/single-blog",
  },
];

const BlogList = () => {
  return (
    <>
      <div className="mt-10 text-center">
        <p className="text-[#6C757D] font-medium">BLOG</p>
        <h1 className="text-black font-medium text-3xl">
          Know about our services
        </h1>
      </div>

      {/* Featured Article Section */}
      <div className="flex flex-col md:flex-row items-center justify-between px-4 space-y-4 md:space-y-0 mt-3 mx-4 md:mx-40">
        <div className="flex-shrink-0 w-full md:w-1/2">
          <img
            src={Room}
            alt="Description"
            className="w-full h-auto rounded-lg"
          />
        </div>
        <div className="w-full md:w-1/2 text-center md:text-left m-2">
          <p className="text-[#6C757D]">Featured Article</p>
          <h2 className="text-2xl font-semibold mb-4">
            Why Keyword Mapping is Crucial for
          </h2>
          <p className="text-lg text-[#6C757D]">
            Learn how to create a keyword map to help align your website's
            content with search intent, allowing you to attract more traffic and
            grow organic traffic.
          </p>
        </div>
      </div>

      {/* Filter Results Section */}
      <div className="mt-11">
        <h1 className="flex justify-center items-center text-lg font-semibold">
          Filter results by Topic
        </h1>
        <div className="flex justify-center items-center mt-5 flex-wrap gap-2">
          {/* Filter buttons */}
          <div className="border-2 border-yellow-400 rounded-lg px-4 py-1 hover:bg-yellow-300">
            Latest Articles
          </div>
          <div className="border-2 border-yellow-400 rounded-lg px-4 py-1 hover:bg-yellow-300">
            Astrology
          </div>
          <div className="border-2 border-yellow-400 rounded-lg px-4 py-1 hover:bg-yellow-300">
            Astrocounselor
          </div>
          <div className="border-2 border-yellow-400 rounded-lg px-4 py-1 hover:bg-yellow-300">
            Neumerology
          </div>
          <div className="border-2 border-yellow-400 rounded-lg px-4 py-1 hover:bg-yellow-300">
            Pooja
          </div>
        </div>
        <div className="flex justify-center items-center mt-2 flex-wrap gap-2">
          <div className="border-2 border-yellow-400 rounded-md px-4 py-1 hover:bg-yellow-300">
            Vastu
          </div>
          <div className="border-2 border-yellow-400 rounded-md px-4 py-1 hover:bg-yellow-300">
            News
          </div>
        </div>
      </div>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-x-8 gap-y-10 p-4 mx-4 sm:mx-8 md:mx-16 lg:mx-28">
        {cardData.map((card) => (
          <Link
            to={card.route}
            key={card.id}
            className="p-1 rounded-lg w-full max-w-xs mx-auto"
          >
            <div className="cursor-pointer">
              <img
                src={card.image}
                alt="img"
                className="rounded-md h-44 w-full object-cover"
              />
              <p className="text-xs text-gray-500 mt-2">{card.category}</p>
              <p className="text-lg font-semibold">{card.title}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center items-center m-5">
        <button className="text-black font-semibold px-8 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500">
          Load More
        </button>
      </div>
    </>
  );
};

export default BlogList;
