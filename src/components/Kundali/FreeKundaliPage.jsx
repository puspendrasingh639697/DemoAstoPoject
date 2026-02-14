// import React from "react";
// import { useLocation } from "react-router-dom";

// const FreeKundaliPage = () => {
//   const location = useLocation();
//   const formData = location.state; // Access the state directly
//   console.log(formData);
//   return <div className="h-screen">FreeKundaliPage</div>;
// };

// export default FreeKundaliPage;
// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";

// const FreeKundaliPage = () => {
//   const location = useLocation();
//   const formData = location.state; // Access the state directly
//   const [moonSignData, setMoonSignData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (formData) {
//       const {
//         birthDay,
//         birthMonth,
//         birthYear,
//         birthHour,
//         birthMinute,
//         birthPlace,
//       } = formData;

//       // Format the birth date and time in the required format
//       const formattedDOB = `${birthDay}/${birthMonth}/${birthYear}`;
//       const formattedTOB = `${birthHour}:${birthMinute}`;

//       // API URL with the parameters passed from formData
//       const apiUrl =
//         "https://api.vedicastroapi.com/v3-json/extended-horoscope/find-moon-sign?dob=21/04/2021&tob=11:40&lat=11&lon=77&tz=5.5&api_key=f792bbb9-9225-5ead-b181-fe27c7bbb9d9";

//       // Fetch the data from the API
//       const fetchData = async () => {
//         try {
//           const response = await fetch(apiUrl);
//           const result = await response.json();
//           if (result && result.response) {
//             setMoonSignData(result.response); // Store the response data in state
//             setLoading(false); // Set loading to false after data is fetched
//           }
//         } catch (error) {
//           setError("Failed to fetch data"); // Handle errors
//           setLoading(false);
//         }
//       };

//       fetchData(); // Trigger the API call
//     }
//   }, [formData]); // Dependency array ensures the effect runs when formData changes

//   if (loading) {
//     return <div>Loading...</div>; // Display loading while data is being fetched
//   }

//   if (error) {
//     return <div>{error}</div>; // Display error message if something goes wrong
//   }

