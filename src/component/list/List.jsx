import React, { useState } from "react";
import ListRow from "./ListRow";
import ListRowCell from "./ListRowCell";

import ListHeader from "./ListHeader";
import ListHeaderCell from "./ListHeaderCell";
import timestamps from "../../assets/timeStamps.json";

import styles from "./List.module.css";


const List = ({ rows, currency, setSelectedOrderDetails, setSelectedOrderTimeStamps,searchText  }) => {
    // Create state to hold the filtered rows
    const [filteredRows, setFilteredRows] = useState(rows);

    // Function to filter rows based on the search text
    const filterRows = () => {
      const filteredData = rows.filter((row) =>
        row["&id"].toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredRows(filteredData);
    };
  
    // Call the filterRows function whenever searchText changes
    React.useEffect(() => {
      filterRows();
    }, [searchText, rows]);

  
  return (
    <table className={styles.container}>
      <thead>
        <ListHeader>
          <ListHeaderCell>Order ID</ListHeaderCell>
          <ListHeaderCell>Buy/Sell</ListHeaderCell>
          <ListHeaderCell>Country</ListHeaderCell>
          <ListHeaderCell>Order Submitted</ListHeaderCell>
          <ListHeaderCell>Order Volume /{currency}</ListHeaderCell>
        </ListHeader>
      </thead>
      <tbody>
      {filteredRows.map((row, index) => (
  <ListRow key={`${row["&id"]}-${row.executionDetails.orderStatus}-${index}`}
    onClick={() => {
      setSelectedOrderDetails(row.executionDetails);
      setSelectedOrderTimeStamps(row.timeStamps);
    }}
  >
    <ListRowCell>{row["&id"]}</ListRowCell>
    <ListRowCell>{row.executionDetails.buySellIndicator}</ListRowCell>
    <ListRowCell>{row.executionDetails.orderStatus}</ListRowCell>
    <ListRowCell>{row.timeStamps.orderSubmitted}</ListRowCell>
    <ListRowCell>{row.bestExecutionData.orderVolume[currency]}</ListRowCell>
  </ListRow>
))}

       
      </tbody>
    </table>
  );
};

export default List;
