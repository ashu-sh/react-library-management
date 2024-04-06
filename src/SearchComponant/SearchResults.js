import React from 'react'
import "../Compstyling/CirculatedBookdata.css";
import { ScaleLoader } from "react-spinners";


function SearchResults({searchBook,state}) {
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

            {Object.keys(searchBook).map((id, index) => (
              <>
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{searchBook[id].name}</td>
                  <td>{searchBook[id].authorname}</td>
                  <td>{searchBook[id].bookid}</td>
                  <td>{searchBook[id].borrowerid}</td>
                  <td>{searchBook[id].dateOfissue}</td>
                  <td>{searchBook[id].dateOfreturn}</td>
                  {searchBook[id].status === "Issued" ? (
                    <td>
                      <p
                        style={{
                          color: "#ff3333",
                          fontWeight: "800",
                          fontFamily: "monospace",
                        }}
                      >
                        {searchBook[id].status}
                      </p>
                    </td>
                  ) : searchBook[id].status === "Returned" ? (
                    <td>
                      <p
                        style={{
                          color: "green",
                          fontWeight: "800",
                          fontFamily: "monospace",
                        }}
                      >
                        {searchBook[id].status}
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
                        {searchBook[id].status}
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
  )
}

export default SearchResults