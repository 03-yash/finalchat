import React from 'react'
import { useSignup } from '../hooks/useSignup'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
    const{data, checkingStatus} = useSignup()
  if(checkingStatus){
    return(
        <h1>Loading...</h1>
    )
  }
  return data?<Outlet/>:<Navigate to={'/profile'}/>
}

export default PrivateRoute