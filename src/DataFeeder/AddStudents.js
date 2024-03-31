import React, { useState } from "react";
import "../Compstyling/AddStudents.css";
import { toast } from "react-toastify";
import fireDB from "../Database/Firebase";
import { ScaleLoader } from "react-spinners";
import emailjs from 'emailjs-com';
// import { useNavigate } from "react-router-dom";

const initalState = {
  name: "",
  regId: "",
  email:"",
  className: "",
  department: "",
  rollNo: "",
};

function AddStudents() {
  const [state, setState] = useState(initalState);
  const [loading, setLoading] = useState(false);

  const { name, regId, email, className, department, rollNo } = state;

  // const Redirect = useNavigate();

  const handleInputFields = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleStudentSubmission = (e) => {
    e.preventDefault();

    setLoading(true);

    emailjs.sendForm('service_xl4tkdf', 'template_s5hzocj', e.target, 'twvkjEux3YfiVS0Nc').then((result) => {
      console.log(result.text);
      toast.success('Details has been sent to student email successfully !');

    }, (error) => {
      console.log(error.text);
      toast.error('An error occurred, please try again later !');
    })

    // #################################################################################

    if (!name || !regId || !email || !className || !department || !rollNo) {
      toast.error("Please provide information");
      setLoading(false);
    } else {
      fireDB.child("studentMemberShipData").push(state, (err) => {
        if (err) {
          toast.error(err);
          setLoading(false);
        } else {
          toast.success("Student registered successfully");
          setLoading(false);
        }
      });
      // setTimeout(() => Redirect("/"), 2000);
    }
    setState({
      name: "",
      regId: "",
      email:"",
      className: "",
      department: "",
      rollNo: "",
    });
  };

  // ###################################################################

  return (
    <div>
      {loading && (
        <div className="backdrop">
          <div className="preloader">
            <ScaleLoader color="#fff" />
            <p>Loading....</p>
          </div>
        </div>
      )}
      <div className="student-registration-form">
        <form
          style={{
            margin: "auto",
            padding: "23px",
            maxWidth: "400px",
            alignContent: "center",
          }}
          onSubmit={handleStudentSubmission}
        >
          <label htmlFor="name">Student name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="student name"
            value={name}
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
           <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="email"
            value={email}
            onChange={handleInputFields}
          />
          <label htmlFor="regId">Card ID</label>
          <input
            type="reg"
            id="regId"
            name="regId"
            placeholder="card ID"
            value={regId}
            onChange={handleInputFields}
          />
          <label htmlFor="className">Class</label>
          <input
            type="className"
            id="className"
            name="className"
            placeholder="Class name"
            value={className}
            onChange={handleInputFields}
          />
          <label htmlFor="rollNo">University registration number</label>
          <input
            type="rollNo"
            id="rollNo"
            name="rollNo"
            placeholder="PRN"
            value={rollNo}
            onChange={handleInputFields}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}

export default AddStudents;
