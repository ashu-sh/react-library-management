import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import fireDB from "../Database/Firebase";
import "../Compstyling/AddTecher.css";
import { ScaleLoader } from "react-spinners";
// import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import axios from "axios";

const initalState = {
  name: "",
  regId: "",
  email: "",
  department: "",
};

function AddTeacher() {
  const [Teacher, Addteacher] = useState(initalState);
  const [loading, setLoading] = useState(false);

  const { name, regId, email, department } = Teacher;

  // const Redirect = useNavigate();

  const handleInputFields = (e) => {
    const { name, value } = e.target;
    Addteacher({ ...Teacher, [name]: value });
  };

  const handleTeacherSubmission = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!name || !regId || !email || !department) {
      toast.error("Please provide information");
      setLoading(false);
    } else {
      fireDB.child("TecherMembershipData").push(Teacher, (err) => {
        if (err) {
          toast.error(err);
          setLoading(false);
        } else {
          toast.success("Teacher registered successfully");
          setLoading(false);
        }
      });
      Addteacher({
        name: "",
        regId: "",
        email: "",
        department: "",
      });
      // setTimeout(() => Redirect("/"), 2000);
    }
  };

  return (
    <div>
      {loading && (
        <div className="backdrop">
          {/* Your preloader/spinner component */}
          <div className="preloader">
            <ScaleLoader color="#fff" />
            <p>Loading....</p>
          </div>
        </div>
      )}
      <div className="teacher-registration-form">
        <form
          style={{
            margin: "auto",
            padding: "23px",
            maxWidth: "400px",
            alignContent: "center",
          }}
          onSubmit={handleTeacherSubmission}
        >
          <label htmlFor="name">Teacher name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="teacher name"
            value={name}
            onChange={handleInputFields}
          />
          <label htmlFor="regId">Member ID</label>
          <input
            type="regId"
            id="regId"
            name="regId"
            placeholder="member ID"
            value={regId}
            onChange={handleInputFields}
          />
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="email"
            value={email}
            onChange={handleInputFields}
          />
          <label htmlFor="department">Department</label>
          <input
            type="department"
            id="department"
            name="department"
            placeholder="department"
            value={department}
            onChange={handleInputFields}
          />

          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}

export default AddTeacher;
