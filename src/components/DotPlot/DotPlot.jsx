import PlotDots from "./PlotDots";
import PlotBackgroundBands from "./PlotBackgroundBands";
import PlotYAxis from "./PlotYAxis";
import PlotHighlightUser from "./PlotHighlightUser";
import PlotLegend from "./PlotLegend";
import PlotTargetColorLine from "./PlotTargetColorLine";
import ColorSelector from "./ColorSelector";
import PlotClickArea from "./PlotClickArea";
import { getColorChangePosition } from "./getColorChangePosition";
import { useEffect, useState } from "react";
import * as d3 from "d3";

function DotPlot({ allData, highlightUser, onSelectContest, width, height, selectedContest }) {

  const [filteredData, setFilteredData] = useState([]);

  const [targetColor, setTargetColor] = useState("")

  // フィルタリング
  useEffect(() => {
    const filtered = allData.filter(({ data }) =>
      data.some(entry => entry.UserScreenName === highlightUser)
    );
    setFilteredData(filtered);
  }, [highlightUser, allData]);

  const colorChangePosition = {}
  allData.forEach((contestData) => {
    colorChangePosition[contestData.name] = getColorChangePosition(contestData.data)
  })

  // DotPlotのx軸を決めるscale
  const xRangeMax = width - 300;
  const xScale = d3.scaleLinear().domain([0, filteredData.length]).range([0, xRangeMax - 80]);

  return (
    <div style={{ width: "100%" }}>
      <ColorSelector onChange={setTargetColor} />
      <h1>コンテストごとのスコア分布</h1>
      <div style={{ height: "450px" }}>
        <svg width={width} height={height}>
          <g transform="translate(100,10)">
            <PlotYAxis height={height - 20} width={xRangeMax - 100} />
          </g>
          <g transform="translate(130,10)">
            <PlotBackgroundBands
              filteredData={filteredData}
              colorChangePosition={colorChangePosition}
              xScale={xScale}
              chartHeight={height - 20}
            />
            <PlotDots allData={filteredData} xScale={xScale} height={height - 20} onClick={onSelectContest} />
            {targetColor && <PlotTargetColorLine filteredData={filteredData} colorChangePosition={colorChangePosition} color={targetColor} xScale={xScale} />}
            <PlotHighlightUser filteredData={filteredData} highlightUser={highlightUser} xScale={xScale} />
            <PlotClickArea data={filteredData} xScale={xScale} height={height - 20} onClick={onSelectContest} selectedContest={selectedContest} />
          </g>
          <g transform={`translate(${xRangeMax + 60}, 100)`}>
            <PlotLegend userName={highlightUser} color={targetColor} />
          </g>

        </svg>
      </div>
    </div>
  );
}

export default DotPlot;