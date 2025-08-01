function PlotQuartile({ quartilePos }) {
  const lines = (key, dashArray = null) => (
    quartilePos.slice(0, -1).map((q, i) => {
      const next = quartilePos[i + 1];
      return (
        <line
          key={`${key}-${i}`}
          x1={q.x}
          y1={q[key]}
          x2={next.x}
          y2={next[key]}
          stroke="black"
          strokeWidth={2}
          strokeDasharray={dashArray}
          style={{ opacity: 0.5 }}
        />
      );
    })
  );

  return (
    <g>
      {/* Q2: 第二四分位数（黒の実線） */}
      {lines("q2")}
    </g>
  );
}

export default PlotQuartile;
