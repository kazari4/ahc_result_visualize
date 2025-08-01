function PlotYAxis({ height, width }) {
  const yScale = (value) => (height - 20) * (1 - value / 100); // 100% = 上、0% = 下
  const ticks = [0, 25, 50, 75, 100];

  return (
    <>
      {/* 軸の線 */}
      <line x1={0} y1={0} x2={0} y2={height} stroke="black" />

      {/* メモリとラベル */}
      {ticks.map((t) => (
        <g key={t} transform={`translate(0, ${yScale(t)})`}>
          <line x1={-5} x2={0} y1={0} y2={0} stroke="black" />
          <text x={-10} y={4} fontSize={12} textAnchor="end">
            {t}%
          </text>
        </g>
      ))}
      <text
        x={-height / 2}
        y={-50}
        transform="rotate(-90)"
        fontSize={14}
        textAnchor="middle"
      >
        スコア（割合）
      </text>

      {/* 点線の補助線（25%, 50%, 75%のみ） */}
      {[0, 25, 50, 75, 100].map((t) => (
        <line
          key={`grid-${t}`}
          x1={0}
          x2={width}
          y1={yScale(t)}
          y2={yScale(t)}
          stroke="gray"
          strokeDasharray="4"
          style={{ opacity: 0.5 }}
        />
      ))}
    </>
  );
}

export default PlotYAxis;