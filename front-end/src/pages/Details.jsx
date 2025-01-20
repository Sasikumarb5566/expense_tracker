import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import cancel from "../assets/cancel.png";

const Details = () => {
  const [openForm, setOpenForm] = useState(null);
  const[formData, setFormData] = useState({
    amount: '',
    reason: ""
  })
  const navigate = useNavigate();
  const date = new Date();
  const formatDate = (date) => {
    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    });
  };

  const handleForm = (inOrOut) => {
    setOpenForm(inOrOut);
  };

  const handleCancel = () => {
    setOpenForm(null);
  };

  const handleSave = () => {
    console.log(formData.reason +"    "+formData.amount)
    setOpenForm(null);
    formData.reason = ''
    formData.amount =''
  }

  return (
    <div className="relative h-screen">
      <div
        className={`flex flex-col items-center h-screen ${
          openForm != null ? "blur-sm" : ""
        }`}
      >
        <p className="bg-blue-600 text-xl font-semibold h-16 text-white w-full items-center justify-center flex">
          Sasikumar
        </p>
        <div className="flex justify-around mt-4 md:w-3/4 w-full">
          <div className="text-center text-green-600">
            <p className="font-semibold">Cash In</p>
            <p>500</p>
          </div>
          <div className="text-center text-red-600">
            <p className="font-semibold">Cash Out</p>
            <p>100</p>
          </div>
          <div>
            <p className="font-semibold">Balance</p>
            <p className="text-center text-red-600">-400</p>
          </div>
        </div>
        <hr className="w-full mt-3" />
        <div className="flex md:justify-around w-full md:w-3/4 py-3">
          <p className="md:w-1/2 w-3/4 font-semibold items-center flex justify-start px-5">
            Reason
          </p>
          <div className="flex justify-between w-1/4 ">
            <p className="text-green-600 font-semibold w-1/2">Cash In</p>
            <p className="text-red-600 font-semibold w-1/2">Cash Out</p>
          </div>
        </div>
        <hr className="w-full" />
        <div className="flex md:justify-around w-full md:w-3/4 py-2">
          <div className="md:w-1/2 w-3/4 px-5">
            <p>Washing Soap</p>
            <p className=" text-gray-500">{formatDate(date)}</p>
          </div>
          <div className="flex justify-between w-1/4">
            <div className="w-1/2">50</div>
            <div className="w-1/2">100</div>
          </div>
        </div>
        <div className="absolute bottom-2 justify-between flex md:w-3/4 h-12 text-white gap-2 w-full">
          <button
            className="md:w-1/2 bg-green-600 hover:bg-green-700 rounded-md w-full ml-2"
            onClick={() => handleForm("in")}
          >
            Cash In
          </button>
          <button className="md:w-1/2 bg-red-600 hover:bg-red-700 rounded-md w-full mr-2" onClick={() => handleForm("out")}>
            Cash Out
          </button>
        </div>
      </div>
      {openForm && (
        <div className=" flex flex-col md:w-1/3 p-4 rounded-md shadow-2xl border-2 gap-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <img
            src={cancel}
            className="w-5 absolute right-2 top-2 cursor-pointer"
            onClick={handleCancel}
          />
          <p className={`font-semibold text-xl ${openForm == "in" ? "text-green-600" : "text-red-600"}`}>{openForm == "in" ? "Cash In" : "Cash Out"}</p>
          <div className="flex flex-col gap-1">
            <label>Reason</label>
            <textarea
              type="text"
              placeholder="Type Something..."
              className="rounded-md p-1 border-2"
              value={formData.reason}
              onChange={(e) => {setFormData((prev) => ({...prev, reason: e.target.value}))}}
            />
          </div>
          <div className="flex items-center gap-2">
            <label>Amount</label>
            <input
              type="number"
              placeholder="0"
              className="rounded-md p-1 border-2"
              value={formData.amount}
              onChange={(e) => {setFormData((prev) => ({...prev, amount: e.target.value}))}}
            />
          </div>
          <button className={`h-10 text-white rounded-md ${openForm == "in" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}`} onClick={handleSave}>
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default Details;
