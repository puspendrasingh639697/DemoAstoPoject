import React, { useState } from "react";

const FeedbackSupport = () => {
  const [radioContainer, setRadioContainer] = useState("support");

  const handleChange = (event) => {
    setRadioContainer(event.target.value);
  };

  return (
    <>
      <h2 className="font-bold text-xl">Feedback & Support</h2>
      <h6 className="font-semibold mt-5">Type</h6>
      <div className="flex gap-10 mt-2">
        <div className="flex items-center">
          <input
            type="radio"
            name="Select"
            value="support"
            checked={radioContainer === "support"}
            onChange={handleChange}
            className="size-5"
          />
          <label className="ml-2 font-medium">Contact Support</label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            name="Select"
            value="Feedback"
            checked={radioContainer === "Feedback"}
            onChange={handleChange}
            className="size-5"
          />
          <label className="ml-2 font-medium">Feedback</label>
        </div>
      </div>
      {radioContainer === "support" ? (
        <form className="flex flex-col items-center gap-10 mt-5">
          <div className="flex flex-col gap-4 w-full">
            <label className="font-bold">Email</label>
            <input
              className="w-full border rounded border-[#FFD700] p-2 outline-none"
              type="email"
              placeholder="Enter your Email Id"
            />
            <label className="font-bold">Contact Number</label>
            <input
              className="w-full border rounded border-[#FFD700] p-2 outline-none"
              type="number"
              placeholder="Enter your contact number"
            />
            <label className="font-bold">Subject</label>
            <input
              className="w-full border rounded border-[#FFD700] p-2 outline-none"
              type="text"
              placeholder="Message subject"
            />
            <label className="font-bold">Issue Type</label>
            <select
              name=""
              id=""
              className="w-full border rounded border-[#FFD700] p-2 outline-none text-[#9ca3af]"
            >
              <option value="" selected disabled>
                Select Option
              </option>
              <option value="">Option 1</option>
              <option value="">Option 2</option>
              <option value="">Option 3</option>
              <option value="">Option 4</option>
            </select>
            <label className="font-bold">Suggestion Box</label>
            <textarea
              className="w-full border rounded border-[#FFD700] p-2 outline-none resize-none"
              rows={3}
              placeholder="How can we help you today?"
            ></textarea>
          </div>
          <button className="bg-[#FFD700] hover:bg-yellow-400 rounded-md w-[180px] sm:w-[280px] h-[50px] font-bold">
            Send Message
          </button>
        </form>
      ) : (
        <form className="flex flex-col items-center gap-10 mt-5">
          <div className="flex flex-col gap-4 w-full">
            <label className="font-bold">Email</label>
            <input
              className="w-full border rounded border-[#FFD700] p-2 outline-none"
              type="email"
              placeholder="Enter your Email Id"
            />
            <label className="font-bold">Contact Number</label>
            <input
              className="w-full border rounded border-[#FFD700] p-2 outline-none"
              type="number"
              placeholder="Enter your contact number"
            />
            <label className="font-bold">I suggest you</label>
            <input
              className="w-full border rounded border-[#FFD700] p-2 outline-none"
              type="text"
              placeholder="Enter your idea"
            />
            <label className="font-bold">Suggestion Box</label>
            <textarea
              className="w-full border rounded border-[#FFD700] p-2 outline-none resize-none"
              rows={5}
              placeholder="How can we help you today?"
            ></textarea>
          </div>
          <button className="bg-[#FFD700] hover:bg-yellow-400 rounded-md w-[180px] sm:w-[280px] h-[50px] font-bold">
            Send Message
          </button>
        </form>
      )}
    </>
  );
};

export default FeedbackSupport;
