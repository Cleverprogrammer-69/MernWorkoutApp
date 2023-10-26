import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import {useWorkoutsContext} from '../hooks/useWorkoutsContext'
const WorkoutForm = () => {
  const {dispatch}= useWorkoutsContext()
    const [title, setTitle] = useState("")
    const [load, setLoad] = useState("")
    const [reps, setReps] = useState("")
    const [error, setError] = useState(null)
    const handleSubmit = async (e) => {
      e.preventDefault();
      const workout = { title, load, reps };
  
      try {
          const response = await axios.post("https://mern-workout-api.vercel.app/api/workouts", workout, {
              headers: {
                  "Content-Type": "application/json"
              }
          });
  
          const json = response.data;
  
          if (!response.status === 201) {
              setError(json.error);
          } else {
              setError(null);
              setLoad("");
              setReps("");
              setTitle("");
              console.log(`New workout added:`, json);
              dispatch({ type: "CREATE_WORKOUT", payload: json });
          }
      } catch (error) {
          console.error('Error creating workout:', error);
          setError('Error creating workout. Please try again later.');
      }
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit} className="create">
        <h3>Add a new workout</h3>
        <label htmlFor="excerciseTitle">Excercise Title: </label>
        <input type="text" name='excerciseTitle' value={title} onChange={e=>setTitle(e.target.value)} required/>
        <label htmlFor="excerciseLoad">Load (in KG): </label>
        <input type="number" name='excerciseLoad' value={load} onChange={e=>setLoad(e.target.value)} required/>
        <label htmlFor="excerciseReps">Reps: </label>
        <input type="number" name='excerciseReps' value={reps} onChange={e=>setReps(e.target.value)} required/>
        <button type="submit">Add workout</button>
      </form>
      {error && <div className='error'>{error}</div>}
    </div>
  )
}

export default WorkoutForm
