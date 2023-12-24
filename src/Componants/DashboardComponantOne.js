import React, { useEffect, useState } from "react";
import DashboardMenu from "./DashboardMenu";
import { FaArrowCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import fireDB from "../Database/Firebase";
import { toast } from "react-toastify";
import { GrUserAdmin } from "react-icons/gr";
import { PiStudentFill } from "react-icons/pi";
import { MdLibraryBooks } from "react-icons/md";

function DashboardComponantOne() {
  const [studentList, getStudentList] = useState([]);
  const [bookList, getBookList] = useState([]);

  //fetch data from firebase
  useEffect(() => {
    try {
      fireDB.child("studentMemberShipData").on("value", (data) => {
        const fetchedStudentData = data.val();
        const StudentArray = Object.values(fetchedStudentData); //convert object to the array to get the length
        getStudentList(StudentArray);
      });

      fireDB.child("libraryBookList").on("value", (data) => {
        const fetchedBookList = data.val();
        const BookArray = Object.values(fetchedBookList); //convert object to the array to get the length
        getBookList(BookArray);
      });
    } catch (error) {
      toast.error("Check your internet connection", error);
    }
  }, []);

  return (
    <div>
      <div className="DashboardOne">
        <DashboardMenu />
        <div className="dashboard-header2">
          <h3>
            Search <br />
            _____________________
          </h3>
        </div>
        <div className="dashboard-header">
          <h3>
            Dashboard <br />
            _____________________
          </h3>
        </div>
        <div className="EnrollmentGrid">
          <div className="flex-item-left">
            <div className="Numbers">
              <h2>0</h2>
              <p>Active users</p>
            </div>
            <GrUserAdmin
              style={{
                float: "right",
                margin: "-63px 40px -20px",
                justifyContent: "flex-start",
                height: "45px",
                width: "45px",
                color: "#000",
                opacity: "0.4",
              }}
            />
            <Link to="/All-users">
              <button className="view-btn">
                All users{" "}
                <FaArrowCircleRight
                  style={{ margin: "3px", color: "#fff", fontSize: "13px" }}
                />
              </button>
            </Link>
          </div>
          <div className="flex-item-centre">
            <div className="Numbers">
              <h2>{studentList.length}</h2>
              <p>students</p>
            </div>
            <PiStudentFill
              style={{
                float: "right",
                margin: "-63px 40px -20px",
                justifyContent: "flex-start",
                height: "50px",
                width: "50px",
                color: "#000",
                opacity: "0.4",
              }}
            />
            <Link to="/students">
              <button
                className="view-btn"
                style={{ backgroundColor: "#e60000" }}
              >
                View
                <FaArrowCircleRight
                  style={{ margin: "3px", color: "#fff", fontSize: "13px" }}
                />
              </button>
            </Link>
          </div>
          <div className="flex-item-right">
            <div className="Numbers">
              <h2>{bookList.length}</h2>
              <p>total books</p>
            </div>
            <MdLibraryBooks
              style={{
                float: "right",
                margin: "-61px 40px -20px",
                justifyContent: "flex-start",
                height: "45px",
                width: "45px",
                color: "#000",
                opacity: "0.4",
              }}
            />
            <Link to="/bookstore">
              <button
                className="view-btn"
                style={{ backgroundColor: "#8600b3" }}
              >
                View
                <FaArrowCircleRight
                  style={{ margin: "3px", color: "#fff", fontSize: "13px" }}
                />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardComponantOne;
