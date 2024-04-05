import React from "react";
import "../Compstyling/CirculatedBookdata.css";
import { ScaleLoader } from "react-spinners";


function CirculatedBookData({ Filtered, state }) {
  

  return (
    <div>
      <div className="data-table">
        {Object.keys(state).length === 0 ? (
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
            </tr>

            {Object.keys(Filtered).map((id, index) => (
              <>
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{Filtered[id].name}</td>
                  <td>{Filtered[id].authorname}</td>
                  <td>{Filtered[id].bookid}</td>
                  <td>{Filtered[id].borrowerid}</td>
                  <td>{Filtered[id].dateOfissue}</td>
                  <td>{Filtered[id].dateOfreturn}</td>
                  {Filtered[id].status === "Issued" ? (
                    <td>
                      <p
                        style={{
                          color: "#ff3333",
                          fontWeight: "800",
                          fontFamily: "monospace",
                        }}
                      >
                        {Filtered[id].status}
                      </p>
                    </td>
                  ) : Filtered[id].status === "Returned" ? (
                    <td>
                      <p
                        style={{
                          color: "green",
                          fontWeight: "800",
                          fontFamily: "monospace",
                        }}
                      >
                        {Filtered[id].status}
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
                        {Filtered[id].status}
                      </p>
                    </td>
                  )}                 
                </tr>
              </>
            ))}
          </table>
        )}
      </div>
    </div>
  );
}

export default CirculatedBookData;
