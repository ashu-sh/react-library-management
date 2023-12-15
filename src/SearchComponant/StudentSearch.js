import React from "react";
import "../Compstyling/SearchStudent.css";
import Button from "@mui/material/Button";

function StudentSearch() {
  return (
    <div>
      <div className="teacher-search-form">
        <form
          className="search-form-teacher"
          style={{
            margin: "auto",
            padding: "23px",
            maxWidth: "400px",
            alignContent: "center",
          }}
        >
          <label htmlFor="name">Student name</label>
          <input
            type="studentName"
            id="name"
            name="name"
            placeholder="student name"
            value=""
          />
          <label htmlFor="regId">Registartion number</label>
          <input
            type="regnumber"
            id="regId"
            name="regId"
            placeholder="member ID"
            value=""
          />
          <label htmlFor="rollno">University registration number</label>
          <input
            type="prnNumber"
            id="rollno"
            name="rollno"
            placeholder="PRN number"
            value=""
          />
          &nbsp;&nbsp;
          <label htmlFor="className">Class</label>
          <input
            type="class"
            id="className"
            name="className"
            placeholder="Class name"
            value=""
          />
          <button className="submit-search" type="submit">
            Search
          </button>
        </form>
      </div>
    </div>
  );
}

export default StudentSearch;
