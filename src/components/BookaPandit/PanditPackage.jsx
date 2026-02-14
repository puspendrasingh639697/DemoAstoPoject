import React from "react";
import PanditPackageImg from "../../assets/image/PanditPackageImg.jpeg";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { astroContext } from "../../context/astroContext";

const PanditPackage = () => {
  const { setBookingData, loading, setLoading } = useContext(astroContext);
  const hasFetched = useContext(astroContext);

  const { id } = useParams();
  const [poojaDetails, setPoojaDetails] = useState(null);
  const [packages, setPackages] = useState([]);

  const navigate = useNavigate();

  const handlePackageClick = (pack) => {
    console.log(pack);
    setBookingData((prev) => ({ ...prev, packageId: pack?._id }));
    navigate("/panditform");
  };

  const fetchPoojaDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}api/PoojaDetails/${id}`
      );
      const data = await response.json();
      console.log(data);
      if (data?.success) {
        setPoojaDetails(data?.pooja);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPoojaPackages = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}api/get-pacakge-by-poojaid/${id}`
      );
      const data = await response.json();

      console.log(data?.data);
      if (data?.success) {
        setPackages(
          data?.data.filter((obj) => obj.typeOfPackage === "offlinepooja")
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  console.log(packages);

  useEffect(() => {
    if (!hasFetched.current) {
      fetchPoojaDetails();
      fetchPoojaPackages();
      hasFetched.current = true;
    }
  }, [id]);

  return (
    <>
      <section className="scroll-smooth ">
        <div className="bg-[#F3F4F6]">
          <h1 className="text-3xl sm:text-4xl text-center p-6 sm:p-10 font-bold">
            Select Your <span className="text-[#FACC15]">Arrangement</span>
          </h1>
          <div className="flex flex-col lg:flex-row px-6 sm:px-10 pb-10 gap-6 sm:gap-7">
            <div className="lg:w-1/2 bg-white flex flex-col items-center p-6 rounded-lg shadow-md hover:scale-105 duration-500 border border-[#E5E7EB]">
              <div>
                <h3 className="text-lg sm:text-xl font-semibold">
                  {packages[0]?.title}
                </h3>
                <p className="text-sm sm:text-lg text-[#6B7280]">
                  {packages[0]?.subtitle}
                </p>
                <p className="text-[#FACC15] text-2xl sm:text-3xl my-3">
                  ₹{packages[0]?.price}
                </p>
                <p className="text-[#6B7280] text-sm sm:text-base text-justify">
                  {packages[0]?.CustomDescription}
                </p>
                <ul className="text-[#6B7280] text-sm sm:text-base list-disc px-5 mt-2">
                  <li className="mt-2">Comprehensive Pooja Setup</li>
                  <li className="mt-2">Convenient Service</li>
                  <li className="mt-2">Expert Guidance</li>
                  <li className="mt-2">Time-Saving</li>
                </ul>
                <a
                  href="#materials"
                  className="text-[#3B82F6] text-sm sm:text-base"
                >
                  Click here to view the Materials Included
                </a>
              </div>
              <button
                className="w-28 sm:w-32 h-12 bg-[#FACC15] rounded-md text-[#FFFFFF] text-center text-sm sm:text-base font-bold mt-2 hover:bg-yellow-500"
                onClick={() => {
                  handlePackageClick(packages[0]);
                }}
              >
                Book Now
              </button>
            </div>
            <div className="lg:w-1/2 bg-white flex flex-col items-center p-6 rounded-lg shadow-md hover:scale-105 duration-500 border border-[#E5E7EB]">
              <div>
                <h3 className="text-lg sm:text-xl font-semibold">
                  {packages[1]?.title}
                </h3>
                <p className="text-sm sm:text-lg text-[#6B7280]">
                  {packages[1]?.subtitle}
                </p>
                <p className="text-[#FACC15] text-2xl sm:text-3xl my-3">
                  ₹{packages[1]?.price}
                </p>
                <p className="text-[#6B7280] text-sm sm:text-base text-justify">
                  {packages[1]?.CustomDescription}
                </p>
                <ul className="text-[#6B7280] text-sm sm:text-base list-disc px-5 mt-2">
                  <li className="mt-2">Customized Materials</li>
                  <li className="mt-2">Expert Services</li>
                  <li className="mt-2">Flexible Budget</li>
                  <li className="mt-2">Personalized Experience</li>
                </ul>
              </div>
              <button
                className="w-28 sm:w-32 h-12 bg-[#FACC15] rounded-md text-[#FFFFFF] text-center text-sm sm:text-base font-bold mt-2 hover:bg-yellow-500"
                onClick={() => handlePackageClick(packages[1])}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>

        <section className="lg:px-20 px-6">
          <div className="flex flex-col sm:flex-row sm:items-center py-5 md:gap-10">
            <div className="flex items-center sm:w-1/3">
              <img
                src={PanditPackageImg}
                alt="Rudrabhishekimage"
                className="h-[350px] sm:w-full object-cover rounded-lg"
              />
            </div>
            <div className="mt-4 sm:mt-0 sm:w-2/3">
              <h1 className="font-bold text-2xl lg:text-4xl text-[#FFD700]">
                {poojaDetails?.poojaName}
              </h1>
              <p className="text-[#6B7280] text-sm sm:text-base text-justify md:mt-4">
                {poojaDetails?.description}
              </p>
            </div>
          </div>

          <h1 className="font-bold text-2xl lg:text-4xl text-[#FFD700]">
            Significance of this Pooja
          </h1>
          <p className="text-[#6B7280] text-sm sm:text-base text-justify md:mt-4">
            {poojaDetails?.significance}
          </p>
          <div className="flex flex-col sm:flex-row md:gap-12 md:py-10">
            <div className="mt-4 sm:mt-0 md:w-1/2">
              <h1
                id="materials"
                className="font-bold text-2xl lg:text-4xl text-[#FFD700]"
              >
                Ingredients required for this Pooja
              </h1>
              <p className="text-[#6B7280] text-sm sm:text-base text-justify md:mt-4 lg:w-3/4">
                Each item used in this Pooja is symbolic and carries deep
                spiritual meaning. While you can arrange the materials based on
                the list shared, feel free to consult with our Pandit Ji for any
                substitutions or region-specific changes. Ensuring you have all
                the essentials helps make the ritual smooth and auspicious.
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                {["Modak", "Kumkum", "Coconut", "Agarbatti"].map(
                  (item, index) => (
                    <span
                      key={index}
                      className="bg-[#FFD700] text-black px-3 py-1 text-sm font-medium rounded-full shadow-sm"
                    >
                      {item}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="flex items-center mt-4 sm:mt-0">
              <img
                src={PanditPackageImg}
                alt="Ingredientsimage"
                className="h-[280px] md:w-[300px] w-full object-cover rounded-lg"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between md:gap-12">
            <div className="mt-4 sm:mt-0 md:w-1/2">
              <h1 className="font-bold text-2xl lg:text-4xl text-[#FFD700]">
                Procedure of this Pooja
              </h1>
              <p className="text-[#6B7280] text-sm sm:text-base text-justify md:mt-4 lg:w-3/4">
                Opt for our 'Only Pandit' package for a personalized Pooja
                experience. Our seasoned Pandits will come prepared to conduct
                the ceremony, and you can provide the materials yourself. This
                package is perfect for those who prefer to manage the Pooja
                essentials independently while still receiving expert guidance
                and performance.
              </p>
            </div>
            <div className="flex items-center mt-4 sm:mt-0">
              <img
                src={PanditPackageImg}
                alt="Procedureimage"
                className="h-[280px] md:w-[300px] w-full object-cover rounded-lg"
              />
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default PanditPackage;
