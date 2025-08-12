import { useState } from "react";

function PlotClickArea({ data, xScale, height, onClick, selectedContest }) {
  const [hoverIndex, setHoverIndex] = useState(null);

  return data.map((contestData, i) => {
    const rectWidth = 16;
    const x = xScale(i) - rectWidth / 2;

    // 枠線を表示する条件
    const isHovered = hoverIndex === i;
    const isSelected = contestData.name === selectedContest;

    return (
      <rect
        key={contestData.name}
        x={x}
        y="-5"
        width={rectWidth}
        height={height - 10}
        rx="6"
        onClick={() => onClick(contestData.name)}
        onMouseEnter={() => setHoverIndex(i)}
        onMouseLeave={() => setHoverIndex(null)}
        style={{
          fill: "transparent",
          cursor: "pointer",
          stroke: isHovered || isSelected ? "#007ACC" : "none", // 青枠
          strokeWidth: isHovered || isSelected ? 2 : 0,
        }}
      />
    );
  });
}

export default PlotClickArea;
