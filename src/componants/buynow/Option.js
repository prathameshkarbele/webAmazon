import React, { useContext } from 'react'
import { LoginContext } from '../Context/ContextProvider';
import { ToastContainer, toast } from "react-toastify";

const Option = ({deleteData, get}) => {

  const {account, setAccount} = useContext(LoginContext);


const removeData = async() =>{
  try {
    const res = await fetch(`/remove/${deleteData}`,{
      method:"DELETE",
      headers:{
        Accept:"application/json",
        "Content-type":"application/json",
      },
      credentials:"include"
    })
    const data = await res.json()
    console.log(data)

    if(res.status === 400 || !data){
      console.log("error")
    }
    else{
      console.log("User Delete ")
      setAccount(data)
      toast.success("Remove Item In Cart", {
        position: "top-center",
      });
      get()
    }
  } catch (error) {
    console.log("error")
    
toast.warn("invalid details", {
  position: "top-center",
});
  }
}

  return (
    <div className='add_remove_select'>
        <select >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
        </select>
        <p style={{cursor:"pointer"}} onClick={()=>removeData(deleteData)}>Delete</p><span>|</span>
        <p className='forremovemedia'>Save Or Latter</p><span>|</span>
        <p className='forremovemedia'>See More Like This</p>
        <ToastContainer />
    </div>
  )
}

export default Option


