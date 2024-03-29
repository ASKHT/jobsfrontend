import React, { useEffect,useState } from 'react'
// import logo from "../../assets/logo.png"
import flag from "../../assets/flag.png"
import styles from "../jobcard/Jobcard.module.css"
import { useNavigate,useLocation,useParams } from 'react-router-dom'
import { MdLocationOn } from "react-icons/md";
const Jobcard = ({isloggedin,id,position,salary,location,jobmode,jobtype,logo,skills,data}) => {
  const navigate = useNavigate()
  // const location = useLocation()
    // console.log(datareceive)
  // console.log(id)
  // console.log(location.pathname)
  
  // console.log(`jobdetail/${id}`)
 const navigateToJobDetail = (id) => {
    navigate(`/jobdetail/${id}`); // Navigate to the specified URL
  };
  return (
        <div className={styles.container}>
            <div style={{display: 'flex',gap:"2rem"}}>
                <div> <img src={logo} style={{width:"70px",height:"50px",borderRadius:"50%"}}/></div>
            <div style={{display:"flex",flexDirection:"column",color:"black",gap:"10px"}} >
               <b className={styles.position}>{position}</b>
               <div style={{display:"flex",gap:"1rem",color:"grey",alignItems:"center"}}>
                       <p>&#8377;{salary}</p>
                        <div style={{display:"flex",alignItems:"center"}}>
                           <MdLocationOn style={{color:"black"}} />
                       <p>{location}</p>
                        </div>
                       {/* <img src={flag} style={{height:"33px",width:"33px"}}/> */}
               </div>
               <div style={{display:"flex",color:"#ED5353",gap:"1rem"}}>
                 <p>{jobmode}</p>
                 <p>{jobtype}</p>
               </div>
            </div>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:"10px",textAlign:"center"}}>
                <div style={{display:"flex",gap:"1rem"}}>
                  {skills.map((item,idx)=>(
                    <button className={styles.button} key={item}><b>{item}</b></button>

                  ))}
                  
                </div>
                {isloggedin?(
                <div style={{display:"flex",justifyContent:"flex-end"}}>
                  <button className={styles.button1}
                  onClick={()=> navigateToJobDetail(id)}
                  >View Details</button>
                  <button className={styles.button2}
                    onClick={()=>navigate("/createjob",{state:{key:'edit',data:data}})}
                  >Edit Jobs</button>
                </div>
                ):(
                <div style={{display:"flex",justifyContent:"flex-end"}}>
                  <button className={styles.button1}
                   onClick={()=> navigateToJobDetail(id)}
                  >View Details</button>
                  </div>
                )}
               
            </div>
        </div>
  )
}

export default Jobcard