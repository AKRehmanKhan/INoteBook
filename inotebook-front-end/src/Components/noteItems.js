import React from 'react'
import noteContext from '../ContextApi/notes/noteContext';
import { useContext } from 'react';
import alertContext from "../ContextApi/Alert/alertContext"

export default function NoteItems (props) 
 {

  const {setcurrentID,deleteNote} = useContext(noteContext)
  const {showAlert,clearAlert} = useContext(alertContext);
  const {title,description,id,tag,setnote,setopenForm,seteditmode}=props;

  const OpenEditFormAndPassValues=(id)=>
  {
    // this function will open then edit form and pass targeted note's valuses to form
    setnote({title,description,tag})
    setcurrentID(id);
    seteditmode(true);
    setopenForm(true);
  }

  const DeleteNote =(id)=>
  {
    //This function will delete targeted note and show alert
    deleteNote(id);
    showAlert("Note Deleted", "Success");
    clearAlert();
  }

  return (
    <div style={{ position:"relative",display:"inline-block",height:"90px",width:"250px",marginTop:"35px", marginLeft:"18px", boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"}}>
      <h6 name="title field" style={{ border:"1px solid white", width:"173px",font:"29px", fontWeight:"bold",marginLeft:"9px",marginTop:"15px"}}>{title}</h6>
      <button name="edit button" onClick={()=>OpenEditFormAndPassValues(id)}style={{color:"#BD1E51",border:"none", position:"absolute", top:"10px", right:"33px", background:"transparent"}}><i className="fa fa-pencil-square-o fa-lg" aria-hidden="true"></i></button>
      <button name="delete button" onClick={()=>DeleteNote(id)} style={{color:"#490B3D",border:"none",position:"absolute", top:"10px", right:"5px", background:"transparent"}}><i className="fa fa-trash fa-lg" aria-hidden="true"></i></button>
      <textarea name="desc fielld" value={(description.length>70)?description.slice(0,70):description} disabled style={{ background:"transparent" ,color:"black", resize:"none",border:"1px solid white",height:"45px",width:"230px",fontSize:"13px",marginLeft:"9px",marginRight:"5px",marginTop:"-5px"}}></textarea>
      <div style={{position:"absolute",top:"-10px", left:"-5px", width:"70px",height:"23px", backgroundColor:"#BD1E51",borderRadius:"6px 0 6px 0"}} >
       <p name="tag" style={{fontSize:"13px",color:"white",textAlign:"center",paddingTop:"2px"}}>{tag}</p>
      </div>
    </div>
  )
}

