import React from 'react'
import alertContext from '../ContextApi/Alert/alertContext'
import { useContext } from 'react'

export default function Alert() 
{
  const {alert} = useContext(alertContext);
  return (
    alert && <div style={{width:'100%',height:'28px',backgroundColor:(alert.type==="Success")?'#d4edda':'#fac8d7', position:'absolute',top:'60px',color:(alert.type==="Success")?'darkGreen':"#BD1E51"}}>   
               <p style={{position:'absolute',top:'2px',left:'30px'}}> {(alert.type==="Success")?<b><i className="fa-solid fa-circle-check"></i></b>: <b><i className="fa-solid fa-triangle-exclamation"></i></b>}&emsp;{alert.mes}</p>
             </div>
  )
} 