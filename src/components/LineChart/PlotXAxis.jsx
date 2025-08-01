function PlotXAxis({ scale, xRangeMax, yRangeMax }) {
  const ticks = scale.ticks()
  const tickHeight = 10
  const tickY = yRangeMax
  return (
    <g>
      <line x1="0" y1={yRangeMax} x2={xRangeMax} y2={yRangeMax} stroke="black" />
      <text
        x={xRangeMax / 2}
        y={yRangeMax + 40}
        fontSize={14}
        textAnchor="middle"
      >
        順位
      </text>
      {ticks.map((tick, i) => {
        const tickX = scale(tick)
        return (
          <g key={i}>
            <line x1={tickX} y1={tickY} x2={tickX} y2={tickY + tickHeight} stroke="black" />
            <text x={tickX} y={tickY + tickHeight} fontSize="14" textAnchor="middle" dominantBaseline="hanging">{tick}</text>
            <line x1={tickX} y1={tickY} x2={tickX} y2="0" style={{ opacity: 0.2 }} strokeDasharray="4" stroke="black" />
          </g>
        )
      })}
    </g>
  )
}

export default PlotXAxis;