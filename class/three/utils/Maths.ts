export const remap = (value, low1, high1, low2, high2) => {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1)
}

export const clamp = (num, min, max) => Math.min(Math.max(num, min), max)
