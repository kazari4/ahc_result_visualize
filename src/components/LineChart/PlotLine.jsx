function PlotLine({ data, xScale, yScale, xRangeMax, yRangeMax, highlightUser }) {
  const lines = []
  const circles = []

  const highlight = data.find(d => d.UserScreenName === highlightUser)

  for (let i = 0; i < data.length; i++) {
    const p = data[i]
    circles.push(
      <circle
        key={`circle-${p.UserScreenName}`}
        cx={xScale(p.RankIndex)}
        cy={yScale(p.Score)}
        r="2"
        fill="black"
      />
    )
  }

  if (highlight != null) {
    circles.push(
      <circle
        key="circle-highlight"
        cx={xScale(highlight.Rank)}
        cy={yScale(highlight.Score)}
        r={3}
        fill="red"
      />
    )
    lines.push(
      <line
        key="line-highlight-horizontal"
        x1={0}
        x2={xScale(highlight.RankIndex)}
        y1={yScale(highlight.Score)}
        y2={yScale(highlight.Score)}
        stroke="red"
        strokeDasharray="4"
        strokeWidth="2"
      />
    )
    lines.push(
      <line
        key="line-highlight-vertical"
        x1={xScale(highlight.RankIndex)}
        x2={xScale(highlight.RankIndex)}
        y1={yScale(highlight.Score)}
        y2={yRangeMax}
        stroke="red"
        strokeDasharray="4"
        strokeWidth="2"
      />
    )
  }

  return (
    <g>
      {lines}
      {circles}
    </g>
  )
}

export default PlotLine;