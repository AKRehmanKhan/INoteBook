import React, { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import alertContext from '../ContextApi/Alert/alertContext';
import userContext from '../ContextApi/user/userContext';
export default function Signup() 
{

  const [hide, sethide] = useState(true);
  const nevigate=useNavigate();
  const {showAlert,clearAlert} = useContext(alertContext)
  const [UserCredentialss, setUserCredentialss] = useState({ name:"", email:"", password:"", confpass:""});
  const {addUser} = useContext(userContext)
  const savefield=(event)=>
  {
    event.preventDefault();
    setUserCredentialss({...UserCredentialss,[event.target.name]:event.target.value});
       
  }

  const submit= async(event)=>
  {
    event.preventDefault();
    const{password,confpass}=UserCredentialss;
    if(password!==confpass)
    {
      return (showAlert(" Password and COnfirm Password must be same","Falied"),clearAlert())
    }
    const json= await addUser(UserCredentialss);
 
    if(json.success===true)
    {
      localStorage.setItem("token",json.auttoken);
      nevigate("/");
      showAlert(" Account Created Successfully","Success");
      clearAlert();
        
    }

    else
    {
      if(json.error==="Email Already Exists")
      {
        showAlert("User already exists","Failed");
        clearAlert();
      }
      else
      {
        showAlert("Invalid Credentials","Failed");
        clearAlert();
      }
    }

  }

  return (
    <div>
          <img  src="pic.png" alt="" style={{position:"absolute",top:"80px",left:"110px",height:"350px",width:"600px"}}/>
          <h1 style={{fontFamily:"garamond-bold-italic",position:"absolute",top:"450px",left:"280px"}} >Let's get Started</h1>
         <form onSubmit={submit} onKeyPress={(event)=>{if(event.key === 'Enter'){submit(event);}}} style={{position:"absolute", left:"65%", top:'-1px',backgroundColor:"#b01962", height:"577px", width :"450px"}} >
            <h3 style={{color:"#F1B814",paddingLeft:"135px", paddingTop:"50px",textShadow:"1px 1px 1px #00aef5" }}>Register Now</h3>
            <div style={{paddingLeft:"97px", paddingTop:"20px"}}>
            <label  style={{color:"white"}}htmlFor="name">Name:</label><br />
            <input onChange={savefield} value={UserCredentialss.name} minLength={5} required autoFocus="on" autoComplete="on" style={{ height:"35px",width:"260px",marginTop:"7px",marginBottom:"13px",background:"white", border:"2px solid #00aef5",borderRadius:"5px", color:"black"}} type="text" name="name" /><br />
            <label style={{color:"white"}} htmlFor="email">Email:</label><br />
            <input onChange={savefield} value={UserCredentialss.email} required autoFocus autoComplete="on" style={{ height:"35px",width:"260px", marginTop:"7px",marginBottom:"13px" ,background:"white", border:"2px solid #00aef5",borderRadius:"5px", color:"black"}} type="email" name='email' /><br />
            <label style={{color:"white"}} htmlFor="password">Password:</label><br />
            <button style={{ background:"transparent",border:"none",color:"#F1B814",cursor:"pointer",position:"absolute",top:"272px", left:"74%"}} onClick={(event)=>{event.preventDefault(); (hide===true)?sethide(false):sethide(true)}}>{(hide===true)?<i className="fa-solid fa-eye"></i>:<i className="fa-solid fa-eye-slash"></i>}</button>
            <input onChange={savefield} value={UserCredentialss.password} minLength={5} required autoFocus autoComplete="on" style={{ height:"35px",width:"260px", marginTop:"7px",marginBottom:"13px" ,background:"white", border:"2px solid #00aef5",borderRadius:"5px", color:"black"}} type={(hide===true)?"password":"input"} name='password'/> <br />
            <label style={{color:"white"}} htmlFor="confrim password">Confirm Pasword:</label><br />
            <input onChange={savefield} value={UserCredentialss.confpass} minLength={5} required autoFocus autoComplete="on"  style={{ height:"35px",width:"260px", marginTop:"7px",marginBottom:"13px" ,background:"white", border:"2px solid #00aef5",borderRadius:"5px", color:"black"}} type={(hide===true)?"password":"input"} name='confpass'/><br/>

            <input style={{color:"white", backgroundColor:"#00aef5", borderRadius:"3px", border:"1px solid white",marginTop:"20px", marginLeft:"99px"}} type="submit" />
            </div>
           
           <p style={{color:"white", paddingTop:"20px",paddingLeft:"115px"}}>Already have an account</p>
           <Link  to="/login" style={{ color:"#00aef5",position:"absolute", right:"115px", top:"493px"}}>Login</Link>
         </form>
    </div>
  )
}
