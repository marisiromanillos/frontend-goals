import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Create = () => {
  const [values, setValues] = useState({
    goal: "",
    call_to_action: "",
  });

  const navigate = useNavigate();

  //   function handleSubmit(e) {
  //     e.preventDefault();

  //     axios
  //       .post("/add_goal", values)
  //       .then((res) => {
  //         navigate("/");
  //         console.log(res);
  //       })
  //       .catch((err) => console.log(err));
  //   }

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
      <div>
        <div>
          <h1>Add a Goal</h1>
        </div>
        <div>
          <Link to="/">Home</Link>
        </div>
        {/* form */}
        <form onSubmit={handleOnSubmit}>
          {/* goal row */}
          <div>
            <label htmlFor="goal">Goal</label>
            <input
              type="text"
              name="goal"
              required
              onChange={(e) => setValues({ ...values, goal: e.target.value })}
            />
          </div>
          {/* call to action */}
          <div>
            <label htmlFor="call_to_action">Call to Action</label>
            <input
              type="text"
              name="call_to_action"
              required
              onChange={(e) =>
                setValues({ ...values, call_to_action: e.target.value })
              }
            />
          </div>
          <div>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Create;
