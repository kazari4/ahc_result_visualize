import { useEffect, useState } from "react";

function App() {
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
    console.log(resultData)
    console.log(standingData)
    return (
      <div>
        <h1>Data Fetched!</h1>
      </div>
    )
  }
}

export default App;
