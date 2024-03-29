import axios from 'axios';
const baseurl=import.meta.env.VITE_APP_BASEURL;

//register api endpoint
export const register=async({name,email,password,mobile})=>{

   try {
      //  console.log(name,email,password,mobile);
     const data= await axios.post(`${baseurl}/auth/register`,{password,email,name,mobile})
      // console.log(data)
         return data;
   } catch (error) {
        console.log(error)
   }

}

//login api endpoint
export const loginUser=async({email,password})=>{
   console.log(baseurl)
      try {
         const{ data}=await axios.post(`${baseurl}/auth/login`,{email,password})
         // console.log(data);
         localStorage.setItem("token",JSON.stringify(data.token));
         return data;
      } catch (error) {
         console.log(error)
      }
}
