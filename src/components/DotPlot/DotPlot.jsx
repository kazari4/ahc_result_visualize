import PlotDots from "./PlotDots";
import { useEffect, useState } from "react";
import * as d3 from "d3";

function DotPlot({ highlightUser }) {
  const width = 1000;
  const height = 400;

  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const contests = Array.from({ length: 50 }, (_, i) =>
    `ahc${String(i + 1).padStart(3, "0")}`
  );

  // コンテストデータを取得、最初のみ
  useEffect(() => {
    Promise.all(
      contests.map(name =>
        fetch(`/data/${name}.json`)
          .then(res => res.json())
          .then(data => ({ name, data }))
      )
    ).then(results => {
      setAllData(results);
      console.log(results)
    });
  }, []);


  // highlightUser が含まれるデータのみフィルタリング
  useEffect(() => {
    const filtered = allData.filter(({ data }) =>
      data.some(entry => entry.UserScreenName === highlightUser)
    );
    setFilteredData(filtered);
  }, [highlightUser, allData]);

  const xRangeMax = width - 100;
  const xRange = [0, xRangeMax];
  const xScale = d3.scaleLinear().domain([0, filteredData.length]).range(xRange);

  const dotPlotArr = filteredData.map((contestData, i) => (
    <PlotDots key={contestData.name} data={contestData.data} highlightUser={highlightUser} x={xScale(i)} height={height} />
  ))

  return (
    <svg width={width} height={height}>
      <g transform="translate(50,10)">
        {dotPlotArr}
      </g>
    </svg>
  )
}

export default DotPlot;