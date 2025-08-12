import DotConnector from "./DotConnector";

function PlotTargetColorLine({ filteredData, colorChangePosition, color, xScale }) {
  console.log(colorChangePosition)
  const dotPos = filteredData.map((contestData, i) => {
    const x = xScale(i)
    const y = colorChangePosition[contestData.name][color]
    return ({
      x, y
    })
  })

  return (
    <DotConnector dotPos={dotPos} color={color} />
  );
}

export default PlotTargetColorLine;