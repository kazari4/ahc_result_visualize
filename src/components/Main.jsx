import { useEffect, useState } from "react";
import UserNameInput from "./UserNameInput/UserNameInput";
import LineChart from "./LineChart/LineChart";
import DotPlot from "./DotPlot/DotPlot";

function Main() {
  const [selectedContest, setSelectedContest] = useState(null);
  const [highlightUser, setHighlightUser] = useState(null);
  const [allData, setAllData] = useState([]);

  const contests = Array.from({ length: 50 }, (_, i) =>
    `ahc${String(i + 1).padStart(3, "0")}`
  );

  // データ取得
  useEffect(() => {
    Promise.all(
      contests.map(name =>
        fetch(`/data/${name}.json`)
          .then(res => res.json())
          .then(data => ({ name, data }))
      )
    ).then(results => {
      setAllData(results);
    });
  }, []);

  return (
    <div>
      <div className="section">
        <h1>AtCoder IDを入力してください</h1>
        <UserNameInput onChange={setHighlightUser} />
      </div>

      {highlightUser && (
        <>
          <div className="container">
            <h1>コンテストごとのスコア分布</h1>
            <DotPlot
              allData={allData}
              highlightUser={highlightUser}
              onSelectContest={setSelectedContest}
            />
          </div>
          <div className="container">
            <LineChart
              allData={allData}
              selectedContest={selectedContest}
              highlightUser={highlightUser}
            />
          </div>
        </>
      )}
    </div>
  );
}


export default Main;
