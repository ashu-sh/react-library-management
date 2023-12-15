import React, { useEffect, useState } from "react";
import "../Compstyling/Books.css";
import { toast } from "react-toastify";
import fireDB from "../Database/Firebase";
import Button from "@mui/material/Button";

function Books() {
  const [bookList, getBookList] = useState([]);

  useEffect(() => {
    try {
      fireDB.child("libraryBookList").on("value", (data) => {
        const fetchedBookList = data.val();
        const BookArray = Object.values(fetchedBookList); //convert object to the array to get the length
        getBookList(BookArray);
      });
    } catch (error) {
      toast.error("Check your internet connection", error);
    }
  }, []);

  return (
    <div>
      <div className="action-buttons">
        <Button variant="contained" style={{ backgroundColor: " #e60000" }}>
          Delete Book
        </Button>
        &nbsp;&nbsp;
        <Button variant="contained" style={{ backgroundColor: "#00b38f" }}>
          Update Book Details
        </Button>
      </div>
      <div className="table">
        <table className="customers">
          <tr>
            <th>Select</th>
            <th>Book Name</th>
            <th>Author</th>
            <th>Book ID</th>
            <th>Date of Purchase</th>
            <th>Quantity</th>
          </tr>
          {bookList.map((res, key) => (
            <tr key={key}>
              <td>
                <input type="checkbox"></input>
              </td>
              <td>{res.name}</td>
              <td>{res.author}</td>
              <td>{res.bookid}</td>
              <td>{res.date}</td>
              <td>{res.quantity}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

export default Books;
