import React from "react";
import { useState } from "react";
import alertContext from "./alertContext";

const AlertState =(props)=>
{
  const [alert, setalert] = useState(null);   
  const showAlert=(message,type)=> 
  {
    //function to set alert state
        setalert({
          mes:message,
          type:type
        })
  }
  const clearAlert=()=>
  {
    // function to disapper alert
    setTimeout(() => {
    setalert(null);
  }, 2000);
}
      
  return(
        <alertContext.Provider value={{alert,showAlert,clearAlert}}>
          {props.children}
        </alertContext.Provider>
);     
}
export default AlertState;