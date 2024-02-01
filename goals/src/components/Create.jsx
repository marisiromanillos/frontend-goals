import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Create = () => {
  const [values, setValues] = useState({
    goal: "",
    call_to_action: "",
  });

  const navigate = useNavigate();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    try {
      axios.post("http://localhost:6001/add_goal", values).then((res) => {
        navigate("/");
        console.log(res);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-black to-gray-800 text-white p-4">
        <div className="w-16 h-16 mb-4">
          <img src="/logo.svg" alt="Logo" />
        </div>
        <div className="mb-8 text-center">
          <h1 className="text-3xl pb-3 font-bold text-gray-100">
            Create a Goal
          </h1>
          <p className="text-white ">Share your goals with us!</p>
        </div>
        {/* form */}
        <form
          onSubmit={handleOnSubmit}
          className="w-full max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl"
        >
          {/* goal row */}
          <div className="mb-4">
            <label
              htmlFor="goal"
              className="block text-sm font-medium text-gray-300"
            >
              Goal
            </label>
            <input
              type="text"
              name="goal"
              required
              className="w-full px-3 py-2 mt-1 text-gray-100 bg-gray-700 rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              onChange={(e) => setValues({ ...values, goal: e.target.value })}
            />
          </div>
          {/* call to action */}
          <div className="mb-4">
            <label
              htmlFor="call_to_action"
              className="block text-sm font-medium text-gray-300"
            >
              Call to Action
            </label>
            <input
              type="text"
              name="call_to_action"
              required
              className="w-full px-3 py-2 mt-1 text-gray-100 bg-gray-700 rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              onChange={(e) =>
                setValues({ ...values, call_to_action: e.target.value })
              }
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Create;
