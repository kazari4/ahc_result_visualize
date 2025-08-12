export function convertPerformanceColor(color) {
  switch (color) {
    case "rgb(255,178,178)":
      return "rgb(255,0,0)"
    case "rgb(255,216,178)":
      return "rgb(255,128,0)"
    case "rgb(236,236,178)":
      return "rgb(230,230,0)"
    case "rgb(178,178,255)":
      return "rgb(0,0,255)"
    case "rgb(178,236,236)":
      return "rgb(0,220,220)"
    case "rgb(178,216,178)":
      return "rgb(0,192,0)"
  }
}