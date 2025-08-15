import { createScale } from "../../utils/createScale";
import PlotLine from "./PlotLine";
import PlotXAxis from "./PlotXAxis";
import PlotYAxis from "./PlotYAxis";
import PlotPerfColor from "./PlotPerfColor";

function LineChart({ allData, selectedContest, highlightUser, width, height }) {
  if (selectedContest === null) {
    return <h1 className="title is-5 has-text-grey">コンテストが選択されていません</h1>;
  }

  const data = allData.find(d => d.name === selectedContest).data;
  const xRangeMax = width - 400;
  const yRangeMax = height - 100;
  const xScale = createScale(data, "Rank", [10, xRangeMax]).nice();
  const yScale = createScale(data, "Score", [yRangeMax, 0]).nice();

  const contestUrl = `https://atcoder.jp/contests/${selectedContest}`;

  return (
    <div>
      <h1 className="title is-5 mb-3" style={{ display: "flex", alignItems: "center", gap: "0.5em" }}>
        選択中のコンテスト: {selectedContest}
        <a href={contestUrl} target="_blank" rel="noopener noreferrer" title="コンテストページを開く">
          <span className="icon has-text-info">
            <i className="fas fa-external-link-alt"></i>
          </span>
        </a>
      </h1>
      <svg width={width} height={height}>
        <g transform="translate(150,20)">
          <PlotPerfColor data={data} yScale={yScale} xRangeMax={xRangeMax} yRangeMax={yRangeMax} />
          <PlotLine data={data} xScale={xScale} yScale={yScale} xRangeMax={xRangeMax} yRangeMax={yRangeMax} highlightUser={highlightUser} />
          <PlotXAxis scale={xScale} xRangeMax={xRangeMax} yRangeMax={yRangeMax} />
          <PlotYAxis scale={yScale} xRangeMax={xRangeMax} yRangeMax={yRangeMax} />
        </g>
      </svg>
    </div>
  );
}

export default LineChart;