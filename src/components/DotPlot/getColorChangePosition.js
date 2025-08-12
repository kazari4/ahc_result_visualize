import { createScale } from "../../utils/createScale";

function getColor(perf) {
  if (perf >= 2800) {
    return "rgb(255,178,178)"
  } else if (perf >= 2400) {
    return "rgb(255,216,178)"
  } else if (perf >= 2000) {
    return "rgb(236,236,178)"
  } else if (perf >= 1600) {
    return "rgb(178,178,255)"
  } else if (perf >= 1200) {
    return "rgb(178,236,236)"
  } else if (perf >= 800) {
    return "rgb(178,216,178)"
  } else if (perf >= 400) {
    return "rgb(216,197,178)"
  } else {
    return "rgb(216,216,216)"
  }
}


export function getColorChangePosition(contestData) {
  // dotPlotのy座標の範囲
  const yRangeMax = 430 - 20;
  const yRange = [yRangeMax, 0];
  const yScale = createScale(contestData, "Score", yRange);
  const colorChange = []
  for (let i = 0; i < contestData.length - 1; i++) {
    const curPerfColor = getColor(contestData[i].Performance)
    const nextPerfColor = getColor(contestData[i + 1].Performance)
    if (curPerfColor != nextPerfColor) {
      const yPosition = (yScale(contestData[i].Score) + yScale(contestData[i + 1].Score)) / 2
      colorChange.push({
        [curPerfColor]: yPosition
      })
    }
  }
  return colorChange
}

