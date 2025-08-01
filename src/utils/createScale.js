import * as d3 from "d3";

export function createScale(data, key, range) {
  const min = Math.min(...data.map(d => d[key]));
  const max = Math.max(...data.map(d => d[key]));
  return d3.scaleLinear().domain([min, max]).range(range);
}
