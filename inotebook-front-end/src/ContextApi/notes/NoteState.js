
import React from "react";
import { useState } from "react";
import noteContext from "./noteContext";

const NoteState =(props)=>
{

  const local="http://localhost:5000";  // backend url
  const [note, setnote] = useState([]); // note state
  const [currentID, setcurrentID] = useState(null);  // current note id fpr eding and deleting note

  // function fetch all notes
  const fetchnotes = async()=>
  {
    //////////////////////////
   //backend
    const response = await fetch(`${local}/api/note/fetchnotes`, {
    method: 'GET', 
    headers:{
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
            },
    });   
   
   const json =await response.json();

    ///////////////////////////
   //front end
   setnote(json); //setting note state after fetching all notes from oapi 
  }

  // function to add notes
  const addNote=  (newnote)=>
  {
    const {title,description,tag}=newnote;  //getting new note from home 
    
    //////////////////////////
    //backend
    fetch(`${local}/api/note/createnote`, {
    method: 'POST', 
    headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
            },
    body: JSON.stringify({title,description,tag})
   });

    ///////////////////////////
    //front end
    setnote(note.concat(newnote)); //updating note state after adding a note
  }

  //edit 
  const editNote=  (id, title,description, tag)=>
  {
    ////////////////////////
    //backend
    fetch(`${local}/api/note/updatenote/${id}`, {
    method: 'PUT', 
    headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
             },
    body: JSON.stringify({title,description,tag})
    });
    
    //////////////////////
    // client
    for (let index = 0; index < note.length; index++) 
    {
      //finding targeted notes from notes array and  editing it
      const element = note[index];
      if(element._id===id)
      {
        element.title=title;
        element.description=description;
        element.tag=tag;
      } 
    }
  }

  //delete
  const  deleteNote= (id)=>
  {
    ////////////////////////
    //back end
    fetch(`${local}/api/note/deletenote/${id}`, {
    method: 'DELETE', 
    headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token'),
             },
    });

    /////////////////////////
    //front end
    const newnotes=note.filter((elem)=> {return id!==elem._id})   // filtering notes array from deleted notes
    setnote(newnotes);
  }
 
  
  return(
        <noteContext.Provider value={{currentID, setcurrentID ,note,fetchnotes,addNote,editNote,deleteNote}}>
          {props.children}
        </noteContext.Provider>
);     
}
export default NoteState;