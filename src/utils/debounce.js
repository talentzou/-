/**
 *@param {number} delay 定时时间
 @param  {Function}  func   http请求函数
 @return {Function} 返回回调函数
 */
export const debounce = (delay, func) => {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func(args)
    }, delay)
  }
}
