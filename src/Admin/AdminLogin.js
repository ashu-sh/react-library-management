// import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "../Admin/AdminLogin.css";
import Logo from "../assets/Logo Copy.png";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import IconButton from "@mui/material/IconButton";

function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordtoggler, setPasswordtoggler] = useState(false);

  const handlePasswordToggler = () => {
    setPasswordtoggler(!passwordtoggler);
  };

  const handleLogin = (e) => {
    if (email === "test@gmail.com" || password === "1234") {
      onLogin();
    } else {
      toast.error("Please check crendetials");
    }
    e.preventDefault();
  };

  return (
    <div>
      <div className="login-form">
        <form
          onSubmit={handleLogin}
          className="log-form"
          style={{
            margin: "auto",
            padding: "23px",
            maxWidth: "400px",
            alignContent: "center",
          }}
        >
          <div className="profile-img">
            <img src={Logo} alt="profile" />
            <h1>LMS</h1>
          </div>
          <label htmlFor="name">User name</label>
          <input
            className="admin-email"
            type="text"
            id="email"
            name="email"
            style={{ borderRadius: "2px", padding: "5px 20px" }}
            placeholder="admin@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <div style={{ display: "flex", position: "relative" }}>
            <input
              className="admin-password"
              type={passwordtoggler ? "text" : "password"}
              id="password"
              name="password"
              placeholder="admin@123"
              style={{ padding: "5px 20px", borderRadius: "2px" }}
              onChange={(e) => setPassword(e.target.value)}
            />
            <IconButton
              style={{
                cursor: "pointer",
                color: "#9900ff",
                position: "absolute",
                margin: "7px 19.6rem",
              }}
              onClick={handlePasswordToggler}
              htmlFor="passwordToggler"
              disabled={password === "" ? true : false}
            >
              {passwordtoggler ? (
                <AiFillEye size={22} color="grey" />
              ) : (
                <AiFillEyeInvisible size={22} color="grey" />
              )}
            </IconButton>
          </div>

          <br />
          <br />
          <input className="admin-login" type="submit" value="LOGIN"></input>
          <br />
          <br />
          <label className="Signuproute">
            <p>
              New Admin ?&nbsp;
              <Link to="/Signup">Sign up</Link>
            </p>
          </label>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
