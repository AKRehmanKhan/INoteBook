import React from 'react'
import { useState } from 'react'
import { useContext } from 'react';
import noteContext from '../ContextApi/notes/noteContext';
import alertContext from '../ContextApi/Alert/alertContext';

import Notes from "./Notes";


export default function Home ()
{
 
  const {currentID,setcurrentID,addNote,editNote}=useContext(noteContext);
  const {showAlert,clearAlert} = useContext(alertContext)
  const [openForm, setopenForm] = useState(false);
  const [editmode, seteditmode] = useState(false);
  const [note, setnote] = useState({title:"",description:"",tag:""});

  const ClearFields =(event)=>
  {
    //function to clear text fields 
    event.preventDefault();        
    setnote({title:"",description:"",tag:""});
  } 

  const Disapp=(event)=>
  {
    //function to disappear text form
    event.preventDefault();
    setopenForm(false);
    seteditmode(false);
    setcurrentID(null);
    setnote({title:"",description:"",tag:""});
  }

  const savefield=(event)=>
  {
    // function to save text form fields on event change
    event.preventDefault();
    setnote({...note,[event.target.name]:event.target.value});
  }

  const AddorEditNoteandDisap=(event)=>
  {
    // function to add and edit note
    event.preventDefault();
    (editmode===true)?editNote(currentID,note.title,note.description,note.tag): addNote(note);
    seteditmode(false);
    setcurrentID(null);
    setopenForm(false);
    setnote({title:"",description:"",tag:""});
    (editmode===true)?showAlert("Note Edit Succesfully", "Success"):showAlert("Note Added Succesfully", "Success");
    clearAlert();
     
   }


  return(
    
    <div style={{border:"1px solid white",width:"100%", height:"1050px", marginTop:"59px"}}>
      
      <div   style={{marginBottom:"40px", boxShadow:"rgba(0, 0, 0, 0.35) 0px 5px 15px", borderRadius:"5px", width:"1052px",height:"90px", position:"relative", top:"10px", left:"112px", display:(openForm===true)?'block':'none'}}>
        <form>
        <input    name ="title"  maxLength={18} type="text" value={note.title} onChange={savefield} id='titlee'  style={{color:"#BD1E51",width:"800px", marginTop:"10px", marginLeft:'20px',fontSize:"16px",fontWeight:'bold'}} placeholder='Title...'/><br/>
        <textarea name='description'  value={note.description} onChange={savefield} id='description'    style={{color:"black",width:"800px", marginTop:"5px",marginLeft:'20px', height:"35px",fontSize:"13px", resize:"none"}} placeholder='Take a note...'/><br/>
        <input    name='tag' value={note.tag}  maxLength={10} onChange={savefield} id="tag"  type="text"   style={{color:"#490B3D",position:"absolute", right:"20px",top:"10px", width:"185px"}}placeholder="Tag..."/>
        <button   name="save button" disabled={(note.title.length>3 && note.description.length>5)?false:true}        onClick={AddorEditNoteandDisap} style={{color:"#BD1E51",position:'absolute', bottom:"10px", right:"180px", height:"25px", width:"25px" , background:"transparent",border:"none"} }><i className="far fa-save fa-lg" ></i> </button>
        <button   name="clear fields button" onClick={ClearFields} style={{color:"#F1B814",position:'absolute', bottom:"10px", right:"140px", height:"25px", width:"25px" , background:"transparent",border:"none"} }><i className="fa-solid fa-circle-minus fa-lg"></i> </button>
        <button   name="close buttton" onClick={Disapp} style={{color:"#490B3D",position:'absolute', bottom:"10px", right:"40px", height:"25px", width:"25px" , background:"transparent",border:"none", fontWeight:"bold"} }>Close</button>
        </form>
      </div>
      
      <h4 name="Your notes Heading" style={{marginTop:"10px", marginLeft:"110px",color:"#fcc729", textShadow:"1px 1px 1px black"}}>
        <span style={{color:"#BD1E51"}}>Y</span>
        <span style={{color:"#F1B814"}}>our</span>
        <span style={{color:"#490B3D"}}> Notes</span>
      </h4>

      <button  name="Add note button" style={{ borderRadius:"7px",width:"29px", height:"29px", color:"white",backgroundColor:"#BD1E51",position:"absolute",right:"115px",top:"98px",border:"none", display:(openForm===true)?'none':'block'}} onClick={()=>setopenForm(true)}>
       <i className="fa-regular fa-square-plus fa-lg"></i>
      </button>
    
      <Notes name="Notes" setnote={setnote} setopenForm={setopenForm} seteditmode={seteditmode}/>

    </div> 
  )

}