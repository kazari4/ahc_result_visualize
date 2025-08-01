import { useEffect, useState } from "react";
import { createScale } from "../utils/createScale";
import UserNameInput from "./UserNameInput/UserNameInput";
import LineChart from "./LineChart/LineChart";
import DotPlot from "./DotPlot/DotPlot";

function Main() {
  const [selectedContest, setSelectedContest] = useState("ahc050");

  const [highlightUser, setHighlightUser] = useState(null);
  return (
    <div className="section">
      <h1>Choose Contest</h1>
      <UserNameInput onChange={setHighlightUser} />
      <DotPlot highlightUser={highlightUser} />
    </div>
  )
}


export default Main;
