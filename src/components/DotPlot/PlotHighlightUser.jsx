import DotConnector from "./DotConnector";
import { createScale } from "../../utils/createScale";

function PlotHighlightUser({ filteredData, highlightUser, xScale, yScale }) {
  // dotPlotのy座標の範囲
  const yRangeMax = 430 - 20;
  const yRange = [yRangeMax, 0];

  // 指定ユーザーの座標の配列
  const highlightUserPositions = filteredData.map((contestData, i) => {
    const x = xScale(i);
    const yScale = createScale(contestData.data, "Score", yRange);
    const highlightUserData = contestData.data.find(
      (d) => d.UserScreenName === highlightUser
    );

    const y = yScale(highlightUserData?.Score);
    return ({
      x, y
    })
  })

  return (
    <DotConnector dotPos={highlightUserPositions} color="red" />
  );
}

export default PlotHighlightUser;
