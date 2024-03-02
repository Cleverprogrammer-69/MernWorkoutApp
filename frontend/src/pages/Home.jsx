import { useEffect } from "react"
import axios from "axios"
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import {useWorkoutsContext} from '../hooks/useWorkoutsContext'
export default function Home() {
  const {workouts,dispatch}= useWorkoutsContext()
  const URL="https://wrokoutbuddy-api-7b6e29832f9c.herokuapp.com/api/workouts";
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
    }, [dispatch])
    
  return (
    <div className="home">
      <WorkoutForm />
       <div className="workouts">
        <h3>Workouts</h3>
        
            {workouts && workouts.map((workout)=>(
                <WorkoutDetails workout={workout} key={workout._id} />
            ))}
         {workouts.length===0 && <h4>No workouts. Let's add some.</h4>}
 
       </div>
       
    </div>
  )
}
