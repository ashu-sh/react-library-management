import React, { useEffect, useState } from "react";
import "../Compstyling/Students.css";
import { toast } from "react-toastify";
import fireDB from "../Database/Firebase";
import Button from "@mui/material/Button";
function Students() {
  const [studentList, getStudentList] = useState([]);

  //fetch data from firebase
  useEffect(() => {
    try {
      fireDB.child("studentMemberShipData").on("value", (data) => {
        const fetchedStudentData = data.val();
        const StudentArray = Object.values(fetchedStudentData); //convert object to the array to get the length
        getStudentList(StudentArray);
      });
    } catch (error) {
      toast.error("Check your internet connection", error);
    }
  }, []);

  return (
    <div>
      <div className="action-buttons">
        <Button variant="contained" style={{ backgroundColor: " #e60000" }}>
          Delete Student
        </Button>
        &nbsp;&nbsp;
        <Button variant="contained" style={{ backgroundColor: "#00b38f" }}>
          Update Profile
        </Button>
      </div>
      <div className="table">
        <table className="customers">
          <tr>
            <th>Select</th>
            <th>Student Name</th>
            <th>Registration number</th>
            <th>Class</th>
            <th>Department</th>
            <th>Roll number</th>
          </tr>
          {studentList.map((res, key) => (
            <tr key={key}>
              <td>
                <input type="checkbox"></input>
              </td>
              <td>{res.name}</td>
              <td>{res.regId}</td>
              <td>{res.className}</td>
              <td>{res.department}</td>
              <td>{res.rollNo}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

export default Students;
