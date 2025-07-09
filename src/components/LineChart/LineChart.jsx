function LineChart(data) {
  const width = 1200;
  const height = 600;

  const xRangeMax = width - 100;
  const yRangeMax = height - 100;

  const xRange = [0, xRangeMax]
  const yRange = [yRangeMax, 0]

  const xScale = createScale(data, "Rank", xRange)
  const yScale = createScale(data, "Score", yRange)

  return (
    <svg width={width} height={height}>
      <g transform="translate(50,15)">
      </g>
    </svg>
  )
}
export default LineChart;