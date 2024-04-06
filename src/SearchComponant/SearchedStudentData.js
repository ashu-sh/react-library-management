import React from 'react'
import "../Compstyling/CirculatedBookdata.css";
import { ScaleLoader } from "react-spinners";



function SearchedStudentData({ searchStudent, state }) {
    

  return (
<div>
    <div className="table">
        {Object.keys(state).length === 0 ? (
        <div className="backdrop">
          <div className="preloader">
             <ScaleLoader color="#fff" />
             <p>Loading....</p>
          </div>
        </div>
        ) : (
          <table className="customers">
            <tr>
              <th>Sr.no</th>
              <th>Student Name</th>
              <th>Reg. number</th>
              <th>Class</th>
              <th>Department</th>
              <th>Roll number</th>
            </tr>
            {Object.keys(searchStudent).map((id, index) => (
              <tr key={id}>
                <td>{index + 1}</td>
                <td>{searchStudent[id].name}</td>
                <td>{searchStudent[id].regId}</td>
                <td>{searchStudent[id].className}</td>
                <td>{searchStudent[id].department}</td>
                <td>{searchStudent[id].rollNo}</td>
              </tr>
            ))}
          </table>
        )}
      </div>
    </div>
  )
}

export default SearchedStudentData