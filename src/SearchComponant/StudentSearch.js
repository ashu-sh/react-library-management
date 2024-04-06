import React, { useState } from "react";
import "../Compstyling/SearchStudent.css";
import "../Compstyling/Searchbook.css";
import fireDB from "../Database/Firebase";
import SearchResults from "./SearchResults";
import { ScaleLoader } from "react-spinners";
import SearchedStudentData from "./SearchedStudentData";


function StudentSearch() {

  const [state, setState] = useState([]);
  const [searchBook, setSearchbook] = useState([]);
  const [searchStudent, setSearchStudent] = useState([]);
  const [Query_1, setQuery_1] = useState('');
  const [Query_2, setQuery_2] = useState('');
  const [loading, setLoading] = useState(false);



  const SearchBookTrigger = async (e) => {

    e.preventDefault();
    setLoading(true);
    try {
      const BookData = await fireDB.child("circulatedBooksDatabase").orderByChild('bookid').equalTo(Query_1).once('value');

      const fetchedData = BookData.val();
      const BookdataArray = Object.values(fetchedData);

      setSearchbook(BookdataArray);
      setState(BookdataArray);
      setLoading(false);

    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    } 
  }

  const SearchStudentTrigger = async (e) => {
    
    e.preventDefault();

    setLoading(true);

    try {
      const studentData = await fireDB.child('studentMemberShipData').orderByChild('regId').equalTo(Query_2).once('value');

      const fetchedData = studentData.val();
      const StudentArray = Object.values(fetchedData);

      setSearchStudent(StudentArray);
      setState(StudentArray);
      setLoading(false);

    } catch (error){
      console.log('error', error);
      setLoading(false);
    }
  }

  const handleSearchBook = (e) => {
    setQuery_1(e.target.value);
  }

  const handleSearchStudent = (e) => {
    setQuery_2(e.target.value);
  }


  return (
    <div>{
      loading && (
        <div className="backdrop">
              <div className="preloader">
                 <ScaleLoader color="#fff" />
                 <p>Loading....</p>
              </div>
          </div>
      )
    }
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
            value={Query_2}
            onChange={handleSearchStudent}
          />
          <button className="submit-search" type="submit"onClick={SearchStudentTrigger}>
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
          <label htmlFor="bookId">Book ID</label>
          <input
            type="bookId"
            id="bookId"
            name="bookId"
            placeholder="book ID"
            value={Query_1}
            onChange={handleSearchBook}
          />
          <button className="submit-search" type="submit" onClick={SearchBookTrigger}>
            Search Book
          </button>
        </form>     
        </div>
      </div>
      <div style={{ textAlign: "center", margin: "40px" }}>{
        searchBook.length === 0 ? "" : <SearchResults searchBook={searchBook} state={state}/> 
      }
      </div>
      <div style={{ textAlign: "center", margin: "20px" }}>{
        searchStudent.length === 0 ? "" : <SearchedStudentData searchStudent={searchStudent} state={state} />
      }
      </div>
    </div>
  );
}

export default StudentSearch;
