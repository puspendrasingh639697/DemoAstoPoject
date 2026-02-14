import React from "react";
import { alpha, styled } from "@mui/material/styles";
import { green } from "@mui/material/colors";
import Switch from "@mui/material/Switch";
import Notification from "../../assets/flagsicon/Notification.png";
import Privacy from "../../assets/flagsicon/Privacy.png";
import Payments from "../../assets/flagsicon/Payments.png";
import { RiDeleteBin6Line, RiAddFill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import Visa from "../../assets/flagsicon/Visa.png";
import MasterCard from "../../assets/flagsicon/MasterCard.png";
import PhonePay from "../../assets/flagsicon/Phonepe.png";
import Gpay from "../../assets/flagsicon/Gpay.png";
import Wallet from "../../assets/flagsicon/Wallet.png";
import NetBank from "../../assets/flagsicon/Bank.png";
import COD from "../../assets/flagsicon/COD.png";

const Settings = () => {
  const GreenSwitch = styled(Switch)(({ theme }) => ({
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: green[600],
      "&:hover": {
        backgroundColor: alpha(green[600], theme.palette.action.hoverOpacity),
      },
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: green[600],
    },
  }));

  const label = { inputProps: { "aria-label": "Color switch demo" } };

  return (
    <>
      <h2 className="font-bold text-xl">Settings</h2>
      <section className="flex flex-col lg:flex-row gap-6 mt-4">
        <div className="lg:border-r-2 border-[#F4F4F5] pr-6">
          <div className="rounded-3xl shadow p-6">
            <div className="flex items-center border-b border-[#C4C4C480] pb-4">
              <img
                src={Notification}
                alt="noti"
                className="h-[30px] w-[30px] object-contain rounded-lg"
              />
              <div className="ml-2">
                <h3 className="font-medium text-sm">Notifications</h3>
                <p className="font-light text-xs text-[#949494]">
                  Astromall, Live Events
                </p>
              </div>
              <GreenSwitch {...label} className="ml-auto" />
            </div>
            <div className="flex items-center mt-5">
              <img
                src={Privacy}
                alt="noti"
                className="h-[30px] w-[30px] object-contain rounded-lg"
              />
              <div className="ml-2">
                <h3 className="font-medium text-sm">Privacy</h3>
                <p className="font-light text-xs text-[#949494]">
                  Show my name in review section
                </p>
              </div>
              <GreenSwitch {...label} defaultChecked className="ml-auto" />
            </div>
          </div>
          <div className="rounded-3xl shadow p-6 mt-10">
            <div className="flex items-center">
              <img
                src={Payments}
                alt="noti"
                className="h-[30px] w-[30px] object-contain rounded-lg"
              />
              <div className="ml-2">
                <h3 className="font-medium text-sm">Payments</h3>
                <p className="font-light text-xs text-[#949494]">
                  Cards, UPIs, Net Banking
                </p>
              </div>
              <IoIosArrowForward className="ml-auto text-[#AEAEAEB2] size-6 hover:cursor-pointer" />
            </div>
          </div>
          <div className="flex rounded-3xl shadow p-6 mt-4">
            <h3 className="text-[#089B02] font-semibold">Privacy Policy</h3>
            <IoIosArrowForward className="ml-auto text-[#AEAEAEB2] size-6 hover:cursor-pointer" />
          </div>
          <div className="flex rounded-3xl shadow p-6 mt-4">
            <h3 className="text-[#089B02] font-semibold">
              Terms and Conditions
            </h3>
            <IoIosArrowForward className="ml-auto text-[#AEAEAEB2] size-6 hover:cursor-pointer" />
          </div>
          <div className="flex rounded-3xl shadow p-6 mt-4 text-[#EB001B]">
            <h3 className="font-semibold">Delete my account</h3>
            <RiDeleteBin6Line className="ml-auto size-5 hover:cursor-pointer" />
          </div>
        </div>
        <div className="lg:w-1/2">
          <div>
            <div>
              <h2 className="font-bold">Payments</h2>
              <div className="rounded-3xl shadow p-6 mt-2">
                <div className="flex gap-2 justify-between items-center border-b border-[#C4C4C480] pb-3">
                  <img
                    src={Visa}
                    alt="noti"
                    className="h-[30px] w-[30px] object-contain rounded-lg"
                  />
                  <h3 className="font-normal text-xs text-[#606060]">
                    Axis Bank **** **** **** 8395
                  </h3>
                  <input
                    type="radio"
                    name="selectPay"
                    className="h-[20px] w-[20px] bg-[#027FEE] hover:cursor-pointer"
                  />
                </div>
                <div className="flex gap-2 justify-between items-center mt-5 border-b border-[#C4C4C480] pb-3">
                  <img
                    src={MasterCard}
                    alt="noti"
                    className="h-[30px] w-[30px] object-contain rounded-lg"
                  />
                  <h3 className="font-normal text-xs text-[#606060]">
                    HDFC Bank **** **** **** 6246
                  </h3>
                  <input
                    type="radio"
                    name="selectPay"
                    className="h-[20px] w-[20px] bg-[#027FEE] hover:cursor-pointer"
                  />
                </div>
                <div className="flex items-center mt-5 gap-5">
                  <RiAddFill className="size-6 rounded-lg bg-[#D2EAFF] text-[#027FEE] hover:cursor-pointer" />
                  <h3 className="font-normal text-xs text-[#606060]">
                    Add New Card
                  </h3>
                  <RiDeleteBin6Line className="ml-auto size-5 text-[#EB001B] hover:cursor-pointer" />
                </div>
              </div>
            </div>
            <div>
              <h2 className="font-bold mt-5">UPI</h2>
              <div className="rounded-3xl shadow p-6 mt-2">
                <div className="flex items-center border-b border-[#C4C4C480] pb-3">
                  <img
                    src={PhonePay}
                    alt="noti"
                    className="h-[30px] w-[30px] object-contain rounded-lg"
                  />
                  <h3 className="font-normal text-xs text-[#606060] ml-2">
                    Phone Pe
                  </h3>
                  <input
                    type="radio"
                    name="selectPay"
                    className="h-[20px] w-[20px] bg-[#027FEE] ml-auto hover:cursor-pointer"
                  />
                </div>
                <div className="flex items-center mt-5 border-b border-[#C4C4C480] pb-3">
                  <img
                    src={Gpay}
                    alt="noti"
                    className="h-[30px] w-[30px] object-contain rounded-lg"
                  />
                  <h3 className="font-normal text-xs text-[#606060] ml-2">
                    Google Pay
                  </h3>
                  <input
                    type="radio"
                    name="selectPay"
                    className="h-[20px] w-[20px] bg-[#027FEE] ml-auto hover:cursor-pointer"
                  />
                </div>
                <div className="flex items-center mt-5 gap-5">
                  <RiAddFill className="size-6 rounded-lg bg-[#D2EAFF] text-[#027FEE] hover:cursor-pointer" />
                  <h3 className="font-normal text-xs text-[#606060]">
                    Add New UPI Id
                  </h3>
                  <RiDeleteBin6Line className="ml-auto size-5 text-[#EB001B] hover:cursor-pointer" />
                </div>
              </div>
            </div>
            <div>
              <h2 className="font-bold mt-5">More payment options</h2>
              <div className="rounded-3xl shadow p-6 mt-2">
                <div className="flex items-center border-b border-[#C4C4C480] pb-2">
                  <img
                    src={Wallet}
                    alt="noti"
                    className="h-[30px] w-[30px] object-contain rounded-lg"
                  />
                  <h3 className="font-normal text-xs text-[#606060] ml-2">
                    Wallet
                  </h3>
                  <IoIosArrowForward className="ml-auto text-[#AEAEAEB2] size-6 hover:cursor-pointer" />
                </div>
                <div className="flex items-center mt-5 border-b border-[#C4C4C480] pb-2">
                  <img
                    src={NetBank}
                    alt="noti"
                    className="h-[30px] w-[30px] object-contain rounded-lg"
                  />
                  <h3 className="font-normal text-xs text-[#606060] ml-2">
                    Net Banking
                  </h3>
                  <IoIosArrowForward className="ml-auto text-[#AEAEAEB2] size-6 hover:cursor-pointer" />
                </div>
                <div className="flex items-center mt-5">
                  <img
                    src={COD}
                    alt="noti"
                    className="h-[30px] w-[30px] object-contain rounded-lg"
                  />
                  <h3 className="font-normal text-xs text-[#606060] ml-2">
                    Cash on Delivery
                  </h3>
                  <IoIosArrowForward className="ml-auto text-[#AEAEAEB2] size-6 hover:cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Settings;
