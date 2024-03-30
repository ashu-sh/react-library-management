// import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "../Admin/AdminLogin.css";
import Logo from "../assets/Logo Copy.png";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import IconButton from "@mui/material/IconButton";
import BackgroundPhoto from "../assets/Picture1.jpg";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Database/Firebase";

// import { Button } from "@mui/material";

function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordtoggler, setPasswordtoggler] = useState(false);

  const handlePasswordToggler = () => {
    setPasswordtoggler(!passwordtoggler);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const Admin = await signInWithEmailAndPassword(auth, email, password);
      console.log(Admin);
      onLogin();
      toast.success(`Hey ${email} Welcome to LMS ! `);
    } catch (err) {
      console.log(err.message);
      toast.error(`Please enter valid credentails !`);
    }
  };

  return (
    <div
      className="Admin"
      style={{
        backgroundImage: `url(${BackgroundPhoto})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100vh",
        width: "100%",
        position: "absolute",
      }}
    >
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
              disabled={!password ? true : false}
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
              New Admin ?&nbsp;&nbsp;
              <Link to="/register" style={{ color: "#9900ff" }}>
                SIGN UP
              </Link>
            </p>
          </label>
        </form>
      </div>
      <div className="Dev">
        <div className="company-domain">
          <p>www.developerlabs.com</p>
        </div>
        <div className="developer-title">
          <p>Developed by</p>&nbsp;
          <h3 color="white">Developer Labs</h3>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
