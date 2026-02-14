import React from "react";

function BookingConfirmation() {
  return (
    <div className="flex flex-col items-center p-6 space-y-6 bg-gray-100 min-h-screen w-full">
      <h2 className="text-xl md:text-2xl font-semibold text-green-600 text-center">
        Congratulations! You have successfully booked Prashad
      </h2>
      <p className="text-gray-500 text-center text-sm md:text-base">
        please check SMS / Mail sent to your contact details
      </p>
      <section className="p-6 bg-white rounded-2xl shadow-md w-full max-w-2xl text-sm md:text-base">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <div>
            <p>
              <strong>Tracking ID:</strong> 1234567890
            </p>
            <p>
              <strong>Transaction ID:</strong> 351511859256378
            </p>
          </div>
          <div>
            <p className="font-bold">Prashad</p>
            <p>Nov 16 - 11:25 pm</p>
            <p>NDLS, New Delhi</p>
          </div>
        </div>
        <div className="my-4 border-t border-gray-300" />
        <p className="text-gray-500">Booking email has been sent to:</p>
        <p className="font-semibold">John Woodspear (Primary)</p>
        <p className="text-sm text-gray-500">JohnWoodspear@gmail.com</p>
        <div className="my-4 border-t border-gray-300" />
        <p className="font-bold">Buyer Details</p>
        <p>John Woodspear</p>
        <p>Age: 24 Yrs</p>
        <p>Gender: Male</p>
        <div className="mt-4 text-xl font-bold">Total Amount: ₹3500.00</div>
      </section>
      <div className="flex flex-col items-center space-y-4 w-full">
        <img src="" alt="" className="w-24 h-24 md:w-32 md:h-32" />
        <p className="text-gray-500 text-sm text-center">
          Scan the code at time of delivery
        </p>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 w-full max-w-sm"></div>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-2xl shadow-md w-full max-w-xs md:max-w-sm">
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default BookingConfirmation;
