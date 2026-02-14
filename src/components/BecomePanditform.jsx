import axios from "axios";
import React, { useState } from "react";
import AppLinks from "./HomePage/AppLinks";

const BecomePanditform = () => {
  const [skills, setSkills] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [qualifications, setQualifications] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [newLanguage, setNewLanguage] = useState("");
  const [newQualification, setNewQualification] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [slug, setSlug] = useState("");
  const [gender, setGender] = useState("");
  const [name, setName] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // Success popup state

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleAddLanguage = () => {
    if (newLanguage.trim()) {
      setLanguages([...languages, newLanguage.trim()]);
      setNewLanguage("");
    }
  };

  const handleAddQualification = () => {
    if (newQualification.trim()) {
      setQualifications([...qualifications, newQualification.trim()]);
      setNewQualification("");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target?.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    skills.forEach((skill) => formData.append("Skills", skill));
    languages.forEach((lang) => formData.append("languages", lang));
    qualifications.forEach((q) =>
      formData.append("ProfessionalQualifications", q)
    );
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}api/addpandit`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Success:", response.data);
      setShowSuccessPopup(true); // Show success popup

      // Optional: Clear form after submit
      form.reset();
      setSkills([]);
      setLanguages([]);
      setQualifications([]);
      setSelectedFile(null);
      setSlug("");
      setGender("");
      setName("");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting the form.");
    }
  };

  return (
    <>
      <div
        className="relative bg-cover bg-center h-[80vh] flex items-center justify-center text-white"
        style={{
          backgroundImage: `url('https://img.freepik.com/premium-photo/concept-astrology-horoscope-person-inside-zodiac-sign-wheel-astrological-zodiac-signs-inside-horoscope-circle-astrology-knowledge-stars-sky-power-universe-concept_35148-8975.jpg')`, // Replace with your bg image URL
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>

        {/* Content */}
        <div className="relative z-10 max-w-3xl text-center px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Join Our Spiritual Journey
          </h1>
          <p className="text-lg md:text-xl leading-relaxed">
            Share your divine knowledge and connect with seekers around the
            world. Choose your path and become part of our enlightened
            community.
          </p>
          {/* Optional CTA */}
          <button className="mt-6 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full font-medium transition">
            Join Now
          </button>
        </div>
      </div>
      <div className="max-w-7xl  mx-auto">
        <div>
          <h1 className="text-3xl flex justify-center items-center p-5 font-bold my-4 text-black">
            Join us as a Pandit
          </h1>
        </div>
        <div className="flex min-h-screen items-center justify-center  p-4">
          <div className="flex w-full max-w-5xl h-[90vh] rounded-xl bg-white shadow-lg overflow-hidden">
            {/* Left Section */}
            <div className="w-1/2 bg-yellow-400 p-10 flex flex-col justify-center items-center text-center sticky top-0 h-[90vh]">
              <div className="mb-6 relative w-32 h-32 mx-auto">
                <img
                  src={
                    selectedFile
                      ? URL.createObjectURL(selectedFile)
                      : "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                  }
                  alt="avatar"
                  className="w-full h-full object-cover rounded-full bg-white p-2"
                />
                <label
                  htmlFor="avatar-upload"
                  className="absolute bottom-1 right-1 bg-white p-2 rounded-full cursor-pointer hover:bg-yellow-500 shadow-lg"
                  title="Edit"
                >
                  ✎
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Become a Pandit
              </h1>
              <h2 className="text-2xl font-semibold text-gray-900">
                Let’s get you set up
              </h2>
              <p className="text-sm text-gray-800 mt-2">
                It should only take a couple of minutes to pair with your watch
              </p>
              <button className="mt-6 bg-gray-900 text-white rounded-full p-3 text-lg">
                &rarr;
              </button>
            </div>

            {/* Right Section */}
            <form
              onSubmit={handleSubmit}
              className="w-1/2 p-10 space-y-5 overflow-y-auto h-[90vh]"
            >
              <input type="hidden" name="slug" value={slug} />

              {/* Name */}
              <div>
                <label className="text-gray-600 block mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => {
                    const value = e.target.value;
                    setName(value);
                    setSlug(value.toLowerCase().replace(/\s+/g, "-"));
                  }}
                  className="w-full border border-gray-300 rounded p-2"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                {/* Gender */}
                <div className="w-full md:w-1/2">
                  <label className="text-gray-600 block mb-1">Gender</label>
                  <div className="flex space-x-6">
                    {["male", "female"].map((g) => (
                      <label key={g} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="gender"
                          value={g}
                          checked={gender === g}
                          onChange={() => setGender(g)}
                          className="accent-yellow-500"
                          required
                        />
                        <span className="capitalize">{g}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* DOB */}
                <div className="w-full md:w-1/2">
                  <label className="text-gray-600 block mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dob"
                    className="w-full border border-gray-300 rounded p-2"
                    required
                  />
                </div>
              </div>

              {/* Contact Info */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/2">
                  <label className="text-gray-600 block mb-1">Mobile</label>
                  <input
                    type="tel"
                    name="mobile"
                    className="w-full border border-gray-300 rounded p-2"
                    placeholder="Mobile Number"
                    required
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label className="text-gray-600 block mb-1">
                    Alternative Mobile
                  </label>
                  <input
                    type="tel"
                    name="altNumber"
                    className="w-full border border-gray-300 rounded p-2"
                    placeholder="Alternate Number"
                  />
                </div>
              </div>

              {/* Skills */}
              <div>
                <label className="block text-gray-800 mb-1">Skills:</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-yellow-200 px-2 py-1 rounded text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="flex">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-l p-2"
                    placeholder="Add a skill"
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="bg-yellow-400 text-white px-3 rounded-r hover:bg-yellow-500"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Languages */}
              <div>
                <label className="block text-gray-800 mb-1">Languages:</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {languages.map((lang, index) => (
                    <span
                      key={index}
                      className="bg-yellow-200 px-2 py-1 rounded text-sm"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
                <div className="flex">
                  <input
                    type="text"
                    value={newLanguage}
                    onChange={(e) => setNewLanguage(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-l p-2"
                    placeholder="Add a language"
                  />
                  <button
                    type="button"
                    onClick={handleAddLanguage}
                    className="bg-yellow-400 text-white px-3 rounded-r hover:bg-yellow-500"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Qualifications */}
              <div>
                <label className="block text-gray-800 mb-1">
                  Professional Qualifications:
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {qualifications.map((q, index) => (
                    <span
                      key={index}
                      className="bg-yellow-200 px-2 py-1 rounded text-sm"
                    >
                      {q}
                    </span>
                  ))}
                </div>
                <div className="flex">
                  <input
                    type="text"
                    value={newQualification}
                    onChange={(e) => setNewQualification(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-l p-2"
                    placeholder="Add a qualification"
                  />
                  <button
                    type="button"
                    onClick={handleAddQualification}
                    className="bg-yellow-400 text-white px-3 rounded-r hover:bg-yellow-500"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Experience */}
              <div>
                <label className="block text-gray-800 mb-1">Experience:</label>
                <input
                  type="text"
                  name="experience"
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-gray-800 mb-1">Description:</label>
                <textarea
                  name="description"
                  className="w-full border border-gray-300 rounded p-2 h-24"
                />
              </div>

              {/* City & Belongs To */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/2">
                  <label className="block text-gray-800 mb-1">City:</label>
                  <input
                    type="text"
                    name="city"
                    className="w-full border border-gray-300 rounded p-2"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label className="block text-gray-800 mb-1">
                    Belongs To:
                  </label>
                  <input
                    type="text"
                    name="belongsTo"
                    className="w-full border border-gray-300 rounded p-2"
                  />
                </div>
              </div>

              {/* Pincode & Slug */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/2">
                  <label className="block text-gray-800 mb-1">Pincode:</label>
                  <input
                    type="text"
                    name="pincode"
                    className="w-full border border-gray-300 rounded p-2"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label className="text-gray-600 block mb-1">Slug</label>
                  <input
                    type="text"
                    value={slug}
                    readOnly
                    name="slugDisplay"
                    className="w-full border border-gray-300 rounded p-2 bg-gray-100"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  className="px-6 py-2 rounded border border-gray-400 text-gray-700 hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded bg-yellow-400 text-white hover:bg-yellow-500"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Success Modal */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md text-center">
            <h2 className="text-xl font-semibold mb-2 text-green-600">
              Success!
            </h2>
            <p className="text-gray-700 mb-4">
              ✅ We received your request successfully! Our team will reach out
              to you shortly for verification. 🙏
            </p>
            <button
              onClick={() => setShowSuccessPopup(false)}
              className="bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-500"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <AppLinks />
    </>
  );
};

export default BecomePanditform;
