import React from "react";
import { useState } from "react";
import axios from "axios";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

export const Edit = () => {
  const { dispatch } = useWorkoutsContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { id } = useParams();
  const URL = "https://mernworkoutapp-1.onrender.com/api/workouts";
  useEffect(() => {
    const getWorkout = async () => {
      try {
        const response = await axios.get(`${URL}/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const json = await response.data;
        if (response.status !== 200) {
          // Check if the status is not 200
          // throw new Error("Error fetching single user");
          setError(json.error);
        }

        setTitle(json.title);
        setLoad(json.load);
        setReps(json.reps);
      } catch (error) {
        console.log(error);
      }
    };
    if (user) getWorkout();
  }, [id, user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!user) return;
    const updatedWorkout = { title, load, reps }; // Include only the fields you want to update

    try {
      const response = await axios.patch(`${URL}/${id}`, updatedWorkout, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = response.data;

      if (response.status !== 200) {
        setError(json.error);
      } else {
        setError(null);
        console.log("Workout Updated:", json);
        dispatch({ type: "UPDATE_WORKOUT", payload: json });
        navigate("/");
      }
    } catch (error) {
      console.error("Error updating workout:", error);
      setError("Error updating workout. Please try again later.");
    }
  };

  return (
    <div>
      <form onSubmit={handleUpdate} className="create">
        <h3>Edit workout</h3>
        <label htmlFor="excerciseTitle">Excercise Title: </label>
        <input
          type="text"
          name="excerciseTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          disabled
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
        <button type="submit">Edit workout</button>
      </form>
      {error && <div className="error">{error}</div>}
    </div>
  );
};
