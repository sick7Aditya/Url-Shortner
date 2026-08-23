import { useState } from 'react'
// import './App.css'
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from 'react'
import OneAndOnlyPage from './component/OneAndOnlyPage'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import SignUp from './authCity/SignUp'
import Login from './authCity/Login'
import About from './More/About'
import Profile from './More/Profile'
import ProtectedRoute from './component/ProtectedRoute'
import { Link } from 'react-router-dom'
import { start } from './component/axios'

// backgroundColor: "#ffffff",
        // borderBottom: "1px solid #A8A492",

function Error(){
  return (
    <div backgroundColor="#A8A492">Go Back To your country Monkey(Another url.maybe /home or something idk)!!!!<Link to='/'>Login</Link></div>
  )
}



function Traverse() {
  const { code } = useParams();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/show/${code}`)
      .then(res => {
        if (!res.ok) throw new Error("Not found");
        return res.text(); // ← this is the fix
      })
      .then(url => {
        window.location.href = url;
      })
      .catch(() => {
        window.location.href = "/404";
      });
  }, [code]);

  return <div>Redirecting...</div>;
}

function App() {
   useEffect(() => {
        start();
    }, []);
  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path="/u/:code" element={<Traverse/>}></Route>
            <Route path="/signup" element={<SignUp/>}></Route>
            <Route path="/" element={<Login/>}></Route>
            <Route element={<ProtectedRoute/>}>
                <Route path="/Home" element={<OneAndOnlyPage/>}></Route>
                <Route path="/Profile" element={<Profile/>}></Route>
                <Route path="/About" element={<About/>}></Route>
            </Route>
           <Route path="/*" element={<Error/>}></Route>
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
