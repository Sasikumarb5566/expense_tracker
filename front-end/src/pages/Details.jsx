import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import cancel from "../assets/cancel.png";
import { addDetails, getIndividualDetails } from "../services/SummaryServices";

const Details = () => {
  const location = useLocation();
  const { id } = location.state || {};
  const [amount, setAmount] = useState({
    name:'',
    in: 0,
    out: 0,
    balance: 0,
  });
  const [openForm, setOpenForm] = useState(null);
  const [formData, setFormData] = useState({
    user_id: id,
    outOrIn: "",
    amount: "",
    reason: "",
  });
  const [fetchedData, setFecthedData] = useState();
  const convertTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    };

    const formattedDate = date.toLocaleString("en-IN", options);
    return formattedDate.replace(",", "").replace(/\//g, "-");
  };
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await getIndividualDetails(id);
        const data = response.data;
        if (data.data) {
          const total = data.user;
          //console.log(total)
          setAmount({
            name: total.name,
            in: total.cashIn || 0,
            out: total.cashOut || 0,
            balance: total.balance || 0,
          });
          setFecthedData(data.detail);
        } else {
          console.log(data.msg);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchDetails();
  });

  const handleForm = (inOrOut) => {
    setOpenForm(inOrOut);
    setFormData((prev) => ({
      ...prev,
      outOrIn: inOrOut,
    }));
  };

  const handleCancel = () => {
    setOpenForm(null);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await addDetails(formData);
      const data = response.data;
      if (data.data) {
        setOpenForm(null);
        formData.reason = "";
        formData.amount = "";
      } else {
        console.log(data.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="relative h-screen">
      <div
        className={`flex flex-col items-center h-screen ${
          openForm != null ? "blur-sm" : ""
        }`}
      >
        <p className="bg-blue-600 text-xl font-semibold h-16 text-white w-full items-center justify-center flex">
          {amount.name}
        </p>
        <div className="flex justify-around mt-4 md:w-3/4 w-full">
          <div className="text-center text-green-600">
            <p className="font-semibold">Cash In</p>
            <p>{amount.in}</p>
          </div>
          <div className="text-center text-red-600">
            <p className="font-semibold">Cash Out</p>
            <p>{amount.out}</p>
          </div>
          <div>
            <p className="font-semibold">Balance</p>
            <p className="text-center">{amount.balance}</p>
          </div>
        </div>
        <hr className="w-full mt-3" />
        <div className="flex md:justify-around w-full md:w-3/4 py-3">
          <p className="md:w-1/2 w-3/4 font-semibold items-center flex justify-start px-5">
            Reason
          </p>
          <div className="flex justify-between w-1/4 mr-4">
            <p className="text-green-600 font-semibold w-1/2 text-center">Cash In</p>
            <p className="text-red-600 font-semibold w-1/2 text-center">Cash Out</p>
          </div>
        </div>
        <hr className="w-full" />
        {fetchedData &&
          fetchedData.logs.map((log, index) => (
            <div
              key={index}
              className="flex md:justify-around w-full md:w-3/4 py-2"
            >
              <div className="md:w-1/2 w-3/4 px-5">
                <p>{log.reason}</p>
                <p className="text-gray-500">{convertTimestamp(log.date)}</p>
              </div>
              <div className="flex justify-between w-1/4 mr-4">
                <div className="w-1/2 text-center">{log.in || "-"}</div>
                <div className="w-1/2 text-center">{log.out || "-"}</div>
              </div>
            </div>
          ))}
        <div className="absolute bottom-2 justify-between flex md:w-3/4 h-12 text-white gap-2 w-full">
          <button
            className="md:w-1/2 bg-green-600 hover:bg-green-700 rounded-md w-full ml-2"
            onClick={() => handleForm("in")}
          >
            Cash In
          </button>
          <button
            className="md:w-1/2 bg-red-600 hover:bg-red-700 rounded-md w-full mr-2"
            onClick={() => handleForm("out")}
          >
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
          <p
            className={`font-semibold text-xl ${
              openForm == "in" ? "text-green-600" : "text-red-600"
            }`}
          >
            {openForm == "in" ? "Cash In" : "Cash Out"}
          </p>
          <div className="flex flex-col gap-1">
            <label>Reason</label>
            <textarea
              type="text"
              placeholder="Type Something..."
              className="rounded-md p-1 border-2"
              value={formData.reason}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, reason: e.target.value }));
              }}
            />
          </div>
          <div className="flex items-center gap-2">
            <label>Amount</label>
            <input
              type="number"
              placeholder="0"
              className="rounded-md p-1 border-2"
              value={formData.amount}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, amount: e.target.value }));
              }}
            />
          </div>
          <button
            className={`h-10 text-white rounded-md ${
              openForm == "in"
                ? "bg-green-600 hover:bg-green-700"
                : "bg-red-600 hover:bg-red-700"
            }`}
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default Details;
