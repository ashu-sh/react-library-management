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
          
          <label htmlFor="regId">Student Registartion number</label>
          <input
            type="regnumber"
            id="regId"
            name="regId"
            placeholder="member ID"
            value=""
          />
          <button className="submit-search" type="submit">
            Search Student
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
          <button className="submit-search" type="submit">
            Search Book
          </button>
        </form>
      </div>
    </div>
  );
}

export default StudentSearch;
