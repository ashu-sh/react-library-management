import React, { useEffect, useState } from "react";
import "../Compstyling/BookCirculation.css";
import { toast } from "react-toastify";
import fireDB from "../Database/Firebase";
import Button from "@mui/material/Button";
import CirculatedBookData from "../AllData/CirculatedBookData";

function BookCirculation() {
  const [name, setName] = useState("");
  const [authorname, setAuthor] = useState("");
  const [bookid, setBookid] = useState("");
  const [borrowerid, setBorrowerid] = useState("");
  const [dateOfissue, setaDateofIssue] = useState("");
  const [dateOfreturn, setaDateofReturn] = useState("");
  const [status, setStatus] = useState("Issued");
  // const [flag, setFlag] = useState(false);

  const [state, setState] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const HandleButtonAction = (event) => {
    event.preventDefault();

    const books = {
      name,
      authorname,
      bookid,
      borrowerid,
      dateOfissue,
      dateOfreturn,
      status,
    };

    console.log(books);

    if (!name || !authorname || !bookid || !borrowerid || !status) {
      toast.error("Please enter valid data !");
    } else {
      fireDB.child("circulatedBooksDatabase").push(books, (err) => {
        if (err) {
          toast.error(err);
        } else {
          toast.success("Book Issued Succesfully");
        }
      });
    }

    setName("");
    setAuthor("");
    setBookid("");
    setBorrowerid("");
    setaDateofIssue("");
    setaDateofReturn("");
  };

  // circulated Books

  useEffect(() => {
    try {
      fireDB.child("circulatedBooksDatabase").on("value", (data) => {
        const fetchCirculatedBooks = data.val();
        const fetchCirculatedBooksArray = Object.values(fetchCirculatedBooks);

        setState(fetchCirculatedBooksArray);
      });
    } catch (error) {
      toast.error("Please check internet !");
      // console.log(error);
    }
  }, []);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    // refreshPage();
  };

  return (
    <div>
      <div>
        {isPopupOpen && (
          <div className="backdrop">
            <div className="book-issue-form">
              <form
                onSubmit={HandleButtonAction}
                style={{
                  margin: "auto",
                  padding: "23px",
                  maxWidth: "400px",
                  alignContent: "center",
                  borderRadius: "4px",
                }}
              >
                <label htmlFor="name">Book Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Book name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <label htmlFor="authorname">Author</label>
                <input
                  type="authorname"
                  id="authorname"
                  name="authorname"
                  placeholder="author name"
                  value={authorname}
                  onChange={(e) => {
                    setAuthor(e.target.value);
                  }}
                />
                <label htmlFor="bookid">Book ID</label>
                <input
                  type="bookid"
                  id="bookid"
                  name="bookid"
                  placeholder="Book ID"
                  value={bookid}
                  onChange={(e) => {
                    setBookid(e.target.value);
                  }}
                />
                <label htmlFor="borrowerid">Borrower id</label>
                <input
                  type="borrowerid"
                  id="borrowerid"
                  name="borrowerid"
                  placeholder="borrower id"
                  value={borrowerid}
                  onChange={(e) => {
                    setBorrowerid(e.target.value);
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    gap: "96px",
                    // justifyContent: "space-between",
                  }}
                >
                  <label htmlFor="dateOfreturn">Date of Return</label>
                  <label htmlFor="dateOfissue">Date of Issue</label>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "25px",
                    // justifyContent: "space-between",
                  }}
                >
                  <input
                    type="date"
                    id="dateOfissue"
                    name="dateOfissue"
                    placeholder="Date of issue"
                    value={dateOfissue}
                    style={{ margin: "8px 0px 5px 0px" }}
                    onChange={(e) => {
                      setaDateofIssue(e.target.value);
                    }}
                  />
                  <br />
                  <input
                    type="date"
                    id="dateOfreturn"
                    name="dateOfreturn"
                    placeholder="Date of return"
                    value={dateOfreturn}
                    onChange={(e) => {
                      setaDateofReturn(e.target.value);
                    }}
                  />
                </div>
                <br />
                <label htmlFor="statusOfbook">Action</label>
                <br />
                <div style={{ margin: "10px 0", textAlign: "center" }}>
                  <Button
                    variant="contained"
                    disabled={dateOfissue === "" ? true : false}
                    style={{ backgroundColor: "grey" }}
                    onClick={(e) => {
                      setStatus("Issued");
                    }}
                  >
                    Issue Book
                  </Button>
                  &nbsp;&nbsp;&nbsp;
                  <Button
                    variant="contained"
                    disabled={dateOfreturn === "" ? true : false}
                    style={{ backgroundColor: "#ff4d4d" }}
                    onClick={(e) => {
                      setStatus("Returned");
                    }}
                  >
                    Return Book
                  </Button>
                </div>
                <input type="submit" value="Submit Records" />
                <Button
                  variant="contained"
                  onClick={closePopup}
                  style={{
                    backgroundColor: "#00b38f",
                    alignItems: "center",
                    width: "100%",
                    borderRadius: "0px",
                  }}
                >
                  Close
                </Button>
              </form>
            </div>
          </div>
        )}
        <div>
          <div className="action-buttons">
            <Button
              variant="contained"
              style={{ backgroundColor: "#00b38f" }}
              onClick={openPopup}
            >
              Issue Book / Return Book
            </Button>
            &nbsp;&nbsp;
          </div>
          <div>
            <CirculatedBookData state={state} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookCirculation;
