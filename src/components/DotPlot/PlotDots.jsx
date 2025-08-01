function PlotDots({ data, contestName, x, yScale, height, onClick }) {
  const dots = data.map(({ Score, UserScreenName }) => (
    <circle key={UserScreenName} cx={x} cy={yScale(Score)} r="3" fill="black" style={{ opacity: 0.05 }} />
  ))

  dots.push(
    <text
      key={contestName}
      x={x}
      y={height}
      fontSize={14}
      textAnchor="middle"
    >
      {contestName}
    </text>
  )

  return (
    <g onClick={onClick} style={{ cursor: "pointer" }}>{dots}</g>
  )

}

export default PlotDots;