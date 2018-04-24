// 设置动态修改html的fontSize的函数
function setHtmlFontSize () {
  // 定义变量 -- 以iphone6为原型
  var htmlFontSize = 16
  var cW = 375

  // 当前打开的移动端视口宽度
  var newCW = document.documentElement.clientWidth || document.body.clientWidth
  // console.log(newCW)

  // 比例 cW / 16 = newCW / ?
  var newHtmlFontSize = newCW * htmlFontSize / cW
  // console.log(newHtmlFontSize)

  // 进行赋值操作
  document.documentElement.style.fontSize = newHtmlFontSize + 'px'
}

export { setHtmlFontSize }
