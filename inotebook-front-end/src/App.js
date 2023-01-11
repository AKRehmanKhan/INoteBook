import './App.css'
import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Layout from './Components/layout'
import Home from './Components/home'
import About from './Components/about'
import Signup from './Components/signup';
import Login from './Components/login';
import AccountDetails from './Components/AccountDetails';
import NoteState from './ContextApi/notes/NoteState';
import AlertState from './ContextApi/Alert/alertState';
import UserState from './ContextApi/user/userStates';




export default function App() 
 {
   return (
   
      <AlertState>
        <NoteState>
          <BrowserRouter>
          <UserState>
            <Routes>  
              
              <Route path='/' element={<Layout mode="light" />}>
              <Route index element={<Home/>}/>
              <Route path='/about' element={<About/>}/>
              <Route path="/signup" element={<Signup/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/accountDetails' element={<AccountDetails/>}/>
              </Route>
          
            </Routes>
            </UserState>
          </BrowserRouter> 
        </NoteState>
     </AlertState>
   
  );     
};

