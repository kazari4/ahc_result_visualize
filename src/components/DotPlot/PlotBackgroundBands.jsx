// PlotBackgroundBands.jsx
function PlotBackgroundBands({ filteredData, colorChangePosition, xScale, height }) {
  if (!filteredData.length) return null;

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


  return (
    <g className="perf-bands">
      {perfColors.map((color, idx) =>
        filteredData.slice(0, -1).map((contestData, i) => {
          const nextContest = filteredData[i + 1];
          const x1 = xScale(i);
          const x2 = xScale(i + 1);

          const y1Low =
            idx === 0 ? 0 : colorChangePosition[contestData.name][perfColors[idx - 1]];
          const y1High = colorChangePosition[contestData.name][color];
          const y2Low =
            idx === 0 ? 0 : colorChangePosition[nextContest.name][perfColors[idx - 1]];
          const y2High = colorChangePosition[nextContest.name][color];

          if (
            y1Low === undefined ||
            y1High === undefined ||
            y2Low === undefined ||
            y2High === undefined
          ) {
            return null;
          }

          return (
            <polygon
              key={`${i}-${color}`}
              points={`${x1},${y1Low} ${x1},${y1High} ${x2},${y2High} ${x2},${y2Low}`}
              fill={color}
              stroke="none"
            />
          );
        })
      )}
    </g>
  );
}

export default PlotBackgroundBands;
