// import React, { useState } from "react";

// const FeedbackSupport = () => {
//   const [radioContainer, setRadioContainer] = useState("support");

//   const handleChange = (event) => {
//     setRadioContainer(event.target.value);
//   };

//   return (
//     <>
//       <h2 className="font-bold text-xl">Feedback & Support</h2>
//       <h6 className="font-semibold mt-5">Type</h6>
//       <div className="flex gap-10 mt-2">
//         <div className="flex items-center">
//           <input
//             type="radio"
//             name="Select"
//             value="support"
//             checked={radioContainer === "support"}
//             onChange={handleChange}
//             className="size-5"
//           />
//           <label className="ml-2 font-medium">Contact Support</label>
//         </div>
//         <div className="flex items-center">
//           <input
//             type="radio"
//             name="Select"
//             value="Feedback"
//             checked={radioContainer === "Feedback"}
//             onChange={handleChange}
//             className="size-5"
//           />
//           <label className="ml-2 font-medium">Feedback</label>
//         </div>
//       </div>
//       {radioContainer === "support" ? (
//         <form className="flex flex-col items-center gap-10 mt-5">
//           <div className="flex flex-col gap-4 w-full">
//             <label className="font-bold">Email</label>
//             <input
//               className="w-full border rounded border-[#FFD700] p-2 outline-none"
//               type="email"
//               placeholder="Enter your Email Id"
//             />
//             <label className="font-bold">Contact Number</label>
//             <input
//               className="w-full border rounded border-[#FFD700] p-2 outline-none"
//               type="number"
//               placeholder="Enter your contact number"
//             />
//             <label className="font-bold">Subject</label>
//             <input
//               className="w-full border rounded border-[#FFD700] p-2 outline-none"
//               type="text"
//               placeholder="Message subject"
//             />
//             <label className="font-bold">Issue Type</label>
//             <select
//               name=""
//               id=""
//               className="w-full border rounded border-[#FFD700] p-2 outline-none text-[#9ca3af]"
//             >
//               <option value="" selected disabled>
//                 Select Option
//               </option>
//               <option value="">Option 1</option>
//               <option value="">Option 2</option>
//               <option value="">Option 3</option>
//               <option value="">Option 4</option>
//             </select>
//             <label className="font-bold">Suggestion Box</label>
//             <textarea
//               className="w-full border rounded border-[#FFD700] p-2 outline-none resize-none"
//               rows={3}
//               placeholder="How can we help you today?"
//             ></textarea>
//           </div>
//           <button className="bg-[#FFD700] hover:bg-yellow-400 rounded-md w-[180px] sm:w-[280px] h-[50px] font-bold">
//             Send Message
//           </button>
//         </form>
//       ) : (
//         <form className="flex flex-col items-center gap-10 mt-5">
//           <div className="flex flex-col gap-4 w-full">
//             <label className="font-bold">Email</label>
//             <input
//               className="w-full border rounded border-[#FFD700] p-2 outline-none"
//               type="email"
//               placeholder="Enter your Email Id"
//             />
//             <label className="font-bold">Contact Number</label>
//             <input
//               className="w-full border rounded border-[#FFD700] p-2 outline-none"
//               type="number"
//               placeholder="Enter your contact number"
//             />
//             <label className="font-bold">I suggest you</label>
//             <input
//               className="w-full border rounded border-[#FFD700] p-2 outline-none"
//               type="text"
//               placeholder="Enter your idea"
//             />
//             <label className="font-bold">Suggestion Box</label>
//             <textarea
//               className="w-full border rounded border-[#FFD700] p-2 outline-none resize-none"
//               rows={5}
//               placeholder="How can we help you today?"
//             ></textarea>
//           </div>
//           <button className="bg-[#FFD700] hover:bg-yellow-400 rounded-md w-[180px] sm:w-[280px] h-[50px] font-bold">
//             Send Message
//           </button>
//         </form>
//       )}
//     </>
//   );
// };

// export default FeedbackSupport;
import React, { useState } from "react";

