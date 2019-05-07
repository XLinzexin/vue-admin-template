export const createMainStyle = function (styleObj) {
  const styleText = `
    .primaryColor{
      color:${styleObj.primaryColor} !important
    }
    .primaryBorderColor{
      border-color:${styleObj.primaryColor} !important
    }
    .primaryBackgroundColor{
      background:${styleObj.primaryColor} !important
    }
  `
  const styleTag = document.createElement('style')
  styleTag.innerText = styleText
  document.body.appendChild(styleTag)
}
