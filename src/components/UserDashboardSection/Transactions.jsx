import React from "react";
import transaction from "./../../assets/transactionimg.png";
import image from "./../../assets/image/image4.png";

const Transactions = () => {
  const transactions = [
    {
      date: "oct 14",
      amount: 15.0,
      time: "10:23",
    },
    {
      date: "jan 23",
      amount: 15.0,
      time: "2:32",
    },
    {
      date: "oct 14",
      amount: 15.0,
      time: "10:23",
    },
    {
      date: "jan 23",
      amount: 15.0,
      time: "2:32",
    },
    {
      date: "oct 14",
      amount: 15.0,
      time: "10:23",
    },
  ];
  return (
    <>
      <h1 className="font-bold text-xl">Transactions</h1>
      {transactions.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-5">
          <img src={transaction} alt="icon" />
          <p className="text-lg text-gray-500 text-center">
            There’s no transactions till now!
          </p>
        </div>
      ) : (
        <div className="space-y-4 mt-5">
          {transactions.map((transaction, index) => (
            <div
              key={index}
              className="bg-white p-4 hover:bg-gray-100  flex justify-between rounded-lg shadow-md"
            >
              <div className="flex gap-2">
                <img src={image} alt="img" className="rounded-full w-12 h-11" />
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
    </>
  );
};

export default Transactions;
