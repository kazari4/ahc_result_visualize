function DotConnector({ dotPos, color, dashed = false }) {
  return (
    <g>
      <polyline
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeDasharray={dashed ? "4 3" : "none"} // dashed=trueなら点線
        points={dotPos.map(p => `${p.x},${p.y}`).join(" ")}
      />

      {dotPos.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={4}
          fill={color}
        />
      ))}
    </g>
  );
}

export default DotConnector;
