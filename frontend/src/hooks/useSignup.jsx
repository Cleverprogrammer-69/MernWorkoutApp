import {useState} from 'react'
import {useAuthContext} from './useAuthContext'
import axios from 'axios'
export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading,setIsLoading] = useState(null)
    const URL = "http://localhost:3002";
  const signup=async(email,password)=>{
    setIsLoading(true)
    setError(null)
    const response = await axios.post(
      `${URL}/api/user/signup`,
      JSON.stringify({ email, password }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json=response.json()
    if(!response.ok){
        setIsLoading(false)
        setError(json.error)
    }
    if(response.ok){
        
    }
  }
}
