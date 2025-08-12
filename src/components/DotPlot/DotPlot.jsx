import PlotDots from "./PlotDots";
import PlotYAxis from "./PlotYAxis";
import PlotHighlightUser from "./PlotHighlightUser";
import PlotLegend from "./PlotLegend";
import { createScale } from "../../utils/createScale";
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

function DotPlot({ allData, highlightUser, onSelectContest }) {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 1000, height: 400 });

  const [filteredData, setFilteredData] = useState([]);

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

  return (
    <div ref={containerRef} style={{ width: "100%", height: "450px" }}>
      <svg width={dimensions.width} height={dimensions.height}>
        <g transform="translate(100,10)">
          <PlotYAxis height={dimensions.height - 20} width={dimensions.width - 280} />
        </g>
        <g transform="translate(150,10)">
          <PlotDots allData={filteredData} xScale={xScale} />
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
