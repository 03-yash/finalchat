import { useEffect, useState } from "react"
import { useSelector } from "react-redux"


export const useSignup = ()=>{
    const{name, email, password} = useSelector((state)=>state.formData)
    const[data, setData] = useState(false)
    const [checkingStatus, setCheckingStatus] = useState(true)

    useEffect(()=>{
        if(name&&email&&password){
            setData(true)
        }
        else{
            setData(false)
        }
        setCheckingStatus(false)
    }, [name, email, password])

    return {data, checkingStatus}
}