import React, { useContext, useEffect } from 'react'
import NoteItems from './noteItems'
import noteContext from '../ContextApi/notes/noteContext';
import { useNavigate } from 'react-router-dom';

export default function Notes(props) 
{

  const {note,fetchnotes}=useContext(noteContext);
  const {setnote,setopenForm, seteditmode}=props;
  const navigate= useNavigate();

  useEffect(() => 
  {
    // use effect hook to fetch notes if user is logged in else navigate to login
    console.log("called")
    if(localStorage.getItem('token'))
    {
     fetchnotes();
    }
    else
    {
     navigate('/login');
    }
  },[note,fetchnotes,navigate])

  return (

    <div style={{ marginTop:"-10px", marginLeft:"94px",width:"1080px",height:"500px"}}>

      {  
        // javaScript brackets
        // terninary operator if there is no notes to preview display no notes else preview notes

        (note.length ===0)?

          <p ame="no notes message" style={{marginTop:"50px", textAlign :"center"}}>No Notes To Preview</p>
        :
          note.map((elem)=>
          {
            return   <NoteItems name="preview notes" key={elem._id} title={elem.title} description={elem.description} id={elem._id} tag={elem.tag} setnote={setnote} setopenForm={setopenForm}  seteditmode={seteditmode} />
          })
      }
    </div>
  )
}
