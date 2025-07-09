function getColor(perf) {
  if (perf >= 2800) {
    return "rgb(255,0,0)"
  } else if (perf >= 2400) {
    return "rgb(255,128,0)"
  } else if (perf >= 2000) {
    return "rgb(255,255,0)"
  } else if (perf >= 1600) {
    return "rgb(0,0,255)"
  } else if (perf >= 1200) {
    return "rgb(0,194,255)"
  } else if (perf >= 800) {
    return "rgb(0,170,128)"
  } else if (perf >= 400) {
    return "rgb(134,74,43)"
  } else {
    return "rgb(128,128,128)"
  }
}

function PlotPerfColor({ data, yScale, xRangeMax, yRangeMax }) {
  const colorChange = []
  for (let i = 0; i < data.length - 1; i++) {
    const curPerfColor = getColor(data[i].Performance)
    const nextPerfColor = getColor(data[i + 1].Performance)
    if (curPerfColor != nextPerfColor) {
      const topY = (colorChange.length === 0) ? 0 : colorChange[colorChange.length - 1].bottomY
      const bottomY = (yScale(data[i].Score) + yScale(data[i + 1].Score)) / 2
      colorChange.push({
        color: curPerfColor,
        topY: topY,
        bottomY: bottomY,
      })
    }
  }

  colorChange.push({
    color: getColor(data[data.length - 1].Performance),
    topY: colorChange[colorChange.length - 1].bottomY,
    bottomY: yRangeMax
  })

  return (
    colorChange.map(({ color, topY, bottomY }) => {
      return (
        <g key={color}>
          <rect x="0" y={topY} width={xRangeMax} height={bottomY - topY} fill={color} style={{ opacity: 0.3 }}></rect>
        </g>
      )
    }
    )
  )
}
export default PlotPerfColor;