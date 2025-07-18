function PlotLine({ data, xScale, yScale, xRangeMax, yRangeMax, highlightUser }) {
  const lines = []
  const circles = []

  const highlight = data.find(d => d.UserScreenName === highlightUser)
  console.log(highlight)

  for (let i = 0; i < data.length - 1; i++) {
    const p1 = data[i]
    const p2 = data[i + 1]

    lines.push(
      <line
        key={`line${i}`}
        x1={xScale(p1.RankIndex)}
        y1={yScale(p1.Score)}
        x2={xScale(p2.RankIndex)}
        y2={yScale(p2.Score)}
        stroke="black"
      />
    )
  }

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