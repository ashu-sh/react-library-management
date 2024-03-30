import React, { useEffect, useState } from "react";
import "../Compstyling/Books.css";
import { toast } from "react-toastify";
import fireDB from "../Database/Firebase";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Updatebook from "./Updatebook";

function Books() {
  const [bookList, setBookList] = useState({});
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    fireDB.child("libraryBookList").on("value", (snapshot) => {
      const data = snapshot.val();

      if (data !== null) {
        setBookList({ ...data });
      } else {
        setBookList({});
      }
    });

    return () => {
      setBookList({});
    };
  }, []);

  const handleBookDelete = (id) => {
    if (window.confirm("Are you sure to delete this record ?")) {
      fireDB.child(`libraryBookList/${id}`).remove();
      toast.success('Deleted !');
    } else {
      fireDB.child(`libraryBookList/${id}`);
      toast.error('Cancelled !')
    }
    
  };


  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div>
      {isPopupOpen && (
        <div className="backdrop">
          <div className="book-issue-form">
            <Updatebook PopupClose={closePopup} />
          </div>
        </div>
      )}
      <div className="table">
        {Object.keys(bookList).length === 0 ? (
          <p style={{ textAlign: "center" }}>No data found !</p>
        ) : (
          <table className="customers">
            <tr>
              <th>Sr.no</th>
              <th>Book Name</th>
              <th>Author</th>
              <th>Book ID</th>
              <th>Date of Purchase</th>
              <th>Quantity</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
            {Object.keys(bookList).map((id, index) => (
              <tr key={id}>
                <td>{index + 1}</td>
                <td>{bookList[id].name}</td>
                <td>{bookList[id].author}</td>
                <td>{bookList[id].bookid}</td>
                <td>{bookList[id].date}</td>
                <td>{bookList[id].quantity}</td>
                <td>
                  {Object.keys(bookList).length === 1 ? (
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <Button
                        variant="contained"
                        style={{
                          display: "flex",
                          width: "115px",
                          height: "20px",
                          fontSize: "11px",
                          borderRadius: "2px",
                        }}
                        disabled={true}
                      >
                        Delete Book
                      </Button>
                      &nbsp;&nbsp;
                      <Link to={`/update/${id}`}>
                        <Button
                          variant="contained"
                          style={{
                            backgroundColor: "#00b38f",
                            display: "flex",
                            width: "115px",
                            height: "20px",
                            fontSize: "11px",
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
                        variant="contained"
                        onClick={() => handleBookDelete(id)}
                        style={{
                          backgroundColor: " #e60000",
                          display: "flex",
                          width: "115px",
                          height: "20px",
                          fontSize: "11px",
                          borderRadius: "2px",
                        }}
                      >
                        Delete Book
                      </Button>
                      &nbsp;&nbsp;
                      <Link to={`/update/${id}`}>
                        <Button
                          variant="contained"
                          style={{
                            backgroundColor: "#00b38f",
                            display: "flex",
                            width: "115px",
                            height: "20px",
                            fontSize: "11px",
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
  );
}

export default Books;
