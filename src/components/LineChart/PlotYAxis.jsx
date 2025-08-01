function PlotYAxis({ scale, xRangeMax, yRangeMax }) {
  const ticks = scale.ticks(7)
  const tickHeight = 10
  const tickX = 10
  return (
    <g>
      <line x1="10" y1="0" x2="10" y2={yRangeMax} stroke="black" />
      <text
        x={-yRangeMax / 2}
        y={-130}
        transform="rotate(-90)"
        fontSize={14}
        textAnchor="middle"
      >
        スコア
      </text>
      {ticks.map((tick, i) => {
        const tickY = scale(tick)
        return (
          <g key={i}>
            <line x1={tickX} y1={tickY} x2={tickX - tickHeight} y2={tickY} stroke="black" />
            <text x={tickX - tickHeight} y={tickY} fontSize="14" textAnchor="end" dominantBaseline="middle">{tick.toLocaleString()}</text>
            <line x1={tickX} y1={tickY} x2={xRangeMax} y2={tickY} style={{ opacity: 0.2 }} strokeDasharray="4" stroke="black" />
          </g>
        )
      })}
    </g>
  )
}

export default PlotYAxis;