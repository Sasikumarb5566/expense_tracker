import React from "react";

const Details = () => {
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

  return (
    <div className="flex flex-col items-center justify-center ">
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
      <hr className="w-full"/>
      <div className="flex md:justify-around w-full md:w-3/4 py-2">
        <div className="md:w-1/2 w-3/4 px-5">
          <p>Washing Soap</p>
          <p>{formatDate(date)}</p>
        </div>
        <div className="flex justify-between w-1/4">
          <div className="w-1/2">50</div>
          <div className="w-1/2">100</div>
        </div>
      </div>
    </div>
  );
};

export default Details;
