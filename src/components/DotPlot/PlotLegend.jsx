function PlotLegend({ userName }) {
  const spacing = 30;
  return (
    <>
      {/* 赤線：highlightUser */}
      <line x1={0} y1={0} x2={30} y2={0} stroke="red" strokeWidth={2} />
      <text x={35} y={4} fontSize="13">{userName}</text>

      {/* 黒の実線：中央値 */}
      <line x1={0} y1={spacing} x2={30} y2={spacing} stroke="black" strokeWidth={2} />
      <text x={35} y={spacing + 4} fontSize="13">中央値</text>
    </>
  );
}

export default PlotLegend;