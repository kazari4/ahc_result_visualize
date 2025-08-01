import { useEffect, useState } from "react";
import { createScale } from "../utils/createScale";
import UserNameInput from "./UserNameInput/UserNameInput";
import LineChart from "./LineChart/LineChart";
import DotPlot from "./DotPlot/DotPlot";

function Main() {
  const [selectedContest, setSelectedContest] = useState("ahc050");

  const [highlightUser, setHighlightUser] = useState(null);
  if (highlightUser === null) {
    return (
      <div className="section">
        <h1>AtCoder IDを入力してください</h1>
        <UserNameInput onChange={setHighlightUser} />
      </div>
    )
  } else {
    return (
      <div className="section">
        <h1>AtCoder IDを入力してください</h1>
        <UserNameInput onChange={setHighlightUser} />
        <h1>コンテストごとのスコア分布</h1>
        <DotPlot highlightUser={highlightUser} onSelectContest={setSelectedContest} />
      </div>
    )
  }
}


export default Main;
