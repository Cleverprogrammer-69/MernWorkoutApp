import { useEffect } from "react";
import axios from "axios";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
export default function Home() {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const URL = "https://mernworkoutapp-1.onrender.com/api/workouts";
  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get(URL, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (response.status !== 200) {
          throw new Error("Network response was not ok");
        }

        const json = await response.data;

        dispatch({ type: "SET_WORKOUTS", payload: json });
        console.log(json);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      <WorkoutForm />
      <div className="workouts">
        <h3>Workouts</h3>

        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails workout={workout} key={workout._id} />
          ))}
        {workouts.length === 0 && <h4>No workouts. Let's add some.</h4>}
      </div>
    </div>
  );
}
