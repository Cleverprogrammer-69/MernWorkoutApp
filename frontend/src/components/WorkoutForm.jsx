import React from "react";
import { useState } from "react";
import axios from "axios";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();
  const URL = "https://mernworkoutapp-1.onrender.com/api/workouts";
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in!");
      return;
    }
    setIsLoading(true);
    const workout = { title, load, reps };

    try {
      const response = await axios.post(URL, workout, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = response.data;

      if (!response.status === 201) {
        setError(json.error);
      } else {
        setError(null);
        setLoad("");
        setReps("");
        setTitle("");
        setIsLoading(false);
        console.log(`New workout added:`, json);
        dispatch({ type: "CREATE_WORKOUT", payload: json });
      }
    } catch (error) {
      console.error("Error creating workout:", error);
      setError("Error creating workout. Please try again later.");
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="create">
        <h3>Add a new workout</h3>
        <label htmlFor="excerciseTitle">Excercise Title: </label>
        <input
          type="text"
          name="excerciseTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label htmlFor="excerciseLoad">Load (in KG): </label>
        <input
          type="number"
          name="excerciseLoad"
          value={load}
          onChange={(e) => setLoad(e.target.value)}
          required
        />
        <label htmlFor="excerciseReps">Reps: </label>
        <input
          type="number"
          name="excerciseReps"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          required
        />
        <button type="submit">Add workout</button>
      </form>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default WorkoutForm;
