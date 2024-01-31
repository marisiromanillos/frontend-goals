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
      <div>
        <h1>Goal {id}</h1>
        <Link to="/">Back</Link>
        {data.map((goal) => (
          <ul key={goal.id}>
            <li>
              <b>ID:</b>
              {goal.id}
            </li>
            <li>
              <b>Goal:</b>
              {goal.goal}
            </li>
            <li>
              <b>Call to action:</b>
              {goal.call_to_action}
            </li>
          </ul>
        ))}
      </div>
    </>
  );
};
export default Read;
