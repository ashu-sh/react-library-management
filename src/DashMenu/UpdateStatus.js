import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import fireDB from "../Database/Firebase";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import "../Compstyling/Books.css";

const initalState = {
  name: "",
  authorname: "",
  bookid: "",
  borrowerid: "",
  dateOfissue: "",
  dateOfreturn: "",
  status: "",
};

function UpdateStatus({ PopupClose }) {
  const [state, setState] = useState(initalState);
  const [data, setData] = useState({});
  //   const [isPopupOpen, setIsPopupOpen] = useState(false);
  // const [flag, setFlag] = useState(false);

  const {
    name,
    authorname,
    bookid,
    borrowerid,
    dateOfissue,
    dateOfreturn,
    status,
  } = state;

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fireDB.child("circulatedBooksDatabase").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });

    return () => {
      setData({});
    };
  }, [id]);

  useEffect(() => {
    if (id) {
      setState({ ...data[id] });
    } else {
      setState({ ...initalState });
    }
  }, [id, data]);

  const handleInputFields = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleUpdatedStatus = (e) => {
    e.preventDefault();

    if (!id) {
      fireDB.child("circulatedBooksDatabase").push(state, (err) => {
        if (err) {
          toast.error("error");
        } else {
          toast.success("Already updated !");
        }
      });
    } else {
      fireDB.child(`circulatedBooksDatabase/${id}`).set(state, (err) => {
        if (err) {
          toast.error("Error");
        } else {
          toast.success("Status updated !");
        }
      });
    }
  };

  return (
    <div>
      <div>
        <div className="book-issue-form">
          <form
            onSubmit={handleUpdatedStatus}
            style={{
              margin: "auto",
              padding: "23px",
              maxWidth: "400px",
              alignContent: "center",
              borderRadius: "4px",
            }}
          >
            <label htmlFor="borrowerid">Borrower id</label>
            <input
              type="borrowerid"
              id="borrowerid"
              name="borrowerid"
              placeholder="borrower id"
              value={borrowerid || ""}
              onChange={handleInputFields}
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
                value={dateOfissue || ""}
                style={{ margin: "8px 0px 5px 0px" }}
                onChange={handleInputFields}
              />
              <br />
              <input
                type="date"
                id="dateOfreturn"
                name="dateOfreturn"
                placeholder="Date of return"
                value={dateOfreturn || ""}
                onChange={handleInputFields}
              />
            </div>
            <br />
            <label htmlFor="statusOfbook">Action</label>
            <br />
            <div style={{ margin: "10px 0", textAlign: "center" }}>
              <select name="status" value={status || ""} onChange={handleInputFields}>
                <option value="Returned">Returned</option>
                <option value="Renewed">Renewed</option>
                <option value="Issued">Issued</option>
              </select>
            </div>
            <input type="submit" value="Submit Records" />

            <Button
              variant="contained"
              onClick={PopupClose}
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
    </div>
  );
}

export default UpdateStatus;
