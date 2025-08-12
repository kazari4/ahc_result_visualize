function DotConnector({ dotPos, color }) {
  console.log(dotPos)
  return (
    <g>
      <polyline
        fill="none"
        stroke={color}
        strokeWidth={2}
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