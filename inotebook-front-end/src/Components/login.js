import React, { useState } from 'react'
import { useNavigate , Link} from 'react-router-dom';
import { useContext } from 'react';
import alertContext from '../ContextApi/Alert/alertContext';
import userContext from '../ContextApi/user/userContext';

export default function Login()
 {

  const [hide, sethide] = useState(true);
  const nevigate = useNavigate();

  const [UserCredentialss, setUserCredentialss] = useState({email:"",pasword:""});
  const {showAlert,clearAlert} = useContext(alertContext)
  const {userLogin} = useContext(userContext)
  
  const savefield=(event)=>
  {
    event.preventDefault();
    setUserCredentialss({...UserCredentialss,[event.target.name]:event.target.value});
       
  }

  const submit= async(event)=>
  {
    event.preventDefault();
    const json= await userLogin(UserCredentialss);
 
    if(json.success===true)
    {  
      nevigate("/");
      showAlert("Logged In Successfully","Success");
      clearAlert();    
    }
    else{
         showAlert("Invalid Credentials","Falid");
         clearAlert();
    }

  }

  return (
         <div>
           <img  src="pic.png" alt="" style={{position:"absolute",top:"80px",left:"110px",height:"350px",width:"600px"}}/>
           <h1 style={{fontFamily:"garamond-bold-italic",position:"absolute",top:"450px",left:"350px"}} >Let's go</h1>
           <form id="form" onSubmit={submit} onKeyPress={(event)=>{if(event.key === 'Enter'){submit(event);}}} style={{position:"absolute", left:"65%", top:'-1px',backgroundColor:"#b01962", height:"577px", width :"450px"}} >
             <h3 style={{color:"#F1B814",paddingLeft:"180px", paddingTop:"125px",textShadow:"1px 1px 1px #00aef5" }}>Login</h3>
             <div style={{paddingLeft:"97px", paddingTop:"20px"}}>
             <label style={{color:"white"}} htmlFor="email">Email:</label><br />
             <input onChange={savefield} value={UserCredentialss.email} required autoFocus="on" autoComplete="on" style={{ height:"35px",width:"260px", marginTop:"7px",marginBottom:"13px" ,background:"white", border:"2px solid #00aef5",borderRadius:"5px", color:"black"}} type="email" name='email' /><br />
             <label style={{color:"white"}} htmlFor="password">Password:</label><br />
             <button style={{ background:"transparent",border:"none",color:"#F1B814",cursor:"pointer",position:"absolute",top:"266px", left:"73%"}} onClick={(event)=>{event.preventDefault(); (hide===true)?sethide(false):sethide(true)}}>{(hide===true)?<i className="fa-solid fa-eye"></i>:<i className="fa-solid fa-eye-slash"></i>}</button>
             <input onChange={savefield} value={UserCredentialss.password} minLength={5} required autoFocus="on" autoComplete="on" style={{ height:"35px",width:"260px", marginTop:"7px",marginBottom:"13px" ,background:"white", border:"2px solid #00aef5",borderRadius:"5px", color:"black"}} type={(hide===true)?"password":"input"} name='password'/> <br />

             <input style={{color:"white", backgroundColor:"#00aef5", borderRadius:"3px", border:"1px solid white",marginTop:"20px", marginLeft:"95px"}} type="submit" />
             </div>
            
             <h6 style={{textAlign:"center", paddingTop:"20px" ,color:"white"}}>OR</h6>
             <Link style={{color:"#F1B814",textShadow: "1px 1px 1px #00aef5" ,paddingLeft:"170px", paddingTop:"20px"}} to="/signup">Create Account</Link>
           </form> 
        </div>

  )
}
