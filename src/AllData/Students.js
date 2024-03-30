import React, { useEffect, useState } from "react";
import "../Compstyling/Students.css";
// import { toast } from "react-toastify";
import fireDB from "../Database/Firebase";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Updatestudent from "./Updatestudent";



function Students() {
  const [studentList, setStudentList] = useState({});
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  //fetch data from firebase
  useEffect(() => {
    fireDB.child("studentMemberShipData").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setStudentList({ ...snapshot.val() });
      } else {
        setStudentList({});
      }
    });

    return () => {
      setStudentList({});
    };
  }, []);

  const handleDeleteStudent = (id) => {
    fireDB.child(`studentMemberShipData/${id}`).remove();
  };
  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div>
      {isPopupOpen && (
        <div className="backdrop">
          <div className="book-issue-form">
            <Updatestudent PopupClose={closePopup} />
          </div>
        </div>
      )}
      <div className="table">
        {Object.keys(studentList).length === 0 ? (
          <p style={{ textAlign: "center" }}>Data not found !</p>
        ) : (
          <table className="customers">
            <tr>
              <th>Sr.no</th>
              <th>Student Name</th>
              <th>Reg. number</th>
              <th>Class</th>
              <th>Department</th>
              <th>Roll number</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
            {Object.keys(studentList).map((id, index) => (
              <tr key={id}>
                <td>{index + 1}</td>
                <td>{studentList[id].name}</td>
                <td>{studentList[id].regId}</td>
                <td>{studentList[id].className}</td>
                <td>{studentList[id].department}</td>
                <td>{studentList[id].rollNo}</td>
                <td>
                  {Object.keys(studentList).length === 1 ? (
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <Button
                        variant="contained"
                        style={{
                          display: "flex",
                          width: "130px",
                          height: "20px",
                          borderRadius: "2px",
                          fontSize: "10px",
                          borderRadius: "2px",
                        }}
                        disabled={true}
                      >
                        Delete Student
                      </Button>
                      &nbsp;&nbsp;
                      <Link to={`/profile/${id}`}>
                        <Button
                          variant="contained"
                          style={{
                            backgroundColor: "#00b38f",
                            display: "flex",
                            width: "130px",
                            height: "20px",
                            fontSize: "10px",
                            borderRadius: "2px",
                          }}
                          onClick={openPopup}
                        >
                          Update Profile
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <Button
                        variant="contained"
                        onClick={() => handleDeleteStudent(id)}
                        style={{
                          backgroundColor: " #e60000",
                          display: "flex",
                          width: "130px",
                          height: "20px",
                          fontSize: "10px",
                          borderRadius: "2px",
                        }}
                      >
                        Delete Student
                      </Button>
                      &nbsp;&nbsp;
                      <Link to={`/profile/${id}`}>
                        <Button
                          variant="contained"
                          style={{
                            backgroundColor: "#00b38f",
                            display: "flex",
                            width: "130px",
                            height: "20px",
                            fontSize: "10px",
                            borderRadius: "2px",
                          }}
                          onClick={openPopup}
                        >
                          Update Profile
                        </Button>
                      </Link>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </table>
        )}
      </div>
    </div>
  );
}

export default Students;
