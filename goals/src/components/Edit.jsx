import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const Edit = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({});

  const getGoalData = async () => {
    if (!id) {
      console.error("Goal ID is undefined");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:6001/goals/${id}`);
      const goalData = response.data.data;

      if (goalData) {
        setFormData(goalData);
      } else {
        console.error("Goal data not found:", id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getGoalData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create a new object with only the goal and call_to_action properties
      const { goal, call_to_action } = formData;
      const dataToUpdate = { goal, call_to_action };

      // Send a PUT request with the specific data to update
      await axios.put(`http://localhost:6001/edit_goal/${id}`, dataToUpdate);
      console.log("Goal updated successfully");
    } catch (error) {
      console.error("Error updating goal:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-tr from-black to-gray-800 text-white p-4">
      <div className="w-16 h-16 mb-4">
        <img src="/logo.svg" alt="Logo" />
      </div>
      <h1 className="text-3xl font-bold text-gray-100 mb-8">Edit Goal</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
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
            value={formData.goal || ""}
            onChange={handleInputChange}
            className="w-full px-3 py-2 mt-1 text-gray-100 bg-gray-700 rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="call_to_action"
            className="block text-sm font-medium text-gray-300"
          >
            Call To Action
          </label>
          <input
            type="text"
            name="call_to_action"
            value={formData.call_to_action || ""}
            onChange={handleInputChange}
            className="w-full px-3 py-2 mt-1 text-gray-100 bg-gray-700 rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
          >
            Update Goal
          </button>
          <Link
            to="/"
            className="block mt-4 text-center text-white hover:underline"
          >
            See updated goal
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Edit;
