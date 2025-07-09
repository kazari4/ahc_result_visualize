import { useEffect, useState } from "react";
import { convertData } from "./convertData";
import ContestSelector from "./ContestSelector/ContestSelector";

function Main() {
  const [resultData, setResultData] = useState(null);
  const [standingData, setStandingData] = useState(null);
  const [contestName, setContestName] = useState("ahc050");

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
    const new_data = convertData(resultData, standingData);
    return (
      <div className="section">
        <h1>Data Fetched!</h1>
        <ContestSelector selectedContest={contestName} onChange={setContestName} />
      </div>
    )
  }
}

export default Main;
