import React, { useState,useEffect } from 'react'
import Header from "../Header/Header"
import styles from "./Jobdetails.module.css"
import { useNavigate, useParams } from 'react-router-dom'
import { getjobbyid,deletejobs } from '../../Api/jobs'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Jobdetails = () => {
    const navigate=useNavigate()
    const {jobId}=useParams();
    const [data,Setdata]=useState([])
    // console.log(jobId)
    const [isloggedin,Setisloggedin]=useState(localStorage.getItem("token")!=null)
        //   console.log(data)
    const checkstate=()=>{
         if(isloggedin){
            Setisloggedin(true)
         }
         else{
            Setisloggedin(false)
         }
    }

  const receivedatafromapi=async()=>{
       const data=await getjobbyid(jobId)
        // console.log(data)
        Setdata(data?.job)
        return data;
  }
useEffect(()=>{
      receivedatafromapi()
      checkstate(); 

},[isloggedin])

// useEffect(() => {
    // checkstate(); 
//     },[isloggedin]);

const deletejob=async()=>{
     await deletejobs(data._id)
      toast.success("job deleted successfully!");
      setTimeout(() => {
          navigate("/")
      }, 1200);
}
  return (
    <div>
         <Header isloggedin={isloggedin} Setisloggedin={Setisloggedin} />
         <div style={{display:"flex",flexDirection:"column",gap:"2rem",justifyContent:"center",alignItems:"center",paddingBottom:"2rem"}}>
             <div className={styles.container}>
                <p style={{fontSize:"28px",fontWeight:"500",alignItems:"center",marginTop:"2rem"}}>{data.companyname}</p>
               
             </div>
            <div>
              <div className={styles.innercontainer}>
                <div style={{display:"flex",gap:"1rem",color:"grey"}}>
                    <p>91days</p>
                    <p>Full time</p>
                    <p>.</p>
                    
                    <img src={data.logourl} style={{height:"33px",widht:"33px",borderRadius:"50%"}}/>
                    <p>{data.companyname}</p>
                </div>
                <div style={{display:"flex",width:"90%",justifyContent:"space-between",marginRight:"2rem",alignItems:"center"}}>
                    <p style={{fontSize:"58px",fontWeight:"403"}}>{data.position}</p>
                    {isloggedin?( <div style={{display:"flex",gap:"1rem"}}>
                           <button className={styles.button1}
                            onClick={() =>navigate("/createjob",{state:{key:"edit",data:data}})}
                           >Edit job</button>
                           <button className={styles.button2}
                           onClick={deletejob}
                           >Delete job</button>
                    </div>):(null)}
                   
                </div>
                <p style={{color:"#ED5353"}}>{data.location}</p>
                <div style={{display:"flex",gap:"1rem",color:"grey"}}>
                    <p>&#8377;stipend</p>
                    <div>
                        <p>Remote/office</p>
                    </div>
                </div>
                <div style={{display:"flex",gap:"1rem"}}>
                    <p style={{fontSize:"18px",fontWeight:"400"}}>{data.salary}</p>
                    <p style={{fontSize:"18px",fontWeight:"400"}}>{data.jobmode}</p>
                </div>
                <div style={{width:"50rem",display:"flex",flexDirection:"column",gap:"1rem"}}>
                    <p style={{fontSize:"28px",fontWeight:"bold"}}>About Company</p>
                    <p style={{color:"grey",textAlign:"justify",fontSize:"20px"}}>{data.aboutcompany}</p>
                </div>
                <div style={{width:"50rem",display:"flex",flexDirection:"column",gap:"1rem"}}>
                    <p style={{fontSize:"28px",fontWeight:"bold"}}>About the job/internship</p>
                    <p style={{color:"grey",textAlign:"justify",fontSize:"20px"}}>{data.jobdescription}</p>
                </div>
                <div  style={{display:"flex",flexDirection:"column",gap:"1rem"}}>
                    <p style={{fontSize:"28px",fontWeight:"bold"}}>Skill(s) required</p>
                    <div style={{display:"flex",gap:"1rem"}}>
                        {data.skills&&data.skills.map((item,idx)=>(

                        <button className={styles.button}key={item}>{item}</button>
                        ))}
                        
                    </div>
                </div>
                <div style={{width:"50rem",display:"flex",flexDirection:"column",gap:"1rem"}}>
                    <p  style={{fontSize:"28px",fontWeight:"bold"}}>Additional Information</p>
                    <p  style={{color:"grey",textAlign:"justify",fontSize:"20px"}}>Stipend structure: This is a performance-based internship. In addition to the minimum-assured stipend, you will also be paid a performance-linked incentive (₹ 2500 per design).</p>
                </div>
                </div>
                 <ToastContainer 
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
              />
              </div>
         </div>
    </div>
  )
}

export default Jobdetails