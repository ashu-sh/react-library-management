import React, { useState } from "react";
import "../Compstyling/SearchStudent.css";
import "../Compstyling/Searchbook.css";
import fireDB from "../Database/Firebase";
import SearchResults from "./SearchResults";
import { ScaleLoader } from "react-spinners";


function StudentSearch() {

  const [state, setState] = useState([]);
  const [searchBook, setSearchbook] = useState([]);
  const [searchInput,setSearchInput] = useState('')
  const [loading, setLoading] = useState(false);


  const SearchTrigger = async (e) => {

    e.preventDefault();
    setLoading(true);
    try {
      const BookData = await fireDB.child("circulatedBooksDatabase").orderByChild('bookid').equalTo(searchInput).once('value');

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

  const handleSearchBook = (e) => {
    setSearchInput(e.target.value);
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
          <label htmlFor="bookId">Book ID</label>
          <input
            type="bookId"
            id="bookId"
            name="bookId"
            placeholder="book ID"
            value={searchInput}
            onChange={handleSearchBook}
          />
          <button className="submit-search" type="submit" onClick={SearchTrigger}>
            Search Book
          </button>
        </form>     
        </div>
      </div>
      <div style={{ textAlign: "center", margin: "40px" }}>{
        searchBook.length === 0 ? "" : <SearchResults searchBook={searchBook} state={state}/>
      }
      </div>
    </div>
  );
}

export default StudentSearch;
