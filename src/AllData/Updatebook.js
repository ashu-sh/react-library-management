import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import fireDB from "../Database/Firebase";
import Button from "@mui/material/Button";
// // import { useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";

const initalState = {
  name: "",
  author: "",
  bookid: "",
  date: "",
  quantity: "",
};

function Updatebook({ PopupClose }) {
  const [state, setState] = useState(initalState);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const { name, author, bookid, date, quantity } = state;

  const { id } = useParams();
  // const navigate = useNavigate();

  useEffect(() => {
    fireDB.child("libraryBookList").on("value", (snapshot) => {
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

  const handleBookSubmissions = (e) => {
    e.preventDefault();

    setLoading(true);

    if (!name || !author || !bookid || !date || !quantity) {
      toast.error("Please provide information");
      setLoading(false);
    } else {
      if (!id) {
        fireDB.child("libraryBookList").push(state, (err) => {
          if (err) {
            toast.error(err);
            setLoading(false);
          } else {
            toast.success("Already Updated !");
            setLoading(false);
          }
        });
      } else {
        fireDB.child(`libraryBookList/${id}`).set(state, (err) => {
          if (err) {
            toast.error(err);
            setLoading(false);
          } else {
            toast.success("Book info updated !");
            setLoading(false);
          }
        });
      }

      // clear form fields after submission
      setState({
        name: "",
        author: "",
        bookid: "",
        date: "",
        quantity: "",
      });

      setTimeout(() => PopupClose(), 700);
      
    }
  };

  return (
    <div>
      {loading && (
        <div className="backdrop">
          <div className="preloader">
            <ScaleLoader color="#fff" />
            <p>Loading....</p>
          </div>
        </div>
      )}
      <div className="student-registration-form">
        <form
          style={{
            margin: "auto",
            padding: "23px",
            maxWidth: "400px",
            alignContent: "center",
          }}
          onSubmit={handleBookSubmissions}
        >
          <label htmlFor="name">Book Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="name"
            value={name || ""}
            onChange={handleInputFields}
          />
          <label htmlFor="author">Author</label>
          <input
            type="author"
            id="author"
            name="author"
            placeholder="author"
            value={author || ""}
            onChange={handleInputFields}
          />
          <label htmlFor="bookid">Book ID</label>
          <input
            type="bookid"
            id="bookid"
            name="bookid"
            placeholder="Book ID"
            value={bookid || ""}
            onChange={handleInputFields}
          />
          <label htmlFor="quantity">Quantity</label>
          <input
            type="quantity"
            id="quantity"
            name="quantity"
            placeholder="Qty"
            value={quantity || ""}
            onChange={handleInputFields}
          />
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            placeholder="Date of purchase"
            value={date || ""}
            onChange={handleInputFields}
          />
          <input type="submit" value="UPDATE" />
          <Button
            variant="contained"
            style={{
              backgroundColor: "#00b38f",
              alignItems: "center",
              width: "100%",
              borderRadius: "0px",
            }}
            onClick={PopupClose}
          >
            Close
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Updatebook;
