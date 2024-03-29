import React from 'react'
import styles from "./Createjobs.module.css"
import editimg from "../../assets/editpage.png"
import {DEFAULT_SKILLS as skills}  from "../../utils/constant"
import { useState } from 'react'
import { createjobs,updatejobs} from "../../Api/jobs"
import { useNavigate,useLocation } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Createjob = () => {
    const navigate=useNavigate()
    const {state} = useLocation()
    // console.log(state)
 const [data,Setformdata]=useState({
    companyname:""||state?.data.companyname,
    logourl:"" ||state?.data.logourl,
    position:""||state?.data.position,
    salary:0||state?.data.salary,
    jobtype:""||state?.data.jobtype,
    jobmode:""||state?.data.jobmode,
    location:""||state?.data.location,
    jobdescription:""||state?.data.jobdescription,
    aboutcompany:""||state?.data.aboutcompany,
    skills:""||state?.data.skills||[],
    information:""|| state?.data.information
 })
 
    //prevent from realoding the page
    const handlesubmit=async(e)=>{
        e.preventDefault();
         if (
            !data.companyname ||
            !data.logourl||
            !data.position ||
            !data.salary ||
            !data.jobtype ||
            !data.location ||
            !data.jobdescription ||
            !data.skills ||
            !data.information ||
            !data.jobmode||
            !data.information
        ) {
            toast.error("Enter all the field!", {
            position: "top-center" });
          return;
        }
        if(state.key==='edit'){
          await updatejobs(data,state.data._id)
          toast.success("job updated successfully!");
          setTimeout(() => {
            navigate("/")
          },1200);
          return ;
        }
        else if(state.key==='notedit'){
          await createjobs(data) 
          toast.success("job updated successfully!");
           setTimeout(() => {
            navigate("/")
          },1800);
        }

    }

    //fill the data of the form in the usestate
  const handlechange=(e)=>{
      Setformdata({...data,[e.target.name]:e.target.value})
  }

  //add skill to the chip
  const addskills=(e)=>{
    if(data.skills.includes(e.target.value)){
           return ;
    }
    const skills=e.target.value;
    Setformdata({...data,skills:[...data.skills,skills]})
  }

  //remove the skills from the chip
   const removeskills=(item)=>{
   const newSkills = data.skills.filter(skill => skill !== item); // Filter out the item
  Setformdata({...data,skills:newSkills});
  }

  const gotohomepage=()=>{
       navigate("/")
  }
//sending data to the create jobs

//code for templating or design
  return (
    <div className={styles.container}>
     <form className={styles.form}>
         <div >
            <h1>Add job description</h1>
         </div>
            <div style={{display: 'flex',gap:"2rem",alignItems:"center"}}>
                <label htmlFor="companyname">Company Name</label>
                 <input type="text" placeholder="Company Name"
                  className={styles.input} 
                  name="companyname" 
                  onChange={handlechange} 
                  value={data.companyname}
                 />
            </div>
            <div style={{display: 'flex',gap:"3rem",alignItems:"center"}}>
                <label htmlFor="logourl">Add Logo Url</label>
                 <input type="text" placeholder="Add Log Url" 
                 className={styles.input} 
                 name="logourl" 
                 onChange={handlechange} 
                  value={data.logourl}
                 />
            </div>
            <div style={{display: 'flex',gap:"3rem",alignItems:"center"}}>
                <label htmlFor="position">Job Position</label>
                 <input type="text" placeholder="Job Position" 
                 className={styles.input} 
                 name="position" 
                 value={data.position}
                 onChange={handlechange}/>
            </div>
            <div style={{display: 'flex',gap:"2rem",alignItems:"center"}}>
                <label htmlFor="salary">Monthly Salary</label>
                 <input type="text" placeholder="Monthly Salary" 
                 className={styles.input} 
                 name="salary" 
                 value={data.salary}
                 onChange={handlechange} 
                 />
            </div>
            <div style={{display:"flex",gap:"5rem"}}>
            <label htmlFor="jobType">Job Type</label>
            <select className={styles.options} name="jobtype" onChange={handlechange} value={data?.jobtype}>
              <option value="Internship" >Internship</option>
              <option value="Full-time">Full Time</option>
              <option value="Part-time">Part Time</option>
            </select>
          </div>
           <div style={{display: 'flex',gap:"2rem"}}>
            <label htmlFor="remoteOnsite">Remote/Onsite</label>
            <select className={styles.options} name="jobmode" onChange={handlechange} value={data?.jobmode}>
              <option value="">Select Remote/Onsite</option>
              <option value="Remote">Remote</option>
              <option value="In Office">In Office</option>
            </select>
          </div>
          <div style={{display: 'flex',gap:"3rem"}}>
            <label htmlFor="jobLocation">Job Location</label>
            <input type="text" placeholder="Enter Location" 
            className={styles.input}
            name="location"
            value={data.location}
            onChange={handlechange}
            />
          </div>
           <div style={{display: 'flex',gap:"2rem",alignItems:"center"}}>
            <label htmlFor="jobDescription">Job Description</label>
            <textarea placeholder="Job Description" 
            className={styles.textarea}
            name="jobdescription"
            value={data.jobdescription}
            onChange={handlechange}
            />
          </div>
           <div  style={{display: 'flex',gap:"2rem",alignItems:"center"}}>
            <label htmlFor="aboutCompany">About Company</label>
            <textarea 
             id="aboutCompany"
            placeholder="About Company"
             className={styles.textarea}
             name="aboutcompany"
             value={data.aboutcompany}
             onChange={handlechange}
             />
          </div>
            <div style={{display: 'flex',flexDirection:"column",gap:"10px"}}>
                <div style={{display: 'flex',gap:"6rem",alignItems:"center"}}>
            <label htmlFor="Skills" name="skills">Skills</label>
            <select className={styles.options1}
             name="skills"
             onChange={addskills}
              defaultValue=""
            >
                  <option  value="" disabled selected>
                            Please select skills
                        </option>
                {skills.map((item,idx)=>(
                    <option value={item}key={idx}>{item}</option>

                ))}
              
            </select>
          </div>
          <div style={{display: 'flex',justifyContent: 'center',gap:"1rem",flexWrap:"wrap",width:"24rem",marginLeft:"15rem"}}>
              {data.skills.map((item,idx)=>(
               <div style={{display: 'flex',justifyContent: 'center',alignItems: 'center',textAlign: 'center'}} key={idx}>
                <button style={{backgroundColor:"#FFEEEE",border:"none",width:"3rem",height:"2rem"}}>{item}</button>
                <button style={{color:"white",backgroundColor:"#ED5353",border:"none",height:"2rem",width:"2rem"}} onClick={()=>removeskills(item)}>X</button>
               </div>
              ))}
          </div>
            </div>
          <div style={{display:"flex",gap:"7px",alignItems:"center"}}>
            <label htmlFor="Information">Additional Information</label>
            <input type="text" placeholder="Additional Information" 
            className={styles.input}
            name="information"
            value={data.information}
            onChange={handlechange}
            />
          </div>
           <div style={{display:"flex",gap:"1rem",justifyContent:"flex-end",paddingRight:"2rem"}}>
            <button type="button"  className={styles.button1}onClick={()=>gotohomepage()}>Cancel</button>
            <button type="submit" className={styles.button}onClick={handlesubmit}>
             {state.key === 'edit' ? 'update job':'+Add job'}</button>
             
          </div>
       </form>
       <div className={styles.img}>
        <img src={editimg}/>
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
  )
}

export default Createjob