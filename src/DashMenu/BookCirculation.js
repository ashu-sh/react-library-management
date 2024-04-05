import React, { useEffect, useState } from "react";
import "../Compstyling/BookCirculation.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import fireDB from "../Database/Firebase";
import Button from "@mui/material/Button";
import CirculatedBookData from "../AllData/CirculatedBookData";
import BookFilters from "../filters/BookFilters";
import StatusControl from "../AllData/StatusControl";
// import { useParams, useNavigate } from "react-router-dom";

const books = {
  name: "",
  authorname: "",
  bookid: "",
  borrowerid: "",
  dateOfissue: "",
  dateOfreturn: "",
  status: "Issued",
};

function BookCirculation() {
  // const [flag, setFlag] = useState(false);
  const [formData, setFormData] = useState(books);
  const [state, setState] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [searchbook, setSearchbook] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const { name, authorname, bookid, borrowerid, dateOfissue, dateOfreturn, status } = formData;
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const HandleButtonAction = (event) => {
    event.preventDefault();
    console.log(books);
   
      fireDB.child("circulatedBooksDatabase").push(formData, (err) => {
        if (err) {
          toast.error(err);
        } else {
          toast.success("Book Issued Succesfully");
        }
      });

    setFormData(books);
  };

 
  const Filtered = state.filter((item) => {
    const searchResults = item.borrowerid
      ?.toLowerCase()
      .includes(searchbook.toLowerCase());
    const status1 = statusFilter === "all" || item.status === statusFilter;

    return searchResults && status1;
  });

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    // refreshPage();
  };

  const handleSearchBook = (e) => {
    setSearchbook(e.target.value);
  };

  const handleStatus = (e) => {
    setStatusFilter(e.target.value);
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
                <label htmlFor="name">Book Name </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Book name"
                  value={name}
                  onChange={handleChange}
                />
                <label htmlFor="authorname">Author</label>
                <input
                  type="authorname"
                  id="authorname"
                  name="authorname"
                  placeholder="author name"
                  value={authorname}
                  onChange={handleChange}
                />
                <label htmlFor="bookid">Book ID</label>
                <input
                  type="bookid"
                  id="bookid"
                  name="bookid"
                  placeholder="Book ID"
                  value={bookid}
                  onChange={handleChange}
                />
                <label htmlFor="borrowerid">Borrower id</label>
                <input
                  type="borrowerid"
                  id="borrowerid"
                  name="borrowerid"
                  placeholder="borrower id"
                  value={borrowerid}
                  onChange={handleChange}
                />
                <div
                  style={{
                    display: "flex",
                    gap: "96px",
                    // justifyContent: "space-between",
                  }}
                >
                  <label htmlFor="dateOfreturn">Date of Issue</label>
                  <label htmlFor="dateOfissue">Date of Return</label>
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
                    onChange={handleChange}
                  />
                  <br />
                  <input
                    type="date"
                    id="dateOfreturn"
                    name="dateOfreturn"
                    placeholder="Date of return"
                    value={dateOfreturn}
                    onChange={handleChange}
                  />
                </div>
                <br />
                <label htmlFor="statusOfbook">Action</label>
                <br />
                <div style={{ margin: "10px 0", textAlign: "center" }}>
                  <select name="status" value={status} onChange={handleChange}>
                    <option value="Issued">Issued</option>
                    <option value="Returned">Returned</option>
                </select>
                  
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
            <input
              type="text"
              placeholder="Search by borrower id"
              value={searchbook}
              onChange={handleSearchBook}
              style={{ borderRadius: "2px" }}
            ></input>
            <br />
            <div style={{lineHeight:"8px"}}>
            <Button
              variant="contained"
              style={{ backgroundColor: "#00b38f", width: "100%",height: "30px"}}
              onClick={openPopup}
            >
              Issue Book
            </Button>
              &nbsp;&nbsp;
            <Link to="/update-status">
              <Button color="secondary"
               variant="contained" 
               style={{ backgroundColor: "#ff0066", width: "100%", height: "30px" }}
                  
              >
              Change status
              </Button>
            </Link>
              
            </div>
          </div>
          <div>
            <BookFilters
              handleStatus={handleStatus}
              statusFilter={statusFilter}
            />
            <CirculatedBookData
              state={state}
              Filtered={Filtered}
              openPopup={openPopup}
              // handleCheckbox={handleCheckbox}
              // selectedBook={selectedBook}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookCirculation;
