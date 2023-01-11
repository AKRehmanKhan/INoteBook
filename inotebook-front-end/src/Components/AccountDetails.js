import React, { useState } from 'react'
import { useContext } from 'react';
import alertContext from '../ContextApi/Alert/alertContext';
import userContext from '../ContextApi/user/userContext';

export default function AccountDetails() 
{
  const {user,deleteUser,editUser} = useContext(userContext);
  const {showAlert, clearAlert} = useContext(alertContext)
  const [UserCredentialss, setUserCredentialss] = useState({ name:user.name, email:user.email, password:user.password, confpass:user.password});
  const [hide, sethide] = useState(true);
  const [editmode, seteditmode] = useState(false);

  const savefield=(event)=>
  {
    event.preventDefault();
    setUserCredentialss({...UserCredentialss,[event.target.name]:event.target.value});     
  }

  const edit= ()=>
  {
    (editmode===true)? seteditmode(false): seteditmode(true);
    let mode=!editmode;
    if(mode===false)
    {
      const newnote={name:UserCredentialss.name, password:UserCredentialss.password};
      if(UserCredentialss.password!==UserCredentialss.confpass)
      {
       showAlert("Password and Confirm Password must be same","falied");
       clearAlert();
       return;
      }
      
      //Api call to edit user in editUser functin is user state
      if(editUser(newnote))
      {
       showAlert("Details Edited Successfully","Success");
       clearAlert();
      }
    }
  }

  const DeleteUser = async ()=>
  {
    //api call to delete user
    const ret= await deleteUser();
    if(ret)
    {
      showAlert("Oops you deleted your Account","falied")
      clearAlert();
    }
  }

  return (
    <div>
       <button onClick={edit} style={{zIndex:"2",color:(editmode===true)?"#F1B814":"white",position:"absolute", left:"700px", top:"168px",background:"transparent",border:"none"}}><i className="fa fa-pencil-square-o fa-lg" aria-hidden="true"></i> </button>
       <button onClick={DeleteUser} style={{zIndex:"2",color:"white",position:"absolute", left:"740px", top:"168px",background:"transparent",border:"none"}}><i className="fa fa-trash fa-lg"></i></button> 
         
         <form style={{position:"absolute", left:"34%", top:'88px',backgroundColor:"#BD1E51", height:"450px", width :"400px"}} >
            <h3 style={{color:"#F1B814",paddingLeft:"120px", paddingTop:"30px",textShadow:"1px 1px 1px #00aef5" }}>Your Details</h3>
            <div style={{paddingLeft:"70px", paddingTop:"10px"}}>
            <label  style={{color:"white"}}htmlFor="name">Name:</label><br />
            <input name="name" disabled={(editmode === true)?false :true} onChange={savefield} value={UserCredentialss.name} minLength={5} required autoFocus="on" autoComplete="on" style={{ height:"35px",width:"260px",marginTop:"7px",marginBottom:"13px",background:"white", border:"2px solid #00aef5",borderRadius:"5px", color:"black"}} type="text" /><br />
            <label  style={{color:"white"}} htmlFor="email">Email:</label><br />
            <input name='email' disabled onChange={savefield} value={UserCredentialss.email} required autoFocus autoComplete="on" style={{ height:"35px",width:"260px", marginTop:"7px",marginBottom:"13px" ,background:"white", border:"2px solid #00aef5",borderRadius:"5px", color:"black"}} type="email"  /><br />
            <label  style={{color:"white"}} htmlFor="password">Password:</label><br />
            <button style={{ background:"transparent",border:"none",color:"#F1B814",cursor:"pointer",position:"absolute",top:"240px", left:"76%"}} onClick={(event)=>{event.preventDefault(); (hide===true)?sethide(false):sethide(true)}}>{(hide===true)?<i className="fa-solid fa-eye"></i>:<i className="fa-solid fa-eye-slash"></i>}</button>
            <input name='password' disabled={(editmode === true)?false :true}onChange={savefield} value={UserCredentialss.password} minLength={5} required autoFocus autoComplete="on" style={{ height:"35px",width:"260px", marginTop:"7px",marginBottom:"13px" ,background:"white", border:"2px solid #00aef5",borderRadius:"5px", color:"black"}} type={(hide===true)?"password":"input"} /> <br />
            <label  style={{color:"white"}} htmlFor="confrim password">Confirm Pasword:</label><br />
            <input name='confpass'disabled={(editmode === true)?false :true} onChange={savefield} value={UserCredentialss.confpass} minLength={5} required autoFocus autoComplete="on"  style={{ height:"35px",width:"260px", marginTop:"7px",marginBottom:"13px" ,background:"white", border:"2px solid #00aef5",borderRadius:"5px", color:"black"}} type={(hide===true)?"password":"input"} /><br/>
            </div>
         </form>
    </div>
  )
}
