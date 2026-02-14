import React from "react";
import { useState } from "react";
import {
  Check,
  MapPin,
  Users,
  CalendarDays,
  Utensils,
  Plane,
  Train,
  Car,
  Home,
  BookOpen,
  ScrollText,
  Handshake,
  Leaf,
  Heart,
  Sparkles,
  Church,
  Droplet,
  Sun,
  Star,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import PitriPakshaJourney from "../components/PitriPakshaJourney";
import PitriPakshaPlaces from "../components/PitriPakshaPlaces";
import PitriPakshaImportance from "../components/PitriPakshaImportance";
import PitriPakshaDetail from "../components/PitriPakshaDetail";
import ShradhProcedureTravel from "../components/ShradhProcedureTravel";
// import ShradhProcedureTravel from "../components/ShradhProcedureTravel";
// Custom Button Component
const CustomButton = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`px-8 py-3 text-lg bg-yellow-400 hover:bg-yellow-600 text-black rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Custom Form Components
const CustomInput = ({ className = "", ...props }) => {
  return (
    <input
      className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 ${className}`}
      {...props}
    />
  );
};

const CustomLabel = ({ children, className = "", ...props }) => {
  return (
    <label
      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
      {...props}
    >
      {children}
    </label>
  );
};

const CustomTextarea = ({ className = "", ...props }) => {
  return (
    <textarea
      className={`flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 ${className}`}
      {...props}
    />
  );
};

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * CustomRadioGroup is a functional component that acts as a container for radio button items.
 * It manages the selected state of its children, ensuring only one item is selected at a time.
 *
 * @param {Object} props - The props object.
 * @param {ReactNode[]} props.children - The child elements, expected to be instances of CustomRadioGroupItem.
 * @param {string} props.value - The current selected value.
 * @param {function} props.onValueChange - Callback function invoked when the selected value changes.
 * @param {string} [props.className] - Additional custom class names for styling the radio group.
 * @param {Object} [props.props] - Additional properties to be spread onto the containing div.
 */

/*******  e9b99e57-2c44-4478-be09-a08a601756eb  *******/ const CustomRadioGroup =
  ({ children, value, onValueChange, className = "", ...props }) => {
    return (
      <div role="radiogroup" className={className} {...props}>
        {React.Children.map(children, (child) => {
          if (
            React.isValidElement(child) &&
            child.type === CustomRadioGroupItem
          ) {
            return React.cloneElement(child, {
              checked: child.props.value === value,
              onChange: () => onValueChange(child.props.value),
            });
          }
          return child;
        })}
      </div>
    );
  };

const CustomRadioGroupItem = ({
  value,
  id,
  checked,
  onChange,
  className = "",
  ...props
}) => {
  return (
    <input
      type="radio"
      id={id}
      value={value}
      checked={checked}
      onChange={onChange}
      className={`peer h-4 w-4 shrink-0 rounded-full border border-gray-300 text-amber-600 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-amber-600 data-[state=checked]:text-white transition-all duration-200 ${className}`}
      data-state={checked ? "checked" : "unchecked"}
      {...props}
    />
  );
};

