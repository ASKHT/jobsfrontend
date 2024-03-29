import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Register from '../src/pages/Register/Register'
import Login from "../src/pages/Login/Login"
import Header from "../src/components/Header/Header"
import Mainpage from './components/mainpage/Mainpage'
import JobDetails from './components/jobdetails/Jobdetails'
import Createjob from './components/Createjob/Createjob'
const App = () => {
  return (
  <BrowserRouter>
     <Routes>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/header" element={<Header/>}/>
      <Route path="/" element={<Mainpage/>}/>
      <Route path="/jobdetail/:jobId" element={<JobDetails/>}/>
      <Route path="/createjob" element={<Createjob/>}/>
     </Routes>
  </BrowserRouter>
  )
}

export default App