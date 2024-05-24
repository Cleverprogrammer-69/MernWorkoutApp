import { useAuthContext } from './useAuthContext'
import { useWorkoutsContext } from './useWorkoutsContext'
export const useLogout = () => {
    const {dispatch}=useAuthContext()
    const {dispatch:workoutDispatch}=useWorkoutsContext()
    const logout=()=>{
        localStorage.removeItem('user')
        dispatch({type:"LOGOUT"})
        workoutDispatch({ type: "SET_WORKOUTS", payload: null });
        console.log(`After logout ${localStorage.getItem('user')}`)
    }
  return {logout}
}
