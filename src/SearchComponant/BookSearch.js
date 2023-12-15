import React from "react";
import "../Compstyling/Searchbook.css";

function BookSearch() {
  return (
    <div>
      <div className="book-search-form">
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

export default BookSearch;
