import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import password_close from "../assets/password_close.png";
import password_open from "../assets/password_open.png";
import info from '../assets/info.png'
import green_tick from '../assets/green_tick.png'

const Home = () => {
  const navigate = useNavigate(null);
  const [message, setMessage] = useState();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const data = {
    username: "sasikumar",
    password: "895741",
  };
  const [eye, setEye] = useState(false);
  const handleEye = () => {
    setEye(!eye);
  };
  const handleVerify = () => {
    if (
      formData.username.length > 6 &&
      formData.password.length == 6 &&
      formData.username === data.username &&
      formData.password === data.password
    ) {
        setMessage("Correct");
        setTimeout(() => {
            navigate('/summary');
        }, 1500);

    } else {
        setMessage("Wrong");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="shadow-2xl md:w-1/3 w-4/5 rounded-lg px-5 py-3">
        <p className="text-center text-2xl font-semibold text-blue-600">
          Verification
        </p>
        <div className="mt-8 flex flex-col gap-1">
          <label className="font-semibold">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            required
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            className={`outline outline-2 h-10 rounded-sm px-2 focus:outline-blue-600`}
          />
        </div>
        <div className="mt-5 flex flex-col gap-1">
          <label className="font-semibold">Security PIN</label>
          <div className="flex relative items-center">
            {eye ? (
              <input
                type="text"
                name="password"
                value={formData.password}
                required
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className={`outline focus:outline-blue-600 outline-2 h-10 rounded-sm px-2 w-full `}
              />
            ) : (
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
                className={`outline focus:outline-blue-600 outline-2 h-10 rounded-sm px-2 w-full `}
              />
            )}

            {eye ? (
              <img
                src={password_open}
                className=" flex w-5 h-5 absolute right-2 cursor-pointer"
                onClick={handleEye}
              />
            ) : (
              <img
                src={password_close}
                className=" flex w-5 h-5 absolute right-2 cursor-pointer"
                onClick={handleEye}
              />
            )}
          </div>
        </div>
        <button
          onClick={handleVerify}
          className="bg-blue-600 w-full mt-5 h-10 text-white font-semibold hover:bg-blue-700 rounded-sm"
        >
          Verify
        </button>
        {message == null ? "" : message == 'Wrong' ? (<p className="text-red-600 mt-3 text-center flex justify-center items-center gap-2"><img src={info} className="w-4 h-4" style={{
        filter: "invert(27%) sepia(84%) saturate(7482%) hue-rotate(0deg) brightness(88%) contrast(106%)",
      }} />Please enter details correctly.</p>) : (<p className="text-green-600 flex text-center justify-center items-center gap-2 mt-3"><img src={green_tick} className="w-4 h-4" />Verified Successfully.</p>)}
      </div>
    </div>
  );
};

export default Home;