//   // Display moon sign and prediction data when available
//   return (
//     <div className="h-screen mt-20">
//       <h1 className="text-center text-2xl font-semibold">
//         Free Kundali - Moon Sign
//       </h1>
//       <div className="p-4">
//         {moonSignData ? (
//           <div>
//             <h2 className="text-xl font-semibold">Your Moon Sign:</h2>
//             <p className="mt-2">{moonSignData.moon_sign}</p>
//             <h3 className="mt-4 text-lg font-semibold">Prediction:</h3>
//             <p className="mt-2">{moonSignData.prediction}</p>
//           </div>
//         ) : (
//           <p>No moon sign data available</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FreeKundaliPage;

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const FreeKundaliPage = () => {
  const location = useLocation();
  const formData = location.state; // Access the state directly
  const [moonSignData, setMoonSignData] = useState(null);
  const [sunSignData, setSunSignData] = useState(null);
  const [ascendantData, setAscendantData] = useState(null);
  const [sadeSatiData, setSadeSatiData] = useState(null);
  const [rudrakashData, setRudrakshData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState("moonSign"); // Default to Moon Sign section

  useEffect(() => {
    if (formData) {
      const {
        birthDay,
        birthMonth,
        birthYear,
        birthHour,
        birthMinute,
        birthPlace,
      } = formData;

      // Format the birth date and time in the required format
      const formattedDOB = `${birthDay}/${birthMonth}/${birthYear}`;
      const formattedTOB = `${birthHour}:${birthMinute}`;

      // API URLs with the parameters passed from formData
      const moonSignUrl = `https://api.vedicastroapi.com/v3-json/extended-horoscope/find-moon-sign?dob=21/04/2021&tob=11:40&lat=11&lon=77&tz=5.5&api_key=f792bbb9-9225-5ead-b181-fe27c7bbb9d9`;
      const sunSignUrl = `https://api.vedicastroapi.com/v3-json/extended-horoscope/find-sun-sign?dob=21/04/2021&tob=11:40&lat=11&lon=77&tz=5.5&api_key=f792bbb9-9225-5ead-b181-fe27c7bbb9d9`;
      const ascendantUrl = `https://api.vedicastroapi.com/v3-json/extended-horoscope/find-ascendant?dob=21/04/2021&tob=11:40&lat=11&lon=77&tz=5.5&api_key=f792bbb9-9225-5ead-b181-fe27c7bbb9d9`;
      const sadeSatiUrl = `https://api.vedicastroapi.com/v3-json/extended-horoscope/current-sade-sati?dob=21/04/2021&tob=11:40&lat=11&lon=77&tz=5.5&api_key=f792bbb9-9225-5ead-b181-fe27c7bbb9d9`;
      const rudrakashUrl = `https://api.vedicastroapi.com/v3-json/extended-horoscope/rudraksh-suggestion?dob=21/04/2021&tob=11:40&lat=11&lon=77&tz=5.5&api_key=f792bbb9-9225-5ead-b181-fe27c7bbb9d9`;

      // Function to fetch data from multiple APIs
      const fetchData = async () => {
        try {
          const [
            moonSignResponse,
            sunSignResponse,
            ascendantResponse,
            sadeSatiResponse,
            rudrakshResponse,
          ] = await Promise.all([
            fetch(moonSignUrl),
            fetch(sunSignUrl),
            fetch(ascendantUrl),
            fetch(sadeSatiUrl),
            fetch(rudrakashUrl),
          ]);

          const moonSignResult = await moonSignResponse.json();
          const sunSignResult = await sunSignResponse.json();
          const ascendantResult = await ascendantResponse.json();
          const sadeSatiResult = await sadeSatiResponse.json();
          const rudrakshResult = await rudrakshResponse.json();

          if (moonSignResult.response) {
            setMoonSignData(moonSignResult.response); // Store the moon sign data
          }
          if (sunSignResult.response) {
            setSunSignData(sunSignResult.response); // Store the sun sign data
          }
          if (ascendantResult.response) {
            setAscendantData(ascendantResult.response); // Store the ascendant data
          }
          if (sadeSatiResult.response) {
            setSadeSatiData(sadeSatiResult.response); // Store the Sade Sati data
          }
          if (rudrakshResult.response) {
            setRudrakshData(rudrakshResult.response);
          }

          setLoading(false); // Set loading to false after data is fetched
        } catch (error) {
          setError("Failed to fetch data"); // Handle errors
          setLoading(false);
        }
      };

      fetchData(); // Trigger the API calls
    }
  }, [formData]); // Dependency array ensures the effect runs when formData changes

  if (loading) {
    return <div className="text-center">Loading...</div>; // Display loading while data is being fetched
  }

  if (error) {
    return <div className="text-center">{error}</div>; // Display error message if something goes wrong
  }

  return (
    <div className="h-full py-10 mt-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* Card for displaying formData */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 max-w-4xl mx-auto sm:px-8 sm:py-6">
          <h2 className="text-2xl font-semibold text-center mb-4 text-yellow-500 uppercase tracking-wider">
            Your Details
          </h2>
          <div className="space-y-4">
            <p className="text-lg text-gray-800">
              <span className="font-medium text-gray-600">Name: </span>
              {formData.name}
            </p>
            <p className="text-lg text-gray-800">
              <span className="font-medium text-gray-600">Birth Date: </span>
              {formData.birthDay}/{formData.birthMonth}/{formData.birthYear}
            </p>
            <p className="text-lg text-gray-800">
              <span className="font-medium text-gray-600">Time of Birth: </span>
              {formData.birthHour}:{formData.birthMinute}
            </p>
            <p className="text-lg text-gray-800">
              <span className="font-medium text-gray-600">Birth Place: </span>
              {formData.birthPlace}
            </p>
          </div>
        </div>

        {/* Navbar-like div for navigation */}
        <div className="flex justify-center space-x-6 mb-6">
          <button
            onClick={() => setActiveSection("moonSign")}
            className={`text-lg font-semibold ${
              activeSection === "moonSign" ? "text-yellow-500" : "text-gray-600"
            }`}
          >
            Moon Sign
          </button>
          <button
            onClick={() => setActiveSection("sunSign")}
            className={`text-lg font-semibold ${
              activeSection === "sunSign" ? "text-yellow-500" : "text-gray-600"
            }`}
          >
            Sun Sign
          </button>
          <button
            onClick={() => setActiveSection("ascendant")}
            className={`text-lg font-semibold ${
              activeSection === "ascendant"
                ? "text-yellow-500"
                : "text-gray-600"
            }`}
          >
            Ascendant
          </button>
          <button
            onClick={() => setActiveSection("sadeSati")}
            className={`text-lg font-semibold ${
              activeSection === "sadeSati" ? "text-yellow-500" : "text-gray-600"
            }`}
          >
            Sade Sati
          </button>
          <button
            onClick={() => setActiveSection("rudrakshSuggestion")}
            className={`text-lg font-semibold ${
              activeSection === "rudrakshSuggestion"
                ? "text-yellow-500"
                : "text-gray-600"
            }`}
          >
            Rudraksh Suggestion
          </button>
        </div>

        {/* Conditional rendering based on activeSection */}
        {activeSection === "moonSign" && moonSignData && (
          <div className="bg-white p-6 rounded-lg shadow-lg mb-6 max-w-4xl mx-auto sm:px-8 sm:py-6">
            <h2 className="text-2xl font-semibold text-yellow-500">
              Your Moon Sign:
            </h2>
            <p className="mt-2 text-lg text-gray-800">
              {moonSignData.moon_sign}
            </p>
            <h3 className="mt-4 text-lg font-semibold text-gray-700">
              Prediction:
            </h3>
            <p className="mt-2 text-lg text-gray-800">
              {moonSignData.prediction}
            </p>
          </div>
        )}

        {activeSection === "sunSign" && sunSignData && (
          <div className="bg-white p-6 rounded-lg shadow-lg mb-6 max-w-4xl mx-auto sm:px-8 sm:py-6">
            <h2 className="text-2xl font-semibold text-yellow-500">
              Your Sun Sign:
            </h2>
            <p className="mt-2 text-lg text-gray-800">{sunSignData.sun_sign}</p>
            <h3 className="mt-4 text-lg font-semibold text-gray-700">
              Prediction:
            </h3>
            <p className="mt-2 text-lg text-gray-800">
              {sunSignData.prediction}
            </p>
          </div>
        )}

        {activeSection === "ascendant" && ascendantData && (
          <div className="bg-white p-6 rounded-lg shadow-lg mb-6 max-w-4xl mx-auto sm:px-8 sm:py-6">
            <h2 className="text-2xl font-semibold text-yellow-500">
              Your Ascendant:
            </h2>
            <p className="mt-2 text-lg text-gray-800">
              {ascendantData.ascendant}
            </p>
            <h3 className="mt-4 text-lg font-semibold text-gray-700">
              Prediction:
            </h3>
            <p className="mt-2 text-lg text-gray-800">
              {ascendantData.prediction}
            </p>
          </div>
        )}

        {activeSection === "sadeSati" && sadeSatiData && (
          <div className="bg-white p-6 rounded-lg shadow-lg mb-6 max-w-4xl mx-auto sm:px-8 sm:py-6">
            <h2 className="text-2xl font-semibold text-yellow-500">
              Current Sade Sati:
            </h2>
            <p className="mt-2 text-lg text-gray-800">
              {sadeSatiData.date_considered}
            </p>
            <h2 className="text-2xl font-semibold text-yellow-500 mt-4">
              Shani Period Type:
            </h2>
            <p className="mt-2 text-lg text-gray-800">
              {sadeSatiData.shani_period_type}
            </p>
            <h3 className="mt-4 text-lg font-semibold text-gray-700">
              Prediction:
            </h3>
            <p className="mt-2 text-lg text-gray-800">
              {sadeSatiData.description}
            </p>

            {sadeSatiData.remedies && sadeSatiData.remedies.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-700">
                  Remedies:
                </h3>
                <ul className="list-disc pl-5 mt-2 space-y-2">
                  {sadeSatiData.remedies.map((remedy, index) => (
                    <li key={index} className="text-lg text-gray-800">
                      {remedy}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {activeSection === "rudrakshSuggestion" && rudrakashData && (
          <div className="bg-white p-6 rounded-lg shadow-lg mb-6 max-w-4xl mx-auto sm:px-8 sm:py-6">
            <h2 className="text-2xl font-semibold text-yellow-500">Name:</h2>
            <p className="mt-2 text-lg text-gray-800">{rudrakashData.name}</p>
            <h3 className="mt-4 text-lg font-semibold text-gray-700">
              Mukhi Description:
            </h3>
            <p className="mt-2 text-lg text-gray-800">
              {rudrakashData.mukhi_description}
            </p>
            <h3 className="mt-4 text-lg font-semibold text-gray-700">
              Mukhi for Disease Cure:
            </h3>
            <p className="mt-2 text-lg text-gray-800">
              {rudrakashData.mukhi_for_disease_cure}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FreeKundaliPage;
