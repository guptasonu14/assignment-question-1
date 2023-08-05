import { useState } from "react";

// Data
import mockData from "../assets/data.json";
import timestamps from "../assets/timeStamps.json";

// Components
import Dropdown from "../component/dropdown/Dropdown";
import HeaderTitle from "../component/header-title/HeaderTitle";
import Search from "../component/search/Search";
import List from "../component/list/List";

// Styles
import styles from "./Dashboard.module.css";
import Card from "../component/card/Card";

const Dashboard = () => {
  const [currency, setCurrency] = useState("EUR");
  const [searchText, setSearchText] = useState("");
  const [selectedOrderDetails, setSelectedOrderDetails] = useState({});
  const [selectedOrderTimeStamps, setSelectedOrderTimeStamps] = useState({});

  const handleSearch = (searchText) => {
    setSearchText(searchText);
  };

  const dataWithTimeStamps = mockData.results.map((data) => {
    const timestamp = timestamps.results.reduce((d, ts) => {
      if (ts["&id"] === data["&id"]) return (d = ts.timestamps);
      else return d;
    }, "");
    data.timeStamps = timestamp;
    return data;
  });

  return (
    <div>
      <div className={styles.header}>
      <HeaderTitle
          primaryTitle="Orders"
          secondaryTitle={`${mockData.results.length} orders`}
        />
        <div className={styles.actionBox}>
          <Search
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <Dropdown
            options={["GBP", "USD", "JPY", "EUR"]}
            onChange={(e) => setCurrency(e.target.value)}
            selectedItem={currency}
          />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.section}>
          <Card
            cardData={selectedOrderDetails}
            title="Selected Order Details"
          />
          <Card
            cardData={selectedOrderTimeStamps}
            title="Selected Order Timestamps"
          />
        </div>
        <List
          rows={dataWithTimeStamps}
          currency={currency}
          setSelectedOrderTimeStamps={setSelectedOrderTimeStamps}
          setSelectedOrderDetails={setSelectedOrderDetails}
          searchText={searchText}
        />
      </div>
    </div>
  );
};

export default Dashboard;
