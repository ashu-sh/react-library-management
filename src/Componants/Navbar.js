import React, { useState } from "react";
// import { FaPlusCircle } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo Copy.png";
import { Button } from "@mui/material";

function Navbar({ onLogout }) {
  const [Menu, showMenu] = useState(false);

  const toggleMenu = () => {
    showMenu(!Menu);
  };

  return (
    <nav className="nav-bar">
      <Link to="/">
        <div className="logo">
          <img src={Logo} style={{ width: "30px", height: "30px" }}></img>
          <a
            style={{
              fontWeight: "500",
              fontFamily: "Montserrat, sans-serif",
              margin: "4px",
            }}
          >
            LMS
          </a>
        </div>
      </Link>
      <div className={Menu ? "show" : "nav-links"}>
        <Link to="/addstudent">
          <a>
            <FaArrowCircleRight style={{ margin: "4px" }} />
            Add Student
          </a>
        </Link>
        <Link to="/addbook">
          <a>
            <FaArrowCircleRight style={{ margin: "4px" }} /> Add Book
          </a>
        </Link>
        <Link to="/addteacher">
          <a>
            <FaArrowCircleRight style={{ margin: "4px" }} /> Add Teacher
          </a>
        </Link>
      </div>
      <div className="mobile-menu-icon" onClick={toggleMenu}>
        <i className={Menu ? "fa fa-times" : "fa fa-bars"}></i>
      </div>
      <div className="log-out-button">
        <Button onClick={onLogout}>Logout</Button>
      </div>
    </nav>
  );
}

export default Navbar;
