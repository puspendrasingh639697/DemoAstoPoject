import React from "react";
import { useNavigate } from "react-router-dom";
import Arrow from "../../assets/BookEPooja/Arrow.png";

function TempleCard({ obj }) {
  const navigate = useNavigate();

  const placeholderImageUrl = "https://placehold.co/600x400/FFD700/000000?text=Temple";

  return (
   <div className="w-full">
     <div className="border border-gray-200 rounded-lg shadow-md h-fit w-auto overflow-hidden mx-auto">
      <img
        src={obj?.img?.[0]?.imageurl || placeholderImageUrl}
        alt={obj?.name ? `${obj.name} Temple Image` : "Temple Image"}
        loading="lazy"
        className="aspect-video w-full object-cover rounded-t-lg"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = placeholderImageUrl;
        }}
      />

      <div className="p-4 w-full">
        <div className="font-semibold text-lg text-start w-full whitespace-nowrap overflow-hidden text-ellipsis" title={obj?.name}>
          {obj?.name}
        </div>
        <div className="pt-1 text-sm text-gray-600">
          {obj?.place}
        </div>

        <div className="mt-4 border-t border-gray-200 pt-3">
          <button
            onClick={() => {
              navigate(`/epooja-details/${obj?._id}`);
            }}
            className="flex items-center justify-center gap-2 font-bold w-full p-2 bg-[rgba(255,215,0,1)] text-black rounded-md shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            Book Now <img src={Arrow} alt="Arrow icon" className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
   </div>
  );
}

export default TempleCard;
