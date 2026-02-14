import React from "react";
import kalashicon from "../../assets/image/kalashicon.png";
import conformbooking from "../../assets/image/conformbookingicon.png";
import dakshina from "../../assets/image/dakshinaicon.png";
import formicon from "../../assets/image/formicon.png";
import callicon from "../../assets/image/callicon.png";
import bookpandit from "../../assets/image/bookpanditicon.png";

const HowItWorks = () => {
  const steps = [
    {
      icon: bookpandit,
      number: 1,
      title: "Book Appointment",
      description:
        "Schedule an appointment with a pandit by choosing a suitable date and time.",
    },
    {
      icon: formicon,
      number: 2,
      title: "Fill Details",
      description: "Complete the form with the required details for the pooja.",
    },
    {
      icon: dakshina,
      number: 3,
      title: "Make Payment",
      description: "Proceed with the payment for the booked service.",
    },
    {
      icon: conformbooking,
      number: 4,
      title: "Confirm Booking",
      description:
        "Confirm the booking and receive a confirmation message with details.",
    },
    {
      icon: callicon,
      number: 5,
      title: "Receive Mail",
      description:
        "A mail from our team to confirm the details and discuss any special requirements.",
    },
    {
      icon: kalashicon,
      number: 6,
      title: "Pooja Day",
      description:
        "On the appointed day, the pandit arrives at the scheduled time to perform the pooja.",
    },
  ];

  return (
    <div className="py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-center text-3xl font-bold mb-12">
        How It <span className="text-yellow-400">Works</span>
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step) => (
          <div
            key={step.number}
            className="relative group bg-white hover:bg-yellow-400 hover:cursor-pointer hover:text-white p-6 rounded-lg shadow-lg text-center transition-all duration-300"
          >
            <div className="absolute -top-3 -left-3 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold">
              {step.number}
            </div>

            <div className="flex justify-center mb-4">
              <img
                src={step.icon}
                alt={step.title}
                className="w-28 h-28 transition-all object-cover duration-300 group-hover:invert group-hover:brightness-0"
              />
            </div>

            <h3 className="font-bold mb-2">{step.title}</h3>
            <p className="text-sm">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
