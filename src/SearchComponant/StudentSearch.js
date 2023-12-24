import React from "react";
import "../Compstyling/SearchStudent.css";
import "../Compstyling/Searchbook.css";
// import Button from "@mui/material/Button";

function StudentSearch() {
  return (
    <div className="student-book-search">
      <div>
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
      <div>
        <form
          className="search-form-book"
          style={{
            margin: "auto",
            padding: "23px",
            maxWidth: "400px",
            alignContent: "center",
          }}
        >
          <label htmlFor="bookName">Book name</label>
          <input
            type="bookName"
            id="bookName"
            name="bookName"
            placeholder="book name"
            value=""
          />
          <label htmlFor="authorName">Author</label>
          <input
            type="authorName"
            id="authorName"
            name="authorName"
            placeholder="author "
            value=""
          />
          <label htmlFor="bookId">Book ID</label>
          <input
            type="bookId"
            id="bookId"
            name="bookId"
            placeholder="book ID"
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
