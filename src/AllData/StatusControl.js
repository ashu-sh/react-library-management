import React, { useState, useEffect} from "react";
import "../Compstyling/CirculatedBookdata.css";
import { Link } from "react-router-dom";
import fireDB from "../Database/Firebase";
import { Button} from "@mui/material";
import { toast } from "react-toastify";
import UpdateStatus from "../RecordUpdater/UpdateStatus";
import { ScaleLoader } from "react-spinners";
import { IoArrowBackCircleSharp } from "react-icons/io5";

function StatusControl() {
  const [bookList, setBookList] = useState({});
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    fireDB.child("circulatedBooksDatabase").on("value", (snapshot) => {
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

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleBookDelete = (id) => {
    if (window.confirm("Are you sure to delete this record ?")) {
      fireDB.child(`circulatedBooksDatabase/${id}`).remove();
      toast.success('Deleted !');
    } else {
      fireDB.child(`circulatedBooksDatabase/${id}`);
      toast.error('Cancelled !');
    }
    
  };

  return (
    <div>
      {isPopupOpen && (
        <div className="backdrop">
          <div className="book-issue-form">
            <UpdateStatus PopupClose={closePopup} />
          </div>
        </div>
      )}

      <div className="data-table" style={{display:"block"}}>
        <div style={{width:"0%"}}>
          <Link to={'/'}>
              <IoArrowBackCircleSharp size={28} />
          </Link>
        </div>  
        Back to Home
        <br/>
        &nbsp;
        &nbsp;
      
        {Object.keys(bookList).length === 0 ? (
          <div className="backdrop">
              <div className="preloader">
                 <ScaleLoader color="#fff" />
                 <p>Loading....</p>
              </div>
          </div>
          ) : (
          <table className="students">
            <tr>
              <th>Sr.no.</th>
              <th>Book Name</th>
              <th>Author</th>
              <th>Book ID</th>
              <th>Borrower ID</th>
              <th>Date of issue</th>
              <th>Date of return</th>
              <th>Status</th>
              <th style={{textAlign:"center"}}>Actions</th>
            </tr>

            {Object.keys(bookList).map((id, index) => (
              <>
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{bookList[id].name}</td>
                  <td>{bookList[id].authorname}</td>
                  <td>{bookList[id].bookid}</td>
                  <td>{bookList[id].borrowerid}</td>
                  <td>{bookList[id].dateOfissue}</td>
                  <td>{bookList[id].dateOfreturn}</td>
                  {bookList[id].status === "Issued" ? (
                    <td>
                      <p
                        style={{
                          color: "#ff3333",
                          fontWeight: "800",
                          fontFamily: "monospace",
                        }}
                      >
                        {bookList[id].status}
                      </p>
                    </td>
                  ) : bookList[id].status === "Returned" ? (
                    <td>
                      <p
                        style={{
                          color: "green",
                          fontWeight: "800",
                          fontFamily: "monospace",
                        }}
                      >
                        {bookList[id].status}
                      </p>
                    </td>
                  ) : (
                    <td>
                      <p
                        style={{
                          color: "orange",
                          fontWeight: "800",
                          fontFamily: "monospace",
                        }}
                      >
                        {bookList[id].status}
                      </p>
                    </td>
                  )}
                  <td>
                    <Link to={`/status/${id}`}>
                      <div style={{ display: "flex",justifyContent:"center" }}>
                        <Button
                          variant="contained"
                          style={{
                            backgroundColor: "#00b38f",
                            display: "flex",
                            width: "90px",
                            height: "20px",
                            fontSize: "11px",
                            borderRadius: "2px",
                          }}
                          onClick={openPopup}
                        >
                          change
                        </Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button
                          variant="contained"
                          style={{
                            backgroundColor: "#e60000",
                            display: "flex",
                            width: "90px",
                            height: "20px",
                            fontSize: "11px",
                            borderRadius: "2px",
                          }}
                          onClick={() => handleBookDelete(id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </Link>
                  </td>
                </tr>
              </>
            ))}
          </table>
        )}
      </div>
    </div>
  );
}

export default StatusControl;
