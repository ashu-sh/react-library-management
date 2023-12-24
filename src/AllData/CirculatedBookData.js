import React from "react";
import "../Compstyling/CirculatedBookdata.css";
// import Badge from "@mui/material/Badge";

function CirculatedBookData({ state }) {
  return (
    <div className="data-table">
      <table className="students">
        <tr>
          <th>Book Name</th>
          <th>Author</th>
          <th>Book ID</th>
          <th>Borrower ID</th>
          <th>Date of issue</th>
          <th>Date of return</th>
          <th>Status</th>
        </tr>
        {state.map((item, index) => (
          <>
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.authorname}</td>
              <td>{item.bookid}</td>
              <td>{item.borrowerid}</td>
              <td>{item.dateOfissue}</td>
              <td>{item.dateOfreturn}</td>
              {item.status === "Issued" ? (
                <td>
                  <p
                    style={{
                      color: "#ff3333",
                      fontWeight: "800",
                      fontFamily: "monospace",
                    }}
                  >
                    {item.status}
                  </p>
                </td>
              ) : (
                <td>
                  <p
                    style={{
                      color: "green",
                      fontWeight: "800",
                      fontFamily: "monospace",
                    }}
                  >
                    {item.status}
                  </p>
                </td>
              )}
            </tr>
          </>
        ))}
      </table>
    </div>
  );
}

export default CirculatedBookData;
