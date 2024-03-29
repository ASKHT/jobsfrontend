import React, { useEffect, useState } from 'react'
import styles from"./Header.module.css"
import {Link,useNavigate} from "react-router-dom"
const Header = ({isloggedin,Setisloggedin}) => {
   const navigate=useNavigate();

  const logout=()=>{
       localStorage.removeItem("token")
       Setisloggedin(false)
  }
  const navigatetomainpage=()=>{
      navigate("/")
  }

  return (
    <div className={styles.header}>
           <p className={styles.text}onClick={()=>navigatetomainpage()}>Jobfinder</p>
        {isloggedin ? (
        <>
          {/* User is logged in */}
          <button className={styles.button1} onClick={logout}>Logout</button>
        
        </>
      ) : (
        <div style={{display:"flex",gap:"2rem"}}>
          {/* User is not logged in */}
          <Link to="/login"><button className={styles.button1}>Login</button></Link>
          <Link to="/register"><button className={styles.button2}>Register</button></Link>
        </div>
      )}
           
     </div>
  
  )
}

export default Header