import React from "react";
import { AiOutlineDashboard } from "react-icons/ai";
import { LuUserSquare2 } from "react-icons/lu";
import { IoBookSharp } from "react-icons/io5";
import { FaInfoCircle } from "react-icons/fa";
import { GoIssueReopened } from "react-icons/go";
import { Link } from "react-router-dom";

function DashboardMenu() {
  return (
    <div className="Dashboard-Menu">
      <Link to="/">
        <a>
          <AiOutlineDashboard style={{ fontSize: "19px" }} />
          &nbsp; Dashboard
        </a>
      </Link>
      <Link to="/user">
        <a>
          <LuUserSquare2 style={{ fontSize: "19px" }} />
          &nbsp; Users
        </a>
      </Link>
      <Link to="/books">
        <a>
          <IoBookSharp style={{ fontSize: "19px" }} />
          &nbsp; Books
        </a>
      </Link>
      <Link to="/otherinfo">
        <a>
          <FaInfoCircle style={{ fontSize: "19px" }} />
          &nbsp; Other Details
        </a>
      </Link>
      <Link to="/issue&return">
        <a>
          <GoIssueReopened style={{ fontSize: "19px" }} />
          &nbsp; Issue/Return
        </a>
      </Link>
      <Link to="/support">
        <a>
          <GoIssueReopened style={{ fontSize: "19px" }} />
          &nbsp; Support
        </a>
      </Link>
    </div>
  );
}

export default DashboardMenu;
