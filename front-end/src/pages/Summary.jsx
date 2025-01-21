import React, { useEffect } from "react";
import right_arrow from "../assets/right_arrow.png";
import { useActionData, useNavigate } from "react-router-dom";
import { useState } from "react";
import { addUser, fetchAllUsers } from "../services/SummaryServices";

const Summary = () => {
  const [openName, setOpenName] = useState(false);
  const [user, setUser] = useState([]);
  const [name, setName] = useState();
  const navigate = useNavigate();
  const handleDetails = () => {
    navigate("/details");
  };
  const handleAddPeople = () => {
    setOpenName(!openName);
  };

  const handleSavePeople = async (e) => {
    e.preventDefault();
    try {
      if (name != null) {
        const response = await addUser(name);
        const data = response.data;
        if (data.data) {
          console.log("User Added Successfully");
          setOpenName(!openName);
          setName(null);
        } else {
          alert(data.msg);
        }
      } else {
        alert("Please enter name");
      }
    } catch (err) {
      console.log("Error in coding part");
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await fetchAllUsers();
      const data = users.data;
      if (data.data) {
        setUser(data.user);
      }
    };
    fetchUsers();
  });
  return (
    <div className="flex flex-col gap-6 justify-center items-center h-screen">
      {openName && (
        <input
          type="text"
          className=" w-5/6 md:w-1/3 border-blue-600 border-2 h-10 rounded-lg p-2"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      )}
      <button
        className={`text-center w-5/6 md:w-1/3 h-10 rounded-lg border-2 border-gray-600 ${
          openName ? "bg-blue-600 text-white border-none" : ""
        }`}
        onClick={openName ? handleSavePeople : handleAddPeople}
      >
        {openName ? "Save" : "Add People"}
      </button>
      {user.map((person) => (
          <div className="md:w-1/3 shadow-xl rounded-xl p-3 w-5/6" key={person._id}>
            <div
              className="flex items-center gap-2 cursor-pointer hover:underline"
              onClick={handleDetails}
            >
              <p className="font-semibold text-start text-lg md:ml-11 ml-5">
                {person.name}
              </p>
              <img src={right_arrow} className="w-3 h-3" />
            </div>
            <hr className="mt-2" />
            <div className="flex justify-around mt-4">
              <div className="text-center text-green-600">
                <p className="font-semibold">Cash In</p>
                <p>{person.cashIn}</p>
              </div>
              <div className="text-center text-red-600">
                <p className="font-semibold">Cash Out</p>
                <p>{person.cashOut}</p>
              </div>
              <div>
                <p className="font-semibold">Balance</p>
                <p className="text-center text-red-600">{person.balance}</p>
              </div>
            </div>
          </div>
      ))}
    </div>
  );
};

export default Summary;
