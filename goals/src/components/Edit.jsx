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
    <>
      <h3>Edit Goal</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Goal:
          <input
            type="text"
            name="goal"
            value={formData.goal || ""}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Call To Action:
          <input
            type="text"
            name="call_to_action"
            value={formData.call_to_action || ""}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit">Update Goal</button>
        <Link to="/">Return Home</Link>
      </form>
    </>
  );
};

export default Edit;
