import React, { useState } from "react";
import { useNavigate } from "react-router";
import styles from "./Login.module.css";
import {loginUser} from "../../Api/auth"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleFormChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async () => {
        if (!formData.email || !formData.password) {
          toast.error("Enter all the field!", {
            position: "top-center"
      });
        }
        const response = await loginUser({email: formData.email, password: formData.password});
        if (response?.name) {
           toast.success("Login successful!");

        // Delay navigation by 0.8 seconds (800 milliseconds)
        setTimeout(() => {
            navigate("/");
        }, 800);
           }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.h1}>Already have an account ?</h1>
            <h2 className={styles.h2}>Your personal job finder is here</h2>
            <input
                className={styles.input}
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                type={"email"}
                placeholder="Email"
            />
            <input
                className={styles.input}
                name="password"
                value={formData.password}
                onChange={handleFormChange}
                type={"password"}
                placeholder="Password"
            />
              <ToastContainer 
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"

              />
            <button onClick={handleSubmit} className={styles.button}>
                Sign in
            </button>
            <p className={styles.footer}>
                Don&apos;t have an account?
                <span
                    className={styles.underline}
                    onClick={() => navigate("/register")}
                >
                    Sign Up
                </span>
            </p>
        </div>
    );
}