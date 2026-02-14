import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PoojaDetailsSection = ({
  poojaDetails,
  poojaDetailsRef,
  formData,
  setFormData,
  handleSubmit,
}) => {
  const tabs = ["Description", "Significance", "Ingredients", "Procedure"];
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const [selectedPackage, setSelectedPackage] = useState(null); // stores clicked package
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [memberNames, setMemberNames] = useState([]); // array of names input
  const [nameInput, setNameInput] = useState(""); // input field inside modal

  const onConfirmClick = (pkg) => {
    setSelectedPackage(pkg);
    setIsNameModalOpen(true);
  };

  const addName = () => {
    if (nameInput.trim() === "") return;

    let maxNames = 1; // default for Single

    const title = selectedPackage?.poojaPackages?.title;

    if (title === "Couple") maxNames = 2;
    else if (title === "Family") maxNames = 6;

    if (memberNames.length >= maxNames) {
      toast.error(
        `You can add up to ${maxNames} name${maxNames > 1 ? "s" : ""} only.`
      );
      return;
    }

    setMemberNames([...memberNames, nameInput.trim()]);
    setNameInput("");
  };

  const isMaxReached = () => {
    const title = selectedPackage?.poojaPackages?.title;
    const limits = { Single: 1, Couple: 2, Family: 6 };
    return memberNames.length >= (limits[title] || 1);
  };

  const removeName = (nameToRemove) => {
    setMemberNames(memberNames.filter((n) => n !== nameToRemove));
  };

  const onSubmitNames = () => {
    setIsNameModalOpen(false);
    handleSubmit(selectedPackage._id, memberNames);
    setMemberNames([]);
  };

  const packagesRef = useRef(null);

  const sortedOnlinePackages = poojaDetails?.packages
    ?.filter((obj) => obj?.poojaPackages?.typeOfPackage === "onlinepooja")
    ?.sort((a, b) => {
      const order = ["Single", "Couple", "Family"];
      const titleA = a?.poojaPackages?.title || "";
      const titleB = b?.poojaPackages?.title || "";
      return order.indexOf(titleA) - order.indexOf(titleB);
    });

  const handleNext = () => {
    if (activeTabIndex < tabs.length - 1) setActiveTabIndex(activeTabIndex + 1);
  };

  const handlePrev = () => {
    if (activeTabIndex > 0) setActiveTabIndex(activeTabIndex - 1);
  };

  const scrollToPackages = () => {
    packagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const renderContent = () => {
    switch (tabs[activeTabIndex]) {
      case "Description":
        return (
          <ContentCard
            title="Description"
            content={poojaDetails.description}
            image={poojaDetails.images?.[0]?.imageUrl}
          />
        );
      case "Significance":
        return (
          <ContentCard
            title="Significance"
            content={poojaDetails.significance}
            image={poojaDetails.images?.[1]?.imageUrl}
          />
        );
      case "Ingredients":
        return (
          <ContentCard
            title="Ingredients Required"
            content={poojaDetails.ingredients
              ?.map((item) => `• ${item}`)
              .join("\n")}
            image={poojaDetails.images?.[2]?.imageUrl}
          />
        );
      case "Procedure":
        return (
          <ContentCard
            title="Procedure"
            content={poojaDetails.procedure}
            image={poojaDetails.images?.[3]?.imageUrl}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      ref={poojaDetailsRef}
      className="mt-8 p-4 bg-white rounded-2xl shadow-xl"
      id="pooja-details"
    >
      {poojaDetails ? (
        <>
          <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">
            {poojaDetails.poojaName}
          </h2>

          {/* Tabs */}
          <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
            <button
              onClick={handlePrev}
              disabled={activeTabIndex === 0}
              className="text-yellow-600 disabled:opacity-30"
            >
              <ChevronLeft size={24} />
            </button>

            <div className="flex flex-wrap gap-4 justify-center flex-1">
              {tabs.map((tab, index) => (
                <button
                  key={tab}
                  onClick={() => setActiveTabIndex(index)}
                  className={`px-4 py-2 text-sm font-medium transition border-b-2 ${
                    activeTabIndex === index
                      ? "border-yellow-600 text-yellow-600 font-semibold"
                      : "border-transparent text-gray-600"
                  }`}
                >
                  {tab}
                  {/* {tab === "Procedure" && (
                    <button
                      onClick={scrollToPackages}
                      className="ml-10 text-xs bg-yellow-500 text-white px-3 py-2 rounded hover:bg-yellow-600"
                    >
                      Next: View Packages
                    </button>
                  )} */}
                </button>
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={activeTabIndex === tabs.length - 1}
              className="text-yellow-600 disabled:opacity-30"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Tab Content */}
          {renderContent()}

          {/* Packages Section (always visible) */}
          {poojaDetails?.packages && poojaDetails.packages.length > 0 && (
            <div className="mt-10" ref={packagesRef}>
              <h3 className="text-2xl font-bold text-yellow-400  text-center border-t-2 pt-4">
                <span className="text-black"> Puja </span>Packages
              </h3>
              <p className="text-center mb-6 text-gray-600 font-normal text-sm">
                Please click on package to select
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t-2 pt-4">
                {sortedOnlinePackages.map((pkg, index) => (
                  <div
                    key={index}
                    className=" flex flex-col justify-center gap-4 bg-white shadow-md rounded-2xl p-6 border-b-4 border-yellow-400 hover:shadow-lg transition-all"
                  >
                    <h4 className="text-2xl text-center font-bold text-gray-800  ">
                      {pkg.poojaPackages.title}
                    </h4>

                    <p className="text-center font-semibold text-xl">
                      ₹ {pkg.poojaPackages.price}
                    </p>

                    {pkg?.poojaPackages?.title === "Single" ? (
                      <p className="text-center text-sm">
                        For {pkg?.poojaPackages?.NoPepoles} Person{" "}
                      </p>
                    ) : (
                      <p className="text-center text-sm">
                        Upto {pkg?.poojaPackages?.NoPepoles} Person
                      </p>
                    )}
                    <p className="text-sm text-gray-600 italic  text-center">
                      {pkg.poojaPackages.subtitle}
                    </p>
                    <p className="text-gray-700 mb-4 whitespace-pre-line text-center">
                      {pkg.poojaPackages.CustomDescription}
                    </p>

                    <button
                      className="rounded-md w-full bg-yellow-400 py-2"
                      type="button"
                      onClick={() => onConfirmClick(pkg)}
                    >
                      Confirm Package
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <p className="text-gray-500">Select a pooja to see the details.</p>
      )}

      {isNameModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-center">
              Enter Member Names
            </h2>

            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Enter name"
                disabled={isMaxReached()}
                className="flex-1 border px-3 py-1 rounded"
              />
              <button
                onClick={addName}
                disabled={isMaxReached()}
                className="bg-yellow-400 px-3 rounded"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {memberNames.map((name, i) => (
                <div
                  key={i}
                  className="bg-yellow-200 text-sm px-3 py-1 rounded-full flex items-center gap-2"
                >
                  {name}
                  <button
                    className="text-red-500 font-bold"
                    onClick={() => removeName(name)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-between">
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => {
                  setIsNameModalOpen(false);
                  setMemberNames([]);
                }}
              >
                Cancel
              </button>
              <button
                className="bg-yellow-400 px-4 py-2 rounded"
                onClick={onSubmitNames}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Reusable content card component
const ContentCard = ({ title, content, image }) => (
  <div className="mb-6 p-4 rounded-xl shadow flex flex-col md:flex-row items-center gap-4">
    <div className="flex-1">
      <h3 className="text-lg font-semibold text-yellow-600 mb-2">{title}:</h3>
      <p className="text-gray-700 whitespace-pre-line">{content}</p>
    </div>
    {image && (
      <img
        src={image}
        alt={title}
        className="w-64 h-64 object-cover rounded-xl shadow"
      />
    )}
  </div>
);

export default PoojaDetailsSection;