export default function PitriPakshaSeva() {
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    emailId: "",
    address: "",
    gotra: "",
    cityStateFrom: "",
    ancestorsNames: "",
    familyMembersAttending: "",
    preferredLocation: "",
    requireAccommodation: "",
    foodPreferences: "",
    additionalRequests: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleRadioChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking Form Data:", formData);
    // Here you would typically send this data to a backend
    alert(
      "Booking request submitted! A representative will contact you shortly."
    );
  };

  return (
    <div className="flex flex-col min-h-screen  text-gray-800">
      {/* Hero Section */}
      <section className="relative w-full h-[400px] flex items-center justify-center text-center overflow-hidden">
        <img
          src="https://images.herzindagi.info/image/2024/Aug/pitru-paksha-2024-start-date-end-date-significance-ritual.jpg"
          alt="Pitri Paksha Shradh Seva"
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-amber-900/60 to-transparent z-10" />
        <div className="relative z-20 p-8 max-w-4xl mx-auto text-white">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight drop-shadow-lg">
            🌼 Pitri Paksha Shradh Seva
          </h1>
          <p className="mt-4 text-xl md:text-2xl font-medium drop-shadow-md">
            Offer peace to your ancestors. Receive blessings for generations.
          </p>
          <a href="#booking-form" className="mt-8">
            <CustomButton>Book Your Shradh Now</CustomButton>
          </a>{" "}
        </div>
      </section>

      <main className="container mx-auto px-4 py-12 space-y-16">
        {<PitriPakshaDetail />}
        {<ShradhProcedureTravel />}
        {<PitriPakshaImportance />}
        {<PitriPakshaPlaces />}
        {<PitriPakshaJourney />}
        {/* Booking Form */}
        <section
          id="booking-form"
          className="bg-yellow-100 p-8 rounded-xl shadow-lg "
        >
          <h2 className="text-4xl font-bold text-amber-900 mb-8 text-center flex items-center justify-center gap-3">
            <CalendarDays className="w-9 h-9 text-amber-700" /> Book Your Pitri
            Paksha Shradh Now
          </h2>
          <p className="text-center text-lg text-gray-700 mb-8">
            Limited slots available for Shradh 2025 – September 5 to September
            19
          </p>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-yellow-50 p-4 rounded-lg shadow-lg"
          >
            <div className="space-y-2">
              <CustomLabel htmlFor="fullName">Full Name:</CustomLabel>
              <CustomInput
                id="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <CustomLabel htmlFor="mobileNumber">Mobile Number:</CustomLabel>
              <CustomInput
                id="mobileNumber"
                type="tel"
                value={formData.mobileNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <CustomLabel htmlFor="emailId">Email ID (optional):</CustomLabel>
              <CustomInput
                id="emailId"
                type="email"
                value={formData.emailId}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <CustomLabel htmlFor="address">Address:</CustomLabel>
              <CustomTextarea
                id="address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <CustomLabel htmlFor="gotra">Gotra (if known):</CustomLabel>
              <CustomInput
                id="gotra"
                value={formData.gotra}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <CustomLabel htmlFor="cityStateFrom">
                City / State you are coming from:
              </CustomLabel>
              <CustomInput
                id="cityStateFrom"
                value={formData.cityStateFrom}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <CustomLabel htmlFor="ancestorsNames">
                Performing Shradh for (Name of Ancestors or Relation):
              </CustomLabel>
              <CustomTextarea
                id="ancestorsNames"
                value={formData.ancestorsNames}
                onChange={handleChange}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <CustomLabel htmlFor="familyMembersAttending">
                Number of family members attending:
              </CustomLabel>
              <CustomInput
                id="familyMembersAttending"
                type="number"
                value={formData.familyMembersAttending}
                onChange={handleChange}
                min="0"
              />
            </div>
            <div className="space-y-2">
              <CustomLabel>Preferred Location:</CustomLabel>
              <CustomRadioGroup
                value={formData.preferredLocation}
                onValueChange={(value) =>
                  handleRadioChange("preferredLocation", value)
                }
                className="flex flex-wrap gap-4"
              >
                <div className="flex items-center space-x-2">
                  <CustomRadioGroupItem value="Gaya Ji" id="location-gaya" />
                  <CustomLabel htmlFor="location-gaya">Gaya Ji</CustomLabel>
                </div>
                <div className="flex items-center space-x-2">
                  <CustomRadioGroupItem
                    value="Varanasi"
                    id="location-varanasi"
                  />
                  <CustomLabel htmlFor="location-varanasi">
                    Varanasi
                  </CustomLabel>
                </div>
                <div className="flex items-center space-x-2">
                  <CustomRadioGroupItem value="Both" id="location-both" />
                  <CustomLabel htmlFor="location-both">Both</CustomLabel>
                </div>
              </CustomRadioGroup>
            </div>
            <div className="space-y-2">
              <CustomLabel>Do you require accommodation?</CustomLabel>
              <CustomRadioGroup
                value={formData.requireAccommodation}
                onValueChange={(value) =>
                  handleRadioChange("requireAccommodation", value)
                }
                className="flex flex-wrap gap-4"
              >
                <div className="flex items-center space-x-2">
                  <CustomRadioGroupItem value="Yes" id="accommodation-yes" />
                  <CustomLabel htmlFor="accommodation-yes">Yes</CustomLabel>
                </div>
                <div className="flex items-center space-x-2">
                  <CustomRadioGroupItem value="No" id="accommodation-no" />
                  <CustomLabel htmlFor="accommodation-no">No</CustomLabel>
                </div>
              </CustomRadioGroup>
            </div>
            <div className="space-y-2">
              <CustomLabel>Food Preferences:</CustomLabel>
              <CustomRadioGroup
                value={formData.foodPreferences}
                onValueChange={(value) =>
                  handleRadioChange("foodPreferences", value)
                }
                className="flex flex-wrap gap-4"
              >
                <div className="flex items-center space-x-2">
                  <CustomRadioGroupItem
                    value="Satvik Bhojan"
                    id="food-satvik"
                  />
                  <CustomLabel htmlFor="food-satvik">
                    Satvik Bhojan (Included)
                  </CustomLabel>
                </div>
                <div className="flex items-center space-x-2">
                  <CustomRadioGroupItem value="Jain Food" id="food-jain" />
                  <CustomLabel htmlFor="food-jain">
                    Jain Food (on request)
                  </CustomLabel>
                </div>
              </CustomRadioGroup>
            </div>
            <div className="space-y-2 md:col-span-2">
              <CustomLabel htmlFor="additionalRequests">
                Any Additional Requests / Instructions:
              </CustomLabel>
              <CustomTextarea
                id="additionalRequests"
                value={formData.additionalRequests}
                onChange={handleChange}
                rows={4}
              />
            </div>
            <div className="md:col-span-2 flex justify-center">
              <CustomButton type="submit">Submit Booking Request</CustomButton>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
