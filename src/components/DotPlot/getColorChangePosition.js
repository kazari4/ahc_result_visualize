import { createScale } from "../../utils/createScale";

function getColor(perf) {
  if (perf >= 2800) {
    return "rgb(255,178,178)";
  } else if (perf >= 2400) {
    return "rgb(255,216,178)";
  } else if (perf >= 2000) {
    return "rgb(236,236,178)";
  } else if (perf >= 1600) {
    return "rgb(178,178,255)";
  } else if (perf >= 1200) {
    return "rgb(178,236,236)";
  } else if (perf >= 800) {
    return "rgb(178,216,178)";
  } else if (perf >= 400) {
    return "rgb(216,197,178)";
  } else {
    return "rgb(216,216,216)";
  }
}

export function getColorChangePosition(contestData) {
  // chart 内の y の下端（あなたの既存コードと合わせる）
  const yRangeMax = 430 - 20;
  const yRange = [yRangeMax, 0];
  const yScale = createScale(contestData, "Score", yRange);

  // 全てのパフォーマンス色（getColor と一致する順序で）
  const perfColors = [
    "rgb(255,178,178)", // 2800+
    "rgb(255,216,178)", // 2400–2799
    "rgb(236,236,178)", // 2000–2399
    "rgb(178,178,255)", // 1600–1999
    "rgb(178,236,236)", // 1200–1599
    "rgb(178,216,178)", // 800–1199
    "rgb(216,197,178)", // 400–799
    "rgb(216,216,216)", // <400
  ];

  // すべての色を最下端で初期化
  const colorChange = {};
  perfColors.forEach((c) => {
    colorChange[c] = yRangeMax;
  });

  for (let i = 0; i < contestData.length - 1; i++) {
    const cur = contestData[i];
    const next = contestData[i + 1];
    const curColor = getColor(cur.Performance);
    const nextColor = getColor(next.Performance);

    if (curColor !== nextColor) {
      const yPos = (yScale(cur.Score) + yScale(next.Score)) / 2;
      colorChange[curColor] = Math.min(colorChange[curColor] ?? yRangeMax, yPos);
    }
  }

  return colorChange;
}
