function PlotHighlightUser({ userPos }) {
  return (
    <g>
      <polyline
        fill="none"
        stroke="red"
        strokeWidth={2}
        points={userPos.map(p => `${p.x},${p.y}`).join(" ")}
      />

      {userPos.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={4}
          fill="red"
        />
      ))}
    </g>
  );
}

export default PlotHighlightUser;
