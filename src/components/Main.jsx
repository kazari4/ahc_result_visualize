import { useEffect, useState } from "react";
import { convertData } from "./convertData";

function Main() {
  const [resultData, setResultData] = useState(null);
  const [standingData, setStandingData] = useState(null);

  useEffect(() => {
    fetch('/.netlify/functions/getData')
      .then(res => res.json())
      .then(data => {
        setResultData(data.resultsJson);
        setStandingData(data.standingsJson);
      })
      .catch(err => console.error("取得失敗:", err));
  }, []);

  if (resultData === null) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  } else {
    const new_data = convertData(resultData, standingData);
    console.log(new_data);
    return (
      <div>
        <h1>Data Fetched!</h1>
      </div>
    )
  }
}

export default Main;
