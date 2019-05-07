
export const tintColor = (color, tint) => {
  let red = parseInt(color.slice(0, 2), 16)
  let green = parseInt(color.slice(2, 4), 16)
  let blue = parseInt(color.slice(4, 6), 16)

  if (tint === 0) { // when primary color is in its rgb space
    return [red, green, blue].join(',')
  } else {
    red += Math.round(tint * (255 - red))
    green += Math.round(tint * (255 - green))
    blue += Math.round(tint * (255 - blue))

    red = red < 16 ? '0' + red.toString(16) : red.toString(16)
    green = green < 16 ? '0' + green.toString(16) : green.toString(16)
    blue = blue < 16 ? '0' + blue.toString(16) : blue.toString(16)

    return `#${red}${green}${blue}`
  }
}

export const shadeColor = (color, shade) => {
  let red = parseInt(color.slice(0, 2), 16)
  let green = parseInt(color.slice(2, 4), 16)
  let blue = parseInt(color.slice(4, 6), 16)

  red = Math.round((1 - shade) * red)
  green = Math.round((1 - shade) * green)
  blue = Math.round((1 - shade) * blue)

  red = red < 16 ? '0' + red.toString(16) : red.toString(16)
  green = green < 16 ? '0' + green.toString(16) : green.toString(16)
  blue = blue < 16 ? '0' + blue.toString(16) : blue.toString(16)
  return `#${red}${green}${blue}`
}
