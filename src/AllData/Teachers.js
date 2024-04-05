import React, { useEffect, useState } from "react";
import "../Compstyling/Students.css";
import fireDB from "../Database/Firebase";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ScaleLoader } from "react-spinners";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import UpdateTeacher from "../RecordUpdater/UpdateTeacher";

function Teachers() {

  const [teacherList, setTeacherList] = useState({});
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  //fetch data from firebase
  useEffect(() => {
    fireDB.child("TecherMembershipData").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setTeacherList({ ...snapshot.val() });
      } else {
        setTeacherList({});
      }
    });

    return () => {
      setTeacherList({});
    };
  }, []);

  const handleDeleteTeacher = (id) => {
    if (window.confirm("Are you sure to delete this record ?")) {
      fireDB.child(`TecherMembershipData/${id}`).remove();
      toast.success("Deleted !");
    } else {
      fireDB.child(`TecherMembershipData/${id}`);
      toast.error("Cancelled !");
    }
  };
  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return <div>
    <div>
      {isPopupOpen && (
        <div className="backdrop">
          <div className="book-issue-form">
            <UpdateTeacher PopupClose={closePopup} />
          </div>
        </div>
      )}
      <div className="table"style={{display:"block"}}>
      <div style={{width:"0%"}}>
          <Link to={'/'}>
              <IoArrowBackCircleSharp size={28} />
          </Link>
        </div>  
        Back to Home
        <br/>
        &nbsp;
        &nbsp;
        {Object.keys(teacherList).length === 0 ? (
        <div className="backdrop">
          <div className="preloader">
             <ScaleLoader color="#fff" />
             <p>Loading....</p>
          </div>
        </div>
        ) : (
          <table className="customers">
            <tr>
              <th>Sr.no</th>
              <th>Staff Name</th>
              <th>Department</th>
              <th>Email</th>
              <th>Member ID</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
            {Object.keys(teacherList).map((id, index) => (
              <tr key={id}>
                <td>{index + 1}</td>
                <td>{teacherList[id].name}</td>
                <td>{teacherList[id].department}</td>
                <td>{teacherList[id].email}</td>
                <td>{teacherList[id].regId}</td>
                <td>
                  {Object.keys(teacherList).length === 1 ? (
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
                        Delete
                      </Button>
                      &nbsp;&nbsp;
                      <Link to={`/staffs/${id}`}>
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
                          Update
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <Button
                        variant="outlined"
                        
                        onClick={() => handleDeleteTeacher(id)}
                          style={{
                          color:"red",
                          display: "flex",
                          width: "90px",
                          height: "20px",
                          fontSize: "10px",
                          borderRadius: "2px",
                        }}
                      >
                        Delete 
                      </Button>
                      &nbsp;&nbsp;
                      <Link to={`/staffs/${id}`}>
                        <Button
                          variant="outlined"
                          style={{
                            display: "flex",
                            width: "90px",
                            height: "20px",
                            fontSize: "10px",
                            borderRadius: "2px",
                          }}
                          onClick={openPopup}
                        >
                          Update
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
  </div>;
}

export default Teachers;
