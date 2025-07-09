import PlotLine from "./PlotLine"
import { createScale } from "./createScale";

function LineChart({ data }) {
  const width = 700;
  const height = 400;

  const xRangeMax = width - 100;
  const yRangeMax = height - 100;

  const xRange = [0, xRangeMax]
  const yRange = [yRangeMax, 0]

  const xScale = createScale(data, "Rank", xRange)
  const yScale = createScale(data, "Score", yRange)

  return (
    <svg width={width} height={height}>
      <g transform="translate(50,20)">
        <PlotLine data={data} xScale={xScale} yScale={yScale} />
      </g>
    </svg>
  )
}
export default LineChart;