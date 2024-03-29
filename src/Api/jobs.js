//jobs apis
import axios from 'axios';
const baseurl=import.meta.env.VITE_APP_BASEURL;

//get all jobs 
export const getalljobs=async(filter) => {
   try {
     const { data } = await axios.get(`${baseurl}/jobs/all?skills=${filter.skills || " "}`);
     // console.log(data)
     return data;
   } catch (error) {
       console.log(error)
   }
}

//get job by id
export const getjobbyid=async(jobid)=>{
    // console.log(jobid)
        try {
            const {data}=await axios.get(`${baseurl}/jobs/jobdetails/${jobid}`);
            // console.log(data)
            return data;
        } catch (error) {
             console.log(error)
        }
}


//create jobs
export const createjobs=async(formdata)=>{
    try {
          const token=JSON.parse(localStorage.getItem("token"))
        //   console.log(token)
         const data= await axios.post(`${baseurl}/jobs/createjobs`,formdata,
         {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
         )
         return data;
        
    } catch (error) {
        console.log(error)
    }
}

//update jobs
export const updatejobs=async(formdata,id) => {
     try {
        //    console.log(id,formdata)
          const token=JSON.parse(localStorage.getItem("token"))
         const data= await axios.put(`${baseurl}/jobs/updatejob/${id}`,formdata,
         {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
         )
         return data;
        
    } catch (error) {
        console.log(error)
    }
}
//delte jobs
export const deletejobs=async(id) => {
     try {
           console.log(id)
          const token=JSON.parse(localStorage.getItem("token"))
         const data= await axios.delete(`${baseurl}/jobs/deletejob/${id}`,
         {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
         )
         return data;
        
    } catch (error) {
        console.log(error)
    }
}