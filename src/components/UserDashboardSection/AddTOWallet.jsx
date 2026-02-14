import React, { useState } from "react";
import arrow from "../../assets/Arrow.png";
import wallet from "../../assets/wallet.png";
import { useNavigate } from "react-router-dom";

const AddTOWallet = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");

  const handleAmountClick = (value) => {
    setAmount(value);
  };

  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-10">
      <div className="flex gap-2 items-center">
        <img
          src={arrow}
          alt="add-money"
          className="w-5 h-5"
          onClick={() => navigate(-1)}
        />
        <h1 className="text-xl font-semibold">Add Money to wallet</h1>
      </div>
      <div className="flex justify-end">
        <div className="flex gap-2 justify-center mt-6 items-center shadow border rounded-2xl p-1 w-32">
          <img src={wallet} alt="wallet" className="w-5 h-5" />
          <h1 className="text-xl font-bold">₹25.00</h1>
        </div>
      </div>

      <h1 className="flex justify-center font-normal mt-6 text-xl mb-10 text-center">
        Minimum 15 mins chat required
      </h1>

      <div className="border-t border-b border-[#D0D0D0] py-4 mt-6 relative">
        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-[100%] text-center bg-white px-6 py-1 rounded-full">
          <h1 className="font-semibold text-xl">Quick Add</h1>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 top-[110%] -translate-y-[100%] text-center bg-white px-6 py-1 rounded-full">
          <h1 className="font-semibold text-xl">Or</h1>
        </div>

        <div className="flex flex-wrap justify-between gap-5 mx-6 py-8">
          <div
            className="flex justify-center items-center rounded-3xl shadow-lg border hover:bg-[#FFD700] hover:shadow-lg px-11 py-6 cursor-pointer"
            onClick={() => handleAmountClick("25")}
          >
            <h1 className="font-semibold text-3xl">₹25</h1>
          </div>

          <div
            className="flex justify-center items-center rounded-3xl shadow-lg border hover:bg-[#FFD700] hover:shadow-lg px-11 py-6 cursor-pointer"
            onClick={() => handleAmountClick("30")}
          >
            <h1 className="font-semibold text-3xl">₹30</h1>
          </div>

          <div
            className="flex justify-center items-center rounded-3xl shadow-lg border hover:bg-[#FFD700] hover:shadow-lg px-11 py-6 cursor-pointer"
            onClick={() => handleAmountClick("50")}
          >
            <h1 className="font-semibold text-3xl">₹50</h1>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-10 w-full">
        <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
          <label htmlFor="amount" className="text-xl font-normal block mb-2">
            Enter Amount:
          </label>
          <div className="relative">
            {/* Input box with ₹ sign */}
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl">
              ₹
            </span>
            <input
              type="text"
              id="amount"
              name="amount"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="py-3 px-3 pl-8 w-full border border-[#D0D0D0] rounded-lg focus:outline-none text-lg font-normal"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-3 justify-center mt-10">
        <div>
          <div className="flex gap-10 m-2 p-4 shadow-lg rounded-3xl">
            <div className="mt-2">
              <span className="font-semibold">₹ </span>
              <input
                readOnly
                disabled
                type="text"
                id="amount"
                name="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="font-semibold bg-white"
              />
              <p className="text-sm text-[#666666]">View details</p>
            </div>
            <h1 className="bg-[#FFD700] hover:bg-yellow-400 rounded-lg flex items-center p-4 cursor-pointer font-medium text-sm">
              Add Money
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTOWallet;
