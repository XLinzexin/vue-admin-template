
import defaultStyle from './defaultStyle'
const version = require('element-ui/package.json').version
// const defaultStyle = {
//   primaryColor: '#409EFF',
//   successColor: '#67C23A',
//   warningColor: '#E6A23C',
//   DangerColor: '#F56C6C',
//   infoColor: '#909399'
// }

function updateStyle (style, oldCluster, newCluster) {
  let newStyle = style
  oldCluster.forEach((color, index) => {
    newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index])
  })
  return newStyle
}

function getCSSString (url, callback) {
  const xhr = new XMLHttpRequest()
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      chalk = xhr.responseText.replace(/@font-face{[^}]+}/, '')
      callback()
    }
  }
  xhr.open('GET', url)
  xhr.send()
}

function getThemeCluster (theme) {
  const tintColor = (color, tint) => {
    let red = parseInt(color.slice(0, 2), 16)
    let green = parseInt(color.slice(2, 4), 16)
    let blue = parseInt(color.slice(4, 6), 16)

    if (tint === 0) { // when primary color is in its rgb space
      return [red, green, blue].join(',')
    } else {
      red += Math.round(tint * (255 - red))
      green += Math.round(tint * (255 - green))
      blue += Math.round(tint * (255 - blue))

      red = red.toString(16)
      green = green.toString(16)
      blue = blue.toString(16)

      return `#${red}${green}${blue}`
    }
  }

  const shadeColor = (color, shade) => {
    let red = parseInt(color.slice(0, 2), 16)
    let green = parseInt(color.slice(2, 4), 16)
    let blue = parseInt(color.slice(4, 6), 16)

    red = Math.round((1 - shade) * red)
    green = Math.round((1 - shade) * green)
    blue = Math.round((1 - shade) * blue)

    red = red.toString(16)
    green = green.toString(16)
    blue = blue.toString(16)

    return `#${red}${green}${blue}`
  }

  const clusters = [theme]
  for (let i = 0; i <= 9; i++) {
    clusters.push(tintColor(theme, Number((i / 10).toFixed(2))))
  }
  clusters.push(shadeColor(theme, 0.1))
  return clusters
}
let chalk // 保存请求下来的css string
export const defineElementStyle = function (styleObj) {
  const getHandler = () => {
    return () => {
      const id = 'chalk-style'
      for (let k in defaultStyle.theme) {
        if (styleObj[k]) {
          const themeCluster = getThemeCluster(styleObj[k].replace('#', ''))
          const originalCluster = getThemeCluster(defaultStyle.theme[k].replace('#', ''))
          chalk = updateStyle(chalk, originalCluster, themeCluster)
        }
      }
      let styleTag = document.getElementById(id)
      if (!styleTag) {
        styleTag = document.createElement('style')
        styleTag.setAttribute('id', id)
        document.head.appendChild(styleTag)
      }
      styleTag.innerText = chalk
    }
  }
  const chalkHandler = getHandler()
  if (!chalk) {
    const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`
    getCSSString(url, chalkHandler, 'chalk')
  } else {
    chalkHandler()
  }
}
