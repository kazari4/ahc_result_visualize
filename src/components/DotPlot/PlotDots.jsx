import { createScale } from "../../utils/createScale";

function PlotDots({ allData, xScale, onClick }) {
  // dotPlotのy座標の範囲
  const yRangeMax = 430 - 20;
  const yRange = [yRangeMax, 0];

  const dotPlotArr = allData.map((contestData, i) => {
    const contestName = contestData.name;
    const contestResultData = contestData.data;
    const yScale = createScale(contestResultData, "Score", yRange);
    const x = xScale(i);

    const dots = contestResultData.map(({ Score, UserScreenName }) => (
      <circle key={UserScreenName} cx={x} cy={yScale(Score)} r="3" fill="black" style={{ opacity: 0.05 }} />
    ))

    dots.push(
      <text
        key={contestName}
        x={x}
        y={yRangeMax + 20}
        fontSize={14}
        textAnchor="middle"
      >
        {contestName}
      </text>
    )

    return (
      <g key={contestName} onClick={onClick} style={{ cursor: "pointer" }}>{dots}</g>
    )
  })

  return (
    dotPlotArr
  )

}

export default PlotDots;