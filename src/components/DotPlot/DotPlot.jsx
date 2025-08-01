import PlotDots from "./PlotDots";
import PlotYAxis from "./PlotYAxis";
import PlotHighlightUser from "./PlotHighlightUser";
import PlotQuartile from "./PlotQuartile";
import PlotLegend from "./PlotLegend";
import { createScale } from "../../utils/createScale";
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

  // DotPlotのx軸を決めるscale
  const xRangeMax = dimensions.width - 200;
  const xScale = d3
    .scaleLinear()
    .domain([0, filteredData.length])
    .range([0, xRangeMax]);

  // 座標の配列
  const highlightUserPositions = [];
  const quartilePositions = [];

  const dotPlotArr = filteredData.map((contestData, i) => {
    const yRangeMax = 430 - 20;
    const yRange = [yRangeMax, 0];
    const yScale = createScale(contestData.data, "Score", yRange);

    // x座標
    const x = xScale(i);

    // ハイライトユーザーのy座標
    const userEntry = contestData.data.find(
      (d) => d.UserScreenName === highlightUser
    );
    if (userEntry) {
      const y = yScale(userEntry.Score);
      highlightUserPositions.push({ x, y });
    }

    // 四分位数のy座標（Q1, Q2, Q3）
    const scores = contestData.data.map((d) => d.Score).sort((a, b) => a - b);
    const q = (p) => {
      const pos = (scores.length - 1) * p;
      const base = Math.floor(pos);
      const rest = pos - base;
      if (scores[base + 1] !== undefined) {
        return scores[base] + rest * (scores[base + 1] - scores[base]);
      } else {
        return scores[base];
      }
    };
    const q1 = yScale(q(0.25));
    const q2 = yScale(q(0.5));
    const q3 = yScale(q(0.75));
    quartilePositions.push({ x, q1, q2, q3 });

    return (
      <PlotDots
        key={contestData.name}
        contestName={contestData.name}
        data={contestData.data}
        x={x}
        yScale={yScale}
        height={dimensions.height - 20}
      />
    );
  });

  return (
    <div ref={containerRef} style={{ width: "100%", height: "450px" }}>
      <svg width={dimensions.width} height={dimensions.height}>
        <g transform="translate(100,10)">
          <PlotYAxis height={dimensions.height - 20} width={dimensions.width - 280} />
        </g>
        <g transform="translate(150,10)">
          {dotPlotArr}
          <PlotQuartile quartilePos={quartilePositions} />
          <PlotHighlightUser userPos={highlightUserPositions} />
        </g>
        <g transform={`translate(${xRangeMax + 60}, 100)`}>
          <PlotLegend userName={highlightUser} />
        </g>

      </svg>
    </div>
  );
}

export default DotPlot;
