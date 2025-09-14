import { convertPerformanceColor } from "./convertPerformanceColor";

function PlotLegend({ userName, color }) {
  const spacing = 30;
  const showBorderLine = color !== undefined && color !== "";
  return (
    <>
      {/* 赤線：highlightUser */}
      <line x1={0} y1={0} x2={30} y2={0} stroke="rgb(240,0,0)" strokeWidth={2} />
      <text x={35} y={4} fontSize="13">{userName}</text>
    </>
  );
}

export default PlotLegend;