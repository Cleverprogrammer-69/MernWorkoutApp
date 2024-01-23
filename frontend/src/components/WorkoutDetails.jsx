import axios from "axios"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from "react-router-dom";
const WorkoutDetails = ({ workout }) => {
  const{dispatch}= useWorkoutsContext()
   const URL="https://wrokoutbuddy-api-7b6e29832f9c.herokuapp.com/api/workouts"
const deleteClick=async ()=>{
  try {
      const response =await axios.delete(`${URL}/${workout._id}`)
  if (response.status !== 200) {
    throw new Error('Network response was not ok');
  }
  
  const json= response.data
  dispatch({type:"DELETE_WORKOUT",payload:json})
  console.log(json.title);
  } catch (error) {
    console.log(error)
  }

}
  return (
    <div className="workout-details">
    
    <div className="workout__card">
      <h4>{workout.title}</h4>
      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p><strong>Number of reps: </strong>{workout.reps}</p>
      <p>{workout.createdAt}</p>
      </div>
    <div className="workout__actions">
        <Link className="edit__link" to={`/edit/${workout._id}`}>
        <div className="edit">
          <EditIcon fontSize="medium" />
         
          
        </div>
        </Link>
        <div className="delete"  onClick={deleteClick}>
          <DeleteIcon fontSize="medium" />
         
         
          </div>
        
      </div>
     
      
      </div>
  )
}

export default WorkoutDetails
