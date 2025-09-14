import { useEffect, useState, useRef } from "react";
import UserNameInput from "./UserNameInput/UserNameInput";
import LineChart from "./LineChart/LineChart";
import DotPlot from "./DotPlot/DotPlot";

function Main() {
  const [selectedContest, setSelectedContest] = useState(null);
  const [highlightUser, setHighlightUser] = useState(null);
  const [allData, setAllData] = useState([]);

  const [width, setWidth] = useState(1000);
  const containerRef = useRef(null);

  const contests = Array.from({ length: 50 }, (_, i) =>
    `ahc${String(i + 1).padStart(3, "0")}`
  );

  useEffect(() => {
    Promise.all(
      contests.map(name =>
        fetch(`/data/${name}.json`)
          .then(res => res.json())
          .then(data => ({ name, data }))
      )
    ).then(results => setAllData(results));
  }, []);

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
    });
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, [highlightUser]);

  const height = 450;

  return (
    <div className="container">
      {/* 入力セクション */}
      <section className="section" style={{ paddingTop: "1rem", paddingBottom: "1rem" }}>
        <h1 className="title is-4 has-text-black mb-4">
          AtCoder ID を入力してください
        </h1>
        <UserNameInput onChange={setHighlightUser} />
      </section>

      {highlightUser && (
        <div ref={containerRef} style={{ width: "100%" }}>
          {/* DotPlot */}
          <section className="section" style={{ paddingTop: "0.5rem", paddingBottom: "0.5rem" }}>
            <div className="box">
              <h2 className="title is-5 mb-3">コンテストごとのスコア分布</h2>
              <DotPlot
                allData={allData}
                highlightUser={highlightUser}
                onSelectContest={setSelectedContest}
                width={width}
                height={height}
                selectedContest={selectedContest}
              />
            </div>
          </section>

          {/* LineChart */}
          <section className="section" style={{ paddingTop: "0.5rem", paddingBottom: "0.5rem" }}>
            <div className="box">
              <LineChart
                allData={allData}
                selectedContest={selectedContest}
                highlightUser={highlightUser}
                width={width}
                height={height}
              />
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default Main;
