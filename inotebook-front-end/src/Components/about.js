import React from 'react'

export default function AboutUs() {

                      
  return (
    
    <div style={{backgroundColor:'rgb(250, 221, 0)', height:'515px', width:'100%', color:'#490B3D', position:"absolute", top:"60px"}}>
      <div style={{ textAlign:'left', width:'40%', marginLeft:'10%', position:'absolute', marginTop:'5%'}}>
        <h2 name="heading left" style={{textShadow:"0px 2px 3px solid black"}}>
          <span style={{color:"#BD1E51"}}>About </span>
          <span >Us</span> 
        </h2>
        <br />
        <h5  name="down heading left" style={{color:"black"}}>Elementum eu facilisis sed odio morbi quis</h5>
        <p  name="left paragraph" style={{color:"black"}}>Massa ultricies mi quis hendrerit dolor magna eget est. Lacinia at quis risus sed vulputate odio ut enim blandit. Auctor elit sed vulputate mi sit. Massa tincidunt dui ut ornare lectus. Turpis egestas sed tempus urna et. Diam vulputate ut pharetra sit amet aliquam id. Nisi est sit amet facilisis. In nisl nisi scelerisque eu ultrices vitae. Massa ultricies mi quis hendrerit dolor magna eget est. Lacinia at quis risus sed vulputate odio ut enim blandit. Auctor elit sed vulputate mi sit. ​Massa ultricies mi quis hendrerit dolor magna eget est. Lacinia at quis risus sed vulputate odio ut enim blandit. Auctor elit sed vulputate mi sit. Massa tincidunt dui ut ornare lectus. Turpis egestas sed tempus urna et. Diam vulputate ut pharetra sit amet aliquam id.</p>
      </div>

      <div style={{boxShadow:"rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px", backgroundColor:'#BD1E51', height:'400px', width:'300px', position:'absolute', top:'12%', right:"170px", color:'white'}}>
        <div>
          <h3 name="right heading" style={{textAlign:'center',marginTop:'90px'}}>Milestones</h3>
          <ul name="right list" style={{fontSize:'18px',marginTop:"30px", paddingLeft:"50px"}} type="square">
            <li>Founded in 2015</li>
            <li>Reach over 4M downloads</li>
            <li>Raise $10M+ in funding</li>
            <li>Turpis egestas sed</li>
            <li>24/7 native suppport</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
