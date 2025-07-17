import { useEffect, useState } from "react";
import { convertData } from "./convertData";
import { createScale } from "./createScale";
import ContestSelector from "./ContestSelector/ContestSelector";
import UserNameInput from "./UserNameInput/UserNameInput";
import LineChart from "./LineChart/LineChart";

function Main() {
  const [resultData, setResultData] = useState(null);
  const [standingData, setStandingData] = useState(null);
  const [contestName, setContestName] = useState("ahc050");

  const [highlightUser, setHighlightUser] = useState(null);

  useEffect(() => {
    fetch(`/.netlify/functions/getData?contestName=${contestName}`)
      .then(res => res.json())
      .then(data => {
        setResultData(data.resultsJson);
        setStandingData(data.standingsJson);
      })
      .catch(err => console.error("取得失敗:", err));
  }, [contestName]);

  if (resultData === null || standingData === null) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  } else {
    const convertedData = convertData(resultData, standingData);
    return (
      <div className="section">
        <h1>Choose Contest</h1>
        <ContestSelector selectedContest={contestName} onChange={setContestName} />
        <UserNameInput onChange={setHighlightUser} />
        <LineChart data={convertedData} highlightUser={highlightUser} createScale={createScale} />
      </div>
    )
  }
}

export default Main;
