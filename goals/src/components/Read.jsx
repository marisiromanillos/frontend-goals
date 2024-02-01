import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Read = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();

  const getGoalsData = async () => {
    try {
      const response = await axios.get(`http://localhost:6001/goals/${id}`);
      const goalsData = response.data.data; // Access the 'data' property

      if (Array.isArray(goalsData)) {
        setData(goalsData);
        console.log(goalsData);
      } else {
        console.error("Data is not an array:", goalsData);
        setData([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getGoalsData();
  }, [id]);

  return (
    <>
<div className="flex flex-col items-center justify-center h-screen bg-gradient-to-tr from-black to-gray-800 text-white">
  <div className="w-full max-w-md mx-auto mt-8 mb-10">
    <h1 className="text-3xl font-bold mb-4">Goal {id}</h1>
    <Link to="/" className="bg-primary-blue text-white py-1 px-2 rounded-md mb-6">
      Back
    </Link>
    <div className="mt-6">
    {data.map((goal) => (
      <ul key={goal.id} className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-md mb-4">
        <li className="mb-2">
          <b>ID:</b> {goal.id}
        </li>
        <li className="mb-2">
          <b>Goal:</b> {goal.goal}
        </li>
        <li className="mb-2">
          <b>Call to action:</b> {goal.call_to_action}
        </li>
      </ul>
    ))}
    </div>
  </div>
</div>




    </>
  );
};
export default Read;
