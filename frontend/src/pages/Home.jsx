import { useEffect } from "react"
import axios from "axios"
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import {useWorkoutsContext} from '../hooks/useWorkoutsContext'
export default function Home() {
  const {workouts,dispatch}= useWorkoutsContext()
  const URL="https://workoutapi-1.abdullah917.repl.co/api/workouts"
    useEffect(() => {
      const fetchWorkouts = async () => {
        try {
          const response = await axios.get(URL);

          if (response.status !== 200) {
            throw new Error('Network response was not ok');
          }

          const json =await response.data;
          
          dispatch({type:"SET_WORKOUTS",payload:json})
          console.log(json);
        } catch (error) {
            console.log('Error fetching data:', error);
          }
};

    
      fetchWorkouts()
    }, [])
    
  return (
    <div className="home">
      <WorkoutForm />
       <div className="workouts">
        <h3>Workouts</h3>
        
            {workouts && workouts.map((workout)=>(
                <WorkoutDetails workout={workout} key={workout._id} />
            ))}
         {workouts===null && <h4>No workouts. Let's add some.</h4>}
 
       </div>
       
    </div>
  )
}
