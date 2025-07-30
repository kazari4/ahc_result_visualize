import { createScale } from "../../utils/createScale";

function PlotDots({ data, highlightUser, x, height }) {
  const highlight = data.find(d => d.UserScreenName === highlightUser)

  const yRangeMax = height - 20;

  const yRange = [yRangeMax, 0]

  const yScale = createScale(data, "Score", yRange)

  const dots = data.map(({ Score, UserScreenName }) => (
    <circle key={UserScreenName} cx={x} cy={yScale(Score)} r="3" fill="black" style={{ opacity: 0.05 }} />
  ))

  if (highlight != null) {
    dots.push(
      <circle
        key="circle-highlight"
        cx={x}
        cy={yScale(highlight.Score)}
        r={3}
        fill="red"
      />)
  }

  return dots;

}

export default PlotDots;