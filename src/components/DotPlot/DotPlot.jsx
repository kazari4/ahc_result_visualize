import PlotDots from "./PlotDots";
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

function DotPlot({ highlightUser }) {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 1000, height: 400 });

  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const contests = Array.from({ length: 50 }, (_, i) =>
    `ahc${String(i + 1).padStart(3, "0")}`
  );

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setDimensions({ width, height });
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

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

  // フィルタリング
  useEffect(() => {
    const filtered = allData.filter(({ data }) =>
      data.some(entry => entry.UserScreenName === highlightUser)
    );
    setFilteredData(filtered);
  }, [highlightUser, allData]);

  const xRangeMax = dimensions.width - 100;
  const xScale = d3
    .scaleLinear()
    .domain([0, filteredData.length])
    .range([0, xRangeMax]);

  const dotPlotArr = filteredData.map((contestData, i) => (
    <PlotDots
      key={contestData.name}
      data={contestData.data}
      highlightUser={highlightUser}
      x={xScale(i)}
      height={dimensions.height}
    />
  ));

  return (
    <div ref={containerRef} style={{ width: "100%", height: "400px" }}>
      <svg width={dimensions.width} height={dimensions.height}>
        <g transform="translate(50,10)">{dotPlotArr}</g>
      </svg>
    </div>
  );
}

export default DotPlot;
