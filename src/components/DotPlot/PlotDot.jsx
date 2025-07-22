function PlotDot({ data, createScale, highlightUser }) {
  const width = 900;
  const height = 400;

  const highlight = data.find(d => d.UserScreenName === highlightUser)

  const yRangeMax = height;

  const yRange = [yRangeMax, 0]

  const yScale = createScale(data, "Score", yRange)

  const dots = data.map(({ Score, UserScreenName }) => (
    <circle key={UserScreenName} cx="100" cy={yScale(Score)} r="3" fill="black" style={{ opacity: 0.05 }} />
  ))

  if (highlight != null) {
    dots.push(
      <circle
        key="circle-highlight"
        cx="100"
        cy={yScale(highlight.Score)}
        r={3}
        fill="red"
      />)
  }

  return (
    <svg width={width} height={height}>
      {dots}
    </svg>
  )


}

export default PlotDot;