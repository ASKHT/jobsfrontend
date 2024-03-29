import React from "react";
import Register from "../../components/Register/Register";
import register from "../../assets/register.png"
export default function RegisterPage() {
    return (
        <div style={{ display: "flex"  }}>
            <Register />
            <img
                src={register}
                style={{  width: "40vw",height:"100vh" }}
                alt="Login cover"
            />
        </div>
    );
}