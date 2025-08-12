import DotConnector from "./DotConnector";
import { convertPerformanceColor } from "./convertPerformanceColor"

function PlotTargetColorLine({ filteredData, colorChangePosition, color, xScale }) {
  if (color === null) {
    return;
  }
  const dotPos = filteredData.map((contestData, i) => {
    const x = xScale(i)
    const y = colorChangePosition[contestData.name][color]
    return ({
      x, y
    })
  })

  return (
    <DotConnector dotPos={dotPos} color={convertPerformanceColor(color)} />
  );
}

export default PlotTargetColorLine;