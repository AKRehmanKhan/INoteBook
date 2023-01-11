import React from "react";
import { useState } from "react";
import userContext from "./userContext";
import {useNavigate} from "react-router-dom"

const UserState =(props)=>
{
    const local="http://localhost:5000";
    const [user, setuser] = useState({name:"", email:"", password:""})
     const navigate= useNavigate();
  const addUser= async(newuser)=>
  {

    const{name,email,password}=newuser;
    setuser(newuser);
    const response = await fetch(`${local}/api/auth/createuser`, {
    method: 'POST', 
    headers: {
              'Content-Type': 'application/json',
            },
    body: JSON.stringify({name,email,password})
    });
    const json= await response.json();
    return json;

    }

    const userLogin=async(loginCredentials)=>
    {
      const {email, password}=loginCredentials;

    //  setuser({loginCredentials});
      const response = await fetch(`${local}/api/auth/loginuser`, {
      method: 'POST', 
      headers: {
              'Content-Type': 'application/json',
            },
      body: JSON.stringify({email,password})
      });

      const json= await response.json();
      if(json.success===true)
      {
        localStorage.setItem("token",json.auttoken);
  
      const res1 = await fetch(`${local}/api/auth/getuser`, {
      method: 'POST', 
      headers: {
              'Content-Type': 'application/json',
              'auth-token':localStorage.getItem('token')
            },
      body: JSON.stringify({email,password})
      });

        const js = await  res1.json();
        setuser({name:js.name,email:email,password:password})
        
    }

       return json;
     }
     const editUser=async(newnote)=>
    {
      const{name,password}=newnote;

      const response = await fetch(`${local}/api/auth/updateuser`, {
      method: 'PUT', 
      headers: {
              'Content-Type': 'application/json',
              'auth-token':localStorage.getItem('token')
            },
      body: JSON.stringify({name,password})
      });
      const js= await response.json();
      if(js)
      {
      setuser({name:js.name,email:js.email,password:password});
      return true;
      }

    }
     const deleteUser= async()=>
    {
   
      const response = await fetch(`${local}/api/auth/deleteuser`, {
      method: 'DELETE', 
      headers: {
                'Content-Type': 'application/json',
                "auth-token":localStorage.getItem("token")
              },
      
      });
     
      
     const json =await response.json();

     //front end
     if(json.success)
     {
      localStorage.removeItem("token");
      setuser({name:"", email:"", password:""});
      navigate("/");
      return true;
     }
    }
      
  return(
        <userContext.Provider value={{user,addUser,editUser,userLogin,deleteUser}}>
          {props.children}
        </userContext.Provider>
);     
}
export default UserState;