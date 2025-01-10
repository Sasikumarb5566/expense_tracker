import React from "react";
import right_arrow from "../assets/right_arrow.png";
import {useNavigate} from 'react-router-dom';

const Summary = () => {
  const navigate = useNavigate();
  const handleDetails = () => {
    navigate('/details');
  }
  return (
    <div className="flex flex-col gap-6 justify-center items-center h-screen">
      <div className="md:w-1/3 shadow-xl rounded-xl p-3 w-5/6">
        <div className="flex items-center gap-2 cursor-pointer hover:underline" onClick={handleDetails}>
          <p className="font-semibold text-start text-lg md:ml-11 ml-5">
            Sasikumar
          </p>
          <img src={right_arrow} className="w-3 h-3" />
        </div>
        <hr className="mt-2" />
        <div className="flex justify-around mt-4">
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
      </div>
    </div>
  );
};

export default Summary;
