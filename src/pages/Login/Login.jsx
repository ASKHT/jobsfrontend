import React from "react";
import Login from "../../components/Login/Login";
import registerimg from "../../assets/register.png"
export default function RegisterPage() {
    return (
        <div style={{ display: "flex"  }}>
            <Login />
            <img
                src={registerimg}
                style={{  width: "40vw",height:"100vh" }}
                alt="Login cover"
            />
        </div>
    );
}