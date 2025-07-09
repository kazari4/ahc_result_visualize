function PlotLine({ data, xScale, yScale }) {
  const lines = []
  const circles = []

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

  return (
    <g>
      {lines}
      {circles}
    </g>
  )
}

export default PlotLine;