const FeedbackSupport = () => {
  const [radioContainer, setRadioContainer] = useState("support");

  const handleChange = (event) => {
    setRadioContainer(event.target.value);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-xl">Feedback & Support</h2>
        {/* Status Indicator for Demo */}
        <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-xs font-semibold text-green-700">Support Online</span>
        </div>
      </div>

      {/* --- 1-to-1 Direct Support Actions (Demo Ready) --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {/* Chat Button */}
        <button className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-yellow-400 rounded-xl hover:bg-yellow-50 hover:border-solid transition-all group">
          <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">💬</span>
          <span className="font-bold text-sm">Start Chat</span>
          <span className="text-[10px] text-gray-400">1-to-1 Instant Message</span>
        </button>

        {/* Voice Call Button */}
        <button className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-yellow-400 rounded-xl hover:bg-yellow-50 hover:border-solid transition-all group">
          <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">📞</span>
          <span className="font-bold text-sm">Voice Call</span>
          <span className="text-[10px] text-gray-400">Direct App Calling</span>
        </button>

        {/* Video Call Button (For Future Backend) */}
        <button className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-yellow-400 rounded-xl hover:bg-yellow-50 hover:border-solid transition-all group">
          <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">🎥</span>
          <span className="font-bold text-sm">Video Call</span>
          <span className="text-[10px] text-gray-400">Secure Video Session</span>
        </button>
      </div>
      {/* ------------------------------------------------ */}

      <h6 className="font-semibold mt-10">Or Send a Message</h6>
      <div className="flex gap-10 mt-2">
        <div className="flex items-center">
          <input
            type="radio"
            name="Select"
            value="support"
            checked={radioContainer === "support"}
            onChange={handleChange}
            className="size-5 accent-[#FFD700]"
          />
          <label className="ml-2 font-medium cursor-pointer">Contact Support</label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            name="Select"
            value="Feedback"
            checked={radioContainer === "Feedback"}
            onChange={handleChange}
            className="size-5 accent-[#FFD700]"
          />
          <label className="ml-2 font-medium cursor-pointer">Feedback</label>
        </div>
      </div>

      {radioContainer === "support" ? (
        <form className="flex flex-col items-center gap-10 mt-5" onSubmit={(e) => e.preventDefault()}>
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
            <select className="w-full border rounded border-[#FFD700] p-2 outline-none text-[#9ca3af]">
              <option value="" disabled selected>Select Option</option>
              <option value="1">Technical Issue</option>
              <option value="2">Account Issue</option>
            </select>
            <label className="font-bold">Suggestion Box</label>
            <textarea
              className="w-full border rounded border-[#FFD700] p-2 outline-none resize-none"
              rows={3}
              placeholder="How can we help you today?"
            ></textarea>
          </div>
          <button className="bg-[#FFD700] hover:bg-yellow-400 rounded-md w-[180px] sm:w-[280px] h-[50px] font-bold transition-all shadow-md">
            Submit Request
          </button>
        </form>
      ) : (
        <form className="flex flex-col items-center gap-10 mt-5" onSubmit={(e) => e.preventDefault()}>
          {/* Feedback form content remains same */}
          <div className="flex flex-col gap-4 w-full">
            <label className="font-bold">Email</label>
            <input className="w-full border rounded border-[#FFD700] p-2 outline-none" type="email" placeholder="Enter your Email Id" />
            <label className="font-bold">I suggest you</label>
            <input className="w-full border rounded border-[#FFD700] p-2 outline-none" type="text" placeholder="Enter your idea" />
            <textarea className="w-full border rounded border-[#FFD700] p-2 outline-none resize-none mt-4" rows={5} placeholder="Your feedback..."></textarea>
          </div>
          <button className="bg-[#FFD700] hover:bg-yellow-400 rounded-md w-[180px] sm:w-[280px] h-[50px] font-bold">
            Send Feedback
          </button>
        </form>
      )}
    </>
  );
};

export default FeedbackSupport;