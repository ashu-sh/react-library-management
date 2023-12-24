import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import fireDB from "../Database/Firebase";
// import Button from "@mui/material/Button";
import { ScaleLoader } from "react-spinners";
import Button from "@mui/material/Button";

const initalState = {
  name: "",
  regId: "",
  className: "",
  department: "",
  rollNo: "",
};
function Updatestudent({ PopupClose }) {
  const [state, setState] = useState(initalState);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const { name, regId, className, department, rollNo } = state;

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fireDB.child("studentMemberShipData").on("value", (snapshot) => {
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

  const handleStudentSubmission = (e) => {
    e.preventDefault();

    setLoading(true);

    if (!name || !regId || !className || !department || !rollNo) {
      toast.error("Please provide information");
      setLoading(false);
    } else {
      if (!id) {
        fireDB.child("studentMemberShipData").push(state, (err) => {
          if (err) {
            toast.error(err);
            setLoading(false);
          } else {
            toast.success("Already Updated !");
            setLoading(false);
          }
        });
      } else {
        fireDB.child(`studentMemberShipData/${id}`).set(state, (err) => {
          if (err) {
            toast.error(err);
            setLoading(false);
          } else {
            toast.success("Profile Updated !");
            setLoading(false);
          }
        });
      }

      // setTimeout(() => Redirect("/"), 2000);
    }
    setState({
      name: "",
      regId: "",
      className: "",
      department: "",
      rollNo: "",
    });
    setTimeout(() => navigate("/students"), 500);
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
          onSubmit={handleStudentSubmission}
        >
          <label htmlFor="name">Student name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="student name"
            value={name || ""}
            onChange={handleInputFields}
          />
          <label htmlFor="department">Department</label>
          <input
            type="department"
            id="department"
            name="department"
            placeholder="department"
            value={department || ""}
            onChange={handleInputFields}
          />
          <label htmlFor="regId">Card ID</label>
          <input
            type="reg"
            id="regId"
            name="regId"
            placeholder="card ID"
            value={regId || ""}
            onChange={handleInputFields}
          />
          <label htmlFor="className">Class</label>
          <input
            type="className"
            id="className"
            name="className"
            placeholder="Class name"
            value={className || ""}
            onChange={handleInputFields}
          />
          <label htmlFor="rollNo">University registration number</label>
          <input
            type="rollNo"
            id="rollNo"
            name="rollNo"
            placeholder="PRN"
            value={rollNo || ""}
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

export default Updatestudent;
