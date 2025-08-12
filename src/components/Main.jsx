import { useEffect, useState, useRef } from "react";
import UserNameInput from "./UserNameInput/UserNameInput";
import LineChart from "./LineChart/LineChart";
import DotPlot from "./DotPlot/DotPlot";

function Main() {
  const [selectedContest, setSelectedContest] = useState(null);
  const [highlightUser, setHighlightUser] = useState(null);
  const [allData, setAllData] = useState([]);

  const [width, setWidth] = useState(1000); // ← 共通width
  const containerRef = useRef(null);

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

  // width計測（共通）
  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
    });
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, [highlightUser]);

  const height = 450

  console.log(width)

  return (
    <div>
      <div className="section">
        <h1>AtCoder IDを入力してください</h1>
        <UserNameInput onChange={setHighlightUser} />
      </div>

      {highlightUser && (
        <div ref={containerRef} style={{ width: '100%' }}>
          <div className="container">
            <DotPlot
              allData={allData}
              highlightUser={highlightUser}
              onSelectContest={setSelectedContest}
              width={width}
              height={height}
            />
          </div>
          <div className="container">
            <LineChart
              allData={allData}
              selectedContest={selectedContest}
              highlightUser={highlightUser}
              width={width}
              height={height}
            />
          </div>
        </div>
      )}
    </div>
  );
}


export default Main;
