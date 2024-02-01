import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const Home = () => {
  const [data, setData] = useState([]);
  const [deletedGoal, setDeletedGoal] = useState(true);

  //get goals data
  const getGoalsData = async () => {
    try {
      const response = await axios.get("http://localhost:6001/goals");
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
    if (deletedGoal) {
      setDeletedGoal(false);
      getGoalsData();
    }
  }, [deletedGoal]);

  //Delete function

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:6001/delete/${id}`);
      setDeletedGoal(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-center from-black to-gray-800 text-white">
  <div className="max-w-2xl w-full p-4">
    <h3 className="text-2xl font-bold mb-4 text-primary-100">Goals</h3>
    <div className="mb-4">
      <Link to="/create" className="bg-primary-blue text-white py-1 px-2 rounded-md">
        Add Goal
      </Link>
    </div>
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-3 md:px-6 py-3">
            ID
          </th>
          <th scope="col" className="px-3 md:px-6 py-3">
            Goal
          </th>
          <th scope="col" className="px-3 md:px-6 py-3">
            Call To Action
          </th>
          <th scope="col" className="px-3 md:px-6 py-3">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((goal) => (
          <tr key={goal.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="px-3 md:px-6 py-2 md:py-4">{goal.id}</td>
            <td className="px-3 md:px-6 py-2 md:py-4">{goal.goal}</td>
            <td className="px-3 md:px-6 py-2 md:py-4">{goal.call_to_action}</td>
            <td className="px-3 md:px-6 py-2 md:py-4 flex flex-col">
              <div  className="flex flex-col items-center justify-center">
              <Link to={`/read/${goal.id}`} className="text-primary-blue hover:underline mb-2 md:mb-0">
                Read
              </Link>
              <Link to={`/edit/${goal.id}`} className="text-primary-pink hover:underline mb-2 md:mb-0">
                Edit
              </Link>
              <button
                onClick={() => handleDelete(goal.id)}
                className="text-primary-500 hover:text-red-600"
              >
                Delete
              </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  

  )

};
export default Home;
