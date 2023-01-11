import React, { useState } from 'react'
import {Link, Outlet , useLocation,useNavigate} from 'react-router-dom'
import Alert from './Alert';
import { useContext } from 'react';
import alertContext from '../ContextApi/Alert/alertContext';

export default function Layout(props) 
{
    let location = useLocation();
    React.useEffect(() => {
    }, [location]);
    const {showAlert,clearAlert} = useContext(alertContext);
    const [account, setaccount] = useState(false)
    let {mode}=props;
    const nevigate=useNavigate();

    const logout =()=>
    {
        localStorage.removeItem('token');
        nevigate('/login');
        showAlert("Logged Out Suceessfully","Success")
        clearAlert();
        setaccount(false);

    }


   return (

       <div style={(mode==='light')?{border:"1px solid white",zIndex:"5",height: '60px', width: '100%', position: 'fixed', top:"0px"}:{zIndex:"5",height: '60px', width: '100%', position: 'fixed', top:"0px", backgroundColor: 'gray', border:"2px solid #490B3D"}}>
            <h4   name="title" style={{position: "absolute", left: "12px", top: "15px"}}>
            <span style={{color:"#BD1E51", textShadow:"1px 1px 1px black"}}>I</span>
            <span style={{color:"#F1B814", textShadow:"1px 1px 1px black"}}>Note</span>
            <span style={{color:"#490B3D", textShadow:"1px 1px 1px black"}}>book</span>
            </h4>


            { /* if there is login token or user is in about section with or wwithout token then display home button */}
            {(localStorage.getItem('token') || (location.pathname==="/about"))?<Link name="home button" to="/"  style={{ marginRight:"40px",fontWeight:"bold",position:"relative",left:" 170px",top:"20px",  textDecoration: 'none', fontSize: '14px' ,color:(location.pathname==='/')?'black':'rgb(199, 192, 192)'}}>Home</Link>:""}
            <Link name="about button" to="/about"  onClick={()=>setaccount(false)} style={{fontWeight:"bold",position:"relative",left:"150px",top:"20px", fontSize: '14px', color:(location.pathname==='/about')?'black':'rgb(199, 192, 192)',textDecoration:'none'}}> About</Link> 

            {/* if user is logged in then display account button */}

            {
                (localStorage.getItem('token'))?
                             (location.pathname==='/about')?
                                /* horizontal div */
                                                            <div >
                                                                <button onClick={()=>(account===true)?setaccount(false):setaccount(true)} style={{color:"#BD1E51",position: "absolute", right: "14px", top: "20px",background:"transparent",border:"none"}}><i className="fa-solid fa-circle-user fa-xl"></i></button>
                                                                <div style={{ zIndex:"5",position: "absolute", right: "47px",  top: "20px", width:"90px",height:"30px", display:(account===false)?"none":"block"}}>
                                                                    <Link to="/accountDetails"><button onClick={()=>setaccount(false)} style={{color:"#F1B814",position:"absolute", bottom:"2px", left :"50px" ,background:"transparent",border:"none"}}><i className="fa-regular fa-id-badge fa-lg"></i></button></Link>
                                                                    <button  onClick={logout} style={{color:"#490B3D",marginTop:"6px",background:"transparent",position:"absolute", bottom:"2px", left :"18px" ,border:"none"}}> <i className="fa-solid fa-arrow-right-from-bracket"></i></button>
                                                                </div>
                                                            </div>
                                                        :
                                /*  vertical div */           
                                                            <div >
                                                                <button onClick={()=>(account===true)?setaccount(false):setaccount(true)} style={{color:"#BD1E51",position: "absolute", right: "14px", top: "20px",background:"transparent",border:"none"}}><i className="fa-solid fa-circle-user fa-xl"></i></button>
                                                                <div style={{ zIndex:"5",position: "absolute", right: "17px",  top: "55px", width:"30px",height:"100px",alignItems:"center", display:(account===false)?"none":"block"}}>
                                                                    <Link to="/accountDetails"><button onClick={()=>setaccount(false)} style={{color:"#F1B814",marginTop:"6px",background:"transparent",border:"none"}}><i className="fa-regular fa-id-badge fa-lg"></i></button></Link>
                                                                    <button  onClick={logout} style={{color:"#490B3D",marginTop:"6px",background:"transparent",border:"none"}}> <i className="fa-solid fa-arrow-right-from-bracket"></i></button>
                                                                </div>
                                                            </div>
                :""
            }

            <Alert name="alert-bar" />
            <Outlet/>
       </div>

    );
}
