import React, { useState } from "react";
import { useNavigate } from "react-router";
import styles from "./Register.module.css";
import { register } from "../../Api/auth";
import { Link } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
    const [formdata, setFormdata] = useState({
        name: "",
        email: "",
        password: "",
        mobile:""
    });
    const [isCheck, setIsCheck] = useState(false);
       const [emailError, setEmailError] = useState("");
    const handleregister = (e) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value });
    };

    const checkbox = (e) => {
        setIsCheck(e.target.checked);
        // console.log(isCheck); 
    };
      const validateEmail = (email) => {
        // Email validation using regular expression
        const emailPattern = /\S+@\S+\.\S+/;
        return emailPattern.test(email);
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        // console.log("Checkbox value:", isCheck); 
    if (!validateEmail(formdata.email)) {
            setEmailError("Please enter a valid email address");
            return;
        }
        setEmailError("")
        if (!formdata.name || !formdata.email || !formdata.password || !isCheck) {
            alert("Please provide all the fields and accept the terms");
            return;
        }

        // console.log("Form data:", formdata);
        const data=await register(formdata)
        if(data){
            navigate("/")

        }
        // Continue with form submission or other actions
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.h1}>Create an account</h1>
            <h2 className={styles.h2}>Your personal job finder is here</h2>
          
            <input
                className={styles.input}
                name="name"
                type={"text"}
                placeholder="Name"
                onChange={handleregister}
            />
            <input
                type="email"
                className={styles.input}
                name="email"
                placeholder="Email"
                onChange={handleregister}
            />
          {emailError ? <p >{emailError}</p> : null}
            <input
                className={styles.input}
                name="mobile"
                type={"tel"}
                placeholder="Mobile"
                onChange={handleregister}
                required
            />
            <input
                className={styles.input}
                name="password"
                type={"password"}
                placeholder="Password"
                onChange={handleregister}
            />
            <input
                className={styles.checkbox}
                type="checkbox"
                name="checkbox"
                onChange={(e) => checkbox(e)}
            />
            <button className={styles.button} onClick={handleSubmit}>
                Create Account
            </button>
         <Link to="/login">   <p className={styles.footer}>
                Already have an account?
                <span className={styles.underline}>Sign in</span>
            </p></Link>
        </div>
         
    );
}
