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
    // Let the browser handle the redirect natively — no fetch, no CORS issue
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/api/show/${code}`;
  }, [code]);

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center"
      style={{ backgroundColor: "#FCF2E5" }}
    >
      <p className="text-sm" style={{ color: "#A8A492" }}>Redirecting...</p>
    </div>
  );
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
