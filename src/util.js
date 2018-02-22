// 防止出现下拉
export function setWindowScrollTop () {
  const body = window.document.getElementsByTagName('body')[0]
  const html = window.document.getElementsByTagName('html')[0]
  body.style.height = window.innerHeight + 1 + 'px'
  body.scrollTop = 1
  html.scrollTop = 1
}

export function unsetWindowScrollTop () {
  const body = window.document.getElementsByTagName('body')[0]
  body.style.height = 'auto'
}

export function getOffsetTop (el) {
  if (typeof el === 'object') {
    var y = el.offsetTop
    while (el.offsetParent) {
      el = el.offsetParent
      y += el.offsetTop
    }
    return y
  } else {
    return 0
  }
}
