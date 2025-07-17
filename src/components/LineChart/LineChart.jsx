import PlotLine from "./PlotLine";
import PlotXAxis from "./PlotXAxis";
import PlotYAxis from "./PlotYAxis";
import PlotPerfColor from "./PlotPerfColor";

function LineChart({ data, highlightUser, createScale }) {
  const width = 900;
  const height = 400;

  const xRangeMax = width - 200;
  const yRangeMax = height - 100;

  const xRange = [0, xRangeMax]
  const yRange = [yRangeMax, 0]

  const xScale = createScale(data, "Rank", xRange)
  const yScale = createScale(data, "Score", yRange)

  return (
    <svg width={width} height={height}>
      <g transform="translate(150,20)">
        <PlotPerfColor data={data} yScale={yScale} xRangeMax={xRangeMax} yRangeMax={yRangeMax} />
        <PlotLine data={data} xScale={xScale} yScale={yScale} xRangeMax={xRangeMax} yRangeMax={yRangeMax} highlightUser={highlightUser} />
        <PlotXAxis scale={xScale} xRangeMax={xRangeMax} yRangeMax={yRangeMax} />
        <PlotYAxis scale={yScale} xRangeMax={xRangeMax} yRangeMax={yRangeMax} />
      </g>
    </svg>
  )
}
export default LineChart;