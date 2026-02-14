import React from "react";
import transaction from "./../../assets/transactionimg.png";
import image from "./../../assets/image/image4.png";
import upiimg from "../../assets/upiimg.png";
import plusimg from "../../assets/plusimg.png";
import coin from "../../assets/coin.png";
import { useNavigate } from "react-router-dom";

const Wallet = () => {
  const navigate = useNavigate();

  const transactions = [
    {
      id: 1,
      date: "oct 14",
      amount: 15.0,
      time: "10:23",
    },
    {
      id: 2,
      date: "jan 23",
      amount: 15.0,
      time: "2:32",
    },
  ];

  return (
    <>
      <div className="relative w-full h-72 bg-[#FFF200] rounded-lg">
        <h1 className="p-2 font-bold text-xl">Wallet</h1>
        <div className="flex justify-end mx-3">
          <div className=" flex gap-2 rounded-r-full rounded-l-full shadow-lg bg-white px-2 py-1 w-30">
            <img src={coin} alt="coins" />
            <h1 className="font-bold text-xl">2500 </h1>
          </div>
        </div>
        <div className="ml-16">
          <h1 className="font-semibold">Hii Suryansh!</h1>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[250px] sm:w-[400px] bg-white p-4 shadow-lg rounded-lg">
          <div className="flex items-center gap-4 p-2 m-1 border-b-2">
            <img
              src={upiimg}
              alt="UPI Payment Method"
              className="h-[30px] w-[30px]"
            />
            <div>
              <h1 className="text-black font-semibold text-lg">UPI</h1>
              <p className="text-[#C8C7CC]">Default Payment Method</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-3">
            <div>
              <p className="text-[#C8C7CC]">Balance</p>
              <h1 className="text-[#FFD700] text-xl font-semibold"> ₹25.00</h1>
            </div>
            <div>
              <p className="text-[#C8C7CC]">Today’s Earning</p>
              <h1 className="text-[#FFD700] text-xl font-semibold">₹235.00</h1>
            </div>
            <div>
              <button
                className="flex gap-1 bg-[#FFD700] hover:bg-yellow-400 rounded-lg p-3"
                onClick={() => navigate("add-money")}
              >
                <img src={plusimg} alt="" />
                <h1>Add Money</h1>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-40 sm:mt-16">
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Last Transaction</h1>

          {transactions.length === 0 ? (
            <div className="flex flex-col items-center justify-center">
              <img src={transaction} alt="icon" />
              <p className="text-lg text-gray-500 text-center">
                There’s no transactions till now!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="bg-white p-4  flex justify-between rounded-lg shadow-md hover:bg-gray-100"
                >
                  <div className="flex gap-2">
                    <img
                      src={image}
                      alt="User profile"
                      className="rounded-full w-12 h-11"
                    />
                    <div>
                      <h1>Rishab Tiwari</h1>
                      <p className="text-sm text-gray-500">
                        {transaction.date},{transaction.time}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-lg">-₹{transaction.amount}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Wallet;
