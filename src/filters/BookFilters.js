import React from "react";
import "../Compstyling/BookCirculation.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

function BookFilters({ handleStatus, statusFilter }) {
  return (
    <div className="book-filters">
      <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label">Filters</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group" 
        >
          <FormControlLabel
            value="Issued"
            control={<Radio />}
            checked={statusFilter === "Issued"}
            onChange={handleStatus}
            label="Issued"
          />
          <FormControlLabel
            value="Returned"
            control={<Radio />}
            checked={statusFilter === "Returned"}
            onChange={handleStatus}
            label="Returned"
          />
          <FormControlLabel value="other" control={<Radio />} label="Overdue" />
          <FormControlLabel
            value="all"
            control={<Radio />}
            checked={statusFilter === "all"}
            onChange={handleStatus}
            label="All"
          />
          <FormControlLabel
            value="disabled"
            disabled
            control={<Radio />}
            label="other"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default BookFilters;
