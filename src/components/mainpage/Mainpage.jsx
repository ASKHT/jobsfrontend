import React, { useEffect, useState } from 'react'
import styles from "./Main.module.css"
import Header from '../Header/Header'
import { IoSearchOutline } from "react-icons/io5";
import Jobcard from "../jobcard/Jobcard"
import { getalljobs } from '../../Api/jobs';
import { useNavigate } from 'react-router-dom';
const Mainpage = () => {
  const navigate = useNavigate()
  const [skills,Setskills]=useState([])
  const maxSkillsToShow = 3;
   const [isloggedin,Setisloggedin] =useState(JSON.parse(localStorage.getItem("token")))
  //  console.log(isloggedin)
  const [datarecieve,Setdata]=useState([])
  const takeoptionvalue=(e) => {
      if(e.target.value==="select"){
        return ;
      }
    if(skills.includes(e.target.value)){
      return ;
    }
    Setskills([...skills,e.target.value])
    // console.log(skills)
  }
  const handlefilter=(item)=>{
   const newSkills = skills.filter(skill => skill !== item); // Filter out the item
  Setskills([...newSkills]);
   
  }
  const handleclear=()=>{
    Setskills([])
  }

const takedata=async()=>{
   const filterskills=skills.join(",")
 const result= await getalljobs({skills:filterskills})
//  console.log(filterskills)
 Setdata(result?.data)
 return result
}
useEffect(()=>{
  takedata()

  },[])
  // console.log(datarecieve)
  return (
      <div className={styles.main}>
         <div className={styles.container}>
      <Header isloggedin={isloggedin} Setisloggedin={Setisloggedin}/>
      <div className={styles.searchcard}>
        <IoSearchOutline size={28} className={styles.searchicon} />
        <input type="text"className={styles.input}
         placeholder='Type any job title'
        />
        <div>
         <div className={styles.mid}>
           <select name="" className={styles.options} onChange={takeoptionvalue} >
                   <option value="select" >
                                Select Skill
                            </option>
                            <option value="HTML" className="">
                                HTML
                            </option>
                            <option value="CSS" className="">
                                CSS
                            </option>
                            <option value="React" className="">
                                React
                            </option>
                            <option value="Node.js" className="">
                                Node.js
                            </option>
                            <option value="JavaScript" className="">
                                JavaScript
                            </option>
                            <option value="Express" className="">
                                Express
                            </option>
                            <option value="sql" className="">
                              sql
                            </option>
                            <option value="Redis" className="">
                               Redis
                            </option>
                            <option value="MongoDB" className="">
                                MongoDB
                            </option>
                     
                </select>
          <div style={{ display: 'flex', alignItems: 'center', textAlign: 'center', gap: '1rem', width: '30rem', flexWrap: 'wrap' }}>
            {skills.slice(0,maxSkillsToShow).map((item, idx) => (
              <div key={idx} style={{ display: 'flex' }}>
                <div style={{ width: '100px', height: '40px', backgroundColor: '#FFEEEE', paddingTop: '10px' }}>
                  <p>{item}</p>
                </div>
                <div style={{ width: '40px', height: '40px', backgroundColor: '#FF6B6B', paddingTop: '5px' }}>
                  <p onClick={() => handlefilter(item)} style={{ cursor: 'pointer',fontSize:"25px" ,color:"white"}}>X</p>
                </div>
              </div>
      ))}
      {
             //all these css are inline css
        skills.length > maxSkillsToShow && (
        <div style={{ width: '100px', height: '40px', backgroundColor: '#FFEEEE', paddingTop: '10px' }}>
          <p>+{skills.length - maxSkillsToShow}</p>
        </div>
      )}
    </div>   
            {!isloggedin?( <div style={{display: 'flex',paddingRight:"8rem",gap:"2rem",alignItems: 'center'}}>
            <button className={styles.button} onClick={()=>takedata()}>Apply filter</button>
             <p style={{color:"red",cursor:"pointer"}}onClick={handleclear}>clear</p>
             </div>):(<div style={{display: 'flex',paddingRight:"8rem",alignItems: 'center'}}>
              <button className={styles.button} onClick={()=>navigate("/createjob",{state:{key:'notedit',data:{}}})}>+Add job</button>
               </div>)}
               
         </div>
        </div>
      </div>
      <div style={{display: 'flex',flexDirection:"column",gap:"1rem"}}>
       {/* job display card */}
         {datarecieve.map((item,idx)=>(
          //all these things are props which i passed from here to jobcard component
         <Jobcard isloggedin={isloggedin} key={idx} id={item._id} position={item.position} salary={item.salary} location={item.location} jobmode={item.jobmode} jobtype={item.jobtype} logo={item.logourl} skills={item.skills}
         data={item}
         />
         ))}

      </div>
    </div>
      </div>
  )
}

export default Mainpage