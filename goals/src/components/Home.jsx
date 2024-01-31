import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);

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
    getGoalsData();
  }, []);

  return (
    <>
      <div>
        <h3>Goals</h3>
        <div>
          <Link to="/create">Add Goal</Link>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Goal</th>
              <th>Call To Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((goal) => (
              <tr key={goal.id}>
                <td>{goal.id}</td>
                <td>{goal.goal}</td>
                <td>{goal.call_to_action}</td>
                <td>
                  <Link to={`/read/${goal.id}`}>Read</Link>
                  <Link to={`/edit/${goal.id}`}>Edit</Link>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default Home;
